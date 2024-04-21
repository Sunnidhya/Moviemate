import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

const Dropdown = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data or set it from local storage
    const movieData = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
      // Add more movie data as needed
    ];
    setMovies(movieData);
    setFilteredMovies(movieData);
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMovieSelection(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleMovieSelection = (selectedMovie) => {
    // Do something with the selected movie
    console.log(selectedMovie);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Search for a movie..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Dropdown;
