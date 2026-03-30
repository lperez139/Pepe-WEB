import { access, readFile } from "node:fs/promises";
import path from "node:path";

type KnowledgeFormat = "markdown" | "json";

export interface KnowledgeBase {
  absolutePath: string;
  relativePath: string;
  format: KnowledgeFormat;
  content: string;
}

const defaultCandidates = ["knowledge/services.md", "knowledge/services.json"];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toAbsolutePath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
}

function detectFormat(filePath: string): KnowledgeFormat {
  return filePath.toLowerCase().endsWith(".json") ? "json" : "markdown";
}

function normalizeJson(rawContent: string): string {
  const parsed = JSON.parse(rawContent);
  return JSON.stringify(parsed, null, 2);
}

export async function loadKnowledgeBase(): Promise<KnowledgeBase> {
  const configuredFile = process.env.KNOWLEDGE_FILE?.trim();
  const candidates = configuredFile ? [configuredFile] : defaultCandidates;

  for (const candidate of candidates) {
    const absolutePath = toAbsolutePath(candidate);

    if (!(await fileExists(absolutePath))) {
      continue;
    }

    const rawContent = await readFile(absolutePath, "utf8");
    const format = detectFormat(absolutePath);
    const content = format === "json" ? normalizeJson(rawContent) : rawContent;

    return {
      absolutePath,
      relativePath: path.relative(process.cwd(), absolutePath) || absolutePath,
      format,
      content,
    };
  }

  const searchedPaths = candidates.map((candidate) => toAbsolutePath(candidate)).join(", ");
  throw new Error(`No se encontro el archivo de conocimiento. Rutas revisadas: ${searchedPaths}`);
}
