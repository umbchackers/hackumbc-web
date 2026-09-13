import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = join(process.cwd(), 'public', 'organizers');
const OUT = join(SRC, 'thumb');

const files = (await readdir(SRC)).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));
await mkdir(OUT, { recursive: true });

await Promise.all(files.map(async (file) => {
  const name = file.replace(/\.[^.]+$/, '.webp');
  await sharp(join(SRC, file))
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(OUT, name));
  console.log(`generated ${name}`);
}));

console.log(`done: ${files.length} images`);
