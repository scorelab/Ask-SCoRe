import React, { Component } from "react";
import { View, Text } from "react-native";

class App extends Component {
	render() {
		return(
			<View style={{justifyContent:"center", flex:1}}>
				<Text style={{alignSelf: "center"}}>Ask-SCoRe App</Text>
			</View>
		);
	}
}

export default App;