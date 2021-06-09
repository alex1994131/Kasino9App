import React from 'react';
import { connect } from "react-redux";
import { AntDesign} from '@expo/vector-icons';
import normalize from 'react-native-normalize';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Container, Content, Header, Picker } from 'native-base';
import {LAYOUT, COLOR, profileStyles, baseStyles} from "../../../../constants";
import { YaarPayCheckOut } from "../../../../redux/actions/paymentGateWay"
import {Root} from "../../../../constants/Root"

class DepositPage extends React.Component{
    constructor(props){
        super(props);
        var allData = this.props.navigation.state.params ? this.props.navigation.state.params : {};
        this.state={
            allData : allData,
            currency : allData.currency,
            date : allData.date,
            depositBankCode : allData.depositBankCode,
            fee : allData.fee,
            image : allData.image,
            info : allData.info,
            max : allData.max,
            min : allData.min,
            name : allData.name,
            paymentMethodType : allData.paymentMethodType,
            paymentType : allData.paymentType,
            type : allData.type,
            BankCode : allData.depositBankCode[0].value,
            amount : 0,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.navigation.state.params !== this.props.navigation.state.params){
            this.setState({
                allData:this.props.navigation.state.params,
                currency :this.props.navigation.state.params.currency,
                date :this.props.navigation.state.params.date,
                depositBankCode :this.props.navigation.state.params.depositBankCode,
                fee :this.props.navigation.state.params.fee,
                image :this.props.navigation.state.params.image,
                info :this.props.navigation.state.params.info,
                max :this.props.navigation.state.params.max,
                min :this.props.navigation.state.params.min,
                name :this.props.navigation.state.params.name,
                paymentMethodType :this.props.navigation.state.params.paymentMethodType,
                paymentType :this.props.navigation.state.params.paymentType,
                type :this.props.navigation.state.params.type,
                BankCode : this.props.navigation.state.params.depositBankCode[0].value,
                amount : 0,
            })
        }
    }
    
    deposit(){
        if(this.state.amount > this.state.max || this.state.amount < this.state.min){
            alert("Please input correct amount.");
            return;
        }else{
            var data = {
                first_name: this.props.user.values.firstname,
                last_name:this.props.user.values.lastname,
                email:this.props.user.values.email,
                amount:this.state.amount,
                type : this.state.type,
                bankType : this.state.paymentType.split('-')[1],
                depositBankCode : this.state.BankCode
            }
            this.props.YaarPayCheckOut(data)
        }
    }

    render(){
        const{
            image,
            currency,
            min,
            max,
            amount,
            BankCode,
            depositBankCode,
            info,
        }=this.state;
        return(
            <Container style={styles.baseBack}>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Deposit</Text>
                    </View>
                </Header>
                <Content>
                    <View style={styles.main}>
                        <Image style={styles.image} source={{uri:Root.imageurl + image}}></Image>
                        <Text style={styles.depositText}>
                            {`Min   :   ${currency+min}    |    Max   :   ${currency+max}`}
                        </Text>
                        <View style={styles.amount}>
                            <View style={styles.inputLeft}>
                                <Text style={styles.label}>{currency}</Text>
                            </View>
                            <TextInput
                                onChangeText={e=>this.setState({amount : e})}
                                value = {amount?parseFloat(amount):0}
                                placeholderTextColor={COLOR.white1Color}
                                style={styles.InputBox}
                                placeholder='Please enter amount.'
                                type='number'
                            />
                        </View>
                        {/* <View style={[styles.bankCode]}>
                            <Picker
                                style={styles.selectBox}
                                selectedValue={BankCode}
                                onValueChange={e=>{this.setState({BankCode : e})}}
                            >
                                {depositBankCode&&depositBankCode.length ?
                                    depositBankCode.map((item, key)=>
                                        <Picker.Item key={key} label={item.label} value={item.value} />
                                    ):null
                                }
                            </Picker>
                        </View> */}
                        <View style={styles.textP}>
                            <Text style={styles.text}>Amount</Text>
                            <Text numberOfLines={1} style={styles.text1}>{amount}</Text>
                        </View>
                        <View style={styles.textP}>
                            <Text style={styles.text}>Amount charged (incl.fee)</Text>
                            <Text numberOfLines={1} style={styles.text1}>{amount}</Text>
                        </View>
                        <View style={styles.textP}>
                            <Text style={styles.text}>Total balance update</Text>
                            <Text numberOfLines={1} style={styles.text1}>{amount}</Text>
                        </View>
                        <View style={styles.deposit}>
                            <TouchableOpacity style={styles.Button} onPress={()=>this.deposit()}>
                                <Text style={styles.ButtonText}> Make deposit </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.text}>More Info</Text>
                            <Text style={styles.infoText}>{info}</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo:state.profile.userInfo,
})

const mapDispatchToProps = {
    YaarPayCheckOut
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositPage)


const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    main:{
        padding:normalize(20),
        alignItems:'center'
    },
    image:{
        margin:normalize(10),
        width:LAYOUT.window.width*0.65,
        height:LAYOUT.window.height*0.12,
        resizeMode: 'contain',
    },
    depositText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.window.width*0.04,
    },
    infoText:{
        marginTop:normalize(10),
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.window.width*0.03,
    },
    amount : {
        padding: normalize(15),
        paddingTop: normalize(5),
        paddingBottom: normalize(10),
        marginVertical: normalize(5),
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: 'transparent',
        width: LAYOUT.window.width*0.8,
    },
    bankCode : {
        padding: 1,
        flexDirection: "row",
        backgroundColor: 'transparent',
        width: LAYOUT.window.width*0.8,
        borderWidth:1,
        borderColor:COLOR.green2Color
    },
    inputLeft: {
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: COLOR.whiteColor,
        fontSize: LAYOUT.window.width*0.05,
    },
    text: {
        color: COLOR.whiteColor,
        fontSize: LAYOUT.window.width*0.03,
        width:'60%',
        textAlign:'left'
    },
    text1: {
        color: COLOR.whiteColor,
        fontSize: LAYOUT.window.width*0.03,
        width:'40%',
        textAlign:'right'
    },
    textP: {
        flexDirection:'row', 
        justifyContent:'center', 
        width:LAYOUT.window.width*0.75, 
        margin:LAYOUT.window.width*0.01
    },
    InputBox: {
        flex: 1,
        borderBottomWidth: 1,
        color: COLOR.whiteColor,
        height: LAYOUT.window.height*0.05,
        fontSize: LAYOUT.window.height*0.025,
        borderBottomColor: COLOR.whiteColor,
    },
    selectBox: {
        flex: 1,
        color: COLOR.whiteColor,
        height: LAYOUT.window.height*0.05,
        fontSize: LAYOUT.window.height*0.025,
    },
    infoBox: {
        marginTop:normalize(100),
        justifyContent:'center',
        width:LAYOUT.window.width*0.75,
        marginTop:LAYOUT.window.height*0.01
    },
    deposit:{
        marginTop:LAYOUT.window.width*0.04,
        alignItems:'center',
        justifyContent:'center',
        width:LAYOUT.window.width*0.75,
    },
})