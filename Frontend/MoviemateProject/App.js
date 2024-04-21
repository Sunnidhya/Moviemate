import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header'; 
import Moviematebody from './Moviematebody';


const App = () => {
  return (
    <View style={styles.header}>
      <Header title1="MovieMate" />
      <Moviematebody/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
