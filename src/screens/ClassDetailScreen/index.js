import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons, fonts } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import { Label, ClassDetailListItem, Seperator } from '../../components';
import { ENTITY } from '../../config/api';

const ClassDetailScreen = (props) => {
  //Variables
  const { navigation, route } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const classItem = route.params.classItem;

  //Effects
  useEffect(() => {
    navigation.setOptions({
      title: classItem.name,
    });
  });

  //Redux
  const dispatch = useDispatch();
  const userRole = useSelector(({ user }) => user.role);

  //Functions
  const renderHeader = useCallback(() => {
    if (userRole === ENTITY.USER.INSTRUCTOR) return null;
    return (
      <>
        <View style={styles.header}>
          <View style={styles.infoBox}>
            <Image
              resizeMethod="scale"
              style={styles.icon}
              source={icons.tick}
            />
            <Label style={styles.infoText}>JOINED: 3</Label>
          </View>
          <View style={styles.infoBox}>
            <Image
              resizeMethod="scale"
              style={styles.icon}
              source={icons.cross}
            />
            <Label style={styles.infoText}>NOT JOINED: 2</Label>
          </View>
        </View>
        <Seperator />
      </>
    );
  }, []);

  const renderClassDetailListItem = useCallback(
    ({ item }) => (
      <ClassDetailListItem
        status={item.status}
        date={item.date}
        week={item.week}
      />
    ),
    [],
  );

  const renderItemSeperator = useCallback(() => <Seperator />, []);

  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);

  const getKey = useCallback(
    (item, index) => 'classDetailListItem' + index,
    [],
  );

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
    footer: {
      height: insets.bottom,
    },
  };

  return (
    <View style={[styles.container, _styles.container]}>
      <FlatList
        data={sampleData}
        renderItem={renderClassDetailListItem}
        keyExtractor={getKey}
        ItemSeparatorComponent={renderItemSeperator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ClassDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: convert(10),
  },
  icon: {
    width: convert(30),
    height: convert(30),
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: convert(15),
  },
  infoText: {
    fontFamily: fonts.Montserrat.Medium,
    letterSpacing: convert(0.1),
    marginTop: convert(5),
  },
});

const sampleData = [
  {
    status: 1,
    date: '05.10.2020 - 15:00',
    week: 1,
  },
  {
    status: 2,
    date: '05.10.2020 - 15:00',
    week: 2,
  },
  {
    status: 1,
    date: '05.10.2020 - 15:00',
    week: 3,
  },
  {
    status: 2,
    date: '05.10.2020 - 15:00',
    week: 4,
  },
  {
    status: 1,
    date: '05.10.2020 - 15:00',
    week: 5,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 6,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 7,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 8,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 9,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 10,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 11,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 12,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 13,
  },
  {
    status: 0,
    date: '05.10.2020 - 15:00',
    week: 14,
  },
];
