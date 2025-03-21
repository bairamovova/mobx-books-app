import ApiGateway from "./ApiGateway";

global.fetch = jest.fn();

describe('ApiGateway', () => {
  const api = new ApiGateway();
  const mockUrl = 'https://api.example.com/test';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should make a successful GET request', async () => {
    const mockResponse = [{ id: 1, name: 'Test Book', author: 'Author' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await api.get(mockUrl);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual(mockResponse);
  });

  test('should throw an error on GET failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(api.get(mockUrl)).rejects.toThrow(
      'Request failed with status 404'
    );
  });

  test('should make a successful POST request', async () => {
    const mockResponse = { status: 'ok' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await api.post(mockUrl, {
      name: 'Test Book',
      author: 'Author',
    });
    expect(fetch).toHaveBeenCalledWith(
      mockUrl,
      expect.objectContaining({ method: 'POST' })
    );
    expect(result).toEqual(mockResponse);
  });

  test('should throw an error on POST failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(api.post(mockUrl, {})).rejects.toThrow(
      'Request failed with status 500'
    );
  });

  test('should make a successful PUT request', async () => {
    const mockResponse = { status: 'ok' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await api.put(mockUrl);
    expect(fetch).toHaveBeenCalledWith(
      mockUrl,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(result).toEqual(mockResponse);
  });

  test('should throw an error on PUT failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 403 });

    await expect(api.put(mockUrl)).rejects.toThrow(
      'Request failed with status 403'
    );
  });
});
