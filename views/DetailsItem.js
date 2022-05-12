import React from "react"
import { View, Text, Image, TouchableOpacity, TextInput, Button, ScrollView, } from "react-native"
import { updateMusic } from "../store/reducer"
import { useDispatch} from "react-redux"

const DetailsItem = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const item = route.params
	const date = new Date(item.year)
	const formatDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()}`

	const checkRating = (value) => {
        if (value >= 0 && value <= 5 && value.length <= 1) {
            item.rating = value;
        }
    }

    const saveItem = async () => {
        if (item.rating >= 1 && item.rating && item.rating <= 5) {
			dispatch(updateMusic({id: item.id, item: item}));
			navigation.navigate('HomePage');
        }
    };

	return (
		<View style={{ margin:'auto'}}>
			<ScrollView style={{ flex: 1 }}>
			<Image style={{ height:500, width:500, flex:1, margin:"auto"}} source={item.artwork} />
			<View
				style={{
					marginTop:30,
					borderWidth:2,
					borderColor: "black",
					padding: 10,
				}}
			>
				<Text
					style={{fontSize: 30}}
				>
					{item.title}
				</Text>
				<Text style={{fontSize: 20 }}>
					{item.artist}
				</Text>
			</View>
			<View>
				<View
					style={{
						flexDirection: "column",
						alignItems:"center",
						padding: 10,
					}}
				>
					<Text style={{ fontSize:15 }}>Date de sortie : {formatDate}</Text>
					<Text style={{ fontSize:15 }}>Genre : {item.genre}</Text>
				</View>
				<View style={{ flexDirection: "row", gap: 10, justifyContent:"center" }}>
					<TouchableOpacity
						onPress={() => {
							window.open(item.previewUrl, '_blank');
						}}
					>
						<View style={styles.button}>
							<Text style={{ color:"white" }} >Télécharger Extrait du morceau</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							window.open(item.profileArtistUrl, '_blank');
						}}
					>
						<View style={styles.button}>
							<Text style={{ color:"white" }}>Profil iTunes de {item.artist}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							window.open(item.profileSongUrl, '_blank');
						}}
					>
						<View style={styles.button}>
							<Text style={{color:"white" }}>Lien iTunes vers {item.title}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{flexDirection: 'row', justifyContent:"center", marginTop:20}}>
                <Text style={{alignSelf:"center", fontSize:20}}>Donnez une note :</Text>
				<TextInput  style={{width:20, textAlign:"center", marginLeft:10, borderColor:"black", borderWidth:2}} onChangeText ={checkRating} keyboardType="numeric" placeholder=""/>
                <Text style={{alignSelf:"center", marginRight:20}}> / 5</Text>
				<Button title="OK" onPress={saveItem}></Button>
            </View>
            
			</View>
			</ScrollView>
		</View>
	)
}

const styles = {
	button: {
		borderRadius: 50,
		padding: 10,
		backgroundColor: "#3053ff",
		borderWidth: 0,
	}
}

export default DetailsItem
