import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';

export interface PlacesBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  autoCompleteRef: React.RefObject<GooglePlacesAutocompleteRef>;
}
