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
    const threads = await prisma.thread.findMany({
        include: { posts: true },
    });
    res.json(threads);
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
