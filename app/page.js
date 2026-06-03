"use client";

import { useState } from "react";

const topics = [
  {
    label: "Labor",
    prompt: "Tinanggal ako sa trabaho nang walang abiso. May karapatan ba ako?"
  },
  {
    label: "OFW",
    prompt: "OFW ako. Nagsasamantala ang employer ko sa abroad."
  },
  {
    label: "SME Legal",
    prompt: "May employee issue ako sa negosyo. Ano ang dapat kong gawin?"
  },
  {
    label: "Contracts",
    prompt: "Kailangan ko magpa-review ng kontrata for my SME."
  },
  {
    label: "Collections",
    prompt: "May customer/supplier na hindi nagbabayad."
  },
  {
    label: "Tenant",
    prompt: "Pinaalis ako sa inuupahan ko nang walang abiso."
  },
  {
    label: "Cybercrime",
    prompt: "May nag-post ng paninira sa akin online."
  },
  {
    label: "Barangay/LGU",
    prompt: "May barangay or LGU concern ako. Ano ang dapat ihanda?"
  }
];

const samples = [
  "Tinanggal ako sa trabaho nang walang abiso. May karapatan ba ako?",
  "OFW ako. Nagsasamantala ang employer ko sa abroad.",
  "Kailangan ko magpa-review ng kontrata for my SME.",
  "May customer/supplier na hindi nagbabayad.",
  "Pinaalis ako sa inuupahan ko nang walang abiso.",
  "May nag-post ng paninira sa akin online."
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to DMCV AskAbogado. Ask a free legal information question, or use AskAbogado QR for legal service intake."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    const finalText = text || input;
    if (!finalText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: finalText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalText })
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response." }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hindi makakonekta ngayon. Please try again. General legal information only, not legal advice."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f2e9] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6">
        <header className="mb-6 rounded-3xl border border-[#e7dccb] bg-white/80 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b4872d]">
            DMCV Legal Helpdesk
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            DMCV AskAbogado
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5f5b53] md:text-base">
            Free Philippine legal information for everyone. If legal service or
            SME legal support is needed, the AskAbogado QR Code becomes the
            intake gateway.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                document.getElementById("ask-section")?.scrollIntoView({
                  behavior: "smooth"
                })
              }
              className="rounded-2xl bg-[#c99b3b] px-5 py-3 text-sm font-bold text-white shadow-sm"
            >
              Ask Free Legal Question
            </button>
            <a
              href="#intake"
              className="rounded-2xl border border-[#c99b3b] bg-white px-5 py-3 text-center text-sm font-bold text-[#8a641d]"
            >
              Request Legal Service
            </a>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div id="ask-section" className="rounded-3xl border border-[#e7dccb] bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold">AskAbogado Free Guide</h2>
              <p className="mt-1 text-sm text-[#6c675f]">
                Ask in English, Filipino, or Taglish. Answers are general legal
                information only.
              </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => sendMessage(topic.prompt)}
                  className="rounded-full bg-[#f1e5cd] px-3 py-1 text-xs font-semibold text-[#76551b] transition hover:bg-[#c99b3b] hover:text-white"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <div className="mb-4 grid gap-2 md:grid-cols-2">
              {samples.map((sample) => (
                <button
                  key={sample}
                  onClick={() => sendMessage(sample)}
                  className="rounded-2xl border border-[#eee2cf] bg-[#fffaf1] p-3 text-left text-sm hover:border-[#c99b3b]"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="h-[420px] overflow-y-auto rounded-3xl bg-[#fbf7ef] p-4">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-6 ${
                      m.role === "user"
                        ? "bg-[#c99b3b] text-white"
                        : "border border-[#eadfcd] bg-white text-[#242424]"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="rounded-3xl border border-[#eadfcd] bg-white px-4 py-3 text-sm">
                  Checking free legal guide...
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type your legal question..."
                className="flex-1 rounded-2xl border border-[#e3d7c5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c99b3b]"
              />
              <button
                onClick={() => sendMessage()}
                className="rounded-2xl bg-[#1f1f1f] px-5 py-3 text-sm font-bold text-white"
              >
                Send
              </button>
            </div>
          </div>

          <aside id="intake" className="space-y-5">
            <div className="rounded-3xl border border-[#e7dccb] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">AskAbogado QR</h2>
              <p className="mt-2 text-sm leading-6 text-[#625c52]">
                Legal service or services for SMEs needed? AskAbogado QR is the
                solution. Scan or share the QR to start legal intake.
              </p>

              <div className="mt-5 flex aspect-square items-center justify-center rounded-3xl border-2 border-dashed border-[#c99b3b] bg-[#fffaf1] text-center">
                <div>
                  <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                    QR
                  </div>
                  <p className="text-sm font-bold">Scan to start legal intake</p>
                  <p className="mt-1 text-xs text-[#777]">
                    /intake page placeholder
                  </p>
                </div>
              </div>

              <a
                href="#service-form"
                className="mt-4 block rounded-2xl bg-[#c99b3b] px-5 py-3 text-center text-sm font-bold text-white"
              >
                Start Intake
              </a>
            </div>

            <div className="rounded-3xl border border-[#e7dccb] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">SME Legal Helpdesk</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#625c52]">
                <li>• Labor and employee concerns</li>
                <li>• Contract review and drafting</li>
                <li>• Collections and demand letters</li>
                <li>• Supplier/customer disputes</li>
                <li>• Lease and permit concerns</li>
                <li>• Barangay/LGU documentation</li>
              </ul>
            </div>

            <div
              id="service-form"
              className="rounded-3xl border border-[#e7dccb] bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold">Request Legal Service</h2>
              <p className="mt-2 text-sm text-[#625c52]">
                Intake form placeholder. Formal submission workflow will be
                connected later.
              </p>

              <div className="mt-4 space-y-3">
                <input className="w-full rounded-2xl border border-[#e3d7c5] px-4 py-3 text-sm" placeholder="Name" />
                <input className="w-full rounded-2xl border border-[#e3d7c5] px-4 py-3 text-sm" placeholder="Mobile or email" />
                <input className="w-full rounded-2xl border border-[#e3d7c5] px-4 py-3 text-sm" placeholder="Company name, if SME" />
                <select className="w-full rounded-2xl border border-[#e3d7c5] px-4 py-3 text-sm">
                  <option>Concern type</option>
                  <option>Labor</option>
                  <option>OFW</option>
                  <option>SME contract</option>
                  <option>Collections</option>
                  <option>Lease</option>
                  <option>Cybercrime</option>
                  <option>Barangay/LGU</option>
                </select>
                <textarea className="h-28 w-full rounded-2xl border border-[#e3d7c5] px-4 py-3 text-sm" placeholder="Describe your legal concern" />
                <button className="w-full rounded-2xl bg-[#1f1f1f] px-5 py-3 text-sm font-bold text-white">
                  Submit Intake Placeholder
                </button>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-6 rounded-3xl border border-[#e7dccb] bg-white/70 p-4 text-xs leading-5 text-[#6f695f]">
          DMCV AskAbogado provides general legal information only and is not a
          substitute for legal advice from a licensed lawyer. Uses public legal education references such as BatasKo.com for source discovery and user guidance. No official partnership is claimed unless expressly stated.
        </footer>
      </section>
    </main>
  );
}




