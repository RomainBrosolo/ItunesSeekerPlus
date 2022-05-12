import React from "react"
import {
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native"
import Header from "../template/Header"
import CardItemMusic from "../template/CardItemMusic"
import { songSelector } from "../../store/reducer"
import { useSelector } from "react-redux"

const LibraryView = ({ route, navigation }) => {
	const songListSelector = useSelector(songSelector)
	return (
		<View style={{ flex:1, backgroundColor: "white" }}>
			<Header style={{ flexShrink: 1 }} title={route} />
			<View style={{ flex: 1 }}>
					<View style={{ flex: 1, alignItems:"center" }}>
						{songListSelector.length > 0 ?<Text style={{fontSize:18, marginTop:5}}>
							{songListSelector.length} morceaux dans la bibliothèque
						</Text> : <Text style={{fontSize:30, position:"relative", top:"50%"}}>
							Bibliothèque vide.
							Veuillez ajouter un morceau dans la recherche Itunes
						</Text> }
						<View style={{ flex:1, marginTop:20}}>
							<ScrollView style={{ flex: 1 }}>
								<FlatList
									numColumns={4}
									data={songListSelector}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({ item }) => (
										<TouchableOpacity
										style={{flex: 1,margin:20}}
											onPress={() => {
												navigation.navigate("Details", {
													...item,
												})
											}}
										>
											<CardItemMusic {...item} />
											
										</TouchableOpacity>
									)}
								/>
							</ScrollView>
						</View>
					</View>
			</View>
		</View>
	)
}


export default LibraryView
