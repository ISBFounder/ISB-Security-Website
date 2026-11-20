import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(root, "public");
const keyFile = readdirSync(publicDir).find((name) =>
  /^[a-f0-9]{32}\.txt$/.test(name)
);

if (!keyFile) {
  console.error("IndexNow key file missing from public/ (expected 32-hex .txt).");
  process.exit(1);
}

const key = keyFile.slice(0, -4);
const published = readFileSync(join(publicDir, keyFile), "utf8").trim();
if (published !== key) {
  console.error("IndexNow key file contents do not match its filename.");
  process.exit(1);
}

const host = "www.isbsecuritysolutions.nl";
const site = `https://${host}`;
const paths = [
  "/",
  "/platform",
  "/features",
  "/solutions",
  "/industries",
  "/technology",
  "/security",
  "/ai",
  "/about",
  "/freelance-security",
  "/roadmap",
  "/faq",
  "/contact",
  "/request-demo",
  "/privacy",
  "/terms",
  "/cookies",
];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${site}/${key}.txt`,
    urlList: paths.map((path) => (path === "/" ? site : `${site}${path}`)),
  }),
});

console.log(`IndexNow ${response.status} ${response.statusText}`);
if (!response.ok && response.status !== 202) {
  const text = await response.text();
  console.error(text.slice(0, 500));
  process.exit(1);
}
