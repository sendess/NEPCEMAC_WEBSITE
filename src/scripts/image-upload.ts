/**
 * Resizes a photo in the browser and uploads it, so a phone photo of several MB is stored as
 * roughly 150 KB (longest side 1600 px) plus a 640 px copy for small screens.
 */
const LARGE_SIDE = 1600;
const SMALL_SIDE = 640;

async function encode(bitmap: ImageBitmap, side: number): Promise<{ blob: Blob; width: number; height: number }> {
  const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);
  const toBlob = (type: string, quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  // Some browsers (older Safari) can't make WebP and hand back a large PNG instead; use JPEG there.
  let blob = await toBlob('image/webp', 0.82);
  if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg', 0.85);
  if (!blob) throw new Error('This browser could not convert the photo.');
  return { blob, width, height };
}

export type Uploaded = { id: string; url: string; small: string; width: number; height: number; kb: number };

export async function uploadPhoto(file: File): Promise<Uploaded> {
  if (!file.type.startsWith('image/')) throw new Error(`“${file.name}” is not a photo.`);
  // `from-image` applies the camera's rotation, so portrait phone photos stay upright.
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => {
    throw new Error(`“${file.name}” could not be opened. Try a JPEG or PNG file.`);
  });
  try {
    const large = await encode(bitmap, LARGE_SIDE);
    const small = await encode(bitmap, SMALL_SIDE);
    const body = new FormData();
    body.append('file', large.blob, 'photo');
    body.append('small', small.blob, 'photo-small');
    body.append('width', String(large.width));
    body.append('height', String(large.height));
    const res = await fetch('/api/admin/media', { method: 'POST', body });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error('You have been signed out. Sign in again in another tab, then try once more.');
    if (!res.ok) throw new Error(data.message ?? 'Upload failed.');
    return { ...data, width: large.width, height: large.height, kb: Math.round((large.blob.size + small.blob.size) / 1024) };
  } finally {
    bitmap.close();
  }
}
