import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GoToLogin from '../Home';
import GoToSignUp from '../Home';
import GoToProtected from '../Home';
import Home from '../Home';


describe('GoToLogin', () => {
  test('renders a Login button that links to /login', () => {
    render(
      <BrowserRouter>
        <GoToLogin />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('link', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');
  });
});

describe('GoToSignUp', () => {
    test('renders a SignUp button that links to /signup', () => {
      render(
        <BrowserRouter>
          <GoToSignUp />
        </BrowserRouter>
      );
  
      const signUpButton = screen.getByRole('link', { name: 'Sign Up' });
      expect(signUpButton).toBeInTheDocument();
      expect(signUpButton).toHaveAttribute('href', '/signup');
    });
  });
