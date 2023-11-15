import React, {FC, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';

import {FloatingActionButton} from '../../components/FloatingActionButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {PlacesBottomSheet} from '../../components/PlacesBottomSheet';
import {addPlace} from '../../redux/slice/placesSlice';
import {RootState} from '../../redux/store';
import {GOOGLE_MAPS_API_KEY, LOCATION_DELTA} from '../../constants';

export const Home: FC = () => {
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const autoCompleteRef = useRef<GooglePlacesAutocompleteRef>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectedPlace = useSelector(
    (state: RootState) => state.places.selectedPlace,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      mapRef.current?.animateToRegion(
        {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: LOCATION_DELTA.latitudeDelta,
          longitudeDelta: LOCATION_DELTA.longitudeDelta,
        },
        1500,
      );
    });
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      mapRef.current?.animateToRegion(
        {
          latitude: selectedPlace.location.lat,
          longitude: selectedPlace.location.lng,
          latitudeDelta: LOCATION_DELTA.latitudeDelta,
          longitudeDelta: LOCATION_DELTA.longitudeDelta,
        },
        1000,
      );
    }
  }, [selectedPlace]);

  const onSelect = useCallback(
    (_: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (!details) {
        return;
      }

      mapRef.current?.animateToRegion(
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: LOCATION_DELTA.latitudeDelta,
          longitudeDelta: LOCATION_DELTA.longitudeDelta,
        },
        1000,
      );

      dispatch(addPlace(details));
    },
    [dispatch],
  );

  const handlePresentModalPress = useCallback(() => {
    autoCompleteRef?.current?.blur();
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider="google"
        showsUserLocation
      />
      <GooglePlacesAutocomplete
        ref={autoCompleteRef}
        placeholder="Search places"
        debounce={500}
        minLength={2}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        onPress={onSelect}
        fetchDetails
      />
      <FloatingActionButton onPress={handlePresentModalPress} />
      <PlacesBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        autoCompleteRef={autoCompleteRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
