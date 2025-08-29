const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('./generated/prisma');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/threads', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const threads = await prisma.thread.findMany({
        skip,
        take: limit,
        include: { posts: true },
        orderBy: { updatedAt: 'desc' }
    });

    const totalThreads = await prisma.thread.count();

    res.json({
        threads,
        totalThreads,
        page,
        totalPages: Math.ceil(totalThreads / limit)
    });
})

app.post('/thread', async (req, res) => {
    const { title, content } = req.body;

    try {
        const thread = await prisma.thread.create({
            data: {
                title,
                posts: { create: { content } },
            },
            include : { posts: true },
        });
        res.json(thread);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.post('/reply', async (req, res) => {
    const { threadId, content } = req.body;

    try {
        const post = await prisma.post.create({
            data: { threadId, content },
        });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
