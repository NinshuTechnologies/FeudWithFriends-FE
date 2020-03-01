import React from 'react';
import { View, Text } from 'react-native';
import Answer from '../Answer/Answer';
import styles from './AnswerBoard.css';
const AnswerBoard = (props)=> {
    return (
        <View className={styles.Container}>
            {
                props.answerListObject.map(answerObject=> {
                    return <Answer key={"key_" +  answerObject.id} isAnswered={answerObject.isAnswered} 
                    answer={answerObject.answer} points={answerObject.points} id={answerObject.id}/>
                })
            }
        </View>
    )
}

export default AnswerBoard;