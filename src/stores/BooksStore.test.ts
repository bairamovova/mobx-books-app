import BooksRepository from "../services/BooksRepository";
import BooksStore from "./BooksStore";

jest.mock('../services/BooksRepository');

describe('BooksStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch books and update store', async () => {
    const mockBooks = [{ id: 111, name: 'Sample Book', author: 'Author A' }];
    (BooksRepository.getBooks as jest.Mock).mockResolvedValueOnce(mockBooks);

    await BooksStore.fetchBooks();
    expect(BooksStore.books).toEqual(mockBooks);
  });

  test('should handle errors in fetchBooks()', async () => {
    (BooksRepository.getBooks as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    await BooksStore.fetchBooks();
    expect(BooksStore.books).toEqual([]);
  });

  test('should add a book and refresh the list', async () => {
    (BooksRepository.addBook as jest.Mock).mockResolvedValueOnce(true);
    (BooksRepository.getBooks as jest.Mock).mockResolvedValueOnce([]);

    await BooksStore.addBook('Test Book', 'Test Author');
    expect(BooksRepository.addBook).toHaveBeenCalledWith(
      'Test Book',
      'Test Author'
    );
    expect(BooksRepository.getBooks).toHaveBeenCalled();
  });

  test('should reset books and fetch new list', async () => {
    (BooksRepository.resetBooks as jest.Mock).mockResolvedValueOnce({
      status: 'ok',
    });
    (BooksRepository.getBooks as jest.Mock).mockResolvedValueOnce([]);

    await BooksStore.resetBooks();
    expect(BooksRepository.resetBooks).toHaveBeenCalled();
    expect(BooksRepository.getBooks).toHaveBeenCalled();
  });

  test('should change filter and fetch books', async () => {
    (BooksRepository.getBooks as jest.Mock).mockResolvedValueOnce([]);

    await BooksStore.setFilter('private');
    expect(BooksStore.filter).toBe('private');
    expect(BooksRepository.getBooks).toHaveBeenCalledWith('private');
  });
});
