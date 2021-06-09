import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../components";
import { COLOR, LAYOUT } from "../../constants";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

class Contact extends React.Component{
  render(){
    const {contactus,livecasinoitems,casinoitems,providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;

    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <Text style={styles.title}>
            Contact
          </Text>
          <View style={styles.supportBox}>
            {
              contactus ? contactus.map((item,i)=>(
                <View style={styles.supportList} key={i}>
                  <MaterialCommunityIcons name="chat-processing" size={LAYOUT.window.width*0.1} color={COLOR.whiteColor} />
                  <Text style={styles.supportItemTitle}>{item.title}</Text>
                  <Text style={styles.supportItemText}>{item.navLink}</Text>
                </View>
              )) : null
            }
{/*             
            <View style={styles.supportList}>
              <Ionicons name="ios-mail" size={LAYOUT.window.width*0.1} color={COLOR.whiteColor} />
              <Text style={styles.supportItemTitle}>E-MAIL</Text>
              <Text style={styles.supportItemText}>{"For customer inquiries, please contact support@kasino9.com. When contacting, you must indicate your name and account number.\n\nFor all other questions and for more information on our terms and conditions and betting rules, please contact info@kasino9.com by e-mail.\n\nPlease send verification documents to docs@kasino9.com ."}</Text>
            </View>
            
            <View style={styles.supportList}>
              <FontAwesome name="phone" size={LAYOUT.window.width*0.1} color={COLOR.whiteColor} />
              <Text style={styles.supportItemTitle}>PHONE</Text>
              <Text style={styles.supportItemText}>+91000000000</Text>
            </View> */}
          
          </View>
          <View style={styles.provider}>
              {providerimgs?<Components.GameProviderScreen GameProvider = {providerimgs} />:null}
              {paymentimgs?<Components.PaymentMethodScreen PaymentMethodData = {paymentimgs} />:null}
              <View style={{flexDirection:'row'}}>
                {firstquick?<Components.QuickLinkScreen QuickLinkData = {firstquick} />:null}
                {sociallink?<Components.GetInTouchScreen IconData = {sociallink} />:null}
              </View>
              {footertext?<Components.FooterTextScreen TextData = {footertext} />:null}
            </View>   
        </Content>
        {firstmenu ? <Components.FooterScreen data={firstmenu} /> : null}
      </Container>
    )
  }
}

const load_data  = (state) =>{
  return { 
    user : state.auth.login,
    firstpage : state.auth.register

  }
}

export default connect(load_data, {})(Contact);

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
  title:{
    width:'100%', 
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.055, 
    textAlign:'center', 
    fontWeight:'700',
  },
  provider:{
    backgroundColor:COLOR.headerColor,
    alignItems:'center',
    justifyContent:'center',
    padding:LAYOUT.window.width*0.01,
  },
  supportBox:{
    width:'100%', 
    alignItems:'flex-start', 
    paddingHorizontal:LAYOUT.window.width*0.05,
    paddingBottom:LAYOUT.window.width*0.01,
  },
  supportList:{
    width:'100%', 
    alignItems:'flex-start', 
    paddingVertical:LAYOUT.window.height*0.01
  },
  supportItemTitle:{
    fontSize:LAYOUT.window.width*0.04,
    color:COLOR.whiteColor,
    fontWeight:'700'
  },
  supportItemText:{
    fontSize:LAYOUT.window.width*0.028,
    color:COLOR.whiteColor,
  }
})
