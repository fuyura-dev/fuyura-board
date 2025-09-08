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

  return pages
    .flatMap((page) => page.threads)
    .slice(0, THREAD_LIMIT)
    .map((t) => t.no);
}

async function fetchPosts(board, threadId) {
  const url = `https://a.4cdn.org/${board}/thread/${threadId}.json`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch posts ${board}/${threadId}`);

  const data = await res.json();

  const [op, ...replies] = data.posts;

  return {
    board,
    threadId: op.no,
    title: op.sub,
    content: op.com,
    posts: replies.slice(0, POST_LIMIT).map((p) => ({
      id: p.no,
      content: p.com,
    })),
  };
}

async function main() {
  // const threads = await fetchThreads("a");
  // console.log(threads);
  const posts = await fetchPosts("a", 282092697);
  console.log(posts);
}

main();
