
import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './MainMenu.css';
import MenuItems from '../../components/menu/MenuItems/MenuItems';

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state= {
            currentView: 'MainMenu'
        };
    }


    onClickMenuItem = ()=> {
        // Todo: Make this generic to handle redirections for all menu options.
        // Todo: Update currentView in the state with the active view.
        const {navigate} = this.props.navigation;
        navigate("SoloMode");
    }

    render() {
        return (

            <SafeAreaView className={styles.container}>
                <View className={styles.logo}>
                    <Text className={styles.logoText}>FEUD WITH FRIENDS</Text>
                </View>
                
                <View className={styles.menuBackground}>
                    <MenuItems items={["SOLO MODE", "ONLINE MODE", "LOCAL MULTIPLAYER", "STORE", "PROFILE"]} handleClick={this.onClickMenuItem}/>
                </View>
         </SafeAreaView>
    
        )
    }

}

export default MainMenu;
