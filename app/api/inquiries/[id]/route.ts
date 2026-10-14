import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { inquiries } from '@/db/schema';
import { isOwner } from '@/lib/owner';
import { isSameOrigin } from '@/lib/lead-validation';
import { z } from 'zod';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request) || !(await isOwner())) return Response.json({ error: 'Access denied.' }, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }
  const parsed = z.object({ status: z.enum(['new', 'contacted', 'closed']) }).safeParse(body);
  if (!parsed.success) return Response.json({ error: 'Invalid status.' }, { status: 400 });
  const { id } = await params;
  await getDb().update(inquiries).set({ status: parsed.data.status }).where(eq(inquiries.id, id));
  return Response.json({ ok: true });
}
