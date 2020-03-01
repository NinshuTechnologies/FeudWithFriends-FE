import React from 'react';
import { View, Text } from 'react-native';
import styles from './Timer.css'

const Timer = props => {
    return (
        <View className={styles.TimerContainer}>
            <Text className={styles.TimerText}> {props.timeLeft} </Text>
        </View>
    );
};

export default Timer;