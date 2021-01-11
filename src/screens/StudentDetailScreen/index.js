/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import {
  Label,
  Input,
  Button,
  Seperator,
  Loading,
  LectureDetailListItem,
  ImageModal,
  Touchable,
} from '../../components';
import {
  getAttendenceByUser,
  resetUserAttendence,
} from '../../redux/actions/attendenceActions';
import { FlatList } from 'react-native-gesture-handler';
import { formatDate } from '../../helpers/dateHelper';

const StudentDetailScreen = (props) => {
  //Variables
  const { navigation, route } = props;
  const { params } = route;
  const student = params.student;
  const lectureStartDate = params.lectureStartDate;
  const lectureCode = params.lectureCode;
  console.log(params);

  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();

  //Refs
  const imageModalRef = useRef(null);

  //Redux
  const dispatch = useDispatch();
  const attendenceProgress = useSelector(
    ({ attendence }) => attendence.userAttendenceProgress,
  );
  const attendence = useSelector(({ attendence }) => attendence.userAttendence);

  const attendenceList = useMemo(() => {
    if (attendenceProgress) return [];

    return attendence.map((a) => {
      const lectureDate = new Date(lectureStartDate);
      lectureDate.setDate(lectureDate.getDate() + (a.week - 1) * 7);
      return {
        date: formatDate(lectureDate),
        week: a.week,
        status: a.status,
      };
    });
  }, [attendenceProgress]);

  //Effects
  useEffect(() => {
    navigation.setOptions({
      title: student.name + ' ' + student.surname,
    });
    dispatch(getAttendenceByUser(lectureCode, student.id));

    return () => dispatch(resetUserAttendence());
  }, []);

  //Functions
  const onImagePress = () => {
    imageModalRef.current.show({
      uri: student.image_url,
    });
  };

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
    footer: {
      height: insets.bottom,
    },
  };

  //Design renders
  const renderItemSeperator = useCallback(() => <Seperator />, []);
  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);
  const getKey = useCallback(
    (item, index) => 'studentDetailListItem' + index,
    [],
  );

  const renderLectureDetailListItem = useCallback(
    ({ item }) => (
      <LectureDetailListItem
        status={item.status}
        date={item.date}
        week={item.week}
        disableCameraIcon={true}
      />
    ),
    [],
  );

  const Attendence = useCallback(() => {
    if (attendenceProgress) {
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
        ListFooterComponent={renderFooter}
      />
    );
  }, [attendenceProgress]);

  return (
    <View style={[styles.container, _styles.container]}>
      <ImageModal ref={imageModalRef} />
      <View style={styles.headerContainer}>
        <Touchable onPress={onImagePress}>
          <Image
            resizeMethod="scale"
            width={convert(110)}
            height={convert(110)}
            style={styles.profilePicture}
            source={{ uri: student.image_url }}
          />
        </Touchable>
        <View style={styles.studentInfoContainer}>
          <Label>{student.name + ' ' + student.surname}</Label>
          <Label style={styles.label}>{student.no}</Label>
          <Label style={styles.label}>{student.email}</Label>
        </View>
      </View>
      <Seperator style={styles.headerSeperator} />
      <Attendence />
    </View>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: convert(15),
    paddingHorizontal: convert(15),
    alignItems: 'center',
  },
  profilePicture: {
    backgroundColor: 'transparent',
    width: convert(110),
    height: convert(110),
    borderRadius: convert(55),
    alignSelf: 'center',
  },
  studentInfoContainer: {
    marginLeft: convert(20),
  },
  label: {
    fontFamily: fonts.Montserrat.Medium,
    marginTop: convert(5),
  },
  headerSeperator: {
    marginTop: convert(10),
  },
});
