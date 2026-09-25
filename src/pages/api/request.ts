// Receives the request form (see RequestForm.astro) and files it in the admin inbox.
import type { APIRoute } from 'astro';
import { hasDatabase } from '~/lib/db';
import { json } from '~/lib/cache';
import { hashIp } from '~/lib/secrets';
import { requestActor } from '~/lib/audit';
import { readRequest, saveRequest, tooManyRequests } from '~/lib/requests';
import { newRequestRef } from '~/lib/tokens';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  // Without a database the form falls back to a ready-to-send email.
  if (!hasDatabase) return json({ message: 'Requests are not stored on this site.' }, 503);

  const raw = await ctx.request.text();
  if (raw.length > 20_000) return json({ message: 'Too long.' }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ message: 'Invalid request.' }, 400);
  }

  // A robot filled in the hidden field: answer as if it worked, store nothing.
  if (String(body.website ?? '').trim()) return json({ ref: newRequestRef() });

  const request = readRequest(body);
  if ('error' in request) return json({ message: request.error }, 400);

  const ipHash = hashIp(requestActor(ctx, null).ip);
  if (await tooManyRequests(ipHash)) return json({ message: 'Too many requests. Please call or email us instead.' }, 429);

  try {
    return json({ ref: await saveRequest(request, ipHash) });
  } catch (err) {
    console.error('Saving a request failed', err);
    return json({ message: 'Could not save the request.' }, 500);
  }
};
