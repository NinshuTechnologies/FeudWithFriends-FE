import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ScoreTimeBar.css';
import Timer from './Timer/Timer';

class ScoreTimeBar extends Component {

    timer=null;
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, nextState) {
        if(this.props.shouldStartTimer!= prevProps) {
            this.state = {
                shouldStartTimer: this.props.shouldStartTimer,
            };
        }
    }


    render() {
        return (
            <View className={styles.Container}>

                {/* User Profile Circle */}
                <View className={styles.ProfileCircle}>
                    <Text style={{fontSize: 15, color: '#000'}}>S</Text>
                </View>

                {/* Timer */}
                {this.props.shouldStartTimer &&
                <View>
                    <Timer resetTimer={this.props.resetTimer} turnOffResetTimer={this.props.turnOffResetTimer}/>
                </View>
                }       


                {/* User Score */}
                <View style={{border: '1px solid #000'}}>
                    <TouchableOpacity title="start">
                            <View className={styles.ProfileCircle}>
                                <Text style={{fontSize: 15, color: '#000'}}>250</Text>
                            </View>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

export default ScoreTimeBar;