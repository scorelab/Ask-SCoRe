/* eslint-disable no-unused-vars */
import {StyleSheet, Dimensions} from "react-native";
import {COLOR_LIGHT_PRIMARY, COLOR_GRAY_SECONDARY} from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  HeaderStyle1: {
    flexDirection: "row",
  },

  ImageView: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
  },

  HeaderStyle: {
    fontSize: 30,
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },

  AskButtonStyle: {
    width: 60,
    height: 30,
    backgroundColor: COLOR_LIGHT_PRIMARY,
    borderRadius: 10,
    right: 10,
    justifyContent: "center",
    marginTop: 7,
  },

  AskButtonStyle1: {
    width: 60,
    height: 35,
    backgroundColor: COLOR_LIGHT_PRIMARY,
    borderRadius: 10,
    right: 5,
    justifyContent: "center",
  },

  DividerView: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 3,
  },

  DividerView1: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    marginTop: 2,
    marginBottom: 5,
  },

  ImageView1: {
    height: 28,
    width: 28,
    borderRadius: 5,
    backgroundColor: COLOR_GRAY_SECONDARY,
    marginRight: 7,
  },
  ViewStyle: {
    marginLeft: 10,
    marginRight: 48,
    marginVertical: 7,
  },
  ViewStyle1: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    minHeight: 35,
    width: "70%",
    marginRight: 5,
  },

  ViewStyle7: {
    backgroundColor: "white",
    borderRadius: 10,
    minHeight: 30,
    marginBottom: 5,
    width: "65%",
    borderColor: "black",
    borderWidth: 1,
  },

  TextInputStyle: {
    padding: 10,
    fontSize: 13,
    borderRadius: 10,
    width: "90%",
    color: "black",
    backgroundColor: "white",
  },

  ImageStyle: {
    height: deviceHeight * 0.14,
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 5,
  },

  ImageStyle1: {
    height: deviceHeight * 0.14,
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "center",
  },

  TextStyle: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },

  TextStyle1: {
    color: "gray",
    fontSize: 10,
    marginTop: 2,
  },

  IconStyle: {
    color: "black",
    marginRight: 10,
    alignSelf: "flex-end",
  },
});
