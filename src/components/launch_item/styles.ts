import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  launchCard: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderLeftColor: colors.primaryColor,
    borderLeftWidth: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  launchCardMissionText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
  },
  launchCardDtRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  launchCardDateWrapper: {
    width: '70%',
  },
  launchCardDtText: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.black,
  },
  launchCardSiteText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.black,
    marginVertical: 5,
  },
  launchCompareWrapper: {
    height: 20,
    width: 20,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
