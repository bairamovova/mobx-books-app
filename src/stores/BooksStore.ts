import { makeAutoObservable } from 'mobx';
import BooksController from '../controllers/BooksController';

interface Book {
  id?: string;
  name: string;
  author: string;
}

class BooksStore {
  books: Book[] = [];
  filter: 'all' | 'private' = 'all';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  setFilter(type: 'all' | 'private') {
    this.filter = type;
  }

  setLoading(state: boolean) {
    this.isLoading = state;
  }

  setError(error: string | null) {
    this.error = error;
  }

  get privateBooksCount() {
    return this.books.length;
  }

  async fetchBooks() {
    await BooksController.fetchBooks();
  }

  async addBook(name: string, author: string) {
    await BooksController.addBook(name, author);
  }

  async resetBooks() {
    await BooksController.resetBooks();
  }
}

export default new BooksStore();
