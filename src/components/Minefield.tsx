import React from 'react';
import { View, StyleSheet } from 'react-native';

import Field from './Field';

import { Board, BoardTile } from '../functions';

type MineFieldProps = {
  board: Board;
  onOpenField: (r: number, c: number) => void;
};

export default (props: MineFieldProps) => {
  const rows = props.board.map((row: BoardTile[], r) => {
    const columns = row.map((field: BoardTile, c) => {
      return (
        <Field {...field} key={c} onOpen={() => props.onOpenField(r, c)} />
      );
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
