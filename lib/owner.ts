import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
export async function isOwner() {
  const user = await getChatGPTUser();
  const ownerEmail = (env as unknown as { OWNER_EMAIL?: string }).OWNER_EMAIL;
  return !!user && !!ownerEmail && user.email.toLowerCase() === ownerEmail.toLowerCase();
}
