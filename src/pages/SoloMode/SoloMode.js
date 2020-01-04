
import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import ScoreTime from '../../components/quiz/ScoreTime/ScoreTime';
import { AnswerType } from '../../utilities/eums/AnswerTypeEnum';
import AnswerBoard from '../../components/quiz/AnsweBoard/AnswerBoard';
import Question from '../../components/quiz/Question/Question';
import styles from './SoloMode.css';

class SoloMode extends Component{

    constructor(props) {
        super(props);
        this.state = {
            answerList: [
                {
                    id: 1,
                    answer: "Traffic",
                    answerType: AnswerType.PRIVILEGED
                },
                {
                    id: 2,
                    answer: "Medical Emergency",
                    answerType: AnswerType.PRIVILEGED
                },
                {
                    id: 3,
                    answer: "Kids",
                    answerType: AnswerType.PRIVILEGED
                },
                {
                    id: 4,
                    answer: "Bad Weather",
                    answerType: AnswerType.PRIVILEGED
                },
            ],
            questionObj: {
                id: 1,
                question: "Name a reason due to which you might be late to work?"
            },
            score: 0,
            round: 1,
            scoreMultiplier: 100,
            userDataObj: {
                firstName: null,
                lastName: null,
                experience: null,
                isUserOnline: null,
                userLevel: null,
                coins: null,
            }
        };
    }


    render() {
        return (

            <SafeAreaView className={styles.container}>

                <ScoreTime currentScore={this.state.currentScore}></ScoreTime>
                <Question questionObj={this.state.questionObj}/>
                <AnswerBoard answerListObject={this.state.answerList}/>
            </SafeAreaView>
    
        )
    }
}

export default SoloMode;
