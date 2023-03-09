import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import params from '../params';

type FieldProps = {
  mined?: boolean;
  opened?: boolean;
  nearMines: number;
};

const Field = (props: FieldProps) => {
  const { mined, opened, nearMines } = props;

  const styleField: any = [styles.field];

  if (opened) {
    styleField.push(styles.opened);
  }
  if (styleField.length === 1) {
    styleField.push(styles.regular);
  }

  const color = getColorByNearMines(nearMines);

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? (
        <Text style={[styles.label, { color: color }]}>{nearMines}</Text>
      ) : (
        false
      )}
    </View>
  );
};

Field.defaultProps = {
  nearMines: 0,
};

export default Field;

const getColorByNearMines = (nearMines: number) => {
  let color = 'initial';
  if (nearMines > 0) {
    switch (nearMines) {
      case 1:
        color = '#2A28D7';
        break;
      case 2:
        color = '#2B520F';
        break;
      case 3:
      case 4:
      case 5:
        color = '#F9060A';
        break;
      default:
        color = '#F221A9';
    }
  }
  return color;
};

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#ccc',
    borderTopColor: '#ccc',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
});