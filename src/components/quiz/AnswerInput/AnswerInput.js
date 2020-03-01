import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './AnswerInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBolt, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'


const AnswerInput = (props) => {
    const [value, onChangeText] = React.useState('');
    return (
        <View className={styles.AnswerInputContainer}>
            {/* <Text className={styles.Text}>Answer Input component</Text> */}
            <View style={{justifyContent: "center", borderWidth:2, borderColor: '#111', borderRadius: 50, padding: 4}}>
                <TouchableOpacity>
                    <FontAwesomeIcon size={30} icon={ faBolt } />
                </TouchableOpacity>
            </View>

            <View style={{flex:0.9}}>
                <TextInput
                    style={{ height: 45, borderColor: '#000', borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                    placeholder="Enter your answer..."
                    onChangeText={text => onChangeText(text)}
                    value={value}/>
            </View>

            <View style={{justifyContent: "center"}}>
                <TouchableOpacity onPress={props.handleAnswerSubmit.bind(this, value)}>
                    <FontAwesomeIcon size={30} icon={ faArrowCircleRight } />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default AnswerInput;