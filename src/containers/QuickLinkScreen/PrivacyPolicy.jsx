import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../components";
import { COLOR, LAYOUT } from "../../constants";

class PrivacyPolicy extends React.Component{
  render(){
    const {privacypolicy,livecasinoitems,casinoitems,providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;
    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <Text style={styles.title}>
            Privacy Policy
          </Text>
          <View style={styles.supportBox}>
            {
              privacypolicy ? privacypolicy.map((item,i)=>{
                return (
                    <View style={styles.supportList} key={i}>
                      <Text style={styles.supportItemTitle}>{item.title}</Text>
                      <Text style={styles.supportItemText}>{item.navLink}</Text>
                      </View>
                )
              }) : null
            }
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

export default connect(load_data, {})(PrivacyPolicy);

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
    paddingBottom:LAYOUT.window.width*0.01
  },
  supportItemText:{
    fontSize:LAYOUT.window.width*0.028,
    color:COLOR.whiteColor,
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

})
