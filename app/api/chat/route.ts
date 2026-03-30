import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import {
  buildChatInput,
  getChatModel,
  MAX_MODEL_OUTPUT_TOKENS,
  MAX_USER_MESSAGE_LENGTH,
  SECURITY_REFUSAL_MESSAGE,
  SYSTEM_PROMPT,
} from "@/lib/chat-config";
import { loadKnowledgeBase } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequestBody {
  message?: unknown;
}

const quoteIntentPatterns = [
  /\bcotiza(r|cion|ción)?\b/i,
  /\bcotizacion\b/i,
  /\bcotización\b/i,
  /\bpresupuesto\b/i,
  /\bquiero\s+(una\s+)?cotizacion\b/i,
  /\bquiero\s+(una\s+)?cotización\b/i,
  /\bnecesito\s+(una\s+)?cotizacion\b/i,
  /\bnecesito\s+(una\s+)?cotización\b/i,
  /\bsolicitar\s+(una\s+)?cotizacion\b/i,
  /\bsolicitar\s+(una\s+)?cotización\b/i,
];

const promptInjectionPatterns = [
  /ignore\s+(all\s+)?(previous|prior|system|developer|these)\s+instructions/i,
  /forget\s+(all\s+)?(previous|prior|system|developer|these)\s+instructions/i,
  /ignora(r)?\s+(todas?\s+)?(las\s+)?(instrucciones|reglas)/i,
  /olvida(r)?\s+(todas?\s+)?(las\s+)?(instrucciones|reglas)/i,
  /(muestra|revela|ensena|dime)\s+.*(prompt|instrucciones internas|reglas internas|mensaje del sistema|system prompt|developer prompt)/i,
  /(system prompt|developer message|developer prompt|hidden instructions|prompt oculto|mensaje oculto|instrucciones ocultas)/i,
  /(actua|comporta|pretende)\s+como/i,
  /cambia\s+tu\s+rol/i,
];

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido.";
}

function isPromptInjectionAttempt(message: string): boolean {
  return promptInjectionPatterns.some((pattern) => pattern.test(message));
}

function isQuoteIntent(message: string): boolean {
  return quoteIntentPatterns.some((pattern) => pattern.test(message));
}

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Falta configurar GEMINI_API_KEY en las variables de entorno." },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "El cuerpo de la solicitud debe ser JSON valido." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Debes enviar una pregunta en el campo message." }, { status: 400 });
  }

  if (message.length > MAX_USER_MESSAGE_LENGTH) {
    return NextResponse.json(
      {
        error: `La pregunta es demasiado larga. El maximo permitido es ${MAX_USER_MESSAGE_LENGTH} caracteres.`,
      },
      { status: 400 },
    );
  }

  if (isPromptInjectionAttempt(message)) {
    return NextResponse.json({
      model: getChatModel(),
      reply: SECURITY_REFUSAL_MESSAGE,
      source: "security-policy",
    });
  }

  if (isQuoteIntent(message)) {
    return NextResponse.json({
      intent: "quote_request",
      reply:
        "Puedo ayudarte con la cotizacion. Para que el equipo comercial te contacte, completa tus datos en el formulario que acabo de abrir en el chat.",
      source: "quote-flow",
    });
  }

  try {
    const knowledgeBase = await loadKnowledgeBase();
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await client.models.generateContent({
      model: getChatModel(),
      contents: buildChatInput(knowledgeBase.content, message),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: MAX_MODEL_OUTPUT_TOKENS,
        temperature: 0.2,
      },
    });

    const reply = response.text?.trim() ?? "";

    if (!reply) {
      const blockReason = response.promptFeedback?.blockReason;

      return NextResponse.json(
        {
          error: blockReason
            ? `Gemini no devolvio respuesta util. Motivo de bloqueo: ${blockReason}.`
            : "El modelo no devolvio una respuesta util. Intenta nuevamente.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      intent: "general",
      reply,
      source: knowledgeBase.relativePath,
      model: getChatModel(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "No fue posible procesar la consulta en este momento.",
        details: extractErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
