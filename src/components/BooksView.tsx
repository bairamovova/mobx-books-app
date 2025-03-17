import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';
import BooksStore from '../stores/BooksStore';

const BooksView = observer(() => {
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      await BooksStore.fetchBooks();
      setLoading(false);
    };
    fetchBooks();
  }, [BooksStore.filter]);
  
  const handleAddBook = useCallback(async () => {
    if (name && author) {
      setLoading(true);
      await BooksStore.addBook(name, author);
      setName('');
      setAuthor('');
      setLoading(false);
    }
  }, [name, author]);

  const handleSetFilter = useCallback((filter: 'all' | 'private') => {
    BooksStore.setFilter(filter);
  }, []);

  const handleResetBooks = useCallback(async () => {
    setLoading(true);
    await BooksStore.resetBooks();
    setLoading(false);
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

      {loading ? (
        <p>Loading books...</p>
      ) : (
        BooksStore.books.map((book, index) => (
          <div key={index}>
            {book.author}: {book.name}
          </div>
        ))
      )}

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
        <button onClick={handleAddBook} disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
});

export default BooksView;
