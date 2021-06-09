import React from 'react';
import { Container } from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { LAYOUT, COLOR } from "../../../../constants";
import { PaymentMenuload } from "../../../../redux/actions/paymentGateWay"

class WithdrawMethodsScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            allMethod : null,
        }
    }

    componentDidMount(){
        this.props.PaymentMenuload({type:2});
    }

    async componentDidUpdate( prevProps ) {
        if(prevProps.PaymentMenuData !== this.props.PaymentMenuData){
            this.setState({
                allMethod : this.props.PaymentMenuData,
            })
        }
    }

    render(){
        return(
            <Container style={styles.container}>
                {
                    this.state.allMethod && this.state.allMethod.length ? this.state.allMethod.map((item, key)=>(
                        <TouchableOpacity key={key} style={styles.depositButton} onPress={()=>Actions.push('WithdrawPage',this.state.allMethod[key])}>
                            <Image style={styles.image} source={{uri:item.image}}></Image>
                            <Text style={styles.depositText}>{item.name}</Text>
                        </TouchableOpacity>
                    )):null
                }
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
})

export default connect(mapStateToProps, {PaymentMenuload})(WithdrawMethodsScreen)

const styles = StyleSheet.create({
    container : {
        backgroundColor:COLOR.baseBackgroundColor,
        height:LAYOUT.window.height,
        padding:LAYOUT.window.width*0.02,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    image:{
        margin:LAYOUT.window.width*0.01,
        width:LAYOUT.window.width*0.4,
        height:LAYOUT.window.height*0.08,
        resizeMode: 'stretch',
    },  
    depositButton:{
        flexDirection:'row', 
        alignItems:'center', 
        width:LAYOUT.window.width*0.8
    },
    depositText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.window.width*0.04
    }
})