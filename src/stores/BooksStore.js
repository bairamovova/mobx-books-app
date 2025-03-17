import { makeAutoObservable } from 'mobx';
import BooksRepository from '../services/BooksRepository';

class BooksStore {
  books = [];
  filter = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks() {
    this.books = await BooksRepository.getBooks(this.filter);
  }

  async addBook(name, author) {
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

  setFilter(type) {
    this.filter = type;
    this.fetchBooks();
  }
}

export default new BooksStore();
