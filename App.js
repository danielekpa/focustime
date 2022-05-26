import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/Focus.js';
import { FocusHistory } from './src/features/FocusHistory';
import { Timer } from './src/features/Timer.js';
import { colors } from './src/utils/colors';
import { useKeepAwake } from 'expo-keep-awake';


// You can import from local files
// import AssetExample from './src/components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  useKeepAwake();
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);
  // console.log(currentSubject);
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={() => { }}
          clearSubject={() => setCurrentSubject(null)}
          addHistory={setHistory}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : '',
    backgroundColor: colors.darkBlue,
  },
});
