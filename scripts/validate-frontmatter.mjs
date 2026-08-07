import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["content", "archetypes"];
const FRONT_MATTER_KEYS = new Set(["summary", "description"]);
const MARKDOWN_EXTENSIONS = new Set([".md", ".markdown"]);

const violations = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!MARKDOWN_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    await validateFile(fullPath);
  }
}

async function validateFile(filePath) {
  const content = await readFile(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const delimiter = lines[0];

  if (delimiter !== "---" && delimiter !== "+++") {
    return;
  }

  const endIndex = lines.findIndex((line, index) => index > 0 && line === delimiter);

  if (endIndex === -1) {
    return;
  }

  const frontMatterLines = lines.slice(1, endIndex);

  for (let index = 0; index < frontMatterLines.length; index += 1) {
    const line = frontMatterLines[index];
    const yamlMatch = line.match(/^\s*(summary|description)\s*:\s*(.*)$/);
    const tomlMatch = line.match(/^\s*(summary|description)\s*=\s*(.*)$/);
    const match = yamlMatch ?? tomlMatch;

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (!FRONT_MATTER_KEYS.has(key)) {
      continue;
    }

    const value = rawValue.trim();
    const nextLine = frontMatterLines[index + 1] ?? "";
    const nextLineIsIndented = /^\s+\S/.test(nextLine);

    const isYamlBlock = delimiter === "---" && (value === "|" || value === ">" || value === "|-" || value === ">-");
    const isTomlMultiline = delimiter === "+++" && (value.startsWith('"""') || value.startsWith("'''"));
    const hasContinuation = value.length === 0 && nextLineIsIndented;

    if (isYamlBlock || isTomlMultiline || hasContinuation) {
      violations.push({
        filePath,
        key,
        lineNumber: index + 2,
      });
    }
  }
}

for (const dir of TARGET_DIRS) {
  await walk(path.join(ROOT, dir));
}

if (violations.length > 0) {
  for (const violation of violations) {
    const relativePath = path.relative(ROOT, violation.filePath);
    console.error(
      `${relativePath}:${violation.lineNumber} ${violation.key} must stay on a single line without regeleinden.`,
    );
  }

  process.exit(1);
}
