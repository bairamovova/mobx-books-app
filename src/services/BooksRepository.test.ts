

import ApiGateway from '../shared/ApiGateway';
import BooksRepository from './BooksRepository';

jest.mock('../../src/shared/ApiGateway');

describe('BooksRepository', () => {
  let apiMock: jest.Mocked<ApiGateway>;
  let repo: typeof BooksRepository;
  const USER_ID = 'userId1';

  beforeEach(() => {
    apiMock = new ApiGateway() as jest.Mocked<ApiGateway>;
    repo = BooksRepository;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (repo as any).api = apiMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch books (all)', async () => {
    const mockBooks = [
      { id: 111, name: 'Book A', ownerId: USER_ID, author: 'Author A' },
      { id: 112, name: 'Book B', ownerId: USER_ID, author: 'Author B' },
    ];
    apiMock.get.mockResolvedValueOnce(mockBooks);

    const result = await repo.getBooks('all');
    expect(apiMock.get).toHaveBeenCalledWith(`/books/${USER_ID}/`);
    expect(result).toEqual(mockBooks);
  });

  test('should fetch private books', async () => {
    const mockBooks = [
      { id: 121, name: 'Private Book', ownerId: USER_ID, author: 'Author X' },
    ];
    apiMock.get.mockResolvedValueOnce(mockBooks);

    const result = await repo.getBooks('private');
    expect(apiMock.get).toHaveBeenCalledWith(`/books/${USER_ID}/private`);
    expect(result).toEqual(mockBooks);
  });

  test('should return empty array when fetching books fails', async () => {
    apiMock.get.mockRejectedValueOnce(new Error('API Error'));

    const result = await repo.getBooks('all');
    expect(apiMock.get).toHaveBeenCalledWith(`/books/${USER_ID}/`);
    expect(result).toEqual([]);
  });

  test('should successfully add a book', async () => {
    apiMock.post.mockResolvedValueOnce({ status: 'ok' });

    const result = await repo.addBook('New Book', 'New Author');
    expect(apiMock.post).toHaveBeenCalledWith(`/books/${USER_ID}/`, {
      name: 'New Book',
      author: 'New Author',
    });
    expect(result).toBe(true);
  });

  test('should return false if adding a book fails', async () => {
    apiMock.post.mockResolvedValueOnce({ status: 'error' });

    const result = await repo.addBook('Fail Book', 'Unknown');
    expect(result).toBe(false);
  });

  test('should successfully reset books', async () => {
    apiMock.put.mockResolvedValueOnce({ status: 'ok' });

    const result = await repo.resetBooks();
    expect(apiMock.put).toHaveBeenCalledWith(`/books/${USER_ID}/reset`);
    expect(result).toEqual({ status: 'ok' });
  });
});
