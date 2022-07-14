import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import colors from '../../constants/colors';
import styles from './styles';
import _ from 'lodash';
import texts from '../../constants/texts';
import Header from '../../components/header';
import LaunchItem from '../../components/launch_item';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import datas from '../../constants/data';

var _selectedType = datas.filterData[0].value;

const LAUNCHES_QUERY = gql`
  query ($limit: Int, $offset: Int, $search_string: String) {
    launchesPast(limit: $limit, offset: $offset, find: {${_selectedType}:$search_string}) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      launch_success
      links {
        wikipedia
      }
      rocket {
        rocket_name
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
        rocket_type
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

export interface Props {}

export default function HomeScreen({}: Props) {
  const navigation = useNavigation();
  const [pagination, setPagination] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(datas.filterData);
  const [selectedType, setSelectedType] = useState(items[0].value);
  const [isCompare, setIsCompare] = useState(false);
  const [extraData, setExtraData] = useState(false);
  const [compareLaunches, setCompareLaunches] = useState([]);
  const {data, loading, fetchMore, refetch} = useQuery(LAUNCHES_QUERY, {
    variables: {offset: 0, limit},
  });
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  //Search
  useEffect(() => {
    if (!_.isEmpty(search.trim()) && search.length >= 2) {
      setIsSearch(true);
      var _newData = [];
      if (selectedType === items[0].value) {
        _newData = data?.launchesPast.filter((launch: any) =>
          launch?.mission_name?.toLowerCase().includes(search.toLowerCase()),
        );
      } else {
        _newData = data?.launchesPast.filter((launch: any) =>
          launch?.rocket?.rocket_name
            ?.toLowerCase()
            .includes(search.toLowerCase()),
        );
      }
      setSearchData(_newData);
      // if (pagination > 0) {
      //   setPagination(0);
      //   setLimit(10);
      // }
      // refetch({
      //   offset: 0,
      //   limit: 10,
      //   search_string: search,
      // });
    } else {
      setIsSearch(false);
    }
  }, [data?.launchesPast, items, search, selectedType]);

  //Long press
  const _handleLongPress = (item: any) => {
    if (!isCompare) {
      setIsCompare(true);
      _handleCompareLogic(item);
    }
  };

  //Normal press
  const _handlePress = (item: any) => {
    if (isCompare) {
      _handleCompareLogic(item);
    } else {
      navigation.navigate('Launch', {launch: item});
    }
  };

  //Main logic to handle comparision array
  const _handleCompareLogic = (item: any) => {
    var _allData = compareLaunches;
    var isThere = _allData.findIndex(
      (_it: any) => _it.toString() === item.id.toString(),
    );
    if (isThere !== -1) {
      //remove
      _allData.splice(isThere, 1);
    } else {
      if (_allData.length === 2) {
        //compare only 2
        Toast.show(texts.compareLimitText, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        return;
      }
      //add
      _allData.push(item?.id);
    }
    if (_allData.length === 0) {
      setIsCompare(false);
      setCompareLaunches([]);
      setExtraData(!extraData);
    } else {
      setCompareLaunches(_allData);
      setExtraData(!extraData);
    }
  };

  //Handle click on compare
  const _onComparePress = () => {
    var myData: any[] = [];
    data &&
      data.launchesPast.forEach((ite: any) => {
        if (compareLaunches.includes(ite.id)) {
          myData.push(ite);
        }
      });
    navigation.navigate('LaunchCompare', {launches: myData});
    setIsCompare(false);
    setCompareLaunches([]);
    setExtraData(!extraData);
  };

  //Pagination
  const _handleOnEndReach = () => {
    console.log(onEndReachedCalledDuringMomentum, loading);
    if (!onEndReachedCalledDuringMomentum) {
      if (!loading) {
        setPagination(pagination + 1);
        const currentLength = data.launchesPast.length;
        fetchMore({
          variables: {
            offset: currentLength,
            limit: 10,
          },
        }).then(fetchMoreResult => {
          // Update variables.limit for the original query to include
          // the newly added feed items.
          setLimit(currentLength + fetchMoreResult.data.launchesPast.length);
        });
      }
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title={texts.launchesListTitle}
        isRight={isCompare && compareLaunches.length === 2}
        rightIcon={'documents'}
        onRightPress={_onComparePress}
      />
      <View style={styles.mainContainer}>
        {/* Search component */}
        {data && data.launchesPast && (
          <View style={styles.searchWrapper}>
            <TextInput
              onChangeText={setSearch}
              placeholder={'Search'}
              style={styles.searchStyle}
            />
            <View style={styles.decoSep} />
            <DropDownPicker
              open={open}
              value={selectedType}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedType}
              setItems={setItems}
              zIndex={1000}
              style={styles.pickerStyle}
              dropDownContainerStyle={styles.pickerItemStyle}
              listItemLabelStyle={styles.pickerItemTextStyle}
            />
          </View>
        )}
        {/* Full screen loader */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={colors.primaryColor} />
          </View>
        ) : (
          <FlatList
            style={{marginTop: 20, zIndex: -1}}
            data={isSearch ? searchData : data && data.launchesPast}
            extraData={extraData}
            renderItem={({item}) => {
              const isSelected = compareLaunches.includes(item?.id);
              return (
                <LaunchItem
                  launch={item}
                  isComparing={isCompare}
                  isSelected={isSelected}
                  onPress={() => {
                    _handlePress(item);
                  }}
                  onLongPress={() => {
                    _handleLongPress(item);
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.launchSeperator} />;
            }}
            keyExtractor={launch => launch?.id.toString()}
            onEndReachedThreshold={0.03}
            onMomentumScrollBegin={() => {
              setOnEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={_handleOnEndReach}
            ListFooterComponent={() => {
              return (
                <>
                  {loading && (
                    <ActivityIndicator
                      size={'small'}
                      color={colors.semiTransparent}
                    />
                  )}
                </>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
