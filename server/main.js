import * as Authormanager from './managers/authormanager.js';
import * as BooksManager from './managers/BooksManager.js';
import * as PublisherManager from './managers/publishermanager.js';
import * as UserManager from './managers/usermanager.js';
import * as CommentManger from './managers/commentsmanager.js';

import bodyParser from 'body-parser';

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.get('/books', async (req, res) => {
    const books = await BooksManager.getAllBooks();
    res.json(books);
});


app.get('/authors', async (req, res) => {
    const authors = await Authormanager.getAllAuthor();
    res.json(authors);
});

app.get('/authors/:id', async (req, res) => {
    const author = await Authormanager.getAuthor(req.params.id);
    res.json(author);
});

app.post("/authors", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const response = await Authormanager.createAuthor(`/uploads/${req.file.filename}`, req.body.fio, req.body.age);
        console.log(response);

        res.json({ message: "Author created succesfully", filePath: `/uploads/${req.file.filename}`, author: response });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Failed to upload image", error: err });
    }
});


app.post("/books", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const response = await BooksManager.createBook(req.body.title, req.body.category, `/uploads/${req.file.filename}`, req.body.desc, req.body.yearOfPub,
            req.body.isbn, req.body.language, req.body.pageCount, req.body.authorId, req.body.publisherId);
        console.log(response);

        res.json({ message: "Book created succesfully", filePath: `/uploads/${req.file.filename}`, author: response });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Failed to upload image", error: err });
    }
});

app.put("/books/:id", async (req, res) => {
    const id = req.params.id;
    const author = await Authormanager.getAuthorByName(req.body.bookData.author);
    const publisher = await PublisherManager.getPublisherByName(req.body.bookData.publisher);

    const response = await BooksManager.updateBook(id, req.body.bookData.title, req.body.bookData.genre, req.body.bookData.coverImage, req.body.bookData.description, req.body.bookData.publicationYear,
        req.body.bookData.isbn, req.body.bookData.language, req.body.bookData.pageCount, author.id, publisher.id);

    console.log(response);

    res.json(response);
})

app.post('/publisher', async (req, res) => {
    const body = req.body;
    const reponse = await PublisherManager.createPublisher(body.name);
    res.json({ message: "Publisher has been created" });
});

app.get('/publisher', async (req, res) => {
    const publishers = await PublisherManager.getAllPublishers();
    res.json(publishers);
});

app.get('/publisher/:id', async (req, res) => {
    const publishers = await PublisherManager.getPublisher(req.params.id);
    res.json(publishers);
});


app.delete('/publisher/:id', async (req, res) => {
    const id = req.params.id;
    const publishers = await PublisherManager.deletePublisher(id);
    res.send("OK");
});


app.delete('/authors/:id', async (req, res) => {
    const id = req.params.id;
    const response = await Authormanager.deleteAuthor(id);
    return res.send("OK");
})

app.get('/users', async (req, res) => {
    const users = await UserManager.getAllUsers();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const body = req.body;
    console.log(body);

    const users = await UserManager.createUser(body.username);
    res.json(users);
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const response = await UserManager.deleteUser(id);
    return res.send("OK");
})

app.get('/comments/:id', async (req, res) => {
    const cms = await CommentManger.getAllComments(req.params.id);
    res.json(cms);
});

app.post('/comments', async (req, res) => {
    const body = req.body;
    const user = await UserManager.getUserByUsername(body.username);
    const cms = await CommentManger.createComment(body.content, user.id, body.bookId);
    res.json(cms);
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});