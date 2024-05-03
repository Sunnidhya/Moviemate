import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Header = ({ title1 }) => {
  return (
    <View style={[styles.header,{height:40,paddingBottom:10}]}>
      <StatusBar backgroundColor="#70A597" barStyle="light-content" /> 
      <Text style={styles.headerText}>{title1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#70A597',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    
  },
});

export default Header;
