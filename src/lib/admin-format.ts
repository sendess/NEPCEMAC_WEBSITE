// Dates and times in the admin panel, always in Nepal time.
import NepaliDateModule from 'nepali-date-converter';

const NepaliDate = ((NepaliDateModule as unknown as { default?: typeof NepaliDateModule }).default ??
  NepaliDateModule) as typeof NepaliDateModule;

const dateTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kathmandu',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const dateOnly = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kathmandu', day: 'numeric', month: 'short', year: 'numeric' });

/** "25 Sep 2026, 3:05 pm" */
export const formatWhen = (value: string | Date | null | undefined) => (value ? dateTime.format(new Date(value)) : '—');

/** "3 hours ago", "yesterday", or the date for anything older than a week. */
export function formatAgo(value: string | Date | null | undefined, now = Date.now()): string {
  if (!value) return '—';
  const minutes = Math.round((now - new Date(value).getTime()) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  return dateOnly.format(new Date(value));
}

/** "13 Nov 2019 · 2076/07/27 BS" for an ISO date (YYYY-MM-DD). */
export function formatDay(iso: string | null | undefined, approx?: string | null): string {
  if (!iso) return 'No date';
  const d = new Date(`${iso}T12:00:00+05:45`);
  const bs = new NepaliDate(d);
  if (approx === 'year') return `${d.getFullYear()} · ${bs.getYear()} BS`;
  if (approx === 'month') {
    return `${new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(d)} · ${bs.format('YYYY/MM')} BS`;
  }
  return `${dateOnly.format(d)} · ${bs.format('YYYY/MM/DD')} BS`;
}

/** Today in Nepal as YYYY-MM-DD. */
export const todayInNepal = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu' }).format(new Date());

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Messages shown after a form is saved (the page is reloaded with ?done=<key>). */
export function doneMessage(url: URL, messages: Record<string, string>): { text: string } | null {
  const key = url.searchParams.get('done');
  return key && messages[key] ? { text: messages[key] } : null;
}
