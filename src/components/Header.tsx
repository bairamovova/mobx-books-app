import { observer } from 'mobx-react-lite';
import booksStore from '../stores/BooksStore';
import style from './Header.module.scss';

const Header = observer(() => {
  return (
    <header className={style.header}>
      <h1>Book Library</h1>
      <p>Your books: {booksStore.privateBooksCount}</p>
    </header>
  );
});

export default Header;
