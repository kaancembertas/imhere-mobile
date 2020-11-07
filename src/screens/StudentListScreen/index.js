import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { Loading, Seperator } from '../../components';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button, StudentListItem } from '../../components';
import {
  getLectureStudents,
  resetLectureStudents,
} from '../../redux/actions/lectureActions';
import { FlatList } from 'react-native-gesture-handler';

const StudentListScreen = (props) => {
  //Variables
  const { navigation, route } = props;
  const { params } = route;
  const { lectureCode, lectureStartDate } = params;
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  //Redux
  const dispatch = useDispatch();
  const lectureStudents = useSelector(({ lecture }) => lecture.lectureStudents);
  const getLectureStudentsProgress = useSelector(
    ({ lecture }) => lecture.getLectureStudentsProgress,
  );

  //Effects
  useEffect(() => {
    dispatch(getLectureStudents(lectureCode));
    return () => dispatch(resetLectureStudents());
  }, []);

  //Functions
  const onStudentItemPress = (student) => {
    navigation.navigate('StudentDetailScreen', {
      student,
      lectureCode,
      lectureStartDate,
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

  // Design Renders
  const renderStudentListItem = useCallback(
    ({ item }) => (
      <StudentListItem
        onPress={onStudentItemPress}
        id={item.id}
        name={item.name}
        surname={item.surname}
        no={item.no}
        image_url={item.image_url}
        email={item.email}
      />
    ),
    [],
  );

  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);
  const renderItemSeperator = useCallback(() => <Seperator />, []);
  const getKey = useCallback((item) => 'studentListItem' + item.id, []);

  const StudentList = useCallback(() => {
    if (getLectureStudentsProgress) {
      return <Loading />;
    }

    return (
      <FlatList
        indicatorStyle="black"
        scrollIndicatorInsets={{ right: 1 }}
        data={lectureStudents}
        renderItem={renderStudentListItem}
        keyExtractor={getKey}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderItemSeperator}
      />
    );
  }, [getLectureStudentsProgress]);

  return (
    <View style={[styles.container, _styles.container]}>
      <StudentList />
    </View>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
