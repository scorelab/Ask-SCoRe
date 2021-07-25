import {StyleSheet, Platform} from "react-native";

export default StyleSheet.create({
  SafeAreaStyle: {backgroundColor: "#e6e6e6"},

  ViewStyle: {marginBottom: 15},

  ViewStyle1: {
    width: "90%",
    alignSelf: "center",
    height: 100,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 7,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
  },

  TextStyle: {
    fontSize: 17,
    fontWeight: Platform === "ios" ? "500" : "bold",
    marginVertical: 5,
  },

  TextStyle1: {fontSize: 11, fontWeight: "normal"},

  ViewStyle2: {alignSelf: "flex-end", flex: 2.6},

  ViewStyle3: {flexDirection: "row"},

  DividerView: {
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 1,
    marginBottom: 3,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  ViewStyle4: {
    borderBottomColor: "black",
    borderRightWidth: 2,
  },

  ImageStyle: {
    width: 90,
    height: 100,
    alignSelf: "flex-end",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
});
