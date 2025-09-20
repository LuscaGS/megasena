import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

export default function Result({ drawn, matches }) {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  let message = "😟 Não ganhou, tente novamente! 😟";
  let color = "#f44336"; // vermelho default
  if (matches === 6) {
    message = "🎉 Parabéns! Você acertou os 6 números! 🎉";
    color = "#00e676"; // verde
  } else if (matches === 5) {
    message = "👏 Quase lá! Você acertou 5 números! 👏";
    color = "#ffeb3b"; // amarelo
  } else if (matches === 4) {
    message = "💰 Você acertou 4 números! 💰";
    color = "#29b6f6"; // azul claro
  }

  return (
    <View style={styles.container}>
      <Text style={styles.drawn}>Números sorteados: {drawn.join(', ')}</Text>
      <Animated.Text style={[styles.result, { opacity: blinkAnim, color }]}>
        {message}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  drawn: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ccc',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
