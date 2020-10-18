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
  const onLecturePress = (classItem) => {
    navigation.navigate('LectureDetailScreen', { classItem });
  };

  const renderItemSeperator = useCallback(() => <Seperator />, []);
  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);
  const getLectureListItemKey = (item) => 'LLI-' + item.lectureCode;

  const renderLectureListItem = useCallback(
    ({ item }) => (
      <LectureListItem
        onPress={onLecturePress}
        code={item.lectureCode}
        instructor={item.instructorName + ' ' + item.instructorSurname}
        name={item.lectureName}
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
