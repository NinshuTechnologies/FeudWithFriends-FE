import React from 'react'; 
import styles from './MenuItem.css';
import {Button, View, Text, TouchableOpacity} from 'react-native';

// const onRouteChange = (props)=> {
//     // const {navigate} = props.navigation;
//     alert("Hello");
//     // navigate("SoloMode");
// }

const MenuItem = (props)=> {
    return (
        <TouchableOpacity onPress={()=>props.handleClick()}>
            <View className={styles.MenuItem}>
                <Text className={styles.ButtonTextStyle}>{props.item}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MenuItem;