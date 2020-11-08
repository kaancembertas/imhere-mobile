import React, { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import {
  Label,
  Input,
  Button,
  Loading,
  SelectLectureItem,
} from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import { getAllLectures } from '../../redux/actions/lectureActions';

const SelectLecturesScreen = (props) => {
  //Variables
  const { navigation } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();

  //Redux
  const dispatch = useDispatch();
  const allLectures = useSelector(({ lecture }) => lecture.allLectures);
  const allLecturesProgress = useSelector(
    ({ lecture }) => lecture.allLecturesProgress,
  );

  //Effects
  useEffect(() => {
    dispatch(getAllLectures());
  }, []);

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
    footer: {
      height: insets.bottom + convert(60),
    },
    saveButton: {
      marginBottom: insets.bottom + convert(10),
    },
  };

  //Design renders
  const renderSelectLectureItem = useCallback(
    ({ item }) => (
      <SelectLectureItem
        style={styles.listItem}
        lectureCode={item.lectureCode}
        lectureInstructor={item.instructorName + ' ' + item.instructorSurname}
        lectureName={item.lectureName}
      />
    ),
    [],
  );

  const ListFooter = useMemo(() => <View style={_styles.footer} />, []);

  const LecturesList = useCallback(() => {
    if (allLecturesProgress) return <Loading />;

    return (
      <FlatList
        data={allLectures}
        renderItem={renderSelectLectureItem}
        ListFooterComponent={ListFooter}
      />
    );
  }, [allLecturesProgress]);

  return (
    <View style={[styles.container, _styles.container]}>
      <LecturesList />
      <Button
        secondary
        style={[styles.saveButton, _styles.saveButton]}
        title="Save Lectures"
      />
    </View>
  );
};

export default SelectLecturesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: convert(15),
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
  },
});
