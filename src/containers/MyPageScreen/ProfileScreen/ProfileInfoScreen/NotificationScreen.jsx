import React from 'react';
import { connect } from "react-redux";
import normalize from 'react-native-normalize';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Form, Left, Right, Button, Switch, Content } from 'native-base';
import { LAYOUT, COLOR, profileStyles, baseStyles } from "../../../../constants";
import { set_notification, get_notification } from "../../../../redux/actions/profile";

class NotificationScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            internalmessage: false,
            pushnotification : false,
            emailnotification : false,
            sms : false,
            phonecall : false,
        }
    }

    componentDidMount(){
        this.props.get_notification()
    }

       
    componentDidUpdate(prevProps, prevState){
        if(prevProps.notification !== this.props.notification){
            
            this.setState({...this.props.notification})
        }
    }

    render(){
        const { internalmessage, pushnotification, emailnotification, sms, phonecall } =this.state;
        return(
            <Container style={styles.baseBack}>
                <Content style={[styles.PV20, styles.PH30]}>
                    <Form style={styles.form}>  
                        <View style={styles.switch}>
                            <Left>
                                <Text style={styles.switchText}>INTERNAL MESSAGE</Text>
                            </Left>
                            <Right>
                                <Switch value={internalmessage} onValueChange={()=>this.setState({internalmessage:!internalmessage})} />
                            </Right>
                        </View>
                        <View style={styles.switch}>
                            <Left>
                                <Text style={styles.switchText}>PUSHNOTIFICATION</Text>
                            </Left>
                            <Right>
                                <Switch value={pushnotification} onValueChange={()=>this.setState({pushnotification:!subscribed_to_push_notifications})} />
                            </Right>
                        </View>
                        <View style={styles.switch}>
                            <Left>
                                <Text style={styles.switchText}>EMAIL</Text>
                            </Left>
                            <Right>
                                <Switch value={emailnotification} onValueChange={()=>this.setState({emailnotification:!emailnotification})} />
                            </Right>
                        </View>
                        <View style={styles.switch}>
                            <Left>
                                <Text style={styles.switchText}>SMS</Text>
                            </Left>
                            <Right>
                                <Switch value={sms} onValueChange={()=>this.setState({sms:!sms})} />
                            </Right>
                        </View>
                        <View style={styles.switch}>
                            <Left>
                                <Text style={styles.switchText}>PHONECELL</Text>
                            </Left>
                            <Right>
                                <Switch value={phonecall} onValueChange={()=>this.setState({phonecall:!phonecall})} />
                            </Right>
                        </View>
                    </Form>
                    <View style={[styles.ButtonWrapper, styles.PH20]}>
                        <Button style={[styles.Button, styles.W100P]} onPress={()=>this.props.set_notification(this.state)}>
                            <Text style={styles.ButtonText}>SAVE</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo:state.profile.userInfo,
    notification:state.profile.notification,
})

const mapDispatchToProps = {
    set_notification,get_notification
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)

const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    ButtonWrapper:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:normalize(20)
    },
    switch:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:LAYOUT.window.width*0.02
    },
    switchText:{
        fontSize:LAYOUT.window.width*0.03,
        color:COLOR.greenColor,
        fontWeight:'bold'
    },
})