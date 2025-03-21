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
    const response = await this.api.get<Book[]>(path);
    return response as Book[] || [];
  }

  async addBook(name: string, author: string): Promise<boolean> {
    const response = await this.api.post<{ status: string }>(
      `/books/${USER_ID}/`,
      { name, author }
    );
    return response.status === 'ok';
  }

  async resetBooks(): Promise<boolean> {
    const response = await this.api.put<{ status: string }>(
      `/books/${USER_ID}/reset`
    );
    return response.status === 'ok';
  }
}

export default new BooksRepository();
