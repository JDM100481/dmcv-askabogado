"use client";

import { useState } from "react";

const sampleQuestions = [
  "Tinanggal ako sa trabaho nang walang abiso. May karapatan ba ako?",
  "OFW ako. Nagsasamantala ang employer ko sa abroad.",
  "May customer/supplier na hindi nagbabayad.",
  "Kailangan ko magpa-review ng kontrata.",
  "May nag-post ng paninira sa akin online."
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askLegalQuestion(text) {
    const finalQuestion = text || question;
    if (!finalQuestion.trim()) return;

    setQuestion(finalQuestion);
    setAnswer("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: finalQuestion })
      });

      const data = await res.json();
      setAnswer(data.reply || "No answer available.");
    } catch (error) {
      setAnswer(
        "Hindi makakonekta ngayon. Please try again. This is general legal information only, not legal advice."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f3ea] px-4 py-6 text-[#1f1f1f]">
      <section className="mx-auto max-w-3xl">
        <header className="mb-5 rounded-3xl border border-[#eadfcd] bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b4872d]">
            DMCV Legal Helpdesk
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            AskAbogado
          </h1>

          <p className="mt-3 text-base leading-7 text-[#5f5b53]">
            Ask a simple legal question. Get free general legal information.
          </p>

          <p className="mt-3 rounded-2xl bg-[#fff7e8] p-3 text-sm leading-6 text-[#6b552b]">
            This is not legal advice. If you need actual legal service, use the
            intake button below.
          </p>
        </header>

        <section className="rounded-3xl border border-[#eadfcd] bg-white p-5 shadow-sm">
          <label className="text-sm font-bold text-[#4a443b]">
            What is your legal concern?
          </label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Tinanggal ako sa trabaho nang walang abiso. May karapatan ba ako?"
            className="mt-3 h-32 w-full resize-none rounded-2xl border border-[#e3d7c5] bg-[#fffaf1] px-4 py-3 text-base leading-7 outline-none focus:border-[#c99b3b]"
          />

          <button
            onClick={() => askLegalQuestion()}
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-[#c99b3b] px-5 py-4 text-base font-bold text-white shadow-sm disabled:opacity-60"
          >
            {loading ? "Checking..." : "AskAbogado"}
          </button>

          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8a641d]">
              Try a sample question
            </p>

            <div className="grid gap-2">
              {sampleQuestions.map((sample) => (
                <button
                  key={sample}
                  onClick={() => askLegalQuestion(sample)}
                  className="rounded-2xl border border-[#eee2cf] bg-[#fffaf1] p-3 text-left text-sm leading-6 text-[#333] hover:border-[#c99b3b]"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </section>

        {(loading || answer) && (
          <section className="mt-5 rounded-3xl border border-[#eadfcd] bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b4872d]">
              Answer
            </p>

            {loading ? (
              <p className="mt-3 text-base text-[#5f5b53]">
                Preparing a simple legal information answer...
              </p>
            ) : (
              <div className="mt-3 whitespace-pre-wrap text-base leading-8 text-[#242424]">
                {answer}
              </div>
            )}
          </section>
        )}

        <section className="mt-5 rounded-3xl border border-[#eadfcd] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Need legal service?</h2>

          <p className="mt-2 text-sm leading-7 text-[#5f5b53]">
            For SMEs, contracts, collections, labor issues, or formal legal
            assistance, AskAbogado QR is the legal intake gateway.
          </p>

          <div className="mt-4 rounded-3xl border-2 border-dashed border-[#c99b3b] bg-[#fffaf1] p-6 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-white text-3xl font-bold shadow-sm">
              QR
            </div>
            <p className="mt-3 text-sm font-bold">Scan to start legal intake</p>
            <p className="mt-1 text-xs text-[#777]">QR code placeholder</p>
          </div>

          <button className="mt-4 w-full rounded-2xl bg-[#1f1f1f] px-5 py-4 text-base font-bold text-white">
            Request Legal Service
          </button>
        </section>

        <footer className="mt-5 rounded-3xl border border-[#eadfcd] bg-white/70 p-4 text-xs leading-6 text-[#6f695f]">
          DMCV AskAbogado provides general legal information only and is not a
          substitute for legal advice from a licensed lawyer. Public legal
          education references such as BatasKo.com may be used for source
          discovery and guidance. No official partnership is claimed unless
          expressly stated.
        </footer>
      </section>
    </main>
  );
}
