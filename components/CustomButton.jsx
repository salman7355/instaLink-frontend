import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ text, action }) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        width: "100%",
        height: "100%",
        // marginTop: 20,
        backgroundColor: "#f62e8e",
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        // marginHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "white",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
