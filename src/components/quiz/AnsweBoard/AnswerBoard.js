import React from 'react';
import { View, Text } from 'react-native';
import Answer from '../Answer/Answer';
import styles from './AnswerBoard.css';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AnswerBoard = (props)=> {
    return (
        <View className={styles.Container}>
            {
                props.answerListObject.map(answerObject=> {
                    return (
                    <TouchableOpacity key={"key_" +  answerObject.id}>
                        <Answer isAnswered={answerObject.isAnswered} 
                        answer={answerObject.displayAnswer} points={answerObject.points} id={answerObject.id}/>
                    </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default AnswerBoard;