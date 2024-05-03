import React from 'react';
import { TouchableOpacity, Linking, Text, View } from 'react-native';

const GoogleSearchLink = ({ searchText }) => {
  const handlePress = () => {
    const query = encodeURIComponent(searchText);
    const url = `https://www.google.com/search?q=${query}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 300 }}>
        <Text style={{ color: 'blue' }} numberOfLines={4}>{`Search on Google : ${searchText}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleSearchLink;


