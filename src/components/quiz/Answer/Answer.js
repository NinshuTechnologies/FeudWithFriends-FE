import React from 'react';
import { View, Text } from 'react-native';

const Answer = (props)=> {
    return (
        <View>
            <Text>{props.answer}</Text>
        </View>
    )
}

export default Answer;