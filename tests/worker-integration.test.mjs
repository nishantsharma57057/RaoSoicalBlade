import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { marketingPlans, projectMessage } from '../lib/marketing-plans.ts';
const mfPackage = readdirSync('node_modules/.pnpm').find(name => name.startsWith('miniflare@'));
const { Miniflare } = await import(resolve('node_modules/.pnpm',mfPackage,'node_modules/miniflare/dist/src/index.js'));
const origin = 'https://logical-india.test';
const lead = { id: '54b16091-fda6-4d5c-ad47-763b544875be', name: 'QA Test Client', company: 'Validation Only', email: 'qa@example.com', phone: '+91 98765 43210', service: 'Website development', budget: '₹15,000–₹30,000', message: projectMessage('I need a digital marketing campaign for my business.', marketingPlans[1]), consent: true, website: '' };
test('built website, lead persistence and owner authorization work together', {timeout:60000}, async () => {
 const modulePaths = readdirSync('dist/server', { recursive: true }).filter(name => name.endsWith('.js') && name !== 'index.js');
 const modules = ['index.js', ...modulePaths].map(name => ({ type: 'ESModule', path: resolve('dist/server', name) }));
 const mf = new Miniflare({ modules, modulesRoot: resolve('dist/server'), compatibilityDate:'2026-05-15', compatibilityFlags:['nodejs_compat'], d1Databases:['DB'], bindings:{OWNER_EMAIL:'owner@example.com'}, log: undefined });
 try {
  const db=await mf.getD1Database('DB');
  for(const statement of readFileSync('drizzle/0000_redundant_taskmaster.sql','utf8').split(';').map(s=>s.trim()).filter(Boolean)) await db.prepare(statement).run();
  const request=(path,options={})=>mf.dispatchFetch(origin+path,options);
  const post=(body,other={})=>request('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'CF-Connecting-IP':'192.0.2.1',...other},body:JSON.stringify(body)});
  let res=await request('/');assert.equal(res.status,200);const html=await res.text();assert.match(html,/BOOST NOW/);assert.match(html,/Tell us what/);assert.match(html,/Digital marketing/);assert.match(html,/noindex/);assert.match(html,/Pause moving text/);assert.match(html,/Monthly marketing/);assert.match(html,/Basic Boost/);assert.match(html,/Standard Growth/);assert.match(html,/Premium Domination/);assert.match(html,/₹(?:<!-- -->)?11,000/);assert.match(html,/₹(?:<!-- -->)?25,000/);assert.match(html,/₹(?:<!-- -->)?50,000/);assert.match(html,/mailto:info@raosocialblade.com/);assert.match(html,/tel:\+918171833456/);assert.match(html,/tel:\+918449747951/);assert.match(html,/Technical SEO services/);
  const renderedImages=[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1]);
  assert.ok(renderedImages.length>=20,'campaign images must render in the page');
  for(const src of renderedImages) {
   assert.match(src,/^data:image\/(?:png|jpeg);base64,/,'images must not depend on separately authenticated asset requests');
   const bytes=Buffer.from(src.split(',')[1],'base64');
   assert.ok(bytes.length>100,'embedded image must contain actual bytes');
   assert.ok(bytes.subarray(0,4).equals(Buffer.from([137,80,78,71])) || bytes.subarray(0,2).equals(Buffer.from([255,216])),'embedded image must have a valid signature');
  }
  assert.match(html,/<image[^>]*href="data:image\/png;base64,/,'logo must also render without an external image request');
  res=await post({...lead,consent:false});assert.equal(res.status,400);
  res=await post(lead,{Origin:'https://other.test'});assert.equal(res.status,403);
  res=await post({...lead,website:'spam.test'});assert.equal(res.status,400);
  res=await post(lead);assert.equal(res.status,201);assert.equal((await res.json()).id,lead.id);
  const row=await db.prepare('SELECT * FROM inquiries WHERE id=?').bind(lead.id).first();assert.equal(row.name,lead.name);assert.equal(row.email,lead.email);assert.equal(row.message,lead.message);assert.match(row.message,/Standard Growth — ₹25,000\/month/);assert.equal(row.status,'new');assert.equal(row.source_hash.length,64);
  res=await post(lead);assert.equal(res.status,200);assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM inquiries').first()).n,1);
  res=await request('/inquiries',{redirect:'manual'});assert.equal(res.status,307);assert.match(res.headers.get('location'),/signin-with-chatgpt/);
  res=await request('/inquiries',{headers:{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'other@example.com'}});const denied=await res.text();assert.match(denied,/Owner access required/);assert.doesNotMatch(denied,/qa@example.com/);
  const owner={'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@example.com'};
  res=await request('/inquiries',{headers:owner});assert.equal(res.status,200);assert.match(await res.text(),/QA Test Client/);
  const patch=(headers,status)=>request('/api/inquiries/'+lead.id,{method:'PATCH',headers:{'Content-Type':'application/json',Origin:origin,...headers},body:JSON.stringify({status})});
  res=await patch({},'closed');assert.equal(res.status,403);
  res=await patch(owner,'invalid');assert.equal(res.status,400);
  res=await patch(owner,'contacted');assert.equal(res.status,200);assert.equal((await db.prepare('SELECT status FROM inquiries WHERE id=?').bind(lead.id).first()).status,'contacted');
  for(let i=1;i<10;i++) { const id=crypto.randomUUID();res=await post({...lead,id});assert.equal(res.status,201); }
  res=await post({...lead,id:crypto.randomUUID()});assert.equal(res.status,429);
 } finally { await mf.dispose(); }
});
