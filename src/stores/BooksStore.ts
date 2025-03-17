import { makeAutoObservable } from 'mobx';
import BooksRepository from '../services/BooksRepository';

interface Book {
  name: string;
  author: string;
}

class BooksStore {
  books: Book[] = [];
  filter: 'all' | 'private' = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks() {
    this.books = await BooksRepository.getBooks(this.filter);
  }

  async addBook(name: string, author: string) {
    const success = await BooksRepository.addBook(name, author);
    if (success) this.fetchBooks();
  }

  async resetBooks() {
    const result = await BooksRepository.resetBooks();
    if (result.status === 'ok') this.fetchBooks();
  }

  get privateBooksCount() {
    return this.books.length;
  }

  setFilter(type: 'all' | 'private') {
    this.filter = type;
    this.fetchBooks();
  }
}

export default new BooksStore();
