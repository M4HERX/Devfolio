"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SITE } from "@/config/links";
import { useI18n } from "@/components/i18n/LanguageProvider";

type Status = "idle" | "sending" | "success" | "error";

// FormSubmit.co delivers the message straight to SITE.email with no backend or
// API key. NOTE: the very first submission triggers a one-time activation email
// to that inbox — click the link in it once to start receiving messages.
const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

export function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `${SITE.name} contact from ${name || "someone"}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { success?: string };
      if (res.ok && data.success !== "false") {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-edge bg-bg-secondary px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-all focus:border-accent-glow focus:outline-none focus:shadow-glow-sm";

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
            {t("form.name")}
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("form.namePlaceholder")}
            className={field}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
            {t("form.email")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("form.emailPlaceholder")}
            className={field}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("form.messagePlaceholder")}
          className={`${field} resize-none`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-xl border border-accent-glow bg-accent-blue/10 px-6 py-3 font-display font-semibold uppercase tracking-wide text-accent-glow transition-all hover:bg-accent-blue/20 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t("form.sending") : t("form.send")}
          {sending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} className="transition-transform group-hover:translate-x-1" />
          )}
        </button>

        {status === "success" && (
          <span className="inline-flex items-center gap-2 font-mono text-sm text-accent-glow">
            <CheckCircle2 size={16} />
            {t("form.success")}
          </span>
        )}
        {status === "error" && (
          <span className="inline-flex items-center gap-2 font-mono text-sm text-red-400">
            <AlertCircle size={16} />
            {t("form.error")}
          </span>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
