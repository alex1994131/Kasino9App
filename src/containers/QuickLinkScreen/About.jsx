import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../components";
import { COLOR, LAYOUT } from "../../constants";

class About extends React.Component{
  render(){
    const {aboutus,providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;
    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <Text style={styles.title}>
            About us
          </Text>
          <View style={styles.supportBox}>
            {
              aboutus ? aboutus.map((item,i)=>{
               return( <View style={styles.supportList} key={i}>
                  <Text style={styles.supportItemTitle}>{item.title}</Text>
                  <Text style={styles.supportItemText}>{item.navLink}</Text>
                </View>)
              }) : null
            }
            {/* <View style={styles.supportList}>
              <Text style={styles.supportItemTitle}>Casino, and Games</Text>
              <Text style={styles.supportItemText}>{"We feature games from many popular providers such as:\n"} &#9679;{'Microgaming\n'} &#9679;{'Evolution Gaming\n'} &#9679;{'Yggdrasil Gaming\nWith that in mind, we hope you enjoy kasino9, and whatever you like to play, be it casino or sports betting, we hope you enjoy your visit.\nIf you have other query, please contact our support via email - support@kasino9.com. Your email will be answered within a maximum of one business day. You can as well contact us directly via Chat from 12am to 10pm every day of the week (chat window available in the lower corners of our homepage).'}</Text>
            </View>
            <View style={styles.supportList}>
              <Text style={styles.supportItemTitle}>Licensing and Security</Text>
              <Text style={styles.supportItemText}>{"We realise that the security is a very important issue of our customers and therefore we are using secure 2048 bits SSL certificate to guarantee that all your details are protected to the highest level possible.\nkasino9 is a Abudantia brand and is licensed for casino games and betting given by Antillephone N.V."}</Text>
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

export default connect(load_data, {})(About);

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
