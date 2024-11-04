import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'

async function createAuthorsTable() {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run('CREATE TABLE IF NOT EXISTS authors (id INTEGER PRIMARY KEY, photo TEXT NOT NULL, fio TEXT NOT NULL, age INTEGER NOT NULL);');
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}

async function createPublishersTable() {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run('CREATE TABLE IF NOT EXISTS publishers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);');
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}

async function createCategoriesTable() {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, title TEXT NOT NULL);');
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}

async function createUsersTable() {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, register_date TEXT NOT NULL);');
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}

async function createBooksTable() {
    let db;
    try {
        db = await open({
            filename: '../../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run(`CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, category TEXT, cover TEXT NOT NULL, desc TEXT NOT NULL,
             yearOfPub INTEGER NOT NULL, isbn TEXT NOT NULL, language TEXT NOT NULL, pageCount INTEGER NOT NULL, authorId INTEGER,  publisherId INTEGER, FOREIGN KEY (authorId) REFERENCES authors (id), 
             FOREIGN KEY (publisherId) REFERENCES publishers (id));`);
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}

async function createCommentsTable() {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const exec = await db.run(`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, content TEXT NOT NULL, userId INTEGER, bookId INTEGER, FOREIGN KEY (userId) REFERENCES users (id), 
             FOREIGN KEY (bookId) REFERENCES books (id));`);
    } catch (e) {
        console.log(e);
    } finally {
        await db.close();
    }

}



createBooksTable();