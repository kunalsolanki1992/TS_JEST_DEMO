import { Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('screen').width;
export const DEVICE_HEIGHT = Dimensions.get('screen').height;
const iPhone13_width = 390;
const iPhone13_height = 844;

export const HORIZONTAL_DIMENS = {
    _15: (DEVICE_WIDTH * 15) / iPhone13_width,
    _20: (DEVICE_WIDTH * 20) / iPhone13_width,
}