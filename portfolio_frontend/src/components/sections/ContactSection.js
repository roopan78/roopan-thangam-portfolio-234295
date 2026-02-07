import React, { forwardRef, useMemo, useState } from "react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";

/**
 * Contact form is implemented as a mailto composer to keep environment usage intact
 * and avoid introducing backend dependencies in this template.
 */
export const ContactSection = forwardRef(function ContactSection({ data }, ref) {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const initial = useMemo(
    () => ({ name: "", email: "", subject: "", message: "" }),
    []
  );
  const [form, setForm] = useState(initial);

  const onChange = (e) => {
    setStatus({ type: "idle", message: "" });
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    const subject = form.subject?.trim() || `Portfolio message from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto = `${data.emailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus({
      type: "success",
      message: "Opening your email client…",
    });
    setForm(initial);
  };

  const statusColor =
    status.type === "error"
      ? "var(--color-error)"
      : status.type === "success"
      ? "var(--color-success)"
      : "var(--color-text-muted)";

  return (
    <section
      id="contact"
      ref={ref}
      className="section"
      aria-label="Contact"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="grid gridCols2">
        <Card hover>
          <form className="formGrid" onSubmit={onSubmit} aria-label="Contact form">
            <div className="formRow2">
              <label className="label">
                Name
                <input
                  className="input"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="label">
                Email
                <input
                  className="input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="label">
              Subject (optional)
              <input
                className="input"
                name="subject"
                value={form.subject}
                onChange={onChange}
              />
            </label>

            <label className="label">
              Message
              <textarea
                className="textarea"
                name="message"
                value={form.message}
                onChange={onChange}
                required
              />
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Button variant="primary" type="submit" aria-label="Send message">
                Send Message
              </Button>
              <span style={{ color: statusColor, fontWeight: 700, fontSize: "var(--text-sm)" }}>
                {status.message}
              </span>
            </div>
          </form>
        </Card>

        <Card hover aria-label="Contact details">
          <p style={{ margin: 0, fontWeight: 900 }}>Other ways to connect</p>
          <p style={{ margin: "10px 0 0 0", color: "var(--color-text-muted)", lineHeight: "var(--line-height)" }}>
            Prefer direct links? Use the options below.
          </p>

          <div className="heroActions" style={{ marginTop: 14 }}>
            <Button
              variant="ghost"
              as="a"
              href={`mailto:${data.emailTo}`}
              aria-label="Email"
            >
              Email
            </Button>

            {data.social.map((s) => (
              <Button
                key={s.label}
                variant="ghost"
                as="a"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.label} (opens in new tab)`}
              >
                {s.label}
              </Button>
            ))}
          </div>

          <div style={{ marginTop: 16, borderTop: "1px solid var(--color-border)", paddingTop: 14 }}>
            <p style={{ margin: 0, fontWeight: 900 }}>Note</p>
            <p style={{ margin: "8px 0 0 0", color: "var(--color-text-muted)", lineHeight: "var(--line-height)" }}>
              This form uses <code>mailto:</code> to avoid backend requirements. If you later add an API endpoint,
              you can swap the submit handler to call <code>fetch(process.env.REACT_APP_API_BASE + ...)</code>.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
});
