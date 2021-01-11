/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { convert } from '../../helpers/pixelSizeHelper';
import { Button, Loading, SelectLectureItem } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import {
  getAllLectures,
  selectLectures,
} from '../../redux/actions/lectureActions';
import { setIsSelectedLectures } from '../../redux/actions/userActions';

const SelectLecturesScreen = (props) => {
  //Variables
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  //States
  let [selectedLectures, setSelectedLectures] = useState([]);

  //Redux
  const dispatch = useDispatch();
  const allLectures = useSelector(({ lecture }) => lecture.allLectures);
  const allLecturesProgress = useSelector(
    ({ lecture }) => lecture.allLecturesProgress,
  );

  const selectLecturesProgress = useSelector(
    ({ lecture }) => lecture.selectLecturesProgress,
  );

  //Functions
  const getKey = useCallback((item) => 'selectLecture' + item.lectureCode, []);

  const onLectureItemPress = (lectureCode, isSelected) => {
    if (isSelected && !selectedLectures.includes(lectureCode)) {
      setSelectedLectures((selecteds) => [...selecteds, lectureCode]);
    }

    if (!isSelected) {
      setSelectedLectures((selecteds) =>
        selecteds.filter((s) => s != lectureCode),
      );
    }
  };

  const onSavePress = () => {
    if (selectedLectures.length === 0) {
      Alert.alert('', 'You must select at least one lecture!');
      return;
    }

    Alert.alert('', 'Are you sure your lectures which you have selected?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(selectLectures(selectedLectures)),
      },
    ]);
  };

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
        onPress={onLectureItemPress}
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
        indicatorStyle="black"
        scrollIndicatorInsets={{ right: 1 }}
        data={allLectures}
        renderItem={renderSelectLectureItem}
        ListFooterComponent={ListFooter}
        keyExtractor={getKey}
      />
    );
  }, [allLecturesProgress]);

  return (
    <View style={[styles.container, _styles.container]}>
      <LecturesList />
      <Button
        loading={selectLecturesProgress}
        style={[styles.saveButton, _styles.saveButton]}
        secondary
        title="Save Lectures"
        onPress={onSavePress}
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
