import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const WORKSPACE_ROOT = process.cwd();
const DEFAULT_INPUT = path.join(WORKSPACE_ROOT, 'constants.tsx');
const DEFAULT_OUTPUT = path.join(WORKSPACE_ROOT, 'SLIDES_TEXT.md');

function getPropName(nameNode) {
  if (!nameNode) return undefined;
  if (ts.isIdentifier(nameNode)) return nameNode.text;
  if (ts.isStringLiteral(nameNode) || ts.isNumericLiteral(nameNode)) return nameNode.text;
  if (ts.isPrivateIdentifier(nameNode)) return nameNode.text;
  return undefined;
}

function evalNode(node) {
  if (!node) return undefined;

  // Primitive literals
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  // Arrays
  if (ts.isArrayLiteralExpression(node)) {
    const arr = [];
    for (const el of node.elements) {
      const v = evalNode(el);
      if (v !== undefined) arr.push(v);
    }
    return arr;
  }

  // Objects
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = getPropName(prop.name);
      if (!key) continue;
      const v = evalNode(prop.initializer);
      if (v !== undefined) obj[key] = v;
    }
    return obj;
  }

  // Ignore JSX, identifiers, call expressions, etc. (non-text / non-static)
  return undefined;
}

function findSlidesInitializer(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      if (decl.name.text !== 'SLIDES') continue;
      return decl.initializer;
    }
  }
  return undefined;
}

function mdEscapeInline(text) {
  return String(text).replaceAll('\r\n', '\n').replaceAll('\r', '\n');
}

function renderSlide(slide) {
  const lines = [];
  const title = mdEscapeInline(slide.title ?? '').trim();
  const header = title ? title : `Slide ${slide.id ?? ''}`.trim();
  lines.push(`## ${header}`);

  if (slide.subTitle) lines.push(`- **SubTitle**: ${mdEscapeInline(slide.subTitle)}`);
  if (slide.type) lines.push(`- **Type**: ${mdEscapeInline(slide.type)}`);
  if (typeof slide.hours === 'number' && !Number.isNaN(slide.hours) && slide.hours > 0) {
    lines.push(`- **Hours**: ${slide.hours}`);
  }
  if (Array.isArray(slide.tags) && slide.tags.length) {
    lines.push(`- **Tags**: ${slide.tags.map(mdEscapeInline).join(', ')}`);
  }

  const contentLines = renderContent(slide.content);
  if (contentLines.length) {
    lines.push('');
    lines.push(...contentLines);
  }

  lines.push('');
  return lines.join('\n');
}

function renderContent(content) {
  if (content === undefined || content === null) return [];
  const lines = [];

  // Simple strings
  if (typeof content === 'string') {
    lines.push(mdEscapeInline(content));
    return lines;
  }

  // Arrays: try to render objects intelligently, otherwise bullets
  if (Array.isArray(content)) {
    for (const item of content) {
      if (typeof item === 'string') {
        lines.push(`- ${mdEscapeInline(item)}`);
        continue;
      }
      if (item && typeof item === 'object') {
        // Common patterns (GOALS, ROADMAP, etc.)
        if (item.keyword && item.desc) {
          lines.push(`- **${mdEscapeInline(item.keyword)}**: ${mdEscapeInline(item.desc)}`);
          continue;
        }
        if (item.step || item.title || item.desc) {
          const step = item.step ? mdEscapeInline(item.step) : undefined;
          const title = item.title ? mdEscapeInline(item.title) : undefined;
          const desc = item.desc ? mdEscapeInline(item.desc) : undefined;
          const left = [step, title].filter(Boolean).join(' — ');
          if (left && desc) lines.push(`- **${left}**: ${desc}`);
          else if (left) lines.push(`- ${left}`);
          else if (desc) lines.push(`- ${desc}`);
          continue;
        }
        // Fallback: stringify known keys
        const kv = Object.entries(item)
          .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
          .map(([k, v]) => `${k}: ${mdEscapeInline(v)}`)
          .join(', ');
        if (kv) lines.push(`- ${kv}`);
      }
    }
    return lines;
  }

  // Objects: handle known shapes
  if (typeof content === 'object') {
    // COVER-like: highlight/footer
    if (content.highlight) lines.push(`> ${mdEscapeInline(content.highlight)}`);
    if (content.footer) lines.push(`- **Footer**: ${mdEscapeInline(content.footer)}`);

    // CONTENT_PHASE: sections/items/point
    if (Array.isArray(content.sections)) {
      for (const section of content.sections) {
        if (!section || typeof section !== 'object') continue;
        if (section.head) lines.push(`### ${mdEscapeInline(section.head)}`);
        if (Array.isArray(section.items)) {
          for (const it of section.items) {
            if (typeof it === 'string') lines.push(`- ${mdEscapeInline(it)}`);
          }
        }
        lines.push('');
      }
      if (lines.length && lines[lines.length - 1] === '') lines.pop();
    }
    if (content.point) {
      if (lines.length) lines.push('');
      lines.push(`- **Point**: ${mdEscapeInline(content.point)}`);
    }

    // PROJECT: goal/examples/effect
    if (content.goal) {
      if (lines.length) lines.push('');
      lines.push(`- **Goal**: ${mdEscapeInline(content.goal)}`);
    }
    if (Array.isArray(content.examples) && content.examples.length) {
      if (lines.length) lines.push('');
      lines.push(`### Examples`);
      for (const ex of content.examples) {
        if (ex && typeof ex === 'object' && ex.title && ex.desc) {
          lines.push(`- **${mdEscapeInline(ex.title)}**: ${mdEscapeInline(ex.desc)}`);
        }
      }
    }
    if (content.effect) {
      if (lines.length) lines.push('');
      lines.push(`- **Effect**: ${mdEscapeInline(content.effect)}`);
    }

    // CLOSING: guides/message
    if (Array.isArray(content.guides) && content.guides.length) {
      if (lines.length) lines.push('');
      lines.push(`### Guides`);
      for (const g of content.guides) {
        if (g && typeof g === 'object' && g.label && g.text) {
          lines.push(`- **${mdEscapeInline(g.label)}**: ${mdEscapeInline(g.text)}`);
        }
      }
    }
    if (content.message) {
      if (lines.length) lines.push('');
      lines.push(`- **Message**: ${mdEscapeInline(content.message)}`);
    }

    // If nothing matched but has strings, dump them
    if (!lines.length) {
      for (const [k, v] of Object.entries(content)) {
        if (typeof v === 'string') lines.push(`- **${mdEscapeInline(k)}**: ${mdEscapeInline(v)}`);
      }
    }

    return lines.filter((l) => l !== undefined);
  }

  return [];
}

async function main() {
  const inputFile = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  const outputFile = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_OUTPUT;

  const src = await fs.readFile(inputFile, 'utf8');
  const sourceFile = ts.createSourceFile(inputFile, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const init = findSlidesInitializer(sourceFile);
  if (!init) {
    throw new Error(`Could not find SLIDES initializer in ${inputFile}`);
  }

  const slides = evalNode(init);
  if (!Array.isArray(slides)) {
    throw new Error(`SLIDES did not evaluate to an array in ${inputFile}`);
  }

  const md = [];
  md.push(`## 슬라이드 텍스트 추출`);
  md.push(`- **Source**: ${path.relative(WORKSPACE_ROOT, inputFile)}`);
  md.push(`- **GeneratedAt**: ${new Date().toISOString()}`);
  md.push('');

  for (const slide of slides) {
    if (!slide || typeof slide !== 'object') continue;
    md.push(renderSlide(slide));
  }

  await fs.writeFile(outputFile, md.join('\n').trimEnd() + '\n', 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Wrote: ${outputFile}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});


