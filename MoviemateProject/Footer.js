import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = ({ text }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 40,
    backgroundColor: '#70A597',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  }
});

export default Footer;
