const ModelBooks = require('../model/ModelBooks');
///==========================================================

//======================== GET DATA ====================

const ControllerGetAll = async (req, res) => {
  const result = await ModelBooks.GetBooks();
  const books = result.rows.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  try {
    res.status(200).json({
      status: 'success',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Your Acces Denaid',
      error: error.message,
    });
  }
};

//======================= GET by ID ====================================

const ConstrollerGetbyID = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id.length !== 36) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }
  let result = await ModelBooks.GetBooksbyID(id);
  console.log(result);

  try {
    const book = result.rows[0];
    console.log(book);

    if (!book) {
      res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      return;
    }

    res.status(200).json({
      message: ' Your Detail Books',
      data: { book },
    });
  } catch (error) {
    res.status(500).json({
      message: ' Data Broken',
      message: error.message,
    });
  }
};

//========================= Create Books ===============================

const ControllerCreate = async (req, res) => {
  // const id = req.Result.rows;
  // console.log(id);
  const bookData = req.body;
  const name = bookData.name;
  console.log(name);
  console.log(bookData);
  if (name == null || undefined) {
    return res.status(400).json({
      status: 'faild',
      message: ' Gagal menambahkan buku. Mohon isi nama buku',
    });
  }
  try {
    const newBook = await ModelBooks.CreateBooks(bookData);
    const bookId = newBook.id;
    console.log(newBook);
    res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: bookId,
      },
    });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//========================== Update Books ============================

const ControllerUpdate = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  // const name = newData.name;

  const { name, readPage, pageCount } = newData;
  //===================== Validasi Id ============================

  // const id = req.params.id;
  console.log(id);
  if (id.length !== 36) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }
  let result = await ModelBooks.UpdateBooks(id, newData);
  // const book = result;
  // console.log('disni');
  // console.log(book);

  if (!result) {
    res.status(404).json({
      status: 'fail1',
      message: 'Buku tidak ditemukan',
    });
    return;
  }
  // ============ Validasi No name =============
  if (name === undefined || name === null) {
    return res.status(400).json({
      status: 'faild',
      message: ' Gagal menambahkan buku. Mohon isi nama buku',
    });
  }
  //============== Validasi readpage dan pagecount =====================
  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  try {
    // await ModelBooks.UpdateBooks(id, newData);
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};

//===================================== Delete Books ===================
const ControllerDelete = async (req, res) => {
  const { id } = req.params;

  // =============================Validasi data no found
  if (id.length !== 36) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  //==================================================

  try {
    let result = await ModelBooks.DeleteBooks(id);
    console.log(result);
    let valid = result.rowCount;
    console.log(valid);

    console.log('aray');
    // console.log(matchedBooks);
    if (valid === 0) {
      return res.status(404).json({
        status: 'fail1',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
    }
    await ModelBooks.DeleteBooks(id);
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

module.exports = {
  ConstrollerGetbyID,
  ControllerGetAll,
  ControllerCreate,
  ControllerUpdate,
  ControllerDelete,
};
