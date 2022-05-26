import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Timing } from './Timing';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import * as Device from 'expo-device';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  // 1 * ONE_SECOND_IN_MS,
];

export const Timer = ({
  focusSubject,
  onTimerEnd,
  clearSubject,
  // addHistory,
  // onTimerEnd
}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.05);
  // console.log(Device.brand, Device.modelName, Device.deviceName);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    console.log('Focus ended-1');
    reset();
    console.log('Focus ended-2');
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />

        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.progressBar}
          style={{ height: spacing.sm }}
          progress={progress}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="–" onPress={clearSubject} />
      </View>
    </View>
  );
};
/* <RoundedButton title="start"  
          // onPress={() => setIsStarted(true)}
        /> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green'
  },
  countdown: {
    flex: 0.5,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.lg,
  },
  timingWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
    // backgroundColor: 'green',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    // backgroundColor: 'yellow'
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Device.modelName === 'SM-G960N' ? spacing.lg : '',
  },
});
