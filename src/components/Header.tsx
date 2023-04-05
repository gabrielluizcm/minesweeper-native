import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Flag from './Flag';

import colors from '../colors';

type HeaderProps = {
  flagsLeft: number;
  onFlagPress: () => void;
  onNewGame: () => void;
};

export default (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton}>
          <Flag bigger />
        </TouchableOpacity>
        <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
        <Text style={styles.buttonLabel}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.minefieldBackground,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagsLeft: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },
  button: {
    backgroundColor: colors.fieldBackground,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: colors.buttonLabel,
    fontWeight: 'bold',
  },
});
