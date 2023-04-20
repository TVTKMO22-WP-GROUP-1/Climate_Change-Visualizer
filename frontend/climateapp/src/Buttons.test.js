import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GoToLogin from './Home';
import GoToSignUp from './Home';

describe('GoToLogin', () => {
  test('renders a Login button that links to /login', () => {
    render(
      <BrowserRouter>
        <GoToLogin />
      </BrowserRouter>
    );

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
  });
});

describe('GoToSignUp', () => {
    test('renders a SignUp button that links to /signup', () => {
      render(
        <BrowserRouter>
          <GoToSignUp />
        </BrowserRouter>
      );
  
        const signUpButton = screen.getByText('Sign Up');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton.closest('a')).toHaveAttribute('href', '/signup');
    });
  });