import React from 'react';
import { render, screen,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Visualization1 from '../Visualization1';


test('renders the Visualization 1 component', () => {
    render(<Visualization1 />);
    const heading = screen.getByText(/Visualization 1/i);
    expect(heading).toBeInTheDocument();
  });


  describe('Visualization1', () => {
    test('renders annual view when "Annual" button is clicked', () => {
      render(<Visualization1 />);
      fireEvent.click(screen.getByLabelText('Annual'));
      const annualViewHeading = screen.getByText('Annual');
      expect(annualViewHeading).toBeInTheDocument();
    });
    test('renders monthly view when "Monthly" button is clicked', () => {
      render(<Visualization1 />);
      fireEvent.click(screen.getByLabelText('Monthly'));
      const monthlyViewHeading = screen.getByText('Monthly');
      expect(monthlyViewHeading).toBeInTheDocument();
    });
    test('renders the Visualization 1 component', () => {
      render(<Visualization1 />);
      expect(screen.getByRole('v1')).toBeInTheDocument});
  });