// Household waste estimate, shared by the page (first render) and its script (live updates).
// Shares and grams per person come from src/data/tools.ts (householdWaste).

export type WasteInput = { people: number; grams: number; recycle: boolean; compost: boolean };

export type WasteEstimate = {
  day: number;
  month: number;
  year: number;
  organic: number;
  recyclable: number;
  other: number;
  /** What still leaves the home in a year, after recycling and composting. */
  leaves: number;
  leavesPct: number;
  sacks: number;
};

const DAYS_PER_MONTH = 365 / 12;
const SACK_KG = 25;

export function estimateWaste(
  { people, grams, recycle, compost }: WasteInput,
  share: { organic: number; recyclable: number; other: number },
): WasteEstimate {
  const day = (people * grams) / 1000;
  const year = day * 365;
  const kept = (recycle ? share.recyclable : 0) + (compost ? share.organic : 0);
  const leavesPct = 100 - kept;
  return {
    day,
    month: day * DAYS_PER_MONTH,
    year,
    organic: (year * share.organic) / 100,
    recyclable: (year * share.recyclable) / 100,
    other: (year * share.other) / 100,
    leaves: (year * leavesPct) / 100,
    leavesPct,
    sacks: Math.max(1, Math.round(year / SACK_KG)),
  };
}

/** Kilograms with sensible precision: 0.85, 4.3, 26, 310. */
export function formatKg(kg: number, locale: string): string {
  const digits = kg < 1 ? 2 : kg < 10 ? 1 : 0;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: kg < 10 && kg > 0 ? digits : 0 }).format(kg);
}

export const numberLocale = (lang: string) => (lang === 'ne' ? 'ne-NP-u-nu-deva' : 'en-US');
