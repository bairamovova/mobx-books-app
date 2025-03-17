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
    try {
      const fetchedBooks = await BooksRepository.getBooks(this.filter);
      console.log(fetchedBooks, 'fetchedBooks');
      
      this.books = fetchedBooks;
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async addBook(name: string, author: string) {
    const success = await BooksRepository.addBook(name, author);
    if (success) {
      await this.fetchBooks();
    }
  }

  async resetBooks() {
    const result = await BooksRepository.resetBooks();
    if (result.status === 'ok') {
      await this.fetchBooks();
    }
  }

  get privateBooksCount() {
    return this.books.length;
  }

  async setFilter(type: 'all' | 'private') {
    this.filter = type;
    await this.fetchBooks();
  }
}

export default new BooksStore();
