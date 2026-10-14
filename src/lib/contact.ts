import { z } from 'zod';
import { projectMessage, type MarketingPlan } from './marketing-plans.ts';

export const services = ['Digital marketing', 'Website development', 'Graphic design', 'A complete growth solution', 'Help me choose'] as const;
export const budgets = ['Under ₹15,000', '₹15,000–₹30,000', '₹30,000–₹75,000', '₹75,000+', 'Let’s discuss'] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  company: z.string().trim().max(150).default(''),
  email: z.string().trim().email('Please enter a valid email.').max(254),
  phone: z.string().trim().max(24).refine(value => !value || /^[+()\d\s-]{7,24}$/.test(value), 'Please enter a valid phone number.').default(''),
  service: z.enum(services),
  budget: z.enum(budgets),
  message: z.string().trim().min(15, 'Tell us a little more (at least 15 characters).').max(2800),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree to be contacted about your project.' }) }),
  website: z.string().max(0).default(''),
});

export type EnquiryDraft = { body: string; emailUrl: string; whatsappUrl: string };

export function prepareEnquiry(input: unknown, selectedPlan: MarketingPlan | null = null):
  { ok: true; draft: EnquiryDraft } | { ok: false; error: string } {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message || 'Please check your project details.' };
  const data = parsed.data;
  const body = [
    'Hello Rao Social Blade,', '',
    `Name: ${data.name}`, ...(data.company ? [`Business: ${data.company}`] : []),
    `Email: ${data.email}`, ...(data.phone ? [`Phone: ${data.phone}`] : []),
    `Service: ${data.service}`, `Planned budget: ${data.budget}`, '',
    projectMessage(data.message, selectedPlan), '',
    'I agree to be contacted about this project.',
  ].join('\n');
  return { ok: true, draft: {
    body,
    emailUrl: `mailto:info@raosocialblade.com?subject=${encodeURIComponent('Project enquiry — ' + data.service)}&body=${encodeURIComponent(body)}`,
    whatsappUrl: `https://wa.me/918171833456?text=${encodeURIComponent(body)}`,
  } };
}
