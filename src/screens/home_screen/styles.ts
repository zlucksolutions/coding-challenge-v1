import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  loaderContainer: {
    justifyContent: 'center',
    backgroundColor: colors.semiTransparent,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  launchSeperator: {
    marginVertical: 10,
  },
  searchWrapper: {
    borderRadius: 500,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
    backgroundColor: colors.white,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchStyle: {
    color: colors.black,
    width: '65%',
    fontSize: 14,
  },
  pickerStyle: {
    width: '40%',
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    borderRadius: 500,
  },
  pickerItemStyle: {
    backgroundColor: colors.white,
    borderColor: colors.transparent,
  },
  decoSep: {
    backgroundColor: colors.secondaryColor,
    width: 2,
    height: '100%',
    alignSelf: 'center',
  },
  pickerItemTextStyle: {
    color: colors.black,
    fontSize: 14,
  },
});

export default styles;
