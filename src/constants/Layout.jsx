import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const LAYOUT = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
}

const scale = width / 320   ;
export function actuatedNormalize(size) {
  const newSize = size * scale 
   if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
   } else {
     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}