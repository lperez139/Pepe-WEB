"use client";

import Image from "next/image";
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

const initialMessages: Message[] = [];

const emptyLeadForm: LeadFormState = {
  company: "",
  consent: false,
  details: "",
  email: "",
  name: "",
  phone: "",
};

const quickPrompts = [
  "Que servicios ofrece Simple Core actualmente?",
  "Necesito una cotizacion para CCTV en una empresa.",
  "Trabajan proyectos de control de acceso para edificios?",
  "Que soluciones ofrecen para redes y telecomunicaciones?",
  "Pueden orientarme con una cotizacion?",
];

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

  const isIntroState = messages.length === 0 && !isLeadFormOpen;

  useEffect(() => {
    if (!isOpen || isIntroState) {
      return;
    }

    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, isIntroState, messages, isSubmitting, isLeadFormOpen, isSubmittingLead]);

  function openQuoteForm(summary: string) {
    setQuoteRequestSummary(summary);
    setLeadForm((current) => ({
      ...current,
      details: current.details || summary,
    }));
    setLeadError(null);
    setIsLeadFormOpen(true);
  }

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
        openQuoteForm(message);
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
              className="relative z-10 mb-3 flex h-[min(80vh,720px)] w-[min(calc(100vw-2rem),370px)] flex-col overflow-hidden rounded-[2.2rem] border border-[color:rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,rgba(14,20,31,0.98)_0%,rgba(10,15,20,1)_54%,rgba(8,12,18,1)_100%)] shadow-[0_28px_90px_-34px_rgba(0,0,0,0.78)]"
            >
              <div className="pointer-events-none absolute inset-x-6 top-10 h-56 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.22)_0%,rgba(34,211,238,0.14)_35%,rgba(10,15,20,0)_72%)] blur-2xl" />

              <div className="relative flex items-center justify-end gap-3 px-4 pt-4">
                {!isLeadFormOpen ? (
                  <button
                    type="button"
                    onClick={() => openQuoteForm("Solicitud iniciada desde el boton Cotizar")}
                    className="inline-flex items-center rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.06)] px-4 py-2 text-sm font-semibold text-[color:var(--text-main)] transition hover:border-[color:rgba(34,211,238,0.28)] hover:bg-[color:rgba(34,211,238,0.12)]"
                  >
                    Cotizar
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.06)] text-lg text-[color:var(--text-main)] transition hover:border-[color:rgba(34,211,238,0.28)] hover:bg-[color:rgba(34,211,238,0.12)]"
                >
                  ×
                </button>
              </div>

              {isIntroState ? (
                <div className="relative flex min-h-0 flex-1 flex-col px-5 pt-3">
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <Image
                      src="/simple-core-logo.svg"
                      alt="Simple Core"
                      width={238}
                      height={70}
                      className="h-auto w-[210px]"
                      priority
                    />
                    <p className="mt-4 max-w-[20ch] text-sm leading-relaxed text-[color:rgba(243,247,251,0.74)]">
                      Resuelve dudas y orienta cotizaciones.
                    </p>
                  </div>

                  <div className="pb-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                      Preguntas sugeridas
                    </p>
                    <div className="flex flex-col items-start gap-3">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => {
                            setInput(prompt);
                            setError(null);
                          }}
                          className="max-w-[92%] rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] px-4 py-3 text-left text-sm text-[color:var(--text-main)] shadow-[0_10px_28px_-22px_rgba(0,0,0,0.8)] transition hover:border-[color:rgba(34,211,238,0.32)] hover:bg-[linear-gradient(135deg,rgba(29,78,216,0.18),rgba(34,211,238,0.14))]"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-5">
                  {messages.map((message) => (
                    <article
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-[1.4rem] border px-4 py-3 text-sm shadow-[0_16px_30px_-24px_rgba(0,0,0,0.8)] ${
                          message.role === "user"
                            ? "border-transparent bg-[linear-gradient(135deg,rgba(29,78,216,0.96),rgba(34,211,238,0.92))] text-white"
                            : "border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] text-[color:var(--text-main)]"
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
                      <div className="rounded-[1.4rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)]">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-glow)]">
                          Chatbot
                        </p>
                        Revisando la base comercial para responder con precision.
                      </div>
                    </article>
                  ) : null}

                  <div ref={listEndRef} />
                </div>
              )}

              <div className="relative border-t border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(11,16,24,0.84),rgba(10,15,20,0.96))] px-4 py-4 md:px-5">
                {error ? (
                  <p className="mb-3 rounded-2xl border border-[color:rgba(255,110,110,0.18)] bg-[color:rgba(120,24,24,0.22)] px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                ) : null}

                {isLeadFormOpen ? (
                  <form className="space-y-3" onSubmit={submitLead}>
                    <div className="rounded-[1.5rem] border border-[color:rgba(34,211,238,0.16)] bg-[color:rgba(255,255,255,0.03)] px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                        Solicitud de cotizacion
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        Deja tus datos y el equipo comercial te contactara.
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
                        className="w-full rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        value={leadForm.phone}
                        onChange={(event) => setLeadForm((current) => ({ ...current, phone: event.target.value }))}
                        placeholder="Telefono"
                        className="w-full rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                        placeholder="Email"
                        className="w-full rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                      <input
                        value={leadForm.company}
                        onChange={(event) => setLeadForm((current) => ({ ...current, company: event.target.value }))}
                        placeholder="Empresa (opcional)"
                        className="w-full rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                      />
                    </div>

                    <textarea
                      rows={4}
                      value={leadForm.details}
                      onChange={(event) => setLeadForm((current) => ({ ...current, details: event.target.value }))}
                      placeholder="Cuentanos brevemente el proyecto o lo que necesitas cotizar"
                      className="w-full resize-none rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[color:var(--text-main)] outline-none transition focus:border-[color:rgba(34,211,238,0.45)] focus:ring-4 focus:ring-[color:rgba(34,211,238,0.12)]"
                    />

                    <label className="flex items-start gap-3 rounded-[1.2rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[color:var(--text-secondary)]">
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
                        className="inline-flex items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.05)] px-4 py-2 text-sm font-semibold text-[color:var(--text-main)] transition hover:-translate-y-0.5"
                      >
                        Volver
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="inline-flex items-center justify-center rounded-full border border-[color:rgba(34,211,238,0.2)] bg-[linear-gradient(135deg,rgba(29,78,216,1),rgba(34,211,238,0.96))] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmittingLead ? "Guardando..." : "Enviar solicitud"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="chatbot-input" className="sr-only">
                      Escribe tu consulta comercial
                    </label>
                    <div className="flex items-end gap-3 rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] px-4 py-3 shadow-[0_10px_28px_-22px_rgba(0,0,0,0.8)]">
                      <textarea
                        id="chatbot-input"
                        rows={1}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                        disabled={isSubmitting}
                        placeholder="Escribe tu consulta..."
                        className="max-h-28 min-h-[28px] flex-1 resize-none bg-transparent text-base text-[color:var(--text-main)] outline-none placeholder:text-[color:rgba(243,247,251,0.42)]"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || !input.trim()}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:rgba(34,211,238,0.2)] bg-[linear-gradient(135deg,rgba(29,78,216,1),rgba(34,211,238,0.96))] text-lg font-semibold text-white transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        ↑
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
