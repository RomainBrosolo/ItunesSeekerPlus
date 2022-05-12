import { createSlice } from "@reduxjs/toolkit"

export const songsSlice = createSlice({
	name: "songs",
	initialState: [],
	reducers: {
		addMusic: (state, action) => {
			return [...state, { ...action.payload }]
		},
		removeMusic: (state, action) => {
			return state.filter((item) => item.id !== action.payload.id)
		},
		updateMusic: (state, action) => {
			return state.map((item) =>
          item.id == action.payload.id
            ? { ...item, rating: action.payload.item.rating }
            : item
        );
		}
	},
})

export const { addMusic, removeMusic, updateMusic } = songsSlice.actions
export const songSelector = (state) => state.songs
export default songsSlice.reducer
