import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Mine from './Mine';

import params from '../params';
import colors from '../colors';

type FieldProps = {
  mined?: boolean;
  opened?: boolean;
  nearMines: number;
  exploded?: boolean;
};

const Field = (props: FieldProps) => {
  const { mined, opened, nearMines, exploded } = props;

  const styleField: object[] = [styles.field];

  if (opened) {
    styleField.push(styles.opened);
  }
  if (exploded) {
    styleField.push(styles.exploded);
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
      {mined && opened ? <Mine /> : false}
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
        color = colors.lowDanger;
        break;
      case 2:
        color = colors.midDanger;
        break;
      case 3:
      case 4:
      case 5:
        color = colors.highDanger;
        break;
      default:
        color = colors.hyperDanger;
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
    backgroundColor: colors.fieldBackground,
    borderLeftColor: colors.fieldBorderTopLeft,
    borderTopColor: colors.fieldBorderTopLeft,
    borderRightColor: colors.fieldBorderBottomRight,
    borderBottomColor: colors.fieldBorderBottomRight,
  },
  opened: {
    backgroundColor: colors.fieldBackground,
    borderColor: colors.fieldOpenedBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
});
