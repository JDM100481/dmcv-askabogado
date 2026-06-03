const guides = [
  {
    keywords: ["tinanggal", "tanggal", "trabaho", "termination", "fired", "walang abiso", "employee"],
    answer: {
      title: "Tinanggal sa trabaho nang walang abiso",
      simple: "Maaaring may karapatan ka kung tinanggal ka sa trabaho nang walang sapat na dahilan o tamang proseso.",
      law: "Sa Philippine labor law, karaniwang kailangan ang valid cause at due process bago tanggalin ang empleyado.",
      steps: [
        "Isulat ang timeline ng nangyari.",
        "I-save ang employment contract, payslips, messages, memo, at termination notice kung meron.",
        "Humingi ng written explanation mula sa employer.",
        "Kung hindi maayos, lumapit sa DOLE/NLRC o kumonsulta sa abogado."
      ],
      docs: ["Employment contract", "Payslips", "Company ID", "Messages/emails", "Termination notice or memo"],
      service: "Request legal service if you need a demand letter, NLRC complaint preparation, settlement support, or representation."
    }
  },
  {
    keywords: ["ofw", "abroad", "employer", "nagsasamantala", "agency", "recruitment"],
    answer: {
      title: "OFW concern / employer abuse abroad",
      simple: "Kung OFW ka at inaabuso o pinagsasamantalahan ng employer, mahalagang i-document agad ang nangyayari at humingi ng tulong sa tamang ahensya.",
      law: "Maaaring sakop ito ng employment contract, migrant worker protection rules, at assistance mechanisms ng DMW/OWWA/Philippine Embassy or Consulate.",
      steps: [
        "I-save ang contract, messages, payslips, passport/visa details, at agency information.",
        "Makipag-ugnayan sa recruitment agency kung meron.",
        "Contact DMW, OWWA, or Philippine Embassy/Consulate.",
        "Kung may banta sa kaligtasan, humingi agad ng emergency assistance."
      ],
      docs: ["OFW contract", "Passport/visa copy", "Agency details", "Employer details", "Screenshots/messages", "Payslips"],
      service: "Request legal service if you need formal documentation, agency complaint support, or coordination with counsel."
    }
  },
  {
    keywords: ["kontrata", "contract", "sme", "business", "review", "agreement"],
    answer: {
      title: "SME contract review",
      simple: "Kung may kontrata ang negosyo mo, magandang ipa-review bago pumirma para malinaw ang obligations, payment terms, penalties, termination, at dispute process.",
      law: "Contracts are generally binding if validly entered into, but risky clauses can create future liability.",
      steps: [
        "Ihanda ang full copy ng contract.",
        "Markahan ang clauses na hindi malinaw.",
        "Ilista ang commercial terms: presyo, delivery, payment, penalties, renewal, cancellation.",
        "Mag-request ng legal review bago pumirma."
      ],
      docs: ["Draft contract", "Business registration", "Proposal/quotation", "Email negotiations", "Supplier/customer details"],
      service: "Request legal service for contract review, contract drafting, or risk memo for your SME."
    }
  },
  {
    keywords: ["hindi nagbabayad", "collection", "collections", "utang", "supplier", "customer", "demand letter"],
    answer: {
      title: "Customer or supplier not paying",
      simple: "Kung may hindi nagbabayad, unahin ang documentation, statement of account, at written demand bago lumala ang dispute.",
      law: "Collection disputes often depend on contract terms, invoices, proof of delivery, and written acknowledgment of debt.",
      steps: [
        "Ihanda ang invoices, delivery receipts, SOA, at proof of acceptance.",
        "Send a polite written reminder.",
        "If unpaid, prepare a formal demand letter.",
        "Consider settlement, barangay process if applicable, or legal action."
      ],
      docs: ["Invoices", "Statement of account", "Delivery receipts", "Purchase orders", "Acknowledgment messages", "Contract"],
      service: "Request legal service if you need a demand letter, settlement agreement, or collection case evaluation."
    }
  },
  {
    keywords: ["upa", "renta", "tenant", "landlord", "pinaalis", "evict", "lease"],
    answer: {
      title: "Tenant / lease concern",
      simple: "Hindi dapat basta-basta pinapaalis ang tenant nang walang tamang abiso o legal na proseso.",
      law: "Lease rights depend on the lease contract, payment status, notices, and applicable rental laws or local rules.",
      steps: [
        "Check your lease contract.",
        "Save payment records and notices.",
        "Ask for written explanation from the landlord.",
        "Seek legal help if there is harassment, lockout, or forced eviction."
      ],
      docs: ["Lease contract", "Receipts", "Notices", "Messages with landlord", "Photos/videos if there is harassment"],
      service: "Request legal service for lease review, demand letter, or eviction defense support."
    }
  },
  {
    keywords: ["cyber", "online", "paninira", "defamation", "libel", "post", "facebook", "harassment"],
    answer: {
      title: "Online paninira / cyber concern",
      simple: "Kung may paninira, harassment, or harmful post online, i-save agad ang ebidensya bago ito burahin.",
      law: "Possible issues may involve cyber libel, harassment, privacy violations, or other cybercrime-related concerns depending on facts.",
      steps: [
        "Screenshot the post including date, account name, and URL.",
        "Do not engage emotionally online.",
        "Prepare a written timeline.",
        "Consult a lawyer or report to proper authorities if serious."
      ],
      docs: ["Screenshots", "URLs", "Profile links", "Messages", "Witnesses", "Timeline"],
      service: "Request legal service for evidence review, takedown letter, complaint preparation, or legal strategy."
    }
  }
];

function formatAnswer(item) {
  return `
**${item.title}**

**Simple answer:**  
${item.simple}

**Possible applicable right/law:**  
${item.law}

**Practical next steps:**  
${item.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Documents to prepare:**  
${item.docs.map((d) => `- ${d}`).join("\n")}

**When to request legal service:**  
${item.service}

**Disclaimer:**  
This provides general legal information only and is not a substitute for legal advice from a licensed lawyer.
`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const message = String(body.message || "").toLowerCase();

    const matched = guides.find((g) =>
      g.keywords.some((keyword) => message.includes(keyword.toLowerCase()))
    );

    const answer = matched
      ? formatAnswer(matched.answer)
      : `
**General legal information**

Salamat. Para masagot nang mas maayos, kailangan malaman ang basic facts: ano ang nangyari, kailan nangyari, sino ang involved, may kontrata ba, may written notice ba, at may documents ka ba?

**Practical next steps:**  
1. Isulat ang timeline.  
2. I-save ang documents, messages, receipts, photos, or notices.  
3. Tukuyin kung personal, labor, SME, lease, cybercrime, OFW, or barangay/LGU issue ito.  
4. If action is needed, use AskAbogado QR as your legal intake gateway.

**AskAbogado QR Solution:**  
If legal service or SME legal support is needed, AskAbogado QR is the solution. It allows users or businesses to start a structured legal intake in one scan.

**Disclaimer:**  
This provides general legal information only and is not a substitute for legal advice from a licensed lawyer.
`;

    return Response.json({ reply: answer });
  } catch (error) {
    return Response.json(
      {
        reply:
          "Hindi makapagproseso ngayon. Pakisubukan muli. General legal information only, not legal advice."
      },
      { status: 200 }
    );
  }
}

