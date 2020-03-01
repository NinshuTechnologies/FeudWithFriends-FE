import React from 'react';
import {View, Text, Platform} from 'react-native';
import styles from './Question.css';
// import { Fonts } from '../../../utilities/Fonts';

const Question = (props)=> {
    return (
        <View className={Platform.OS=='ios' ? styles.QuestionContainerIos : styles.QuestionContainerAndroid}>
            {/* <Text>This is the question component</Text> */}
            <Text className={styles.QuestionText}>{props.questionObj.question}</Text>
        </View>
    )
}

export default Question;