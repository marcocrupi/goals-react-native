// import React from "react";
// In passato dovevo fare l'import di React from react ma le moderne versioni di
// React Native consentono di non scrivere questo import

import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        // android_ripple funziona solo su Android e serve per evidenziare il testo
        // una volta premuto
        android_ripple={{ color: "#210644" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        // Su iOS invece di android_ripple si usa style nel seguente modo
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

// Potremmo passare lo stile dal componente padre al figlio ma è buona pratica
// tenere gli stili del componente all'interno del componente stesso
const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: { padding: 8, color: "white" },
});
