import React from 'react';
import { View, Text } from 'react-native';
import Answer from '../Answer/Answer';

const AnswerBoard = (props)=> {
    return (
        <View>
            <Text>This is the answer Board</Text>
            {
                props.answerListObject.map(answerObject=> {
                    return <Answer key={"key_" +  answerObject.id} answer={answerObject.answer}/>
                })
            }
        </View>
    )
}

export default AnswerBoard;