import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
import axios from 'axios'; // Import axios for mocking
import Moviematebody from './Moviematebody';
import MockAdapter from 'axios-mock-adapter';

// jest.mock('axios'); // Mock axios


describe('Moviematebody component', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Moviematebody />);
        
        // Check if input placeholder text is rendered
        expect(getByPlaceholderText('Enter number of movies you have watched ...')).toBeTruthy();
        
        // Check if "LIST" button is rendered
        expect(getByText('LIST')).toBeTruthy();
    });


    test('lists movies and ratings correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Moviematebody />);
        
        // Simulate user input
        fireEvent.changeText(getByPlaceholderText('Enter number of movies you have watched ...'), '3');
        fireEvent.press(getByText('LIST'));
        expect(getByPlaceholderText('Rating 1')).toBeTruthy();
        expect(getByPlaceholderText('Rating 2')).toBeTruthy();
        expect(getByPlaceholderText('Rating 3')).toBeTruthy();
        // expect(getByPlaceholderText('Rating 4')).toBeTruthy(); //this will give error if n=3
      });

      
    //   const mock = new MockAdapter(axios);
    //   test('fetches movies data correctly', async () => {
    //     const mockedMovies = [{ Title: 'Hate (Haine, La) (1995)', Genre: 'Drama' }, { Title: 'Shopping (1994)', Genre: 'Action|Thriller' }]
    //     mock.onGet().reply(200, mockedMovies);
    
    //     const {getByPlaceholderText, getByText, findByText } = render(<Moviematebody />);
        
    //     fireEvent.changeText(getByPlaceholderText('Enter number of movies you have watched ...'), '2');
    //     fireEvent.press(getByText('LIST'));
        
    //     // Wait for movies to be fetched
    //     const movie1 = await findByText('Select option');
    //     const movie2 = await findByText('Select option');
        
    //     expect(movie1).toBeTruthy();
    //     expect(movie2).toBeTruthy();
    //   });


    // const mock = new MockAdapter(axios);
    // test('recommends movies correctly', async () => {
    //     const mockedMovies = [{ Title: 'Shopping (1994)', Genre: 'Drama' }]
    //     const mockedRecommendation = [
    //         { Title: 'Shopping (1994)', Genre: 'Action|Thriller'}
    //       ];
        
    //     mock.onPost().reply(200, mockedMovies);
    //     const { getByPlaceholderText, getByText, findByText } = render(<Moviematebody />);
        
    //     fireEvent.changeText(getByPlaceholderText('Enter number of movies you have watched ...'), '1');
    //     fireEvent.press(getByText('LIST'));
    //     fireEvent.changeText(getByPlaceholderText('Rating 1'), '5');
    //     fireEvent.press(getByText('Recommend'));

    //       await waitFor(() => {
    //       expect(getByText('Movie Name : Hate (Haine, La) (1995)')).toBeTruthy();
    //       expect(getByText('Genres : Drama')).toBeTruthy();
    // });
    //   });






});