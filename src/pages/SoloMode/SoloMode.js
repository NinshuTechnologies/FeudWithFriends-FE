
import React, {Component} from 'react';
import {View, Text, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import ScoreTime from '../../components/quiz/ScoreTimeBar/ScoreTimeBar';
import { AnswerType } from '../../utilities/eums/AnswerTypeEnum';
import AnswerBoard from '../../components/quiz/AnsweBoard/AnswerBoard';
import Question from '../../components/quiz/Question/Question';
import styles from './SoloMode.css';
import AnswerInput from '../../components/quiz/AnswerInput/AnswerInput';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

class SoloMode extends Component{

    constructor(props) {
        super(props);
        this.state = {
            answerList: [
                {
                    id: 1,
                    answer: "Traffic",
                    answerType: AnswerType.PRIVILEGED,
                    points: 150,
                    isAnswered: false
                },
                {
                    id: 2,
                    answer: "Medical Emergency",
                    answerType: AnswerType.PRIVILEGED,
                    points: 100,
                    isAnswered: true
                },
                {
                    id: 3,
                    answer: "Kids",
                    answerType: AnswerType.PRIVILEGED,
                    points: 80,
                    isAnswered: false
                },
                {
                    id: 4,
                    answer: "Bad Weather",
                    answerType: AnswerType.PRIVILEGED,
                    points: 50,
                    isAnswered: false
                },
                {
                    id: 5,
                    answer: "Overslept",
                    answerType: AnswerType.PRIVILEGED,
                    points: 30,
                    isAnswered: false
                },
                {
                    id: 6,
                    answer: "Alarm didnt work",
                    answerType: AnswerType.PRIVILEGED,
                    points: 15,
                    isAnswered: true
                },
            ],
            questionObj: {
                id: null,
                question: "null"
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

    getQuestionAndAnswers = ()=> {
        axios.get(`http://172.28.208.14:8080/question`)
        .then(resp=> {
            const { uid, question } = resp.data;
            // axios.get(`http://192.168.29.247:8080/answer/questionId/${uid}`)
            // .then(resp=> {
            //     const {  }
                this.setState({
                    questionObj:{
                        id: uid,
                        question: question
                    }
                });
            // })
            // .catch(e=> {
            //     console.log('failed in getting the answer ' + e);
            // })

            // this.setState({
            //     questionObj:{
            //         id: uid,
            //         question: question
            //     }
            // });
        })
        .catch(e=> {
            alert('Error in fetching question.')
        });
    }

    componentDidMount () {
        if(!this.state.questionObj.id) this.getQuestionAndAnswers()
    }


    handleAnswerSubmit = (userAnswer)=> {

        alert('inside the handler');
        axios.get(`http://192.168.29.247:8080/answer/${this.state.questionObj.id}/${userAnswer}`)
        .then(resp=> {
            alert(resp.data);
        })
        .catch(e=> {
            alert('Error in fetching answers.')
        });
    }


    render() {
        return (

            // <LinearGradient colors={['#E94057', '#F27121']} style={styles.linearGradient}>
            // <LinearGradient colors={['#F37335', '#FDC830']} style={styles.linearGradient}>
            // <LinearGradient colors={['#00B4DB', '#0083B0']} style={styles.linearGradient}>
            <LinearGradient colors={['#ff4e00', 'rgba(255, 140, 0, 0.8)']} style={styles.linearGradient}>
            {/* // <LinearGradient colors={['#00a2c0', 'rgba(0, 162, 192, 0.6)']} style={styles.linearGradient}> */}
            {/* // <LinearGradient colors={['#11998e', 'rgba(17, 153, 142,0.5)']} style={styles.linearGradient}> */}
            {/* <LinearGradient colors={['#00b09b', 'rgba(0, 176, 155, 0.6)']} style={styles.linearGradient}> */}

            {/* <LinearGradient colors={['#00b09b', 'rgba(0, 176, 155, 0.6)']} style={styles.linearGradient}> */}
                <SafeAreaView className={styles.container}>

                    <View style={{height: '25%', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
                        <ScoreTime currentScore={this.state.currentScore}></ScoreTime>
                        {/* <Text className={styles.Title}>FEUD WITH FRIENDS</Text> */}
                        {this.state.questionObj!==null &&
                            <Question questionObj={this.state.questionObj}/>
                        }   
                    </View>

                    <View style={{height: '60%', width: '100%', alignItems: 'center'}}>
                        <AnswerBoard answerListObject={this.state.answerList}/>
                    </View>

                    <View style={{height: '15%', width: '100%', alignItems: 'center'}}>
                        <AnswerInput handleAnswerSubmit={this.handleAnswerSubmit}/>
                    </View>
                </SafeAreaView>
            </LinearGradient>

    
        )
    }
}

export default SoloMode;
