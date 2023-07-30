const { pool } = require('../config/db');

//================== GET Books ==========================

const GetBooks = async () => {
  const QueryGetBooks = 'SELECT * FROM book';

  return pool.query(QueryGetBooks);
};
// ==================== Create Books ======================

const CreateBooks = async (bookData) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = bookData;
  const finished = pageCount === readPage;

  try {
    const { rows } = await pool.query(
      `
        INSERT INTO book (name, year, author, summary, publisher, pageCount, readPage, finished, reading)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
      `,
      [name, year, author, summary, publisher, pageCount, readPage, finished, reading]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
};

//============================= GET by ID =========================================

const GetBooksbyID = async (id) => {
  const QueryGetBooksbyID = 'SELECT * FROM book WHERE id = $1';
  const values = [id];

  return pool.query(QueryGetBooksbyID, values);
};

const UpdateBooks = async (id, bookData) => {
  // const QueryUpdateBooks = 'UPDATE books SET Name_book = $1 , category = $2 , author = $3 WHERE id = $4 ';
  // const values = [newdata.Name_book, newdata.category, newdata.author, id];

  // return pool.query(QueryUpdateBooks, values);

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = bookData;
  const finished = pageCount === readPage;

  try {
    const { rows } = await pool.query(
      `
      UPDATE book 
      SET 
        name = $1, 
        year = $2, 
        author = $3, 
        summary = $4, 
        publisher = $5, 
        pageCount = $6, 
        readPage = $7, 
        finished = $8, 
        reading = $9
      WHERE 
        id = $10
      RETURNING 
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
      `,
      [name, year, author, summary, publisher, pageCount, readPage, finished, reading, id]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
};

const DeleteBooks = async (id) => {
  const QueryDeleteBooks = 'DELETE FROM book WHERE id = $1';
  const values = [id];
  return pool.query(QueryDeleteBooks, values);
};

module.exports = {
  DeleteBooks,
  UpdateBooks,
  GetBooksbyID,
  GetBooks,
  CreateBooks,
};
