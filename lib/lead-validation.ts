import { z } from 'zod';
export const services = ['Digital marketing', 'Website development', 'Graphic design', 'A complete growth solution', 'Help me choose'] as const;
export const budgets = ['Under ₹15,000', '₹15,000–₹30,000', '₹30,000–₹75,000', '₹75,000+', 'Let’s discuss'] as const;
export const inquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  company: z.string().trim().max(150).default(''),
  email: z.string().trim().email('Please enter a valid email.').max(254),
  phone: z.string().trim().max(24).refine(v => !v || /^[+()\d\s-]{7,24}$/.test(v), 'Please enter a valid phone number.').default(''),
  service: z.enum(services), budget: z.enum(budgets),
  message: z.string().trim().min(15, 'Tell us a little more (at least 15 characters).').max(3000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree to be contacted about your project.' }) }),
  website: z.string().max(0).default(''),
});
export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}
