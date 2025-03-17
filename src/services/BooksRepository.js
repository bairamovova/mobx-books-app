import ApiGateway from '../Shared/ApiGateway';

const USER_ID = 'userId1';

class BooksRepository {
  constructor() {
    this.api = new ApiGateway();
  }

  async getBooks(filter = 'all') {
    const path =
      filter === 'private' ? `/books/${USER_ID}/private` : `/books/${USER_ID}/`;
    return await this.api.get(path);
  }

  async addBook(name, author) {
    return await this.api.post(`/books/${USER_ID}/`, { name, author });
  }

  async resetBooks() {
    return await this.api.put(`/books/${USER_ID}/reset`);
  }
}

export default new BooksRepository();
