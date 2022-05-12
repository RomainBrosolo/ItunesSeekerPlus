import React from "react"
import { View, Text } from "react-native"

const Header = ({ title }) => {
	return (
		<View style={{ flexGrow: 0,
			flexShrink: 1,
			padding: 15,
			paddingTop: 25,
			backgroundColor: "#e55f00" }}>
			<Text
				style={{
					color: "white",
					fontSize: 40,
				}}
			>
				{title.name}
			</Text>
		</View>
	)
}

export default Header
