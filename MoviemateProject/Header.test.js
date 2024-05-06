import React from 'react';
import { render } from '@testing-library/react-native';
import Header from './Header';
import { StatusBar, Text} from 'react-native';


describe('Header component', () => {
    test('renders with correct title', () => {
        const title = 'Moviemate';
        const { getByText } = render(<Header title1={title} />);
        const headerText = getByText(title);
        expect(headerText).toBeDefined();
    });

    test('renders with correct background color', () => {
        const { getByTestId } = render(<Header title1="Moviemate" />);
        const view = getByTestId('status-bar');
        expect(view).toBeDefined();
        expect(view.children.length).toBe(2);
        const parentView = view.parent;

        const statusBar = parentView.findByType(StatusBar);
        expect(statusBar).toBeTruthy();
        expect('#70A597').toBe(statusBar.props.backgroundColor);
        expect('light-content').toBe(statusBar.props.barStyle);
    });

    test('renders with correct title', () => {
        const title = 'Moviemate';
        const { getByTestId } = render(<Header title1="Moviemate" />);
        const textElement = getByTestId('text-bar');
        expect(textElement.props.children).toBe(title);
        const { color, fontSize, fontWeight, fontFamily} = textElement.props.style;
        expect('white').toBe(color);
        expect(18).toBe(fontSize);
        expect('bold').toBe(fontWeight);
        expect('Roboto').toBe(fontFamily);
    });
});
