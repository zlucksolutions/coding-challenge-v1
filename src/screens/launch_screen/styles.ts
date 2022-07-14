import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  launchSiteText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  launchDtRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  launchDateWrapper: {
    width: '70%',
  },
  launchDtText: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.black,
  },
  launchSuccesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.greenColor,
    textAlign: 'center',
    marginTop: 10,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.black,
  },
  text: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.black,
    margin: 6,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
    margin: 6,
    textTransform: 'uppercase',
  },
});

export default styles;
