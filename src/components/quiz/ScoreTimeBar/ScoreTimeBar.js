import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ScoreTimeBar.css';
import Timer from './Timer/Timer';

class ScoreTimeBar extends Component {

    timer=0;
    constructor(props) {
        super(props);
        this.state = {
            shouldStartTimer: false,
            timeLeft: 60
        };
    }

    handleTimerStart = ()=> {

        this.timer = setInterval(function () {
            this.setState({
                timeLeft: this.state.timeLeft-1
            });
        }.bind(this), 1000)
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.state.shouldStartTimer !== nextState.shouldStartTimer) {

            if(nextState.shouldStartTimer) {
                this.timer = setInterval(function () {
                    this.setState({
                        timeLeft: this.state.timeLeft-1
                    });
                }.bind(this), 1000);
            } else {
                //reset timer
                // this.setState({
                //     timeLeft: 60
                // });
            }

        }
        if(nextState.timeLeft<=30) {
            clearInterval(this.timer);
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
                <View>
                    <Timer timeLeft={this.state.timeLeft} resetTimer="dfdf"/>
                </View>


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