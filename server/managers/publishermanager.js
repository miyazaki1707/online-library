import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'


export async function createPublisher(name) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run('INSERT INTO publishers(name) VALUES (?)', name);
    await db.close();
}

export async function getPublisher(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM publishers WHERE id = ${id}`);
    await db.close()
    return insertResult;
}

export async function getPublisherByName(name) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    console.log(1);

    const insertResult = await db.get(`SELECT * FROM publishers WHERE name = '${name}'`);
    await db.close()
    return insertResult;
}

export async function getAllPublishers() {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.all('SELECT * FROM publishers');
    await db.close()
    return insertResult;
}

export async function updatePublisher(name, id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run('UPDATE publishers SET name = ? WHERE id = ?', name, id);
    console.log(insertResult);

    await db.close()
}

export async function deletePublisher(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run(`DELETE FROM publishers WHERE id = ${id}`);
    console.log(insertResult);

    await db.close()
}
