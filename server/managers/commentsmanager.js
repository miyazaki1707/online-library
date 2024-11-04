import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'


export async function createComment(content, userId, bookId) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run('INSERT INTO comments(content, userId, bookId) VALUES (?, ?, ?)', [content, userId, bookId]);
    await db.close();
    return insertResult;
}

export async function getComment(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM comments WHERE commentId = ${id}`);
    await db.close()
    return insertResult;
}

export async function getAllComments(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.all(`SELECT * FROM comments WHERE bookId = ${id}`);
    await db.close()
    return insertResult;

}
