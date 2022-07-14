import {Platform, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    height: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: colors.secondaryColor,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  leftContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  centerContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  rightContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  titleText: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
