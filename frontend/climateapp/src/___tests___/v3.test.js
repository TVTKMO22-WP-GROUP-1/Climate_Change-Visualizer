import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Visualization3 from '../Visualization3';

describe('Visualization 3 component', () => {
  it('renders the table', () => {
    render(<Visualization3 />);
    expect(screen.getByRole('data')).toBeInTheDocument});
});

test('renders the Visualization 3 component', () => {
    render(<Visualization3 />);
    const heading = screen.getByText(/Visualization 3/i);
    expect(heading).toBeInTheDocument();
  });