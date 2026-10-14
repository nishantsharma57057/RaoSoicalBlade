import { and, eq, gte, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import { inquiries } from '@/db/schema';
import { inquirySchema, isSameOrigin } from '@/lib/lead-validation';
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: 'This request could not be verified. Please try again from the website.' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) return Response.json({ error: 'Unsupported request.' }, { status: 415 });
  if (Number(request.headers.get('content-length') || 0) > 12000) return Response.json({ error: 'Your message is too long.' }, { status: 413 });
  try {
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ error: 'Your message is too long.' }, { status: 413 });
    let body: unknown;
    try { body = JSON.parse(raw); } catch { return Response.json({ error: 'Please check the form and try again.' }, { status: 400 }); }
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
    const data = parsed.data;
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${new URL(request.url).hostname}:${request.headers.get('cf-connecting-ip') || 'unknown'}`));
    const sourceHash = Array.from(new Uint8Array(digest)).map(n => n.toString(16).padStart(2, '0')).join('');
    const db = getDb();
    const existing = await db.select({ id: inquiries.id, sourceHash: inquiries.sourceHash }).from(inquiries).where(eq(inquiries.id, data.id)).get();
    if (existing) return existing.sourceHash === sourceHash ? Response.json({ id: existing.id }) : Response.json({ error: 'Please refresh the page and try again.' }, { status: 409 });
    const since = new Date(Date.now() - 3600000).toISOString();
    const count = await db.select({ total: sql<number>`count(*)` }).from(inquiries).where(and(eq(inquiries.sourceHash, sourceHash), gte(inquiries.createdAt, since))).get();
    if ((count?.total || 0) >= 10) return Response.json({ error: 'You’ve sent several requests. Please try again in an hour.' }, { status: 429 });
    await db.insert(inquiries).values({ id: data.id, name: data.name, company: data.company, email: data.email, phone: data.phone, service: data.service, budget: data.budget, message: data.message, sourceHash, createdAt: new Date().toISOString() });
    return Response.json({ id: data.id }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'We couldn’t save your request right now. Your details are still here — please try again.' }, { status: 503 });
  }
}
