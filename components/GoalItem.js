// import React from "react";
// In passato dovevo fare l'import di React from react ma le moderne versioni di
// React Native consentono di non scrivere questo import

import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

export default GoalItem;

// Potremmo passare lo stile dal componente padre al figlio ma è buona pratica
// tenere gli stili del componente all'interno del componente stesso
const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
