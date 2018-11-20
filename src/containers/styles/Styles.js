import { StyleSheet } from "react-native";

// styles for home component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  child: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  correct: {
    height: "90%",
    width: "80%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  inCorrect: {
    height: "90%",
    width: "80%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
