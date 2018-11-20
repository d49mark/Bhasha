import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";

// Button component for home
const Button = ({ title, onPress, index }) => {
  const handlePress = () => onPress(index); // onPress handler
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ alignItems: "center", backgroundColor: "#227DA8", padding: 10, margin: 10 }}
    >
      <Text style={{ color: "white", fontSize: 15, padding: 10 }}>{title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  index: PropTypes.number,
};

Button.defaultProps = {
  onPress: () => true,
  index: 0,
};
export default Button;
