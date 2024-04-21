import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import Dropdown from './Dropdown';



const Moviematebody = () => {
  const [text, setText] = useState('');
  const [value,setValue] = useState(0);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [visible, setVisible] = useState(false);

  

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    setValue(text);
    setVisible(text !== '0');
  };

  const handleRatingInputChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = value;
    setRatings(updatedRatings);
  };
  const handleMovieInputChange = (index, value) => {
    const updatedMovies = [...moviesWatched];
    updatedMovies[index] = value;
    setMoviesWatched(updatedMovies);
  };

  const renderMovieInputs = () => {
    return Array.from({ length: value }, (_, index) => (
        <View key={index} style={styles.movieContainer}>
        
        <View style={styles.inputContainer}>

        <TextInput
          style={[styles.input, styles.movieInput]}
          onChangeText={(value) => handleMovieInputChange(index, value)}
          value={moviesWatched[index]}
          placeholder={`Movie ${index + 1}`}
          placeholderTextColor="gray"
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
    ));
  };
  return (
    <ScrollView>
        <View style={styles.container}>
        
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter number of movies you have watched ..."
        placeholderTextColor="gray"
      />
      <View style={styles.button}  >
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
          color="#70A597"
          accessibilityLabel="Submit Button"
          />
      </View>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight:10,
    },
    button:
    {
        margin: 30,
        paddingLeft:70,
        paddingRight:70,
    },
    inputContainer: {
        flexDirection: 'row',
      },

      movieInput: {
        marginRight: 5,
        marginBottom:10,
        width: 200,
      },
      ratingInput: {
        marginLeft: 5,
        marginBottom: 10,
        width: 100,
      },
      space : {
        marginBottom:10,
        fontWeight: 'bold',
        
      }
});

export default Moviematebody;
