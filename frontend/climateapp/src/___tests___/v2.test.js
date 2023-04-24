import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Visualization2 from '../Visualization2';


    test('renders the Visualization 2 component', () => {
        render(<Visualization2 />);
        const heading = screen.getByText(/Visualization 2/i);
        expect(heading).toBeInTheDocument();
    });

        describe('Visualization2', () => {
        it('should render the co2 view by default', () => {
        const { getByLabelText } = render(<Visualization2 />);
        const co2Button = screen.getByLabelText('co2');
        const icecoreButton = screen.getByLabelText('icecore');
        expect(co2Button).toBeChecked();
        expect(icecoreButton).not.toBeChecked();
        });

        describe('Visualization2', () => {
            test('should switch to the icecore view when icecore button is clicked', () => {
            const {getByLabelText } = render(<Visualization2 />);
            const co2Button = screen.getByLabelText('co2');
            const icecoreButton = screen.getByLabelText('icecore');
            fireEvent.click(icecoreButton);
            expect(co2Button).not.toBeChecked();
       });
        
            test('should switch to the co2 view when co2 button is clicked', () => {
            const {getByLabelText} = render(<Visualization2 />);
            const co2Button = screen.getByLabelText('co2');
            const icecoreButton = screen.getByLabelText('icecore');
            fireEvent.click(icecoreButton);
            fireEvent.click(co2Button);
            expect(co2Button).toBeChecked();
        });
     });
 });