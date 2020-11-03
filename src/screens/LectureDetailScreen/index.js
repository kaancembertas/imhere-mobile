import React, { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons, fonts } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import {
  Label,
  LectureDetailListItem,
  Loading,
  Seperator,
  Touchable,
} from '../../components';
import { ENTITY } from '../../config/api';
import {
  getAttendence,
  resetAttendence,
} from '../../redux/actions/lectureActions';
import { formatDate } from '../../helpers/dateHelper';

const LectureDetailScreen = (props) => {
  //Variables
  const { navigation, route } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const lecture = route.params.lecture;
  const { lectureCode, lectureName, lectureStartDate } = lecture;

  //Effects
  useEffect(() => {
    navigation.setOptions({
      title: lectureName,
      headerRight: headerRight,
    });
  }, []);

  useEffect(() => {
    dispatch(getAttendence(lectureCode));

    return () => dispatch(resetAttendence());
  }, []);

  //Redux
  const dispatch = useDispatch();
  const userRole = useSelector(({ user }) => user.info.role);
  const attendenceProgress = useSelector(
    ({ lecture }) => lecture.attendenceProgress,
  );
  const attendence = useSelector(({ lecture }) => lecture.attendence);
  const attendenceList = useMemo(() => {
    if (attendenceProgress || !attendence) return [];

    return attendence.map((a) => {
      const lectureDate = new Date(lectureStartDate);
      lectureDate.setDate(lectureDate.getDate() + a.week * 7);
      return {
        date: formatDate(lectureDate),
        week: a.week,
        status: a.status,
      };
    });
  }, [attendenceProgress, attendence]);

  // Design Renders
  const renderHeader = useCallback(() => {
    if (userRole === ENTITY.USER.INSTRUCTOR) return null;
    const joined = attendence.filter(
      (a) => a.status === ENTITY.ATTENDENCE.JOINED,
    ).length;
    const notJoined = attendence.filter(
      (a) => a.status === ENTITY.ATTENDENCE.NOT_JOINED,
    ).length;
    return (
      <>
        <View style={styles.header}>
          <View style={styles.infoBox}>
            <Image
              resizeMethod="scale"
              style={styles.icon}
              source={icons.tick}
            />
            <Label style={styles.infoText}>JOINED: {joined}</Label>
          </View>
          <View style={styles.infoBox}>
            <Image
              resizeMethod="scale"
              style={styles.icon}
              source={icons.cross}
            />
            <Label style={styles.infoText}>NOT JOINED: {notJoined}</Label>
          </View>
        </View>
        <Seperator />
      </>
    );
  }, [attendence]);

  const renderLectureDetailListItem = useCallback(
    ({ item }) => (
      <LectureDetailListItem
        status={item.status}
        date={item.date}
        week={item.week}
      />
    ),
    [],
  );

  const headerRight = useMemo(() => (
    <Touchable style={styles.headerRightContainer}>
      <Image source={icons.people} style={styles.peopleIcon} />
    </Touchable>
  ));

  const renderItemSeperator = useCallback(() => <Seperator />, []);

  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);

  const getKey = useCallback(
    (item, index) => 'lectureDetailListItem' + index,
    [],
  );

  const Attendence = useCallback(() => {
    if (attendenceProgress || attendenceList.length === 0) {
      return <Loading />;
    }

    return (
      <FlatList
        indicatorStyle="black"
        scrollIndicatorInsets={{ right: 1 }}
        data={attendenceList}
        renderItem={renderLectureDetailListItem}
        keyExtractor={getKey}
        ItemSeparatorComponent={renderItemSeperator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    );
  }, [attendenceProgress, attendenceList]);

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
      <Attendence />
    </View>
  );
};

export default LectureDetailScreen;

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
  headerRightContainer: {
    width: convert(70),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  peopleIcon: {
    width: convert(30),
    height: convert(30),
  },
});
