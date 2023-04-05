import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';

import colors from '../colors';

type DifficultyButtonProps = {
  bg: typeof styles.bgEasy;
  setDifficultyLevel: () => void;
  children: string;
};

const DifficultyButton = (props: DifficultyButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.bg]}
      onPress={() => props.setDifficultyLevel()}>
      <Text style={styles.buttonLabel}>{props.children}</Text>
    </TouchableOpacity>
  );
};

type LevelSelectionProps = {
  isVisible: boolean;
  onLevelSelected: (level: number) => void;
  onCancel: () => void;
};

export default (props: LevelSelectionProps) => {
  return (
    <Modal
      onRequestClose={props.onCancel}
      visible={props.isVisible}
      animationType="slide"
      transparent={true}>
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose the difficulty level</Text>
          <DifficultyButton
            bg={styles.bgEasy}
            setDifficultyLevel={() => props.onLevelSelected(0.1)}>
            Easy
          </DifficultyButton>
          <DifficultyButton
            bg={styles.bgNormal}
            setDifficultyLevel={() => props.onLevelSelected(0.2)}>
            Normal
          </DifficultyButton>
          <DifficultyButton
            bg={styles.bgHard}
            setDifficultyLevel={() => props.onLevelSelected(0.3)}>
            Hard
          </DifficultyButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.modalFrameBackground,
  },
  container: {
    backgroundColor: colors.minefieldBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: colors.minefieldBackground,
    fontWeight: 'bold',
  },
  bgEasy: {
    backgroundColor: colors.bgEasy,
  },
  bgNormal: {
    backgroundColor: colors.bgNormal,
  },
  bgHard: {
    backgroundColor: colors.bgHard,
  },
});
