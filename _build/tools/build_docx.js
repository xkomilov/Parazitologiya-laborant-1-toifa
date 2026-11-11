#!/usr/bin/env node
'use strict';
/*
 * topic-docx-packager: JSON spec -> NNN.docx (har mavzu uchun alohida fayl)
 *
 *   node build_docx.js <spec.json> <outDir> [--min 800]
 *   node build_docx.js --dir <specsDir> <outDir> [--min 800]
 *
 * Spec formati:
 *   {
 *     "number": 1,
 *     "title": "1-mavzu. Mavzu nomi",
 *     "sections": [
 *       { "heading": "Kirish", "content": [
 *           "Oddiy paragraf matni [1].",
 *           { "ul": ["sanalmagan band", "yana band"] },
 *           { "ol": ["birinchi qadam", "ikkinchi qadam"] }
 *       ] }
 *     ],
 *     "references": ["Muallif. Nomi. Nashriyot, yil. DOI: ..."]
 *   }
 *
 * Qoidalar:
 *   - Fayl nomi: number -> NNN.docx (001.docx, 002.docx ...).
 *   - Hajm: sarlavha (title) va "Foydalanilgan adabiyotlar" bo'limi hisobga kirmaydi;
 *     bo'lim sarlavhalari (heading) va barcha matn hisobga kiradi. Minimum --min (default 800).
 *     Minimumdan kam bo'lsa fayl YOZILMAYDI (QISQA xabari).
 *   - Apostroflar avtomatik oddiy ' ga o'tkaziladi (’ ʻ ʼ ` ´ -> ').
 *   - references ro'yxatida [n] yo'q bo'lsa, avtomatik qo'shiladi.
 *   - Ro'yxat belgilari (•, 1.) qo'lda yozilmaydi: Word numbering konfiguratsiyasi ishlatiladi.
 *
 * Talab: docx npm paketi. Bir marta o'rnating (loyihaga qo'shilmaydi):
 *   npm install --prefix "%TEMP%\topic-docx-deps" docx
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function loadDocx() {
  try { return require('docx'); } catch (e) { /* keyingi yo'l */ }
  const bases = [path.join(os.tmpdir(), 'topic-docx-deps')];
  if (process.env.NODE_PATH) bases.push(...process.env.NODE_PATH.split(path.delimiter).filter(Boolean));
  for (const base of bases) {
    try { return require(require.resolve('docx', { paths: [base] })); } catch (e) { /* keyingi */ }
  }
  console.error('docx paketi topilmadi. Bir marta o\'rnating:\n  npm install --prefix "%TEMP%\\topic-docx-deps" docx');
  process.exit(3);
}

const docx = loadDocx();
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat } = docx;

const FONT = 'Times New Roman';
const REF_HEADING = 'Foydalanilgan adabiyotlar';
const APOS_RE = /[’‘ʻʼ´`]/g;

const norm = (s) => String(s).replace(APOS_RE, "'").replace(/\s+/g, ' ').trim();
const countWords = (s) => s.split(/\s+/).filter(Boolean).length;

function bodyPara(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 709 },
    spacing: { line: 360, after: 120 },
    children: [new TextRun({ text, font: FONT, size: 28 })],
  });
}

function listPara(text, numbering) {
  return new Paragraph({
    numbering,
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, after: 80 },
    children: [new TextRun({ text, font: FONT, size: 28 })],
  });
}

function headingPara(text, level) {
  return new Paragraph({
    heading: level,
    children: [new TextRun({ text, font: FONT, size: level === HeadingLevel.HEADING_1 ? 32 : 28, bold: true })],
  });
}

// Spec -> { children, bodyText, refs, title }
function layout(spec, state) {
  const title = norm(spec.title || '');
  if (!title) throw new Error('"title" bo\'sh');
  const children = [headingPara(title, HeadingLevel.HEADING_1)];
  const bodyParts = [];

  for (const sec of spec.sections || []) {
    const h = norm(sec.heading || '');
    if (!h) throw new Error('bo\'lim sarlavhasi bo\'sh');
    children.push(headingPara(h, HeadingLevel.HEADING_2));
    bodyParts.push(h);
    for (const item of sec.content || []) {
      if (typeof item === 'string') {
        const t = norm(item);
        children.push(bodyPara(t));
        bodyParts.push(t);
      } else if (item && Array.isArray(item.ul)) {
        for (const x of item.ul) {
          const t = norm(x);
          children.push(listPara(t, { reference: 'bullets', level: 0 }));
          bodyParts.push(t);
        }
      } else if (item && Array.isArray(item.ol)) {
        state.lists += 1;
        for (const x of item.ol) {
          const t = norm(x);
          children.push(listPara(t, { reference: 'numbers', level: 0, instance: state.lists }));
          bodyParts.push(t);
        }
      } else {
        throw new Error(`noma'lum content elementi: ${JSON.stringify(item).slice(0, 80)}`);
      }
    }
  }

  children.push(headingPara(REF_HEADING, HeadingLevel.HEADING_2));
  const refs = (spec.references || []).map((r, i) => {
    const t = norm(r);
    return /^\[\d+\]/.test(t) ? t : `[${i + 1}] ${t}`;
  });
  for (const t of refs) {
    children.push(new Paragraph({
      indent: { left: 567, hanging: 567 },
      spacing: { after: 80 },
      children: [new TextRun({ text: t, font: FONT, size: 24 })],
    }));
  }
  return { children, bodyText: bodyParts.join(' '), refs, title };
}

function toDocument(parts) {
  return new Document({
    creator: 'topic-docx-packager',
    title: parts.title,
    styles: {
      default: { document: { run: { font: FONT, size: 28 } } },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 32, bold: true, color: '000000' },
          paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 240 }, keepNext: true },
        },
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 28, bold: true, color: '000000' },
          paragraph: { spacing: { before: 240, after: 120 }, keepNext: true },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 709, hanging: 357 } } } }],
        },
        {
          reference: 'numbers',
          levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 709, hanging: 357 } } } }],
        },
      ],
    },
    sections: [{
      properties: { page: { margin: { top: 1134, bottom: 1134, left: 1701, right: 850 } } },
      children: parts.children,
    }],
  });
}

function parseArgs(argv) {
  const out = { min: 800, dir: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--min') out.min = Number(argv[++i]);
    else if (a === '--dir') out.dir = true;
    else out.files.push(a);
  }
  return out;
}

async function main() {
  const opt = parseArgs(process.argv.slice(2));
  if (opt.files.length < 2) {
    console.error('Ishlatish: node build_docx.js [--dir] <spec.json | specsDir> <outDir> [--min 800]');
    process.exit(1);
  }
  const [src, outDir] = opt.files;
  fs.mkdirSync(outDir, { recursive: true });

  const specFiles = opt.dir
    ? fs.readdirSync(src).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(src, f))
    : [src];

  const state = { lists: 0 };
  let failed = 0;
  let written = 0;

  for (const sf of specFiles) {
    const label = path.basename(sf);
    let spec;
    try {
      spec = JSON.parse(fs.readFileSync(sf, 'utf8').replace(/^﻿/, ''));
    } catch (e) {
      console.log(`XATO  ${label}: JSON o'qilmadi (${e.message})`);
      failed++;
      continue;
    }
    const num = Number(spec.number);
    if (!Number.isInteger(num) || num < 1) {
      console.log(`XATO  ${label}: "number" butun musbat son bo'lishi kerak`);
      failed++;
      continue;
    }
    const name = String(num).padStart(3, '0') + '.docx';

    let parts;
    try {
      parts = layout(spec, state);
    } catch (e) {
      console.log(`XATO  ${name}: ${e.message}`);
      failed++;
      continue;
    }

    const bodyWords = countWords(parts.bodyText);
    if (bodyWords < opt.min) {
      console.log(`QISQA ${name}: ${bodyWords} so'z (minimum ${opt.min}) - yozilmadi`);
      failed++;
      continue;
    }

    const notes = [];
    const cited = new Set([...parts.bodyText.matchAll(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g)].flatMap((m) => m[1].split(/\s*,\s*/).flatMap((x) => { const r = x.split(/\s*[–-]\s*/).map(Number); if (r.length === 2) { const a = []; for (let i = r[0]; i <= r[1]; i++) a.push(i); return a; } return r; })));
    for (const c of cited) {
      if (c < 1 || c > parts.refs.length) notes.push(`[${c}] adabiyotlarda yo'q`);
    }
    const unused = parts.refs.map((_, i) => i + 1).filter((i) => !cited.has(i));
    if (unused.length) notes.push(`matnda ishlatilmagan manba: ${unused.join(', ')}`);
    if (parts.refs.length === 0) notes.push("adabiyotlar yo'q");

    try {
      const buf = await Packer.toBuffer(toDocument(parts));
      fs.writeFileSync(path.join(outDir, name), buf);
      written++;
      console.log(`OK    ${name}: ${bodyWords} so'z, ${parts.refs.length} manba` +
        (notes.length ? ` | ogohlantirish: ${notes.join('; ')}` : ''));
    } catch (e) {
      console.log(`YOZILMADI ${name}: ${e.code || ''} ${e.message} (fayl Word'da ochiq bo'lishi mumkin)`);
      failed++;
    }
  }

  console.log(`Jami: ${specFiles.length} ta spec, yozildi: ${written}, muammo: ${failed}`);
  process.exit(failed ? 2 : 0);
}

main();
