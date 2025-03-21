import BooksStore from '../stores/BooksStore';
import BooksRepository from '../services/BooksRepository';

class BooksController {
  async fetchBooks() {
    try {
      BooksStore.setLoading(true);
      BooksStore.setError(null);

      const books = await BooksRepository.getBooks(BooksStore.filter);
      BooksStore.setBooks(books);
    } catch (error) {
      BooksStore.setError('Failed to fetch books');
      console.error('Error fetching books:', error);
    } finally {
      BooksStore.setLoading(false);
    }
  }

  async addBook(name: string, author: string) {
    try {
      BooksStore.setLoading(true);
      const success = await BooksRepository.addBook(name, author);
      if (success) {
        await this.fetchBooks();
      }
    } catch (error) {
      BooksStore.setError('Failed to add book');
      console.error('Error adding book:', error);
    } finally {
      BooksStore.setLoading(false);
    }
  }

  async resetBooks() {
    try {
      BooksStore.setLoading(true);
      const success = await BooksRepository.resetBooks();
      if (success) {      
        await this.fetchBooks();
      }
    } catch (error) {
      BooksStore.setError('Failed to reset books');
      console.error('Error resetting books:', error);
    } finally {
      BooksStore.setLoading(false);
    }
  }
}

export default new BooksController();
