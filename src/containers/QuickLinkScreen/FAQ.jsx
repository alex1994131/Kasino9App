import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../components";
import { COLOR, LAYOUT } from "../../constants";


class PrivacyPolicy extends React.Component{

  constructor(){
    super()
    
  }
  render(){
    const {faqpage,providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;

    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <Text style={styles.title}>
            How can we help you?  
          </Text>
          <View style={styles.questionBox}>
            {
              faqpage&&faqpage.length?
              faqpage.map((item, key)=>(
                <Components.CollapseList key={key} data={item} />
              )):null
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
    fontSize:LAYOUT.window.width*0.04, 
    textAlign:'center', 
    fontWeight:'500',
  },
  questionBox:{
    paddingHorizontal:LAYOUT.window.width*0.05,
    paddingBottom:LAYOUT.window.height*0.01,
  },
  provider:{
    backgroundColor:COLOR.headerColor,
    alignItems:'center',
    justifyContent:'center',
    padding:LAYOUT.window.width*0.01,
  }, 
})
