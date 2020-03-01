import React, { useEffect, Component } from 'react';
import styles from './SplashScreen.css';
import { View, Text, Image } from 'react-native';



class SplashScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        setTimeout(() => { 
            navigate("MainMenu");
        }, 1500);
    }

    render() {
        return (
            <View className={styles.container}>
                <Image style={{ width: 250, height : 250}} source={require("../../assets/FFLogo.png")}/>
            </View>
        );
    }
}

export default SplashScreen;