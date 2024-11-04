import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'


export async function createUser(name) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run('INSERT INTO users(username) VALUES (?)', name);

    await db.close();
}

export async function getUserByUsername(username) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM users WHERE username = '${username}'`);

    await db.close()

    return insertResult;
}

export async function getAllUsers() {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.all('SELECT * FROM users');
    await db.close();

    return insertResult;
}

export async function deleteUser(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run(`DELETE FROM users WHERE id = ${id}`);
    await db.close()
}
