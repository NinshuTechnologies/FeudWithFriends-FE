import React, {
	Component
} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	KeyboardAvoidingView,
	Dimensions
} from 'react-native';
import ScoreTime from '../../components/quiz/ScoreTimeBar/ScoreTimeBar';
import {
	AnswerType
} from '../../utilities/eums/AnswerTypeEnum';
import AnswerBoard from '../../components/quiz/AnsweBoard/AnswerBoard';
import Question from '../../components/quiz/Question/Question';
import styles from './SoloMode.css';
import AnswerInput from '../../components/quiz/AnswerInput/AnswerInput';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Modal from 'react-native-modal';
import endpoints from '../../endpoints.js';
import Toast from 'react-native-simple-toast';


class SoloMode extends Component {

	constructor(props) {
		super(props);
		this.deviceWidth = Dimensions.get('window').width;
		this.deivceHeight = Dimensions.get('window').height;
		this.state = {
			answerList: [],
			questionObj: {
				id: null,
				question: "null"
			},
			score: 0,
			round: 1,
			scoreMultiplier: 100,
			strikes:0,
			displayStrike: false,
			shouldStartTimer: false,
			resetTimer: false,
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

	getQuestionAndAnswers = () => {
		axios.get(`${endpoints.local}question`)
			.then(resp => {
				if(!resp.data || !resp.data.uid) {throw new console.error("Question not found", `Response from api = ${JSON.stringify(resp)}`);}
				const {
					uid,
					question
				} = resp.data;
				axios.get(`${endpoints.local}answer/questionId/${uid}`)
					.then(resp => {
						let answers = resp.data;
						if(!answers) {throw new console.error("No answers found for this question!");}
						let answerObjForState = [];

						answers.forEach((ans, index) => {
							const {
								uid,
								displayAnswer,
								rank
							} = ans;

							let answer = {
								id: index + 1,
								uid: uid,
								rank: rank,
								displayAnswer: displayAnswer,
								points: Math.ceil(200/rank),
								isAnswered: false
							};
							answerObjForState.push(answer);

						});

						this.setState({
							questionObj: {
								id: uid,
								question: question
							},
							answerList: answerObjForState,
							shouldStartTimer: true
						});
					})
					.catch(e => {
						console.log('failed in getting the answer ' + e);
					})
			})
			.catch(e => {
				alert('Error in fetching question.')
			});
	}

	componentDidMount() {
		if (!this.state.questionObj.id) this.getQuestionAndAnswers();
	}

	handleAnswerSubmit = (userAnswer) => {
		if(userAnswer.trim() == "") {
			Toast.showWithGravity("Come on! You can do it. THINK HARDER", 1, Toast.CENTER);
			return;
		}

        let uri = `${endpoints.local}answer/${this.state.questionObj.id}/${userAnswer}`;
        // alert(uri);
        axios.get(uri)
			.then(resp => {
                let actualDisplayAnswer = resp.data;
                // alert(actualDisplayAnswer);
                let indexToChange = null;
                let answerListCopy = [...this.state.answerList];
                let scoreGained=0;
                answerListCopy.forEach((answer,index)=> {
                    if(answer.displayAnswer == actualDisplayAnswer) {
                        if(answer.isAnswered) {
							//write logic to display message that this answer is already guessed
							Toast.showWithGravity("Already guessed this one! Try another one.", Toast.SHORT, Toast.CENTER);
                        } else {
                            answer.isAnswered=true;
                            scoreGained=answer.points
                        }
                    }
                });
                this.setState({
                    answerList: answerListCopy,
					score: this.state.score + scoreGained,
					resetTimer: true
                });
                
			})
			.catch(e => {
				// alert('Wrong Answer!');
				this.fireStrikeX();
			});

			//clearing out the answer input
	}

	turnOffResetTimer = ()=> {
		this.setState({
			resetTimer: false
		})
	}

	removeModalAndShowAnswers = ()=> {

		return new Promise(resolve=> setTimeout(()=> {
			this.setState({
				displayStrike: false
			});
			//todo: play sound for "these are the answers you missed!"
			let newAnswers = [...this.state.answerList];

			let promises = newAnswers.map((answer,index)=> {
				return new Promise(resolve2=> setTimeout(()=> {
					answer.isAnswered = true;
					this.setState({
						answerList: newAnswers
					});
					resolve2("Done2")
				}, 1500*index+200));
			});

			Promise.all([...promises]).then(()=>{
				alert('Hi All Answers are revieled');
				resolve("done");
			});

		}, 1500));
	}

	 fireStrikeX = ()=> {

		this.setState({
			strikes: this.state.strikes+1,
			displayStrike: true,
			resetTimer: true
		}, async ()=> {
			if(this.state.strikes<3 && this.state.displayStrike) {
				Toast.showWithGravity(`X STRIKE ${this.state.strikes}`, Toast.SHORT, Toast.CENTER);
			} 
			if(this.state.strikes>=3) {
				this.setState({shouldStartTimer: false});
				await this.removeModalAndShowAnswers();
			}
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
						<ScoreTime shouldStartTimer={this.state.shouldStartTimer}
						 resetTimer={this.state.resetTimer} 
						 turnOffResetTimer={this.turnOffResetTimer} 
						 currentScore={this.state.currentScore} fireStrikeX={this.fireStrikeX}></ScoreTime>
						 
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

					{/* Modal for Strike */}

					<Modal isVisible={this.state.strikes>=3 && this.state.displayStrike}
						onBackdropPress={() => this.setState({displayStrike: false, strikes: 0})}
						deviceWidth={this.deviceWidth}
						deviceHeight={this.deviceHeight}>
						<View style={{ flex: 0.3, backgroundColor: 'white', display: 'flex', justifyContent: "center", alignItems: "center" }}>
							<Text style={{textAlign: 'center',  color: 'red', fontSize: 40, fontFamily: 'Montserrat-Bold'}}> STRIKED OUT! </Text>
							<Text style={{textAlign: 'center',  color: 'red', fontSize: 45, fontFamily: 'Montserrat-Light'}}> XXX </Text>
						</View>
					</Modal>

                </SafeAreaView>
            </LinearGradient>

    
        )
    }
}

export default SoloMode;
