import fs from "fs";

const BOARDS = ["a", "v", "mu", "p"];

const THREAD_LIMIT = 30;
const POST_LIMIT = 50;
const OUTPUT_FILE = "threads.json";

async function fetchThreads(board) {
  const url = `https://a.4cdn.org/${board}/threads.json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch /${board}/: ${res.statusText}`);
  }

  const pages = await res.json();

  let allThreads = [];
  pages.forEach((page) => {
    allThreads = allThreads.concat(page.threads);
  });

  return allThreads.slice(0, THREAD_LIMIT).map((t) => t.no);
}

async function main() {
  const threads = await fetchThreads("a");
  console.log(threads);
}

main();
