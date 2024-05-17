import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Footer from './Footer';
import GoogleSearchLink from './GoogleSearchLink';

const Moviematebody = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [keyForSelectList, setKeyForSelectList] = useState(0);
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMoviesData, setFilteredMoviesData] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    setValue(text);
    setVisible(text !== '0');
    setKeyForSelectList((prevKey) => prevKey + 1);
    setRatings([]);
    setRecommendation([]);
  };

  const handleRatingInputChange = (index, value) => {
    if (!isNaN(value) && value >= 0 && value <= 5) {
      const updatedRatings = [...ratings];
      updatedRatings[index] = value;
      setRatings(updatedRatings);
    } else {
      Alert.alert('Please enter a valid rating between 0 and 5');
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    axios(
      {
        method: "GET",
        url: 'http://backend:3000/listofmovies',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.data)
      .then(movies => {
        console.log('Response:', movies);
        setMoviesData(movies);
        setFilteredMoviesData(movies);
      })
      .catch((error) => {
        console.error('Error fetching movies data:', error);
      });

  };
  const handleMovieChange = (selected, index) => {
    const updatedSelectedMovies = [...selectedMovies];
    updatedSelectedMovies[index] = selected;
    setSelectedMovies(updatedSelectedMovies);
  };

  const handleSearchChange = (searchText) => {
    const filteredData = moviesData.filter(movie => movie.Title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredMoviesData(filteredData);
  };


  const handleRecommendPress = async () => {
    try {
      const dataToSend = selectedMovies.map((movie, index) => ({
        movie: movie,
        rating: ratings[index]
      }));
      console.log(dataToSend)
      const response = await axios.post('http://backend:3000/moviename', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRecommendation(response.data);
      console.log('Recommendation response:', response.data);
    } catch (error) {
      console.error('Error sending recommendation:', error);

    }
  };


  const renderMovieInputs = () => {
    return Array.from({ length: value }, (_, index) => (
      <View key={index} style={styles.movieContainer}>
        <View style={styles.inputContainer}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={filteredMoviesData && Array.isArray(filteredMoviesData) ? filteredMoviesData.map((movie) => ({ key: movie.MovieID, value: movie.Title })) : []}
            key={keyForSelectList}
            boxStyles={{
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
              paddingLeft: 10,
              marginRight: 5,
              marginBottom: 10,
              width: 200,
              borderRadius: 0,
            }}
            dropdownStyles={{ borderRadius: 0, marginBottom: 10, width: 200}}
            
            save="value"
            searchBarPlaceholder="Search movies..."
            onChangeText={handleSearchChange} // Handle search input change
            onSelect={() => handleMovieChange(selected, index)}
            
          />
          <TextInput
            style={[styles.input, styles.ratingInput]}
            onChangeText={(value) => handleRatingInputChange(index, value)}
            value={ratings[index]}
            placeholder={`Rating ${index + 1}`}
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        
      </View>
    )
    );
  };



  return (
    <ScrollView style={styles.scrollview}> 
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter number of movies you have watched ..."
          placeholderTextColor="gray"
        />
        <View style={styles.button}>
          <Button
            title="LIST"
            onPress={() => handleButtonPress(text)}
            color="#70A597"
            accessibilityLabel="Submit Button"
          />
        </View>
        <View style={styles.dynamicinput}>
          {visible && <Text style={styles.space}>List the movies watched and give rating between 0-5:</Text>}
          {renderMovieInputs()}
        </View>
        <View style={styles.button}>
          <Button
            title="Recommend"
            onPress={() => handleRecommendPress()}
            color="#70A597"
            accessibilityLabel="Submit Button"
          />
        </View>
        <Text style={styles.space1}>
          Following are the Recommended Movies : {"\n"}{"\n"}
          {recommendation && Array.isArray(recommendation) ? (
            recommendation.map((movie, index) => (
              <Text key={index}>
                Movie Name : {movie.Title} {"\n"}
                Genres : {movie.Genre}{"\n"}
                <Text>
                  <GoogleSearchLink searchText={`${movie.Title}`} />
                </Text>
                {"\n\n"}
                </Text>
            ))
          ) : (
            <Text>No recommendations available</Text>
          )}
        </Text>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    margin: 30,
    paddingLeft: 70,
    paddingRight: 70,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  movieInput: {
    marginRight: 5,
    marginBottom: 10,
    width: 200,
  },
  ratingInput: {
    marginLeft: 5,
    marginBottom: 10,
    width: 100,
  },
  space: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  space1: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:5,
    marginRight:5
  },
  dynamicinput: {
    alignItems: 'center',
  },
  scrollview:{
    marginBottom:10,
  }
});

export default Moviematebody;

