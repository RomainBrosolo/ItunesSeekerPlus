import { configureStore } from "@reduxjs/toolkit"
import songsReducer from "./reducer"

export default configureStore({
	reducer: {
		songs: songsReducer,
	},
})
