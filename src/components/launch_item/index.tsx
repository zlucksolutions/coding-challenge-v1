import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import moment from 'moment';

export interface Props {
  launch: any;
  onPress: any;
  onLongPress: any;
  isSelected: boolean;
  isComparing: boolean;
}

export default function LaunchItem({
  launch,
  onPress,
  onLongPress,
  isSelected,
  isComparing,
}: Props) {
  const {mission_name, launch_date_local, launch_site} = launch;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.launchCard}
      onLongPress={onLongPress}>
      {isComparing && (
        <View
          style={[
            styles.launchCompareWrapper,
            {backgroundColor: isSelected ? colors.greenColor : colors.grey},
          ]}>
          <Icon name={'check'} color={colors.white} size={15} />
        </View>
      )}
      <Text style={styles.launchCardMissionText}>{mission_name}</Text>
      <Text style={styles.launchCardSiteText}>
        {launch_site.site_name_long}
      </Text>
      <View style={styles.launchCardDtRow}>
        <View style={styles.launchCardDateWrapper}>
          <Text numberOfLines={3} style={styles.launchCardDtText}>
            {moment(launch_date_local).format('dddd, MMMM Do YYYY')}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.launchCardDtText}>
          {moment(launch_date_local).format('hh:mm A')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
