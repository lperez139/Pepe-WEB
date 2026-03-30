import nodemailer from "nodemailer";
import { google } from "googleapis";

export type LeadInput = {
  company?: string;
  consent: boolean;
  details?: string;
  email: string;
  name: string;
  phone: string;
  requestSummary?: string;
};

type DeliveryChannel = "email" | "sheets";

export type LeadDeliveryResult = {
  delivered: DeliveryChannel[];
  failed: DeliveryChannel[];
};

export class LeadValidationError extends Error {}

function hasValue(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getLeadNotificationEmail(): string | null {
  const value = process.env.LEADS_NOTIFICATION_EMAIL?.trim();
  return value ? value : null;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();

  if (!host || !portRaw || !user || !pass || !from) {
    return null;
  }

  const port = Number(portRaw);

  if (!Number.isFinite(port)) {
    throw new Error("SMTP_PORT no es valido.");
  }

  return {
    auth: { user, pass },
    from,
    host,
    port,
    secure: process.env.SMTP_SECURE?.trim() === "true" || port === 465,
  };
}

function getGoogleSheetsConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Leads";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
    tabName,
  };
}

export function validateLeadInput(input: Partial<LeadInput>): LeadInput {
  const name = input.name?.trim() || "";
  const phone = input.phone?.trim() || "";
  const email = input.email?.trim() || "";
  const company = input.company?.trim() || "";
  const details = input.details?.trim() || "";
  const requestSummary = input.requestSummary?.trim() || "";
  const consent = input.consent === true;

  if (!name || name.length < 2) {
    throw new LeadValidationError("Debes ingresar un nombre valido.");
  }

  if (!phone || phone.length < 6) {
    throw new LeadValidationError("Debes ingresar un telefono valido.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new LeadValidationError("Debes ingresar un email valido.");
  }

  if (!consent) {
    throw new LeadValidationError("Debes autorizar el contacto para enviar la solicitud.");
  }

  return {
    company: company || undefined,
    consent,
    details: details || undefined,
    email,
    name,
    phone,
    requestSummary: requestSummary || undefined,
  };
}

function buildEmailHtml(lead: LeadInput): string {
  return `
    <h2>Nuevo lead desde chatbot</h2>
    <p><strong>Nombre:</strong> ${lead.name}</p>
    <p><strong>Telefono:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Empresa:</strong> ${lead.company ?? "-"}</p>
    <p><strong>Solicitud original:</strong> ${lead.requestSummary ?? "-"}</p>
    <p><strong>Detalle del proyecto:</strong></p>
    <p>${lead.details ?? "-"}</p>
    <p><strong>Consentimiento:</strong> ${lead.consent ? "Si" : "No"}</p>
    <p><strong>Origen:</strong> Website chatbot</p>
    <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
  `.trim();
}

function buildEmailText(lead: LeadInput): string {
  return [
    "Nuevo lead desde chatbot",
    `Nombre: ${lead.name}`,
    `Telefono: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Empresa: ${lead.company ?? "-"}`,
    `Solicitud original: ${lead.requestSummary ?? "-"}`,
    `Detalle del proyecto: ${lead.details ?? "-"}`,
    `Consentimiento: ${lead.consent ? "Si" : "No"}`,
    "Origen: Website chatbot",
    `Fecha: ${new Date().toISOString()}`,
  ].join("\n");
}

async function deliverLeadByEmail(lead: LeadInput): Promise<boolean> {
  const smtpConfig = getSmtpConfig();
  const notificationEmail = getLeadNotificationEmail();

  if (!smtpConfig || !notificationEmail) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: smtpConfig.auth,
  });

  await transporter.sendMail({
    from: smtpConfig.from,
    to: notificationEmail,
    subject: `Nuevo lead chatbot: ${lead.name}`,
    text: buildEmailText(lead),
    html: buildEmailHtml(lead),
    replyTo: lead.email,
  });

  return true;
}

async function deliverLeadToSheets(lead: LeadInput): Promise<boolean> {
  const sheetsConfig = getGoogleSheetsConfig();

  if (!sheetsConfig) {
    return false;
  }

  const auth = new google.auth.JWT({
    email: sheetsConfig.clientEmail,
    key: sheetsConfig.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetsConfig.spreadsheetId,
    range: `${sheetsConfig.tabName}!A:I`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          "website-chatbot",
          lead.name,
          lead.phone,
          lead.email,
          lead.company ?? "",
          lead.requestSummary ?? "",
          lead.details ?? "",
          lead.consent ? "Si" : "No",
        ],
      ],
    },
  });

  return true;
}

export async function deliverLead(lead: LeadInput): Promise<LeadDeliveryResult> {
  const delivered: DeliveryChannel[] = [];
  const failed: DeliveryChannel[] = [];

  try {
    const emailed = await deliverLeadByEmail(lead);
    if (emailed) {
      delivered.push("email");
    } else {
      failed.push("email");
    }
  } catch {
    failed.push("email");
  }

  try {
    const sheetSaved = await deliverLeadToSheets(lead);
    if (sheetSaved) {
      delivered.push("sheets");
    } else {
      failed.push("sheets");
    }
  } catch {
    failed.push("sheets");
  }

  if (delivered.length === 0) {
    const needsEmailConfig = !getSmtpConfig() || !hasValue(getLeadNotificationEmail() ?? undefined);
    const needsSheetConfig = !getGoogleSheetsConfig();
    const missingParts = [
      needsEmailConfig ? "email" : null,
      needsSheetConfig ? "google sheets" : null,
    ].filter(Boolean);

    throw new Error(
      missingParts.length > 0
        ? `Falta configurar ${missingParts.join(" y ")} para guardar leads.`
        : "No fue posible guardar el lead en email ni en Google Sheets.",
    );
  }

  return { delivered, failed };
}
