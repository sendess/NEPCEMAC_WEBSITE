import photoSizes from '~/data/photo-sizes.json';

/** Sizes, average colour and smart focal point for each processed photo (see photo-sizes.json). */
export type PhotoInfo = { widths: number[]; width: number; height: number; color: string; focus: string };

export function photoInfo(slug: string): PhotoInfo {
  const info = (photoSizes as Record<string, PhotoInfo>)[slug];
  if (!info) throw new Error(`Unknown photo "${slug}" — add it to src/data/photo-sizes.json`);
  return info;
}

export const photoUrl = (slug: string, width: number) => `/images/photos/${slug}-${width}.webp`;

/** The largest stored version, for the full-screen viewer. */
export const largestPhoto = (slug: string) => photoUrl(slug, photoInfo(slug).widths.at(-1)!);
