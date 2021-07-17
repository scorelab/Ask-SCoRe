/* eslint-disable no-unused-vars */
import {StyleSheet, Dimensions} from "react-native";
import {COLOR_LIGHT_PRIMARY} from "../../config/styles.js";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  HeaderStyle1: {
    flexDirection: "row",
  },

  ImageView: {
    width: 55,
    aspectRatio: 1,
    marginHorizontal: 5,
  },

  ImageView1: {
    width: 40,
    aspectRatio: 1,
    marginHorizontal: 5,
  },

  HeaderStyle: {
    fontSize: 30,
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },

  AskButtonStyle: {
    width: deviceWidth * 0.14,
    height: 32,
    backgroundColor: COLOR_LIGHT_PRIMARY,
    borderRadius: 10,
    right: 10,
    justifyContent: "center",
    marginTop: 7,
  },

  DividerView: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 3,
    marginHorizontal: 10,
  },

  DividerView1: {
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    marginHorizontal: 25,
    marginTop: 2,
    marginBottom: 5,
  },

  TextStyle: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },

  TextStyle1: {
    alignSelf: "center",
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 2,
  },
});
