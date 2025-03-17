import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { makeAutoObservable } from 'mobx';
import Header from './Header';

class MockBooksStore {
  privateBooksCount = 5;

  constructor() {
    makeAutoObservable(this);
  }
}

const mockBooksStore = new MockBooksStore();

jest.mock('../stores/BooksStore', () => ({
  privateBooksCount: mockBooksStore.privateBooksCount,
}));

describe('Header', () => {
  it('displays the correct number of private books', () => {
    render(<Header />);

    expect(screen.getByText('Your books: 5')).toBeInTheDocument();
  });
});
