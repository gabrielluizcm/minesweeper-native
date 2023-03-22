import React from 'react';
import { View, StyleSheet } from 'react-native';

import Field from './Field';

import { BoardTile } from '../functions';

export default (props: { board: BoardTile[][] }) => {
  const rows = props.board.map((row: BoardTile[], r) => {
    const columns = row.map((field: BoardTile, c) => {
      return <Field {...field} key={c} />;
    });
    return (
      <View key={r} style={styles.row}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
  row: {
    flexDirection: 'row',
  },
});
