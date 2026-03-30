"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Role = "assistant" | "user";
type ChatIntent = "general" | "quote_request";

type Message = {
  content: string;
  id: string;
  role: Role;
};

type LeadFormState = {
  company: string;
  consent: boolean;
  details: string;
  email: string;
  name: string;
  phone: string;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hola. Soy el chatbot comercial de Simple Core. Puedo orientarte sobre servicios, alcance comercial y tipos de proyectos.",
  },
];

const emptyLeadForm: LeadFormState = {
  company: "",
  consent: false,
  details: "",
  email: "",
  name: "",
  phone: "",
};

function formatDeliveryLabel(channels: string[]): string {
  if (channels.length === 0) {
    return "un canal no especificado";
  }

  return channels
    .map((channel) => (channel === "email" ? "email" : "Google Sheets"))
    .join(" y ");
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormState>(emptyLeadForm);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [quoteRequestSummary, setQuoteRequestSummary] = useState("");
  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages, isSubmitting, isLeadFormOpen, isSubmittingLead]);

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();

    if (!message || isSubmitting) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const payload = (await response.json()) as {
        details?: string;
        error?: string;
        intent?: ChatIntent;
        reply?: string;
      };
      const reply = typeof payload.reply === "string" ? payload.reply.trim() : "";
      const intent = payload.intent === "quote_request" ? "quote_request" : "general";

      if (!response.ok || !reply) {
        throw new Error(payload.details || payload.error || "No se pudo obtener respuesta.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);

      if (intent === "quote_request") {
        setQuoteRequestSummary(message);
        setLeadForm((current) => ({
          ...current,
          details: current.details || message,
        }));
        setLeadError(null);
        setIsLeadFormOpen(true);
      }
    } catch (requestError) {
      const nextError = requestError instanceof Error ? requestError.message : "Error inesperado.";
      setError(nextError);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "No pude responder en este momento. Intenta nuevamente o usa el formulario de contacto para una evaluacion comercial.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingLead) {
      return;
    }

    setLeadError(null);
    setIsSubmittingLead(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          requestSummary: quoteRequestSummary,
        }),
      });

      const payload = (await response.json()) as {
        delivered?: string[];
        error?: string;
        ok?: boolean;
      };

      if (!response.ok || payload.ok !== true) {
        throw new Error(payload.error || "No se pudo enviar la solicitud.");
      }

      const deliveredLabel = formatDeliveryLabel(payload.delivered ?? []);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Perfecto. Ya registre tu solicitud de cotizacion y la deje enviada por ${deliveredLabel}. El equipo comercial deberia contactarte pronto.`,
        },
      ]);
      setIsLeadFormOpen(false);
      setLeadForm(emptyLeadForm);
      setLeadError(null);
      setQuoteRequestSummary("");
    } catch (leadRequestError) {
      setLeadError(leadRequestError instanceof Error ? leadRequestError.message : "Error inesperado.");
    } finally {
      setIsSubmittingLead(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] md:bottom-6 md:right-6">
      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              key="backdrop"
              type="button"
              aria-label="Cerrar chatbot"
              className="fixed inset-0 z-0 bg-[color:rgba(6,10,16,0.38)] backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.section
              key="panel"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 mb-3 flex h-[min(78vh,700px)] w-[min(calc(100vw-2rem),420px)] flex-col overflow-hidden rounded-[2rem] border border-[color:rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,rgba(10,15,20,0.97)_0%,rgba(16,23,34,0.98)_100%)] shadow-[0_24px_80px_-30px_rgba(0,0,0,0.7)]"
            >
              <div className="border-b border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(29,78,216,0.22),rgba(34,211,238,0.12))] px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:rgba(34,211,238,0.25)] bg-[color:rgba(34,211,238,0.08)] text-sm font-semibold tracking-[0.18em] text-[color:var(--text-main)]">
                      SC
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                        Chatbot
                      </p>
                      <h2 className="font-heading text-lg font-semibold text-[color:var(--text-main)]">
                        Asistente Simple Core
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] text-sm font-semibold text-[color:var(--text-secondary)] transition hover:border-[color:rgba(34,211,238,0.35)] hover:text-[color:var(--text-main)]"
                  >
                    Cerrar
                  </button>
                </div>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-[color:rgba(243,247,251,0.72)]">
                  Respuestas comerciales basadas en la informacion local de esta web.
                </p>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-5">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[1.4rem] border px-4 py-3 text-sm shadow-[0_16px_30px_-24px_rgba(0,0,0,0.7)] ${
                        message.role === "user"
                          ? "border-transparent bg-[linear-gradient(135deg,rgba(29,78,216,0.95),rgba(34,211,238,0.92))] text-white"
                          : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] text-[color:var(--text-main)]"
                      }`}
                    >
                      <p
                        className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                          message.role === "user" ? "text-white/70" : "text-[color:var(--accent-glow)]"
                        }`}
                      >
                        {message.role === "user" ? "Tu" : "Chatbot"}
                      </p>
                      <div className="chatbot-markdown leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[color:inherit] underline underline-offset-4"
                              />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </article>
                ))}

                {isSubmitting ? (
                  <article className="flex justify-start">
                    <div className="rounded-[1.4rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)]">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-glow)]">
                        Chatbot
                      </p>
                      Revisando la base comercial para responder con precision.
                    </div>
                  </article>
                ) : null}

                <div ref={listEndRef} />
              </div>

              <div className="border-t border-[color:var(--border)] bg-[color:rgba(7,11,18,0.9)] px-4 py-4 md:px-5">
                {error ? (
                  <p className="mb-3 rounded-2xl border border-[color:rgba(255,110,110,0.18)] bg-[color:rgba(120,24,24,0.22)] px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                ) : null}

                {isLeadFormOpen ? (
                  <form className="space-y-3" onSubmit={submitLead}>
                    <div className="rounded-[1.4rem] border border-[color:rgba(34,211,238,0.16)] bg-[color:rgba(255,255,255,0.03)] px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                        Solicitud de cotizacion
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        Completa estos datos y el equipo comercial podra contactarte con seguimiento directo.
                      </p>
                      {quoteRequestSummary ? (
                        <p className="mt-3 text-xs text-[color:var(--text-secondary)]">
                          Consulta original: <span className="text-[color:var(--text-main)]">{quoteRequestSummary}</span>
                        </p>
                      ) : null}
                    </div>

                    {leadError ? (
                      <p className="rounded-2xl border border-[color:rgba(255,110,110,0.18)] bg-[color:rgba(120,24,24,0.22)] px-4 py-3 text-sm text-red-200">
                        {leadError}
                      </p>
                    ) : null}

                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        value={leadForm.name}
                        onChange={(event) => setLeadForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder="Nombre"
                        className="w-full rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        value={leadForm.phone}
                        onChange={(event) => setLeadForm((current) => ({ ...current, phone: event.target.value }))}
                        placeholder="Telefono"
                        className="w-full rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                        placeholder="Email"
                        className="w-full rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        value={leadForm.company}
                        onChange={(event) => setLeadForm((current) => ({ ...current, company: event.target.value }))}
                        placeholder="Empresa (opcional)"
                        className="w-full rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                    </div>

                    <textarea
                      rows={4}
                      value={leadForm.details}
                      onChange={(event) => setLeadForm((current) => ({ ...current, details: event.target.value }))}
                      placeholder="Cuentanos brevemente el proyecto o lo que necesitas cotizar"
                      className="w-full resize-none rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                    />

                    <label className="flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[color:var(--text-secondary)]">
                      <input
                        type="checkbox"
                        checked={leadForm.consent}
                        onChange={(event) => setLeadForm((current) => ({ ...current, consent: event.target.checked }))}
                        className="mt-1"
                      />
                      <span>Acepto que Simple Core use estos datos para contactarme respecto de esta solicitud.</span>
                    </label>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setIsLeadFormOpen(false)}
                        className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[color:var(--text-main)] transition hover:-translate-y-0.5"
                      >
                        Volver al chat
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="inline-flex items-center justify-center rounded-full border border-[color:rgba(34,211,238,0.18)] bg-[linear-gradient(135deg,rgba(29,78,216,1),rgba(34,211,238,0.96))] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmittingLead ? "Guardando..." : "Enviar solicitud"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className="space-y-3" onSubmit={handleSubmit}>
                    <label htmlFor="chatbot-input" className="sr-only">
                      Escribe tu consulta comercial
                    </label>
                    <textarea
                      id="chatbot-input"
                      rows={3}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={handleInputKeyDown}
                      disabled={isSubmitting}
                      placeholder="Escribe tu consulta comercial..."
                      className="w-full resize-none rounded-[1.4rem] border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-[color:var(--text-secondary)]">Enter para enviar, Shift+Enter para salto</p>
                      <button
                        type="submit"
                        disabled={isSubmitting || !input.trim()}
                        className="inline-flex items-center justify-center rounded-full border border-[color:rgba(34,211,238,0.18)] bg-[linear-gradient(135deg,rgba(29,78,216,1),rgba(34,211,238,0.96))] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center gap-3 rounded-full border border-[color:rgba(34,211,238,0.2)] bg-[linear-gradient(135deg,rgba(10,15,20,0.95),rgba(19,29,43,0.95))] px-4 py-3 text-left text-[color:var(--text-main)] shadow-[0_18px_44px_-22px_rgba(0,0,0,0.9)] backdrop-blur-md"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(29,78,216,1),rgba(34,211,238,0.92))] text-xs font-semibold uppercase tracking-[0.16em] text-white">
          SC
        </span>
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
            Chatbot
          </span>
          <span className="block text-sm font-semibold leading-tight">Habla con nosotros</span>
        </span>
      </motion.button>
    </div>
  );
}
