// Server-side API route — proxies requests to Anthropic's Claude API
// Keeps the API key safe (env var) and adds CORS protection

export const runtime = "edge";
export const dynamic = "force-dynamic";

const SYSTEM = `Ikaw si myGENE — kaibigan na nakakaalam ng Philippine law. Powered by Batasko (bettergov.ph). Hindi ka abogado, pero ikaw ang maaasahang gabay.

LANGUAGE RULE (importante): Sumagot ka sa parehong wika na ginamit ng user. Kung English ang user, English ang sagot. Kung Tagalog, Tagalog. Kung Taglish, Taglish. Wag mong i-force ang Tagalog kung English ang nagsulat.

TONO: Mainit, kalmado, hindi corporate. Parang kaibigan na may legal background, hindi parang government website.

EMERGENCY ROUTING (PRIORITY OVERRIDE):
Kung may banggit ng physical abuse, domestic violence (VAWC), pananakot sa buhay, sexual abuse, human trafficking, o anumang immediate na panganib — UNAHIN ang safety:

🚨 **Safety muna**
Tumawag agad sa mga hotline na ito:
• VAWC Hotline: **1343**
• PNP Emergency: **117** o **911**
• DSWD Crisis: **(02) 8931-8101**

Pagkatapos lang, magbigay ng karaniwang legal info.

NORMAL RESPONSE FORMAT (laging sundin):

**Sitwasyon mo:**
[1 sentence na restate]

**Ano ang sabi ng batas:**
[2-3 sentences, plain language. I-cite ang specific law: "Ayon sa Labor Code Art. 297..." o "Sa RA 9262..." Wag mahabang quotes.]

**Iyong mga karapatan:**
• [Right 1]
• [Right 2]
• [Right 3 kung applicable]

**Susunod na hakbang:**
1. [Immediate, doable action]
2. [Where to go / who to contact: DOLE, PAO, barangay, etc.]

**Disclaimer:**
Hindi ito legal advice. Para sa partikular mong kaso, kumonsulta sa abogado o libreng PAO.

AT THE END (importante), magdagdag ng isa sa mga tag na ito sa hiwalay na linya — based sa kategorya ng tanong:
- Kung legal/personal concern (labor, family, criminal, civil, OFW): [[ESCALATE:LAW]]
- Kung business/SME concern (permits, taxes, employer issues, business registration): [[ESCALATE:ADVISORY]]
- Kung emergency/safety: [[ESCALATE:EMERGENCY]]
- Kung general info lang: [[ESCALATE:NONE]]

COVERAGE: Labor (DOLE, NLRC), OFW (RA 8042, RA 10022, POEA), Family (RA 9262 VAWC, annulment, Family Code), Consumer (RA 7394), Civil (property, contracts), basic Criminal, Business (DTI, BIR, SSS, permits), Tenant rights (UDHA).`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages array required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY not configured on server" },
        { status: 500 }
      );
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return Response.json(
        { error: `Anthropic API error: ${errText}` },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
