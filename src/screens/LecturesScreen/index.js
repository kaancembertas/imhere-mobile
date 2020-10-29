import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LectureListItem, Loading, Seperator } from '../../components';
import { getLectures } from '../../redux/actions/lectureActions';

const LecturesScreen = (props) => {
  //Variables
  const { navigation } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();

  //Redux
  const dispatch = useDispatch();
  const lecturesProgress = useSelector(
    ({ lecture }) => lecture.lecturesProgress,
  );
  const lectures = useSelector(({ lecture }) => lecture.lectures);

  //Effects
  useEffect(() => {
    dispatch(getLectures());
  }, []);

  //Functions
  const onLecturePress = (lecture) => {
    navigation.navigate('LectureDetailScreen', { lecture });
  };

  const renderItemSeperator = useCallback(() => <Seperator />, []);
  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);
  const getLectureListItemKey = (item) => 'LLI-' + item.lectureCode;

  const renderLectureListItem = useCallback(
    ({ item }) => (
      <LectureListItem
        onPress={onLecturePress}
        lectureCode={item.lectureCode}
        lectureInstructor={item.instructorName + ' ' + item.instructorSurname}
        lectureName={item.lectureName}
        lectureStartDate={item.lectureStartDate}
      />
    ),
    [],
  );

  const Lectures = useCallback(() => {
    if (lecturesProgress) {
      return <Loading />;
    }

    return (
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        indicatorStyle="black"
        data={lectures}
        renderItem={renderLectureListItem}
        keyExtractor={getLectureListItemKey}
        ItemSeparatorComponent={renderItemSeperator}
        ListFooterComponent={renderFooter}
      />
    );
  }, [lecturesProgress]);

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
      <Lectures />
    </View>
  );
};

export default LecturesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
