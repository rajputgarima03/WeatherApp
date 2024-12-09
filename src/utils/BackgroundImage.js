import React from 'react';
import { Image, StyleSheet } from "react-native"

const BackgroundImage = () =>{
    return(
     <Image source = { require("../../assets/images/Background.png")} style = {{ position:'absolute',
     width:'100%',
     height: '100%',}}/>
    )
}



export default BackgroundImage