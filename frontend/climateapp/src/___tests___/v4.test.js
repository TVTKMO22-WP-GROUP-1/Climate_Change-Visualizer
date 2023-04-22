import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Visualization4 from '../Visualization4';

describe('Visualization4 component', () => {
  it('renders the three country buttons', () => {
    render(<Visualization4 />);
    expect(screen.getByRole('button', { name: 'China' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'India' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USA' })).toBeInTheDocument();
  });
});

test('renders the Visualization 4 component', () => {
    render(<Visualization4 />);
    const heading = screen.getByText(/Visualization 4/i);
    expect(heading).toBeInTheDocument();
  });