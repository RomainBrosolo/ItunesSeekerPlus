import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	View,
	TextInput,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native"
import Header from "../template/Header"
import CardItemMusic from "../template/CardItemMusic"
import { addMusic, songSelector } from "../../store/reducer"


const queryResponse = (item) => {
	return {
		title: item.trackName,
		artist: item.artistName,
		profileArtistUrl: item.artistViewUrl,
		profileSongUrl: item.artistViewUrl,
		rating: '',
		artwork: item.artworkUrl100,
		year: item.releaseDate,
		id: item.trackId.toString(),
		trackId: item.trackId.toString(),
		previewUrl: item.previewUrl,
		releaseDate: item.releaseDate,
		genre: item.primaryGenreName,
	}
}

const searchItunes = async (query) => {
	if (query == "") return
	const formattedQuery = query.split(" ").join("+")
	const response = await fetch(
		`https://itunes.apple.com/search?term=${formattedQuery}&kind=music`
	)
	const json = await response.json()
	return json.results
		.filter((item) => item.trackId && item.trackName)
		.map(queryResponse)
}

const SearchView = ({ route }) => {
	const [searchText, setSearchText] = useState("")
	const [listData, setListData] = useState([])
	const dispatch = useDispatch()
	const songListSelector = useSelector(songSelector);

	const handleSubmit = () => {
		searchItunes(searchText).then((result) => {
			setListData(result)
		})
	}

	const dispatchMusic = (item) => {
		let isPresentInSongList = false;
		for(let i=0; i<Object.keys(songListSelector).length; i++) {
			if(songListSelector[i].id == item.id) {
				isPresentInSongList = true;
				break;
			}
			else {
				isPresentInSongList = false;
			}
		}
		if (isPresentInSongList == false ) {
		dispatch(addMusic(item));
		}
	}

	useEffect(() => {
		const timeout = setTimeout(handleSubmit, 1000)
		return () => {
			clearTimeout(timeout)
		}
	}, [searchText])

	return (
		<View style={{ flex:1, backgroundColor:"white" }}>
			<Header title={route} style={{color:"white"}}/>
			<View style={{ padding:20 }}>
				
				<TextInput
				placeholder="Rechercher votre artiste, morceau préféré"
					style={{borderBottomColor: "black",
						borderBottomWidth: 2,
						paddingTop: 5,
						paddingBottom: 5,
						fontSize:20}}
					onChangeText={setSearchText}
					value={searchText}
				/>
			</View>
			<View style={{ flex: 1, alignItems:"center"}}>
				<ScrollView style={{flex:1}}>
					<FlatList
						numColumns={4}
						data={listData}
						renderItem={({ item }) => (
							<TouchableOpacity
							style={{ flex:1, margin:20}}
								onPress={() => dispatchMusic(item)}
							>
								<CardItemMusic {...item} />
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item.id.toString()}
					/>
				</ScrollView>
			</View>
		</View>
	)
}

export default SearchView
