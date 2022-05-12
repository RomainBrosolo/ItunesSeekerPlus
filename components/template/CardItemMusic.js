import React from "react"
import { View, Text, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import {useRoute} from '@react-navigation/native';
import { useDispatch } from "react-redux"
import { removeMusic } from "../../store/reducer"

const CardItemMusic = (item) => {
	const route = useRoute();
	const dispatch = useDispatch();
	return (
		<View style={{width:308}}>
			<Image style={{ height: 200,borderTopLeftRadius:10, borderTopRightRadius:10 }} source={item.artwork} />
			<View style={{ backgroundColor: "#3053ff", padding: 10}}>
				<Text
					style={{
						color:"white",
						fontSize: 25,
					}}
				>
					{item.title}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ color:"white", fontSize: 20 }}>
						{item.artist}
					</Text>
					{item.rating ? <Text style={{ color:"white", fontSize: 20 }}>
						{item.rating} <Ionicons name={"star"} size={20} color={"yellow"} />
					</Text>: null }
				</View>
			</View>
			{route.name == "Ma bibliothèque musicale" ? <View style={styles.button}>
				<Ionicons name={"trash-outline"} size={20} color={"white"} onPress={() => {
				dispatch(removeMusic({id: item.id, item: item}))
				}}/>
			</View>: null}
			{route.name == "Itunes" ? <Text style={styles.details}>Ajouter</Text> : <Text style={styles.details}>Details</Text>}
		</View>
	)
}

const styles = {
	details: {
		backgroundColor:"lightgrey",
		width:"100%",
		height:40,
		borderBottomLeftRadius:10,
		borderBottomRightRadius:10,
		textAlign:"center",
		padding:10
	},
	button: {
		borderRadius: 10,
		position:"absolute",
		top:0,
		right:0,
		padding: 10,
		backgroundColor: "red",
		borderWidth: 0,
	}
}


export default CardItemMusic
