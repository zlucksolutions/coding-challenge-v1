import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  launchCard: {
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  launchCardMissionText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    width: '80%',
  },
  launchCardSiteText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.black,
    marginVertical: 5,
    width: '70%',
  },
  imageStyle: {
    height: 100,
    width: 120,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default styles;
