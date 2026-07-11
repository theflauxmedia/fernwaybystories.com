/**
 * Resize and re-encode public images for web delivery.
 * Run: npm run compress:images
 */
import sharp from "sharp";
import { readdir, rename, stat, unlink } from "fs/promises";
import path from "path";

const ROOT = path.join(process.cwd(), "public");
const TARGET_DIRS = ["ambience", "food"];
const STANDALONE_FILES = ["logo.png"];

/** Drop-in folders: compress, convert to WebP, rename 1.webp, 2.webp, … */
const INGEST_DIRS = ["new_images"];

/** Max long edge — enough for 2x retina full-width (~960px layout) */
const MAX_LONG_EDGE = 1920;
const WEBP_QUALITY = 84;
const PNG_QUALITY = 90;

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (/\.(webp|png|jpe?g)$/i.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const before = (await stat(filePath)).size;

  const image = sharp(filePath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longEdge = Math.max(width, height);

  let pipeline = image;

  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_LONG_EDGE : undefined,
      height: height > width ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const tmpPath = `${filePath}.compress-tmp`;

  if (ext === ".webp") {
    await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 6, smartSubsample: true })
      .toFile(tmpPath);
  } else if (ext === ".png") {
    await pipeline
      .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: meta.hasAlpha })
      .toFile(tmpPath);
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: WEBP_QUALITY, mozjpeg: true }).toFile(tmpPath);
  } else {
    return null;
  }

  const after = (await stat(tmpPath)).size;

  if (after >= before) {
    await unlink(tmpPath);
    return { filePath, before, after: before, skipped: true };
  }

  await rename(tmpPath, filePath);
  return { filePath, before, after, skipped: false };
}

async function compressToWebp(sourcePath, destPath) {
  const before = (await stat(sourcePath)).size;

  const image = sharp(sourcePath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longEdge = Math.max(width, height);

  let pipeline = image;

  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_LONG_EDGE : undefined,
      height: height > width ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const tmpPath = `${destPath}.compress-tmp`;
  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 6, smartSubsample: true })
    .toFile(tmpPath);

  const after = (await stat(tmpPath)).size;
  await rename(tmpPath, destPath);
  return { before, after };
}

async function ingestSerialImages(dirName) {
  const dirPath = path.join(ROOT, dirName);

  let entries;
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const sources = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        /\.(webp|png|jpe?g)$/i.test(entry.name) &&
        !/^\d+\.webp$/i.test(entry.name),
    )
    .map((entry) => path.join(dirPath, entry.name))
    .sort();

  if (sources.length === 0) return [];

  const existingSerial = entries
    .filter((entry) => entry.isFile() && /^\d+\.webp$/i.test(entry.name))
    .map((entry) => Number.parseInt(entry.name, 10))
    .filter((n) => !Number.isNaN(n));

  let nextIndex = existingSerial.length > 0 ? Math.max(...existingSerial) + 1 : 1;
  const results = [];

  console.log(`Ingesting ${sources.length} image(s) from ${dirName}/ → serial WebP…\n`);

  for (const sourcePath of sources) {
    const destPath = path.join(dirPath, `${nextIndex}.webp`);
    const relSource = path.relative(ROOT, sourcePath);
    const relDest = path.relative(ROOT, destPath);

    const { before, after } = await compressToWebp(sourcePath, destPath);
    await unlink(sourcePath);

    results.push({ relSource, relDest, before, after });
    nextIndex += 1;
  }

  return results;
}

function formatBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

async function main() {
  const ingestResults = [];

  for (const dirName of INGEST_DIRS) {
    ingestResults.push(...(await ingestSerialImages(dirName)));
  }

  for (const result of ingestResults) {
    const pct = `${Math.round((1 - result.after / result.before) * 100)}% smaller`;
    console.log(
      `${result.relSource} → ${result.relDest}: ${formatBytes(result.before)} → ${formatBytes(result.after)} (${pct})`,
    );
  }

  if (ingestResults.length > 0) console.log("");

  const files = [];

  for (const dir of TARGET_DIRS) {
    files.push(...(await collectFiles(path.join(ROOT, dir))));
  }

  for (const name of STANDALONE_FILES) {
    const full = path.join(ROOT, name);
    try {
      await stat(full);
      files.push(full);
    } catch {
      /* optional file */
    }
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;

  console.log(`Compressing ${files.length} images (max ${MAX_LONG_EDGE}px, WebP q${WEBP_QUALITY})…\n`);

  for (const file of files.sort()) {
    const result = await compressFile(file);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;
    processed += 1;

    const rel = path.relative(ROOT, result.filePath);
    const pct = result.skipped
      ? "skipped (already optimal)"
      : `${Math.round((1 - result.after / result.before) * 100)}% smaller`;

    console.log(`${rel}: ${formatBytes(result.before)} → ${formatBytes(result.after)} (${pct})`);
  }

  console.log(
    `\nDone. ${processed} files — ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% total reduction)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
