import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'


export async function createBook(title, category, cover, desc, yearOfPub, isbn, language, pageCount, authorId, publisherId) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.run(`INSERT INTO books(title, category, cover, desc,
             yearOfPub, isbn, language, pageCount, authorId, publisherId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, title, category, cover, desc, yearOfPub, isbn, language, pageCount, authorId, publisherId);
    console.log(insertResult);
    await db.close();
}

async function getBook(id) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.get(`SELECT * FROM books WHERE bookId = ${id}`);
    await db.close();
    return insertResult;
}

export async function getAllBooks() {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });
    const insertResult = await db.all('SELECT * FROM books');
    await db.close()
    return insertResult;
}

export async function updateBook(id, title, category, cover, desc, yearOfPub, isbn, language, pageCount, authorId, publisherId) {
    const db = await open({
        filename: '../library.db',
        driver: sqlite3.Database
    });

    const insertResult = await db.run('UPDATE books SET title = ?, category = ?, cover = ?, desc = ?,  yearOfPub = ?, isbn = ?, language = ?, pageCount = ?, authorId = ?, publisherId = ? WHERE id = ?', title, category, cover, desc, yearOfPub, isbn, language, pageCount, authorId, publisherId, id);
    await db.close()
    return insertResult;
}

// async function deleteBook(id: any) {
//     let db;
//     try {
//         db = await open({
//             filename: '../library.db',
//             driver: sqlite3.Database
//         });
//         const insertResult = await db.run(`DELETE FROM books WHERE bookId = ${id}`);
//         console.log(insertResult);

//     } catch (e) {
//         console.log(e);
//     } finally {
//         await db.close()
//     }
// }

// createBook("1984", "Научная фантастика", "1984.png", "Был холодный ясный апрельский день, и часы пробили тринадцать. Уткнув подбородок в грудь, чтобы спастись от злого ветра, Уинстон Смит торопливо шмыгнул за стеклянную дверь жилого дома «Победа», но все-таки впустил за собой вихрь зернистой пыли.", 1948, 2, 1);
