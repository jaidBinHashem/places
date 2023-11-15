import React, {FC, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

import {RootState} from '../../redux/store';
import {ListEmptyComponent} from '../ListEmptyComponent';
import {PlaceItem} from '../PlaceItem';
import {PlacesBottomSheetProps} from './types';

export const PlacesBottomSheet: FC<PlacesBottomSheetProps> = ({
  bottomSheetModalRef,
  autoCompleteRef,
}) => {
  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const places = useSelector((state: RootState) => state.places.history);

  const renderItem = ({item}: any) => (
    <PlaceItem
      item={item}
      bottomSheetModalRef={bottomSheetModalRef}
      autoCompleteRef={autoCompleteRef}
    />
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    [bottomSheetModalRef],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <BottomSheetFlatList
        data={places}
        keyExtractor={place => place.placeId}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={ListEmptyComponent}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
});
