import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, {flexGrow: 1}]}
        {...otherProps}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.medium_lighter,
    borderRadius: 25,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
    alignSelf: "center",
  },
});

export default AppTextInput;
