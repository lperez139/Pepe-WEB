import { NextResponse } from "next/server";

import { deliverLead, LeadValidationError, validateLeadInput } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadRequestBody {
  company?: unknown;
  consent?: unknown;
  details?: unknown;
  email?: unknown;
  name?: unknown;
  phone?: unknown;
  requestSummary?: unknown;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export async function POST(request: Request) {
  let body: LeadRequestBody;

  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return NextResponse.json({ error: "El cuerpo de la solicitud debe ser JSON valido." }, { status: 400 });
  }

  try {
    const lead = validateLeadInput({
      company: asString(body.company),
      consent: body.consent === true,
      details: asString(body.details),
      email: asString(body.email),
      name: asString(body.name),
      phone: asString(body.phone),
      requestSummary: asString(body.requestSummary),
    });

    const delivery = await deliverLead(lead);

    return NextResponse.json({
      delivered: delivery.delivered,
      failed: delivery.failed,
      ok: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No fue posible guardar el lead.";
    return NextResponse.json({ error: message }, { status: error instanceof LeadValidationError ? 400 : 500 });
  }
}
