import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import BooksStore from '../stores/BooksStore';

const BooksView = observer(() => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    BooksStore.fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (name && author) {
      await BooksStore.addBook(name, author);
      setName('');
      setAuthor('');
    }
  };

  return (
    <div>
      <h1>Books List</h1>

      <div>
        <button onClick={() => BooksStore.setFilter('all')}>All books</button>
        <button onClick={() => BooksStore.setFilter('private')}>
          Private books
        </button>
        <button onClick={() => BooksStore.resetBooks()}>Reset Books</button>
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
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleAddBook}>Add</button>
      </div>
    </div>
  );
});

export default BooksView;
