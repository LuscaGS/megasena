import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Result from './Result';

export default function Game() {
  const [selected, setSelected] = useState([]);
  const [generated, setGenerated] = useState([]);
  const [matches, setMatches] = useState(null);

  const toggleNumber = (num) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      if (selected.length < 6) {
        setSelected([...selected, num]);
      } else {
        Alert.alert("Atenção", "Você só pode escolher 6 números!");
      }
    }
  };

  const playGame = () => {
    if (selected.length !== 6) {
      Alert.alert("Erro", "Selecione exatamente 6 números!");
      return;
    }

    const drawn = [];
    while (drawn.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!drawn.includes(num)) drawn.push(num);
    }

    const acertos = selected.filter((n) => drawn.includes(n)).length;
    setGenerated(drawn);
    setMatches(acertos);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎰 Mega-Sena 🎰</Text>
      <Text style={styles.label}>Escolha 6 números:</Text>

      <View style={styles.grid}>
        {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberButton,
              selected.includes(num) && styles.selectedButton,
            ]}
            onPress={() => toggleNumber(num)}
          >
            <Text
              style={[
                styles.numberText,
                selected.includes(num) && styles.selectedText,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.button}>
        <Button title="Jogar" color="#00c853" onPress={playGame} />
      </View>

      {matches !== null && <Result drawn={generated} matches={matches} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    color: '#ccc',
    marginBottom: 15,
    fontSize: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 360,
  },
  numberButton: {
    width: 44,
    height: 44,
    margin: 4,
    borderRadius: 22,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  numberText: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedButton: {
    backgroundColor: '#00c853',
    borderColor: '#00e676',
  },
  selectedText: {
    color: '#000',
    fontWeight: '700',
  },
  button: {
    marginTop: 20,
    width: 160,
  },
});
