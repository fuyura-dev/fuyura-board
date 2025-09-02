const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("./generated/prisma");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.get("/:code/threads", async (req, res) => {
  const { code } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const category = await prisma.category.findUnique({
    where: { code },
  });

  if (!category)
    return res.status(404).json({ message: "Category not found " });

  const threads = await prisma.thread.findMany({
    where: { categoryId: category.id },
    skip,
    take: limit,
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const totalThreads = await prisma.thread.count({
    where: { categoryId: category.id },
  });

  res.json({
    category,
    threads,
    page,
    limit,
    totalThreads,
    totalPages: Math.ceil(totalThreads / limit),
  });
});

app.get("/:code/threads/:id", async (req, res) => {
  const { id, code } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const category = await prisma.category.findUnique({
    where: { code },
  });

  if (!category)
    return res.status(404).json({ message: "Category not found." });

  const thread = await prisma.thread.findFirst({
    where: { id: parseInt(id), categoryId: category.id },
  });

  if (!thread) {
    return res.status(404).json({ message: "Thread not found." });
  }

  const posts = await prisma.post.findMany({
    where: { threadId: parseInt(id) },
    orderBy: { createdAt: "asc" },
    skip,
    take: limit,
  });

  const totalPosts = await prisma.post.count({
    where: { threadId: parseInt(id) },
  });

  res.json({
    ...thread,
    posts,
    totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
  });
});

app.post("/:code/thread", async (req, res) => {
  const { code } = req.params;
  const { title, content } = req.body;

  try {
    const thread = await prisma.thread.create({
      data: {
        title,
        posts: { create: { content } },
        category: { connect: { code } },
      },
      include: { posts: true },
    });
    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/reply", async (req, res) => {
  const { threadId, content } = req.body;

  try {
    const [post] = await prisma.$transaction([
      prisma.post.create({
        data: { threadId, content },
      }),
      prisma.thread.update({
        where: { id: threadId },
        data: { updatedAt: new Date() },
      }),
    ]);

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/requests", async (req, res) => {
  const requests = await prisma.request.findMany({
    orderBy: { votes: "desc" },
  });
  res.json(requests);
});

app.post("/request", async (req, res) => {
  const { category, board, boardCode, description } = req.body;
  const newRequest = await prisma.request.create({
    data: { category, board, boardCode, description },
  });
  res.json(newRequest);
});

app.post("/requests/:id/upvote", async (req, res) => {
  const updated = await prisma.request.update({
    where: { id: parseInt(req.params.id) },
    data: { votes: { increment: 1 } },
  });
  res.json(updated);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
