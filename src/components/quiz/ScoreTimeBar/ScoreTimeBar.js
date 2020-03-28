import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ScoreTimeBar.css';
import Timer from './Timer/Timer';

class ScoreTimeBar extends Component {

    timer=null;
    constructor(props) {
        super(props);
        this.state = {
            shouldStartTimer: false,
        };
    }

    render() {
        return (
            <View className={styles.Container}>

                {/* User Profile Circle */}
                <View className={styles.ProfileCircle}>
                    <Text style={{fontSize: 15, color: '#000'}}>S</Text>
                </View>

                {/* Timer */}
                {this.state.shouldStartTimer &&
                <View>
                    <Timer resetTimer={this.props.resetTimer} turnOffResetTimer={this.props.turnOffResetTimer}/>
                </View>
                }       


                {/* User Score */}
                <View style={{border: '1px solid #000'}}>
                    <TouchableOpacity title="start" onPress={()=> {this.setState({shouldStartTimer: true})}}>
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