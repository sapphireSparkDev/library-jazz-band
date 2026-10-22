// Shrinks large photos in the browser before they are uploaded, so a
// 6000px, 8MB camera photo becomes a ~2000px, few-hundred-KB file.
// Videos, GIFs, SVGs and images that are already small pass through as-is.

const MAX_SIDE = 2000; // longest side, in pixels
const MAX_BYTES = 1024 * 1024; // files under 1MB that also fit MAX_SIDE are kept
const QUALITY = 0.85;

const RESIZABLE = ["image/jpeg", "image/png", "image/webp"];

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });

const toBlob = (canvas: HTMLCanvasElement, type: string) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));

export const resizeImage = async (file: File): Promise<File> => {
  if (!RESIZABLE.includes(file.type)) return file;

  let img: HTMLImageElement;
  try {
    img = await loadImage(file);
  } catch {
    return file;
  }

  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  if (longest <= MAX_SIDE && file.size <= MAX_BYTES) return file;

  const scale = Math.min(1, MAX_SIDE / longest);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // JPEGs stay JPEG. PNG/WebP become WebP so any transparency survives;
  // browsers that can't encode WebP hand back a PNG instead.
  const wanted = file.type === "image/jpeg" ? "image/jpeg" : "image/webp";
  const blob = await toBlob(canvas, wanted);
  if (!blob || blob.size >= file.size) return file;

  const ext = blob.type === "image/jpeg" ? "jpg" : blob.type.split("/")[1];
  const name = `${file.name.replace(/\.[^.]+$/, "")}.${ext}`;
  return new File([blob], name, { type: blob.type });
};
