import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return (
      <Text style={{ ...styles.title, paddingHorizontal: spacing.lg }}>
        You haven't focused on anything yet!
      </Text>
    );

  const renderItem = ({ item }) => <Text style={styles.item}>– {item} </Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things you've focused on</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(history, item) => history.indexOf(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    paddingBottom: spacing.sm,
  },
  item: {
    color: colors.white,
    fontSize: fontSizes.md,
    paddingTop: spacing.sm,
  },
});
