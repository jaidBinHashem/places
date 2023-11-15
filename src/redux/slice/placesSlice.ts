import {createSlice} from '@reduxjs/toolkit';
import {PlaceType} from './types';

export const placesSlice = createSlice({
  name: 'places',
  initialState: {
    history: [] as PlaceType[],
    selectedPlace: null as PlaceType | null,
  },
  reducers: {
    addPlace: (state, action) => {
      const {
        name,
        geometry: {location},
        place_id,
      } = action.payload;

      let newHistory = [...state.history];
      newHistory.unshift({name, location, placeId: place_id});
      state.history = [...newHistory];
    },

    selectPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const {addPlace, selectPlace} = placesSlice.actions;
