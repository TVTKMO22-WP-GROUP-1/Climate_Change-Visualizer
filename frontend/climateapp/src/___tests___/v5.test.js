import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Visualization5 from '../Visualization5';

describe('Visualization 5 component', () => {
  it('renders the pie', () => {
    render(<Visualization5 />);
    expect(screen.getByRole('pie')).toBeInTheDocument});
});

test('renders the Visualization 5 component', () => {
    render(<Visualization5 />);
    const heading = screen.getByText(/Visualization 5/i);
    expect(heading).toBeInTheDocument();
  });