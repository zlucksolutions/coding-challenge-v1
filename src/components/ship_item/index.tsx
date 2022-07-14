import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

export interface Props {
  ship: any;
}

export default function ShipItem({ship}: Props) {
  const {name, home_port, image} = ship;
  return (
    <View style={styles.launchCard}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: image}}
          style={styles.imageStyle}
          resizeMode={'cover'}
        />
        <View>
          <Text numberOfLines={10} style={styles.launchCardMissionText}>
            {name}
          </Text>
          <Text numberOfLines={10} style={styles.launchCardSiteText}>
            {home_port}
            {home_port}
          </Text>
        </View>
      </View>
    </View>
  );
}
