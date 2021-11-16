import React from "react";
import { StyleSheet, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import colors from "../config/colors";

const SearchBox = ({ value, onChange }) => {
  return null;
  // return (
  //   <View style={styles.search}>
  //     <EvilIcons name="search" size={24} color={colors.lighterText} />
  //     <TextInput placeholder="Find here" value={value} onChangeText={onChange} style={{flexGrow: 1, marginLeft: 7}} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.dark_light,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30
  }
})

export default SearchBox;