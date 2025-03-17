import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';
import BooksStore from '../stores/BooksStore';

const BooksView = observer(() => {
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    BooksStore.fetchBooks();
  }, []);

  const handleAddBook = useCallback(async () => {
    if (name && author) {
      await BooksStore.addBook(name, author);
      setName('');
      setAuthor('');
    }
  }, [name, author]);

  const handleSetFilter = useCallback((filter: 'all' | 'private') => {
    BooksStore.setFilter(filter);
  }, []);

  const handleResetBooks = useCallback(() => {
    BooksStore.resetBooks();
  }, []);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleAuthorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor(e.target.value);
    },
    []
  );

  return (
    <div>
      <h1>Books List</h1>

      <div>
        <button onClick={() => handleSetFilter('all')}>All books</button>
        <button onClick={() => handleSetFilter('private')}>
          Private books
        </button>
        <button onClick={handleResetBooks}>Reset Books</button>
      </div>

      <p>Current filter: {BooksStore.filter}</p>

      {BooksStore.books.map((book, index) => (
        <div key={index}>
          {book.author}: {book.name}
        </div>
      ))}

      <div>
        <input
          type='text'
          placeholder='Book name'
          value={name}
          onChange={handleNameChange}
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={handleAuthorChange}
        />
        <button onClick={handleAddBook}>Add</button>
      </div>
    </div>
  );
});

export default BooksView;
