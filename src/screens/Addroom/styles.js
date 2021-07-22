import {StyleSheet, Dimensions} from "react-native";
import {
  COLOR_PRIMARY,
  COLOR_LIGHT_PRIMARY,
  COLOR_GRAY_PRIMARY,
} from "../../config/styles";

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
    borderBottomColor: COLOR_PRIMARY,
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
    backgroundColor: COLOR_GRAY_PRIMARY,
    justifyContent: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },

  ViewStyle2: {
    width: 250,
    minHeight: 100,
    backgroundColor: COLOR_GRAY_PRIMARY,
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
    backgroundColor: COLOR_GRAY_PRIMARY,
    justifyContent: "center",
    borderBottomColor: COLOR_PRIMARY,
    borderBottomWidth: 2,
  },

  ViewStyle4: {
    width: 250,
    minHeight: 100,
    backgroundColor: COLOR_GRAY_PRIMARY,
    padding: 10,
    borderBottomColor: COLOR_PRIMARY,
    borderBottomWidth: 2,
    marginTop: 10,
    borderRadius: 10,
  },

  ViewStyle5: {
    height: 40,
    width: 250,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
  },

  adminTextStyle: {
    height: 30,
    backgroundColor: COLOR_GRAY_PRIMARY,
    borderRadius: 30,
    paddingLeft: 10,
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
    backgroundColor: COLOR_GRAY_PRIMARY,
    borderRadius: 10,
  },

  AskButtonStyle1: {
    width: 60,
    height: 35,
    backgroundColor: COLOR_LIGHT_PRIMARY,
    borderRadius: 10,
    right: 10,
    justifyContent: "center",
  },
});
