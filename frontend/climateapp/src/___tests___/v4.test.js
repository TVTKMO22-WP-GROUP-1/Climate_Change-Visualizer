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

it('sets the state of selectedCountry1 when a country button is clicked', () => {
    const { getByText } = render(<Visualization4 />);
    const chinaButton = getByText('China');
    fireEvent.click(chinaButton);
    expect(chinaButton).toHaveStyle('background-color: #008CBA');
    const indiaButton = getByText('India');
    expect(indiaButton).not.toHaveStyle('background-color: #008CBA');
    const usaButton = getByText('USA');
    expect(usaButton).not.toHaveStyle('background-color: #008CBA');
  });