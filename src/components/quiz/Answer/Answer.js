import React from 'react';
import { View, Text } from 'react-native';
import styles from './Answer.css';
import Ripple from 'react-native-material-ripple';

const Answer = (props)=> {
    return (

        <View style={{width: '98%', flexDirection: 'row', justifyContent: 'center'}}>
            {props.isAnswered ? 

                <View className={styles.AnsweredContainer}>
                    <Ripple rippleSize={100} rippleContainerBorderRadius={5}>
                        <Text className={styles.Text}>{props.answer}</Text>
                    </Ripple>

                    <Ripple>
                        <Text style={{color: '#ff8c00', fontWeight: '700', fontSize: 20}} className={styles.Text}>{props.points}</Text>
                    </Ripple>

                </View> 
                :
                <View className={styles.UnansweredContainer}>
                    <Text className={styles.Text}>{props.id}</Text>
                </View>

                }

        </View>


    )
}

export default Answer;