import React from 'react';
import {View} from 'react-native';
import MenuItem from '../MenuItem/MenuItem';
import styles from './MenuItems.css';

const MenuItems = (props)=> {
    return (
        <View className={styles.MenuItemsContainer}>
            {
            props.items.map(item=> {
                return (
                    <MenuItem key={item} item={item} handleClick={props.handleClick}/>
                )
            })
        }
        </View>
    )
}

export default MenuItems;