import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  headingText: {width: '60%'},
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: colors.white,
  },
  head: {height: 40, backgroundColor: colors.white},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: colors.white},
  row: {height: 75},
  text: {textAlign: 'center', marginRight: 6},
  text1: {
    textAlign: 'center',
    marginRight: 6,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  text2: {
    textAlign: 'center',
    marginRight: 6,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default styles;
