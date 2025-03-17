import { observer } from 'mobx-react-lite';
import booksStore from '../stores/BooksStore';
import './Header.css';

const Header = observer(() => {
  return (
    <header className='header'>
      <h1>Book Library</h1>
      <p>Your books: {booksStore.privateBooksCount}</p>
    </header>
  );
});

export default Header;
