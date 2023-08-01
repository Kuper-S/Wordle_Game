import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage/HomePage';
import { BrowserRouter } from 'react-router-dom';

const mockUser = {
  uid: 'mock-user-uid',
  username: 'Mock User',
  totalAttempts: 0,
  wordsGuessed: [],
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: mockUser,
  }),
}));

describe('<HomePage />', () => {
  it('renders "Ready to Play and do BETTER" text', () => {
    render(
    <BrowserRouter>
        <HomePage />
    </BrowserRouter>
    );
    const helloWorldText = screen.getByText(/Ready to Play and do BETTER/);
    expect(helloWorldText).toBeInTheDocument();
  });
});