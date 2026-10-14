import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareEnquiry } from '../src/lib/contact.ts';
import { marketingPlans } from '../src/lib/marketing-plans.ts';

const brief = { name: '  Nishant Sharma  ', company: 'Rao & Co', email: 'client@example.com', phone: '+91 98765 43210', service: 'Digital marketing', budget: '₹15,000–₹30,000', message: 'I need SEO & campaign design. मेरा business Agra में है.', consent: true, website: '' };

test('email and WhatsApp drafts preserve the full brief and selected monthly plan', () => {
  const result = prepareEnquiry(brief, marketingPlans[1]);
  assert.equal(result.ok, true);
  const email = new URL(result.draft.emailUrl);
  const whatsapp = new URL(result.draft.whatsappUrl);
  assert.equal(email.protocol, 'mailto:');
  assert.equal(email.pathname, 'info@raosocialblade.com');
  assert.equal(whatsapp.origin, 'https://wa.me');
  assert.equal(whatsapp.pathname, '/918171833456');
  assert.equal(email.searchParams.get('body'), result.draft.body);
  assert.equal(whatsapp.searchParams.get('text'), result.draft.body);
  assert.match(result.draft.body, /Name: Nishant Sharma\n/);
  assert.match(result.draft.body, /Standard Growth — ₹25,000\/month/);
  assert.ok(result.draft.body.includes(brief.message));
  assert.ok(result.draft.body.includes(brief.email));
});

test('invalid briefs, unapproved contact and automated entries produce no outgoing links', () => {
  for (const patch of [{ consent: false }, { email: 'invalid' }, { service: 'unknown' }, { budget: '' }, { message: 'too short' }, { website: 'spam.example' }, { phone: 'letters' }, { name: ' ' }]) {
    const result = prepareEnquiry({ ...brief, ...patch });
    assert.equal(result.ok, false);
    assert.equal(result.draft, undefined);
  }
});

test('optional business and phone fields can be omitted', () => {
  const { company, phone, ...minimal } = brief;
  const result = prepareEnquiry(minimal);
  assert.equal(result.ok, true);
  assert.doesNotMatch(result.draft.body, /Business:|Phone:|Selected marketing plan:/);
});
