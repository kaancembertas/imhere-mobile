import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClassListItem, Seperator } from '../../components';
import { API_CONSTANTS } from '../../config/constants';

const ClassesScreen = (props) => {
  //Variables
  const { navigation } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();

  //Redux
  const dispatch = useDispatch();

  //Functions
  const onClassPress = (classItem) => {
    navigation.navigate('ClassDetailScreen', { classItem });
  };

  const renderClassListItem = useCallback(
    ({ item }) => (
      <ClassListItem
        onPress={onClassPress}
        code={item.code}
        instructor={item.instructor}
        name={item.name}
      />
    ),
    [],
  );

  const renderItemSeperator = useCallback(() => <Seperator />, []);
  const renderFooter = useCallback(() => <View style={_styles.footer} />, []);

  const getClassListItemKey = (item) => 'CLI-' + item.code;

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
        renderItem={renderClassListItem}
        keyExtractor={getClassListItemKey}
        ItemSeparatorComponent={renderItemSeperator}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ClassesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const sampleData = [
  {
    name: 'Computer Networks',
    code: 'BIL441',
    instructor: 'Abdül Halim Zaim',
  },
  {
    name: 'Bilişim Tasarım Projesi',
    code: 'BIL451',
    instructor: 'Arzu Kakışım',
  },
  {
    name: 'Bilgisayar Sistemleri Lab.',
    code: 'BIL53',
    instructor: 'Mustafa Cem Kasapbaşı',
  },
  {
    name: 'Veri Madenciliği',
    code: 'BIL460',
    instructor: 'Arzu Kakışım',
  },
  {
    name: 'Paralel Bilgisayarlar',
    code: 'BIL461',
    instructor: 'Turgay Altılar',
  },
  {
    name: 'Bulut Bilişim',
    code: 'BIL465',
    instructor: 'Alper Özpınar',
  },
];
