/* eslint-disable no-unused-vars */
import {StyleSheet, Dimensions} from "react-native";

let deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  HeaderStyle1: {
    flexDirection: "row",
  },

  ImageView: {
    width: 55,
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
    width: 60,
    height: 30,
    backgroundColor: "#9cd683",
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
    borderBottomColor: "#51AD28",
    borderBottomWidth: 2,
    marginBottom: 3,
  },

  TextStyle2: {
    flex: 1,
    color: "black",
    padding: 10,
    fontSize: 20,
  },

  TextStyle: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },

  ViewStyle: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 100,
  },

  TextStyle1: {
    fontSize: 19,
    alignSelf: "center",
    fontWeight: "500",
    marginBottom: 10,
  },

  ViewStyle1: {
    width: 250,
    height: 60,
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },

  ViewStyle2: {
    width: 250,
    minHeight: 100,
    backgroundColor: "#dbdbdb",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    marginTop: 10,
    borderRadius: 10,
  },

  TouchableStyle: {
    height: 40,
    width: 250,
    backgroundColor: "gray",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
  },

  ViewStyle3: {
    width: 250,
    height: 60,
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    borderBottomColor: "#51AD28",
    borderBottomWidth: 2,
  },

  ViewStyle4: {
    width: 250,
    minHeight: 100,
    backgroundColor: "#dbdbdb",
    padding: 10,
    borderBottomColor: "#51AD28",
    borderBottomWidth: 2,
    marginTop: 10,
    borderRadius: 10,
  },

  ViewStyle5: {
    height: 40,
    width: 250,
    backgroundColor: "#51AD28",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
  },

  adminTextStyle: {
    height: 30,
    backgroundColor: "#dbdbdb",
    borderRadius: 30,
    paddingLeft: 10
  },

  ViewStyle6: {
    borderRadius: 10,
    marginHorizontal: 10,
    width: "70%",
    marginRight: 15,
  },

  TextInputStyle1: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#dbdbdb",
    borderRadius: 10,
  },

  AskButtonStyle1: {
    width: 60,
    height: 35,
    backgroundColor: "#9cd683",
    borderRadius: 10,
    right: 10,
    justifyContent: "center",
  },

});
