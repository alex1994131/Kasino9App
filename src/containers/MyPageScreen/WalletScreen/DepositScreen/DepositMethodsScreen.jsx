import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { Container, Content } from 'native-base';
import normalize from 'react-native-normalize';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR, profileStyles, baseStyles ,Root} from "../../../../constants";
import { PaymentMenuload } from "../../../../redux/actions/paymentGateWay"

class DepositMethodsScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            allMethod : [],
        }
    }

    componentDidMount(){
        this.props.PaymentMenuload({type:1});
    }

    async componentDidUpdate( prevProps ) {
        if(prevProps.PaymentMenuData !== this.props.PaymentMenuData && this.props.PaymentMenuData.length){
            this.setState({
                allMethod : this.props.PaymentMenuData,
            })
        }
    }

    render(){
        const{
            allMethod
        }=this.state;
        return(
            <Container style={styles.baseBack}>
                <Content style={[styles.PH20]}>
                    <View style={[styles.PV10, styles.Acenter]}>
                        {
                            allMethod.length ? allMethod.map((item, key)=>(
                                <TouchableOpacity 
                                    key={key} 
                                    style={styles.depositButton} 
                                    onPress={()=>Actions.push('DepositPage',allMethod[key])}
                                >
                                    <Image style={styles.image} source={{uri:Root.imageurl + item.image}}></Image>
                                    <Text style={styles.depositText}>{item.name}</Text>
                                </TouchableOpacity>
                            )):null
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
})

const mapDispatchToProps = {
    PaymentMenuload
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositMethodsScreen)


const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    image:{
        margin:normalize(10),
        width:normalize(170),
        height:normalize(50),
    },  
    depositButton:{
        flexDirection:'row', 
        alignItems:'center', 
        width:'100%',
    },
    depositText:{
        color:COLOR.whiteColor, 
        width:normalize(150),
    }
})