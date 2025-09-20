import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Game from './Game';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Game />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

