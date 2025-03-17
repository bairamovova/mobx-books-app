import BooksView from './components/BooksView';
import Header from './components/Header';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.app}>
      <Header />
      <BooksView />
    </div>
  );
}

export default App
