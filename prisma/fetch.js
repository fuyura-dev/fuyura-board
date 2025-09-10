import fs from "fs";

const BOARDS = ["a", "v", "mu", "p"];

const THREAD_LIMIT = 50;
const POST_LIMIT = 50;
const OUTPUT_FILE = "threads.json";

function extractTitle(op) {
  if (op.sub) return op.sub;

  if (op.com) return op.com.length > 50 ? op.com.slice(0, 50) + "..." : op.com;

  return null;
}

async function fetchPosts(board, threadId) {
  const url = `https://a.4cdn.org/${board}/thread/${threadId}.json`;
  const res = await fetch(url);

  if (!res.ok)
    throw new Error(
      `Failed to fetch posts ${board}/${threadId}: ${res.statusText}`
    );

  const data = await res.json();
  const [op, ...replies] = data.posts;

  const title = extractTitle(op);
  if (!title) return null;

  return {
    board,
    threadId: op.no,
    title,
    content: extractTitle(op),
    posts: replies
      .filter((p) => p.com)
      .slice(0, POST_LIMIT)
      .map((p) => ({
        id: p.no,
        content: p.com,
      })),
  };
}

async function fetchThreads(board) {
  const url = `https://a.4cdn.org/${board}/threads.json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch /${board}/: ${res.statusText}`);
  }

  const pages = await res.json();

  const threadIds = pages.flatMap((page) => page.threads).map((t) => t.no);

  const threads = await Promise.all(
    threadIds.map((id) => fetchPosts(board, id))
  );

  return threads.filter(Boolean).slice(0, THREAD_LIMIT);
}

async function main() {
  const threads = await fetchThreads("a");
  console.log(threads);
  // const posts = await fetchPosts("a", 282092697);
  // console.log(posts);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(threads, null, 2));
}

main();
