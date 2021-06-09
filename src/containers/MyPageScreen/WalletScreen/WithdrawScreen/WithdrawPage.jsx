import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { baseStyles, COLOR, LAYOUT, profileStyles } from '../../../../constants'
import { Cash_payout, PaymentMenuload } from '../../../../redux/actions/paymentGateWay'
import normalize from 'react-native-normalize'

export class WithdrawPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            bankType:'',
            type:'',
            currency:'',
            amount:0,
            min:1000,
        }
    }

    componentDidMount(){
        this.props.PaymentMenuload({type:2});
    }

    componentDidUpdate(prevProps){
        if(prevProps.PaymentMenuData !== this.props.PaymentMenuData){
            if(this.props.PaymentMenuData[0]){
                this.setState({
                    min:this.props.PaymentMenuData[0].min,
                    bankType:this.props.PaymentMenuData[0].paymentType,
                    type:this.props.PaymentMenuData[0].type,
                    currency:this.props.PaymentMenuData[0].currency,
                })
            }
        }
    }

    paymentWithdraw(){
        this.props.Cash_payout({
            amount : this.state.amount,
            type : this.state.type,
            currency : this.state.currency,
            bankType : this.state.bankType,
            payoutData:{}
        })
    }

    widthRaw(e){
        if(e<parseFloat(this.props.balance?.balance)){
            this.setState({amount : e})
        }
    }
    
    render() {
        const{
            amount,
            currency,
        }=this.state
        return (
            <Container style={styles.baseBack}>
                <Content>
                    <View style={styles.Acenter}>
                        <Text style={[styles.F25, styles.MT10, ]}>Amount</Text>
                        <Text style={[styles.F14, styles.MT10]}>{`$ ${amount}`}</Text>
                        <View style={styles.amount}>
                            <View style={styles.inputLeft}>
                                <Text style={styles.label}>{currency}</Text>
                            </View>
                            <TextInput
                                onChangeText={e=>this.widthRaw(e)}
                                value = {String(amount)}
                                placeholderTextColor={COLOR.white1Color}
                                style={styles.InputBox}
                                placeholder='Please enter amount.'
                                type='number'
                            />
                        </View>
                        <TouchableOpacity style={[styles.Button]} onPress={()=>this.paymentWithdraw()}>
                            <Text style={styles.ButtonText}>Widthdraw</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo : state.profile.userInfo,
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
    balance : state.balance.balance,
})

const mapDispatchToProps = {
    Cash_payout,
    PaymentMenuload
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawPage)

const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    amount : {
        width: LAYOUT.window.width*0.8,
        paddingBottom:normalize(10),
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: 'transparent',
    },
    inputLeft: {
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: COLOR.whiteColor,
        fontSize: normalize(18),
    },
    InputBox: {
        flex: 1,
        borderBottomWidth: 1,
        color: COLOR.whiteColor,
        fontSize: normalize(18),
        borderBottomColor: COLOR.whiteColor,
    },
})