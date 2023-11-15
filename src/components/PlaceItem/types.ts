import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import {PlaceType} from '../../redux/slice/types';

export interface PlaceItemProps {
  item: PlaceType;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  autoCompleteRef: React.RefObject<GooglePlacesAutocompleteRef>;
}
