import { useState } from "react";
import { Button, StyleSheet, TextInput, View, FlatList } from "react-native";

import GoalItem from "./components/GoalItem";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  // La funzione "addGoalHandler" utilizza la funzione "setCourseGoals"
  // per aggiungere l'obiettivo corrente "enteredGoalText" all'array di obiettivi
  // del corso "courseGoals". La funzione utilizza la notazione a spreading operator
  // per creare una copia dell'array corrente e aggiungere l'obiettivo alla copia.
  function addGoalHandler() {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,

      {
        text: enteredGoalText,
        // Soluzione per creare una chiave univoca, "key" che contiene il valore restituito da Date.now() combinato con Math.random().
        // In questo modo si utilizzano due fonti di casualità, la data corrente e un
        // numero casuale generato da Math.random() per generare una chiave univoca.
        // Tenere presente che Math.random() genera un numero casuale tra 0 e 1, quindi in questo caso si devono
        // fare alcune conversioni per evitare conflitti tra le chiavi generate.
        // In questo caso si utilizza il metodo toString(radix) con un valore di radice di 36
        // per convertire il numero in una stringa alfanumerica, quindi si utilizza il metodo substring(start,end)
        // per prendere solo i primi caratteri della stringa.
        id: Date.now() + Math.random().toString(36).substring(2, 15),
      },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* ScrollView serve quando ci serve la funzionalità di scroll, a questo link
        un approfondimento per personalizzarlo: https://reactnative.dev/docs/scrollview
        Il problema di ScrollView è che renderizza tutti gli elementi, ed è un
        problema se essi sono tanti, è meglio usare FlatList per molto elementi,
        per la FlatList abbiamo modificato molto il codice che usava il metodo map, andare a
        vedere il commit inerente la scroll view */}
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            console.log("Single Goal:", itemData);
            return <GoalItem text={itemData.item.text} />;
          }}
          // Il codice utilizza la propietà "keyExtractor" di FlatList per specificare come vengono estratte
          // le chiavi univoche per gli elementi della lista. In questo caso, la funzione
          // passata come valore per "keyExtractor" restituisce il valore della proprietà "id"
          // dell'oggetto "item". Ciò consente a FlatList di associare una chiave univoca
          // per ogni elemento della lista, migliorando le prestazioni e l'efficiente
          // gestione degli elementi della lista.
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 32,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
});
