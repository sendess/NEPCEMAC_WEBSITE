import photoSizes from '~/data/photo-sizes.json';

/** Sizes, average colour and smart focal point for each processed photo (see photo-sizes.json). */
export type PhotoInfo = { widths: number[]; width: number; height: number; color: string; focus: string };

/** A photo uploaded in the admin panel: a large copy (longest side up to 1600 px) and a 640 px copy. */
export type MediaPhoto = { media: string; width: number; height: number };

/** A photo shipped with the site (its slug in public/images/photos) or an uploaded one. */
export type PhotoRef = string | MediaPhoto;

export function photoInfo(slug: string): PhotoInfo {
  const info = (photoSizes as Record<string, PhotoInfo>)[slug];
  if (!info) throw new Error(`Unknown photo "${slug}" — add it to src/data/photo-sizes.json`);
  return info;
}

export const photoUrl = (slug: string, width: number) => `/images/photos/${slug}-${width}.webp`;

export const mediaUrl = (id: string, small = false) => `/media/${id}${small ? '-sm' : ''}.webp`;

/** Longest side of the small copy made when a photo is uploaded. */
export const MEDIA_SMALL_SIDE = 640;

export type ResolvedPhoto = {
  src: string;
  srcset: string;
  /** The largest stored version, for the full-screen viewer. */
  largest: string;
  width: number;
  height: number;
  color: string;
  focus: string;
};

export function resolvePhoto(ref: PhotoRef): ResolvedPhoto {
  if (typeof ref !== 'string') {
    const { media, width, height } = ref;
    const smallWidth = Math.round(width * Math.min(1, MEDIA_SMALL_SIDE / Math.max(width, height)));
    return {
      src: mediaUrl(media),
      srcset: smallWidth < width ? `${mediaUrl(media, true)} ${smallWidth}w, ${mediaUrl(media)} ${width}w` : `${mediaUrl(media)} ${width}w`,
      largest: mediaUrl(media),
      width,
      height,
      // Uploads have no stored colour or focal point: a neutral tint and the centre.
      color: '#e3f0dc',
      focus: '50% 50%',
    };
  }
  const info = photoInfo(ref);
  // Fallback for browsers without srcset: a mid-size copy.
  const fallback = info.widths.find((w) => w >= 900) ?? info.widths.at(-1)!;
  return {
    src: photoUrl(ref, fallback),
    srcset: info.widths.map((w) => `${photoUrl(ref, w)} ${w}w`).join(', '),
    largest: photoUrl(ref, info.widths.at(-1)!),
    width: info.width,
    height: info.height,
    color: info.color,
    focus: info.focus,
  };
}

export const largestPhoto = (ref: PhotoRef) => resolvePhoto(ref).largest;

/** Small preview for a stored reference: "photo:<slug>", "media:<uuid>" or "team:<slug>" (admin panel). */
export function thumbUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('media:')) return mediaUrl(src.slice(6), true);
  if (src.startsWith('team:')) return `/images/team/${src.slice(5)}.webp`;
  const info = src.startsWith('photo:') ? (photoSizes as Record<string, PhotoInfo>)[src.slice(6)] : undefined;
  return info ? photoUrl(src.slice(6), info.widths[0]) : null;
}
