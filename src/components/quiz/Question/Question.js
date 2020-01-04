import React from 'react';
import {View, Text} from 'react-native';

const Question = (props)=> {
    return (
        <View>
            <Text>This is the question component</Text>
            <Text>{props.questionObj.question}</Text>
        </View>
    )
}

export default Question;