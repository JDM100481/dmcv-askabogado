"use client";

import { useState, useRef, useEffect } from "react";

// ════════════════════════════════════════════════════════════════════════════
// myGENE × Batasko — Refined Light Theme
// "Huwag matakot sa inyong karapatan"
// ════════════════════════════════════════════════════════════════════════════

const C = {
  bg: "#fdfaf3",
  surface: "#ffffff",
  surfaceWarm: "#fbf6ea",
  ink: "#2a2620",
  inkSoft: "#5a544a",
  inkFaint: "#9a9388",
  gold: "#c8a04b",
  goldSoft: "#fbf0d4",
  goldBorder: "rgba(200,160,75,0.25)",
  green: "#3a7d5a",
  greenSoft: "#e8f3ec",
  greenBorder: "rgba(58,125,90,0.22)",
  red: "#a83838",
  redSoft: "#f7e8e8",
  redBorder: "rgba(168,56,56,0.22)",
  line: "rgba(42,38,32,0.08)",
  lineHi: "rgba(42,38,32,0.14)",
  emergency: "#c0392b",
};

const SUGGESTIONS = [
  { icon: "💼", text: "Tinanggal ako sa trabaho nang walang abiso. May karapatan ba ako?" },
  { icon: "💸", text: "Hindi binabayaran ang sahod ko. Saan ako pupunta?" },
  { icon: "✈️", text: "OFW ako. Nagsasamantala ang employer ko sa abroad." },
  { icon: "🏪", text: "May maliit akong negosyo. Anong permits at taxes ang kailangan ko?" },
  { icon: "🏠", text: "Pinapaalis kami ng landlord nang walang notice. Pwede ba 'yan?" },
];

const Avatar = ({ size = 80, animated = false }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
    <defs>
      <radialGradient id="aGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbe8b8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#fbe8b8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="aFace" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fff5dc" />
        <stop offset="100%" stopColor="#f5e3b0" />
      </linearGradient>
    </defs>
    {animated && (
      <circle cx="100" cy="100" r="95" fill="url(#aGlow)">
        <animate attributeName="r" values="90;98;90" dur="3s" repeatCount="indefinite" />
      </circle>
    )}
    <circle cx="100" cy="108" r="54" fill="url(#aFace)" stroke="#c8a04b" strokeWidth="2" />
    <path d="M48 92 Q48 60 100 56 Q152 60 152 92 Q140 80 100 78 Q60 80 48 92" fill="#3a2818" />
    <ellipse cx="100" cy="58" rx="50" ry="6" fill="#1a1410" />
    <rect x="55" y="50" width="90" height="10" rx="2" fill="#2a1f18" />
    <line x1="142" y1="55" x2="160" y2="42" stroke="#c8a04b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="162" cy="40" r="4" fill="#c8a04b" />
    <path d="M76 104 Q82 98 88 104" stroke="#2a1f18" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M112 104 Q118 98 124 104" stroke="#2a1f18" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="72" cy="120" r="6" fill="#f4a89e" opacity="0.45" />
    <circle cx="128" cy="120" r="6" fill="#f4a89e" opacity="0.45" />
    <path d="M84 128 Q100 142 116 128" stroke="#2a1f18" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M44 200 Q44 168 70 158 L130 158 Q156 168 156 200 Z" fill="#2a4d3a" opacity="0.9" />
    <path d="M82 158 L100 174 L118 158 L114 200 L100 200 L86 200 Z" fill="#fbf6ea" />
  </svg>
);

const QR_URLS = {
  law: "https://batasko.com/ask-abogado?ref=dmcv-law",
  advisory: "https://batasko.com/ask-advisory?ref=dmcv-advisory",
};
const qrImg = (url) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&bgcolor=fdfaf3&color=2a2620&qzone=2`;

const EscalateSheet = ({ category, onClose }) => {
  const showLaw = category === "law" || category === "both" || category === "emergency";
  const showAdv = category === "advisory" || category === "both";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(42,38,32,0.4)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 100, animation: "fadeIn 0.2s ease", backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bg, borderRadius: "20px 20px 0 0",
          maxWidth: 480, width: "100%", padding: "24px 20px 28px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <div style={{ width: 40, height: 4, background: C.lineHi, borderRadius: 2, margin: "0 auto 18px" }} />
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: C.ink, marginBottom: 4 }}>
            Kailangan mo ng tulong?
          </div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>Pumili ng pinaka-angkop sa iyong sitwasyon.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: showLaw && showAdv ? "1fr 1fr" : "1fr", gap: 12 }}>
          {showLaw && (
            <div style={{ background: C.redSoft, border: `1px solid ${C.redBorder}`, borderRadius: 16, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.red, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>For Legal Concerns</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 4 }}>DMCV Law</div>
              <div style={{ fontSize: 11, color: C.inkSoft, lineHeight: 1.5, marginBottom: 14 }}>Labor, family, criminal, OFW, civil cases</div>
              <div style={{ background: C.bg, padding: 6, borderRadius: 10, display: "inline-block", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <img src={qrImg(QR_URLS.law)} width="140" height="140" alt="DMCV Law QR" style={{ display: "block", borderRadius: 6 }} />
              </div>
              <div style={{ fontSize: 10, color: C.inkFaint, marginTop: 10, fontFamily: "monospace" }}>Ask Abogado · ref:dmcv-law</div>
              <a href={QR_URLS.law} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 12, background: C.red, color: "#fff", textDecoration: "none", padding: "9px", borderRadius: 9, fontSize: 12, fontWeight: 600 }}>Open Link →</a>
            </div>
          )}
          {showAdv && (
            <div style={{ background: C.greenSoft, border: `1px solid ${C.greenBorder}`, borderRadius: 16, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.green, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>For SME / Business</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 4 }}>DMCV Advisory</div>
              <div style={{ fontSize: 11, color: C.inkSoft, lineHeight: 1.5, marginBottom: 14 }}>Permits, taxes, compliance, business setup</div>
              <div style={{ background: C.bg, padding: 6, borderRadius: 10, display: "inline-block", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <img src={qrImg(QR_URLS.advisory)} width="140" height="140" alt="DMCV Advisory QR" style={{ display: "block", borderRadius: 6 }} />
              </div>
              <div style={{ fontSize: 10, color: C.inkFaint, marginTop: 10, fontFamily: "monospace" }}>Ask Advisory · ref:dmcv-advisory</div>
              <a href={QR_URLS.advisory} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 12, background: C.green, color: "#fff", textDecoration: "none", padding: "9px", borderRadius: 9, fontSize: 12, fontWeight: 600 }}>Open Link →</a>
            </div>
          )}
        </div>

        <button onClick={onClose} style={{ width: "100%", marginTop: 18, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px", color: C.inkSoft, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          Magpatuloy sa pag-uusap kay myGENE
        </button>
      </div>
    </div>
  );
};

const EmergencyBanner = ({ onClose }) => (
  <div style={{ background: C.emergency, color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
    <div style={{ fontSize: 12, lineHeight: 1.5 }}>
      <strong>🚨 Emergency:</strong>{" "}
      <a href="tel:1343" style={{ color: "#ffd6d6" }}>VAWC 1343</a> ·{" "}
      <a href="tel:117" style={{ color: "#ffd6d6" }}>PNP 117</a> ·{" "}
      <a href="tel:911" style={{ color: "#ffd6d6" }}>911</a>
    </div>
    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 6, padding: "4px 10px", color: "#fff", cursor: "pointer", fontSize: 11 }}>×</button>
  </div>
);

const Toast = ({ message }) => (
  <div style={{ position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", background: C.ink, color: C.bg, padding: "10px 20px", borderRadius: 22, fontSize: 13, fontWeight: 500, zIndex: 200, boxShadow: "0 6px 24px rgba(0,0,0,0.2)", animation: "popIn 0.25s ease" }}>
    {message}
  </div>
);

const formatMsg = (text) => {
  const clean = text.replace(/\[\[ESCALATE:[^\]]+\]\]/g, "").trim();
  const lines = clean.split("\n");

  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith(":**")) {
      return <div key={i} style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 13, color: C.gold, letterSpacing: "0.02em", marginTop: i > 0 ? 14 : 0, marginBottom: 4 }}>{line.replace(/\*\*/g, "")}</div>;
    }
    if (line.startsWith("**") && line.includes(":**")) {
      const ci = line.indexOf(":**");
      return <div key={i} style={{ marginTop: i > 0 ? 10 : 0 }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.gold, fontSize: 13 }}>{line.slice(2, ci)}:</span>
        <span style={{ color: C.ink, fontSize: 14 }}> {line.slice(ci + 3)}</span>
      </div>;
    }
    if (line.startsWith("• ") || line.startsWith("- ")) {
      return <div key={i} style={{ display: "flex", gap: 8, marginTop: 4, paddingLeft: 4 }}>
        <span style={{ color: C.gold, flexShrink: 0, fontSize: 12, marginTop: 4 }}>◆</span>
        <span style={{ color: C.ink, fontSize: 14, lineHeight: 1.65 }}>{line.slice(2)}</span>
      </div>;
    }
    if (/^\d+\./.test(line)) {
      const n = line.match(/^\d+/)[0];
      return <div key={i} style={{ display: "flex", gap: 8, marginTop: 4, paddingLeft: 4 }}>
        <span style={{ color: C.gold, fontWeight: 700, flexShrink: 0, fontSize: 12, marginTop: 2 }}>{n}.</span>
        <span style={{ color: C.ink, fontSize: 14, lineHeight: 1.65 }}>{line.replace(/^\d+\.\s*/, "")}</span>
      </div>;
    }
    if (line.includes("Hindi ito legal advice") || line.includes("not legal advice")) {
      return <div key={i} style={{ fontSize: 11, color: C.inkFaint, fontStyle: "italic", marginTop: 12, lineHeight: 1.6, paddingTop: 10, borderTop: `1px solid ${C.line}` }}>{line}</div>;
    }
    if (line.startsWith("🚨")) {
      return <div key={i} style={{ background: C.redSoft, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "10px 12px", marginTop: 6, fontWeight: 600, color: C.red, fontSize: 13 }}>{line}</div>;
    }
    if (line.trim() === "") return <div key={i} style={{ height: 6 }} />;
    return <div key={i} style={{ color: C.ink, fontSize: 14, lineHeight: 1.7, marginTop: 2 }}>{line}</div>;
  });
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalate, setEscalate] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [toast, setToast] = useState(null);
  const [savedToMyChat, setSavedToMyChat] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const started = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const send = async (text) => {
    const t = text || input.trim();
    if (!t || loading) return;
    setInput("");
    const msgs = [...messages, { role: "user", content: t }];
    setMessages(msgs);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data.content?.find((b) => b.type === "text")?.text ||
        "Paumanhin, may nangyaring mali. Subukan ulit po.";

      const tag = reply.match(/\[\[ESCALATE:(LAW|ADVISORY|EMERGENCY|NONE)\]\]/);
      const cat = tag ? tag[1].toLowerCase() : "none";

      setMessages([...msgs, { role: "assistant", content: reply, category: cat }]);
      if (cat === "emergency") setShowEmergency(true);
    } catch (e) {
      setMessages([
        ...msgs,
        { role: "assistant", content: `Hindi makakonekta. ${e.message ? `(${e.message})` : ""} Pakisubukan muli.` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const saveToMyChat = () => {
    setSavedToMyChat(true);
    showToast("✓ Na-save sa myCHAT history mo");
  };

  const reset = () => {
    setMessages([]);
    setShowEmergency(false);
    setSavedToMyChat(false);
  };

  return (
    <div style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif", color: C.ink, overflow: "hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: ${C.bg}; }
        textarea { outline: none; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.lineHi}; border-radius: 4px; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes popIn { from{opacity:0;transform:translate(-50%, 8px) scale(0.95)} to{opacity:1;transform:translate(-50%, 0) scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .suggestion:hover { background: ${C.goldSoft} !important; border-color: ${C.goldBorder} !important; transform: translateY(-1px); }
      `}</style>

      {/* Header */}
      <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.line}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {started ? (
            <button onClick={reset} style={{ background: "transparent", border: "none", color: C.inkSoft, fontSize: 18, cursor: "pointer", padding: "4px 8px", display: "flex", alignItems: "center" }}>←</button>
          ) : (
            <Avatar size={32} />
          )}
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 16, color: C.ink, letterSpacing: "-0.01em" }}>myGENE</div>
            <div style={{ fontSize: 10, color: C.inkFaint, letterSpacing: "0.06em" }}>Powered by Batasko · bettergov.ph</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {started && (
            <button onClick={saveToMyChat} disabled={savedToMyChat} style={{ background: savedToMyChat ? C.greenSoft : C.surface, border: `1px solid ${savedToMyChat ? C.greenBorder : C.line}`, borderRadius: 8, padding: "5px 11px", color: savedToMyChat ? C.green : C.inkSoft, fontSize: 11, cursor: savedToMyChat ? "default" : "pointer", fontWeight: 500 }}>
              {savedToMyChat ? "✓ Saved" : "💾 Save to myCHAT"}
            </button>
          )}
          <button onClick={() => setShowEmergency(true)} title="Emergency hotlines" style={{ background: C.redSoft, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "5px 10px", color: C.red, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>🚨 SOS</button>
        </div>
      </div>

      {showEmergency && <EmergencyBanner onClose={() => setShowEmergency(false)} />}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {!started ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 22px 40px", animation: "fadeUp 0.5s ease" }}>
            <Avatar size={140} animated />
            <div style={{ textAlign: "center", marginTop: 14, marginBottom: 36, maxWidth: 420 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 6vw, 36px)", fontWeight: 600, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.015em" }}>
                Huwag matakot sa inyong karapatan.
              </div>
              <p style={{ color: C.inkSoft, fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
                Itanong mo lang. Sasagutin kita sa simpleng salita — libre, walang judgement.
              </p>
            </div>

            <div style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 8 }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="suggestion" onClick={() => send(s.text)} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "flex-start", transition: "all 0.15s", fontFamily: "inherit", animation: `fadeUp 0.4s ease ${0.1 + i * 0.05}s both` }}>
                  <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{s.icon}</span>
                  <span style={{ color: C.ink, fontSize: 14, lineHeight: 1.5, flex: 1 }}>{s.text}</span>
                  <span style={{ color: C.inkFaint, fontSize: 16, flexShrink: 0 }}>→</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 11, color: C.inkFaint, textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
              o i-type ang sarili mong tanong sa ibaba ↓
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 18, animation: "fadeUp 0.3s ease" }}>
                {m.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                    <div style={{ background: C.gold, color: C.bg, borderRadius: "16px 16px 4px 16px", padding: "10px 14px", maxWidth: "82%", fontSize: 14, lineHeight: 1.5 }}>{m.content}</div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.surfaceWarm, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>👤</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Avatar size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: "4px 16px 16px 16px", padding: "14px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                        {formatMsg(m.content)}
                      </div>
                      {m.category && m.category !== "none" && (
                        <button onClick={() => setEscalate(m.category === "emergency" ? "law" : m.category)} style={{ marginTop: 8, background: m.category === "advisory" ? C.greenSoft : C.redSoft, border: `1px solid ${m.category === "advisory" ? C.greenBorder : C.redBorder}`, borderRadius: 10, padding: "9px 14px", cursor: "pointer", color: m.category === "advisory" ? C.green : C.red, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}>
                          {m.category === "advisory" ? "🏪 Tanungin ang DMCV Advisory" : "⚖️ Kumonsulta sa DMCV Law"}
                          <span style={{ marginLeft: "auto", fontSize: 14 }}>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                <Avatar size={36} animated />
                <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: "4px 16px 16px 16px", padding: "14px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, animation: `bounce 0.9s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${C.line}`, background: C.bg, flexShrink: 0 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.lineHi}`, borderRadius: 16, display: "flex", alignItems: "flex-end", gap: 8, padding: "8px 8px 8px 16px", boxShadow: "0 2px 12px rgba(42,38,32,0.04)" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={started ? "Magpatuloy sa pag-uusap..." : "Itanong ang sitwasyon mo..."}
              style={{ flex: 1, background: "transparent", border: "none", color: C.ink, fontSize: 14, fontFamily: "inherit", resize: "none", minHeight: 24, maxHeight: 120, lineHeight: 1.6, padding: "8px 0" }}
            />
            <button onClick={() => send()} disabled={!input.trim() || loading} style={{ background: input.trim() && !loading ? C.gold : C.line, border: "none", borderRadius: 10, width: 38, height: 38, cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
              <span style={{ color: input.trim() && !loading ? C.bg : C.inkFaint, fontSize: 16, fontWeight: 700 }}>↑</span>
            </button>
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: C.inkFaint, marginTop: 6 }}>
            Hindi legal advice · myGENE × Batasko · DMCV Law × DMCV Advisory
          </div>
        </div>
      </div>

      {escalate && <EscalateSheet category={escalate} onClose={() => setEscalate(null)} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}
