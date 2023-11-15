import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {selectPlace} from '../../redux/slice/placesSlice';
import {PlaceItemProps} from './types';

export const PlaceItem: FC<PlaceItemProps> = ({
  item,
  bottomSheetModalRef,
  autoCompleteRef,
}) => {
  const dispatch = useDispatch();

  const setSelectPlace = useCallback(() => {
    dispatch(selectPlace(item));
    bottomSheetModalRef?.current?.close();
    autoCompleteRef?.current?.setAddressText(item.name);
  }, [dispatch, item, bottomSheetModalRef, autoCompleteRef]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={setSelectPlace}>
      <Image
        style={styles.locationLogo}
        source={require('../../../assets/map.png')}
      />
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <View>
          <Text>Latitude: {item.location.lat}</Text>
          <Text>Longitude: {item.location.lng}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    marginBottom: 10,
  },
  locationLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
