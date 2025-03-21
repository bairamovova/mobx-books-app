import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';
import BooksStore from '../stores/BooksStore';
import BooksController from '../controllers/BooksController';

const BooksView = observer(() => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    BooksController.fetchBooks();
  }, [BooksStore.filter]);

  const handleAddBook = useCallback(async () => {
    if (!name.trim() || !author.trim()) return;
    await BooksController.addBook(name, author);
    setName('');
    setAuthor('');
  }, [name, author]);

  return (
    <div>
      <h1>Books List</h1>

      <div>
        <button onClick={() => BooksController.fetchBooks()}>Refresh</button>
        <button onClick={() => BooksStore.setFilter('all')}>All books</button>
        <button onClick={() => BooksStore.setFilter('private')}>
          Private books
        </button>
        <button onClick={() => BooksController.resetBooks()}>Reset Books</button>
      </div>

      <p>Current filter: {BooksStore.filter}</p>

      {(() => {
        if (BooksStore.isLoading) {
          return <p>Loading books...</p>;
        } else if (BooksStore.books.length > 0) {
          return BooksStore.books.map((book, index) => (
            <div key={index}>
              {book.author}: {book.name}
            </div>
          ));
        } else {
          return <p>No books available.</p>;
        }
      })()}

      {BooksStore.error && <p style={{ color: 'red' }}>{BooksStore.error}</p>}

      <div>
        <input
          type='text'
          placeholder='Book name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleAddBook} disabled={BooksStore.isLoading}>
          {BooksStore.isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
});

export default BooksView;
