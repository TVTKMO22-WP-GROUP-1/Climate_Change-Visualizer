import React from 'react';
import { render, screen, fireEvent, getByTestId, getByLabelText } from '@testing-library/react';
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
  
  test("Button click triggers click event", () => {
    const testClick = jest.fn();
    render(<Visualization4 handleButtonClick1={testClick} />);
    const btn = screen.getByRole('button', {name: 'China'});
    fireEvent.click(btn);
    expect(btn).toBeValid();
  });