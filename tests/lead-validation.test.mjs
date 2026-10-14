import test from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, isSameOrigin } from '../lib/lead-validation.ts';
const valid = { id: 'abdd5e08-660a-433f-9d9d-439c7d92c889', name: ' Test Person ', company: ' Example Business ', email: 'client@example.com', phone: '+91 98765 43210', service: 'Website development', budget: '₹15,000–₹30,000', message: 'I would like a business website with a contact form.', consent: true, website: '' };
test('valid project briefs are normalized and accepted', () => { const data=inquirySchema.parse(valid); assert.equal(data.name,'Test Person');assert.equal(data.company,'Example Business'); });
test('incomplete, invalid and automated requests are rejected', () => { for(const changes of [{name:' '},{email:'invalid'},{phone:'not a phone'},{service:'Unknown service'},{budget:'free'},{message:'short'},{consent:false},{website:'spam.example.com'},{id:'not-a-uuid'},{message:'x'.repeat(3001)}]) assert.equal(inquirySchema.safeParse({...valid,...changes}).success,false,JSON.stringify(changes)); });
test('optional contact fields can be omitted', () => { const {phone,company,...brief}=valid; const data=inquirySchema.parse(brief);assert.equal(data.phone,'');assert.equal(data.company,''); });
test('same-origin mutations reject foreign and missing origins', () => { const url='https://logical-india.example/api/inquiries';assert.ok(isSameOrigin(new Request(url,{headers:{Origin:'https://logical-india.example'}})));assert.equal(isSameOrigin(new Request(url,{headers:{Origin:'https://evil.example'}})),false);assert.equal(isSameOrigin(new Request(url)),false); });

import { marketingPlans, projectMessage } from '../lib/marketing-plans.ts';
test('selected plans retain their exact price in the saved enquiry message', () => {
 for(const plan of marketingPlans) {
  const message=projectMessage('x'.repeat(2800),plan);
  assert.ok(message.includes(plan.name));
  assert.ok(message.includes('₹'+plan.price.toLocaleString('en-IN')+'/month'));
  assert.ok(inquirySchema.safeParse({...valid,message}).success);
 }
 assert.equal(projectMessage(valid.message,null),valid.message);
});
