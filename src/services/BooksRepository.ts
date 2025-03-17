import ApiGateway from '../shared/ApiGateway';

const USER_ID = 'userId1';

interface Book {
  name: string;
  author: string;
}

class BooksRepository {
  private readonly api: ApiGateway;

  constructor() {
    this.api = new ApiGateway();
  }

  async getBooks(filter: 'all' | 'private' = 'all'): Promise<Book[]> {
    const path =
      filter === 'private' ? `/books/${USER_ID}/private` : `/books/${USER_ID}/`;
    const response = await this.api.get(path);
    return (response as Book[]) || [];
  }

  async addBook(name: string, author: string): Promise<boolean> {
    const response = await this.api.post(`/books/${USER_ID}/`, {
      name,
      author,
    });
    return response.status === 'ok';
  }

  async resetBooks() {
    return await this.api.put(`/books/${USER_ID}/reset`);
  }
}

export default new BooksRepository();
