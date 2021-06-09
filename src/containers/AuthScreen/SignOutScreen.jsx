import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from "react-redux";
import { logoutWithJWT } from "../../redux/actions/auth/loginActions"
import { LAYOUT, COLOR } from "../../constants";

class SignInScreen extends React.Component{
    UNSAFE_componentWillMount(){
        this.props.logoutWithJWT();
    }
    render(){
        return(
            <View style={styles.container}/>
        )
    }
}


export default connect(null,{logoutWithJWT})(SignInScreen);

const styles = StyleSheet.create({
    container : {
        backgroundColor:COLOR.baseBackgroundColor,
        height:LAYOUT.window.height,
        width:LAYOUT.window.width,
    },
})