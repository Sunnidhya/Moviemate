import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Moviematebody from './Moviematebody';
import Footer from './Footer';


const App = () => {
  return (

    <View style={styles.header}>
      <Header title1="Moviemate"  />
      <Moviematebody />
      <Footer text="About Us" />
    </View>



  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center'
  },
});

export default App;
