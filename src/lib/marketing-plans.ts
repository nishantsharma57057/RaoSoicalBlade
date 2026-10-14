export const marketingPlans = [
  { name: 'Basic Boost', price: 11000, description: 'For startups and small businesses establishing their online presence.', features: ['Basic SEO Audit', 'Social Media Profile Setup', 'Monthly Content Idea Generation', 'Email Support'], budget: 'Under ₹15,000', featured: false },
  { name: 'Standard Growth', price: 25000, description: 'For growing businesses building engagement and traffic.', features: ['Comprehensive SEO Strategy', 'Weekly Social Media Posts', 'Blog Post Writing (2/month)', 'Monthly Performance Report', 'Priority Email & Chat Support'], budget: '₹15,000–₹30,000', featured: true },
  { name: 'Premium Domination', price: 50000, description: 'For established businesses investing in a wider digital presence.', features: ['Advanced SEO & PPC Campaigns', 'Daily Social Media Management', 'Premium Content Creation (4/month)', 'Dedicated Account Manager', '24/7 Phone & Email Support'], budget: '₹30,000–₹75,000', featured: false },
] as const;
export type MarketingPlan = typeof marketingPlans[number];
export function planLabel(plan: MarketingPlan) {
  return `${plan.name} — ₹${plan.price.toLocaleString('en-IN')}/month`;
}
export function projectMessage(message: string, selectedPlan: MarketingPlan | null) {
  return selectedPlan ? `Selected marketing plan: ${planLabel(selectedPlan)}\n\n${message}` : message;
}
