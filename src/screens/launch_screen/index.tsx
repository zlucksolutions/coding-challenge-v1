import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  Linking,
  ScrollView,
} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';
import moment from 'moment';
import _ from 'lodash';
import texts from '../../constants/texts';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {gql, useQuery} from '@apollo/client';
import {Table, Row, Rows} from 'react-native-table-component';
import ShipItem from '../../components/ship_item';

export interface Props {}

const LAUNCHES_QUERY = gql`
  query ($id: ID) {
    launchesPast(find: {id: $id}) {
      rocket {
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
      }
    }
  }
`;

export default function LuanchScreen({}: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const detailData = route?.params?.launch;
  const {data} = useQuery(LAUNCHES_QUERY, {
    variables: {id: detailData.id},
  });
  const [payloadTitle, setPayloadTitle] = useState([]);
  const [payloadData, setPayloadData] = useState([]);

  useEffect(() => {
    var payloads = detailData.rocket.second_stage.payloads;
    var _keys = Object.keys(payloads[0]);
    var _myTData: any = [];
    var _myData: any = [];
    _keys.forEach((it, ind) => {
      if (ind !== 0) {
        _myTData.push(it.replaceAll('_', ' '));
      }
    });
    payloads.forEach((it, ind) => {
      var _values = Object.values(it);
      _values.splice(0, 1);
      _myData.push(_values);
    });
    setPayloadTitle(_myTData);
    setPayloadData(_myData);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title={detailData.mission_name}
        isLeft
        leftIcon={'chevron-left'}
        onLeftPress={() => {
          navigation.goBack();
        }}
        isRight
        rightIcon={'link'}
        onRightPress={() => {
          if (detailData.links.wikipedia) {
            Linking.openURL(detailData.links.wikipedia);
          }
        }}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Icon
          name="rocket-launch"
          style={{
            fontSize: 30,
            marginTop: 20,
            color: detailData.launch_success
              ? colors.greenColor
              : colors.redColor,
            alignSelf: 'center',
          }}
        />
        <Text
          style={[
            styles.launchSuccesText,
            {
              color: detailData.launch_success
                ? colors.greenColor
                : colors.redColor,
            },
          ]}>
          {detailData.launch_success
            ? texts.rocketSuccessText
            : texts.rocketFailText}
        </Text>
        <Text style={styles.launchSiteText}>
          {detailData.launch_site.site_name_long}
        </Text>
        <View style={styles.launchDtRow}>
          <View style={styles.launchDateWrapper}>
            <Text numberOfLines={3} style={styles.launchDtText}>
              {moment(detailData.launch_date_local).format(
                'dddd, MMMM Do YYYY',
              )}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.launchDtText}>
            {moment(detailData.launch_date_local).format('hh:mm A')}
          </Text>
        </View>
        <Text
          style={
            styles.textStyle
          }>{`Rocket ${detailData.rocket.rocket_name} of type ${detailData.rocket.rocket_type}`}</Text>
        <Text style={styles.launchSiteText}>{texts.secondStage}</Text>
        <Table
          style={{marginTop: 5}}
          borderStyle={{borderWidth: 2, borderColor: colors.primaryColor}}>
          <Row data={payloadTitle} textStyle={styles.text1} />
          <Rows data={payloadData} textStyle={styles.text} />
        </Table>
        {detailData?.ships && detailData?.ships.length > 0 && (
          <Text style={styles.launchSiteText}>{texts.shipsText}</Text>
        )}
        <FlatList
          data={detailData?.ships}
          renderItem={({item}) => {
            return <ShipItem ship={item} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
