import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';
import moment from 'moment';
import _ from 'lodash';
import texts from '../../constants/texts';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

export interface Props {}

export default function LuanchCompareScreen({}: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const cLaunch = route?.params?.launches;
  const tableHead = ['', 'Launch 0', 'Launch 1'];
  const tableTitle = [
    'mission name',
    'launch date',
    'launch site',
    'launch status',
    'links',
    'rocket name',
    'rocket type',
    'payloads',
    'ships',
  ];
  const [tableData, setTableData] = useState([]);
  const elementButton = (value: string) => (
    <TouchableOpacity onPress={() => Linking.openURL(value)}>
      <View>
        <Icon
          name={'link'}
          style={{fontSize: 30, color: colors.blueColor, alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    var _myData: any = [];
    _myData.push([cLaunch[0].mission_name, cLaunch[1].mission_name]);
    _myData.push([
      moment(cLaunch[0].launch_date_local).format('dddd, MMMM Do YYYY hh:mm A'),
      moment(cLaunch[1].launch_date_local).format('dddd, MMMM Do YYYY hh:mm A'),
    ]);
    _myData.push([
      cLaunch[0].launch_site.site_name_long,
      cLaunch[1].launch_site.site_name_long,
    ]);
    var success1 = cLaunch[0].launch_success;
    var success2 = cLaunch[1].launch_success;
    _myData.push([
      success1 ? texts.rocketSuccessText : texts.rocketFailText,
      success2 ? texts.rocketSuccessText : texts.rocketFailText,
    ]);
    _myData.push([
      elementButton(cLaunch[0].links.wikipedia),
      elementButton(cLaunch[1].links.wikipedia),
    ]);
    _myData.push([
      cLaunch[0].rocket.rocket_name,
      cLaunch[1].rocket.rocket_name,
    ]);
    _myData.push([
      cLaunch[0].rocket.rocket_type,
      cLaunch[1].rocket.rocket_type,
    ]);
    _myData.push([
      `${cLaunch[0].rocket.second_stage.payloads.length} payload(s)`,
      `${cLaunch[1].rocket.second_stage.payloads.length} payload(s)`,
    ]);
    _myData.push([
      `${cLaunch[0].ships.length} ship(s)`,
      `${cLaunch[1].ships.length} ship(s)`,
    ]);
    setTableData(_myData);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title={texts.launchCompareTitle}
        isLeft
        leftIcon={'chevron-left'}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        contentContainerStyle={styles.mainContainer}>
        <View>
          <Table borderStyle={{borderWidth: 1}}>
            <Row
              data={tableHead}
              flexArr={[1, 1, 1]}
              style={styles.head}
              textStyle={styles.text1}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={Array(tableData.length).fill(75)}
                textStyle={styles.text2}
              />
              <Rows
                data={tableData}
                flexArr={[1, 1]}
                style={styles.row}
                numberOfLines={10}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
