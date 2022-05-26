import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';
import { RoundedButton } from '../components/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake';

export const Focus = ({ addSubject }) => {
  useKeepAwake();
  const [subject, setSubject] = useState(null);

  const onPressHandler = () => {
    addSubject(subject);
  };

  // console.log(subject);
  // <Text style={styles.text}>Focus Feature </Text>

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          activeOutlineColor={colors.white}
          label="What would you like to focus on?"
          onChangeText={setSubject}
          style={styles.textInput}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={onPressHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    justifyContent: 'top',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  button: {
    justifyContent: 'center',
  },
});
