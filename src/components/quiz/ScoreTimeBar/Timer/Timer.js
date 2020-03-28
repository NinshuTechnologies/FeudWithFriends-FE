import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './Timer.css'

const TIME_PER_QUESTION=60;

class Timer extends Component {
    
    timer=null;
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: TIME_PER_QUESTION
        };
    }

    handleTimerStart = ()=> {

        this.timer = setInterval(function () {
            this.setState({
                timeLeft: this.state.timeLeft-1
            });
        }.bind(this), 1000)
    }

    componentDidMount() {
            this.handleTimerStart();
    }

    componentDidUpdate(prevProps, nextState) {
        if(nextState.timeLeft==1) {
            clearInterval(this.timer);
            //invoke the strike animation and update the strike state
            // alert("Time up! You need more speed.");
            this.props.fireStrikeX();
            this.setState({
                timeLeft: TIME_PER_QUESTION
            }, this.handleTimerStart());
        }
        if(this.props.resetTimer!=prevProps.resetTimer && this.props.resetTimer) {
            this.setState({
                timeLeft: 60
            });
            this.props.turnOffResetTimer();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        console.log("componentWillUnmount called, state = ", this.state.shouldStartTimer, this.state.timeLeft);
    }

    render() {
        return (
        <View className={styles.TimerContainer}>
            <Text className={styles.TimerText}> {this.state.timeLeft} </Text>
        </View>
        );
    }
};

export default Timer;