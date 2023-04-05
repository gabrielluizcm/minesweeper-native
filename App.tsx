import React from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import params from './src/params';
import Minefield from './src/components/Minefield';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

import {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
  switchFlag,
  flagsUsed,
  Board,
} from './src/functions';

type AppState = {
  board: Board;
  won: boolean;
  lost: boolean;
  showLevelSelection: boolean;
};

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultyLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    openField({ board, row, column });
    const lost = hasExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert('Game over', "You've exploded!");
    }

    if (won) {
      Alert.alert('Congratulations', 'You win!');
    }

    this.setState({ board, won, lost });
  };

  onSelectField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    switchFlag({ board, row, column });
    const won = wonGame(board);

    if (won) {
      Alert.alert('Congratulations', 'You win!');
    }

    this.setState({ board, won });
  };

  onLevelSelected = (level: number) => {
    params.difficultyLevel = level;
    this.setState(this.createState());
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false })}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true })}
        />
        <View style={styles.board}>
          <Minefield
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
