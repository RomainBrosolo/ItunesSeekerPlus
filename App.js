import React from "react"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import LibraryView from "./components/Library/LibraryView"
import SearchView from "./components/Search/SearchView"
import DetailsItem from "./views/DetailsItem"
import Ionicons from "react-native-vector-icons/Ionicons";
import store from "./store/store"

const Tabs = createBottomTabNavigator()
const MainStack = createStackNavigator()

const HomePage = () => {
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName
					switch (route.name) {
						case "Ma bibliothèque musicale":
							iconName = focused
								? "library" : "library-outline";
							break
						case "Itunes":
							iconName = focused
								? "musical-notes"
								: "musical-notes-outline"
							break
						default:
							iconName = "ban"
							break
					}
					return (
						<Ionicons name={iconName} size={size} color={color} />
					)
				},tabBarActiveTintColor:"white", tabBarInactiveTintColor:"white", showLabel: true, tabBarStyle:{backgroundColor: "#e55f00",
        height: 60,
        padding:10},
			})}
			>
			<Tabs.Screen name="Ma bibliothèque musicale">
				{(props) => <LibraryView {...props} />}
			</Tabs.Screen>
			<Tabs.Screen name="Itunes">
				{(props) => <SearchView {...props} />}
			</Tabs.Screen>
		</Tabs.Navigator>
	)
}

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MainStack.Navigator screenOptions={{presentation:"modal", headerMode:"screen"}}>
					<MainStack.Screen
						name="HomePage"
						options={{ headerShown: false }}
						component={HomePage}
					/>
					<MainStack.Screen
						name="Details"
						component={DetailsItem}
					/>
				</MainStack.Navigator>
			</NavigationContainer>
		</Provider>
	)
	
}

export default App
