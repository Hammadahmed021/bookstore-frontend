import React from 'react'
import BookPost from './BookPost'
import { Link } from 'react-router-dom'
import { useFetchAllBooksQuery } from '../../store/features/books/booksApi'
import BooksTable from '../../components/Admin/BooksTable'

  const AdminBooks = () => {
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2> All Books</h2>
        <Link className='px-4 py-2 border rounded-lg hover:bg-primary duration-200 transition-all'
          to="/admin/add-book">Add new book</Link>
      </div>
      <BooksTable data={books} loading={isLoading} error={isError} />
    </div>
  )
}

export default AdminBooks
