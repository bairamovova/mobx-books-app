import BooksRepository from '../services/BooksRepository';
import ApiGateway from './ApiGateway';

jest.mock('../shared/ApiGateway');

const mockApi = ApiGateway;

describe('BooksRepository', () => {
  beforeEach(() => {
    mockApi.mockClear();
  });

  it('should fetch all books correctly', async () => {
    const mockBooks = [
      { name: 'Book 1', author: 'Author 1' },
      { name: 'Book 2', author: 'Author 2' },
    ];

    mockApi.prototype.get.mockResolvedValue({
      status: 'ok',
      data: mockBooks,
    });

    const books = await BooksRepository.getBooks('all');

    expect(mockApi.prototype.get).toHaveBeenCalledWith('/books/userId1/');
    expect(books).toEqual(mockBooks);
  });

  it('should fetch private books correctly', async () => {
    const mockPrivateBooks = [
      { name: 'Private Book 1', author: 'Private Author 1' },
    ];

    mockApi.prototype.get.mockResolvedValue({
      status: 'ok',
      data: mockPrivateBooks,
    });

    const books = await BooksRepository.getBooks('private');

    expect(mockApi.prototype.get).toHaveBeenCalledWith(
      '/books/userId1/private'
    );
    expect(books).toEqual(mockPrivateBooks);
  });

  it('should add a new book successfully', async () => {
    mockApi.prototype.post.mockResolvedValue({
      status: 'ok',
    });

    const result = await BooksRepository.addBook('New Book', 'New Author');

    expect(mockApi.prototype.post).toHaveBeenCalledWith('/books/userId1/', {
      name: 'New Book',
      author: 'New Author',
    });
    expect(result).toBe(true);
  });

  it('should return false if adding a new book fails', async () => {
    mockApi.prototype.post.mockResolvedValue({
      status: 'error',
    });

    const result = await BooksRepository.addBook('New Book', 'New Author');

    expect(result).toBe(false);
  });

  it('should reset books successfully', async () => {
    mockApi.prototype.put.mockResolvedValue({
      status: 'ok',
    });

    const response = await BooksRepository.resetBooks();

    expect(mockApi.prototype.put).toHaveBeenCalledWith('/books/userId1/reset');
    expect(response.status).toBe('ok');
  });
});
