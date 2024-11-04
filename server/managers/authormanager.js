import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'


export async function createAuthor(photo, fio, age) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run('INSERT INTO authors(photo, fio, age) VALUES (?, ?, ?)', [photo, fio, age]);
}

export async function getAuthor(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM authors WHERE id = ${id}`);
    await db.close()
    return insertResult;
}

export async function getAuthorByName(fio) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM authors WHERE fio = '${fio}'`);
    await db.close()
    return insertResult;
}

export async function getAllAuthor() {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.all('SELECT * FROM authors');
    await db.close()
    return insertResult;
}

async function updateAuthor(fio, age, id) {
    let db;
    try {
        db = await open({
            filename: '../library.db',
            driver: sqlite3.Database
        });
        const insertResult = await db.run('UPDATE authors SET fio = ?, age = ? WHERE auhtorId = ?', fio, age, id);
        console.log(insertResult);

    } catch (e) {
        console.log(e);
    } finally {
        await db.close()
    }
}

export async function deleteAuthor(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run(`DELETE FROM authors WHERE id = ${id}`);
    await db.close();
    return insertResult;
}
