import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { inquiries } from '@/db/schema';
import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { isOwner } from '@/lib/owner';
import Inbox from './inbox';
export const dynamic = 'force-dynamic';
export default async function InquiriesPage() {
  await requireChatGPTUser('/inquiries');
  if(!(await isOwner())) return <main className="owner-denied"><h1>Owner access required</h1><p>This inbox is only available to the raosocialblade.com site owner.</p><a className="button" href="/">Return to website</a></main>;
  const rows=await getDb().select({ id: inquiries.id, name: inquiries.name, company: inquiries.company, email: inquiries.email, phone: inquiries.phone, service: inquiries.service, budget: inquiries.budget, message: inquiries.message, status: inquiries.status, createdAt: inquiries.createdAt }).from(inquiries).orderBy(desc(inquiries.createdAt)).limit(1000);
  return <Inbox initial={rows}/>;
}
