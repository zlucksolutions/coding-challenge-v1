import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';

export interface Props {
  isLeft?: boolean;
  leftIcon?: string;
  title: string;
  onLeftPress?: any;
  isRight?: boolean;
  rightIcon?: string;
  onRightPress?: any;
}

export default function Header({
  title,
  isLeft,
  leftIcon,
  onLeftPress,
  isRight,
  rightIcon,
  onRightPress,
}: Props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowWrapper}>
        <View style={styles.leftContainer}>
          {isLeft && (
            <TouchableOpacity
              onPress={() => {
                onLeftPress && onLeftPress();
              }}>
              <Icon name={leftIcon} size={20} color={colors.black} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {isRight && (
            <TouchableOpacity
              onPress={() => {
                onRightPress && onRightPress();
              }}>
              <Icon name={rightIcon} size={20} color={colors.black} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
