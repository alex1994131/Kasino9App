import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, ScrollView,View } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../components";
import { LAYOUT, COLOR } from "../../constants";

class HomeScreen extends React.Component{
  constructor(){
    super()
    this.state = {
      isVisible:false,
      selectedItem:{},
      type:''
    }   
  }
  
  render(){
    const {firstpages1,livecasinoitems,casinoitems,providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;
    return(
      <Container style={styles.container}>
          <Components.HeaderScreen />
           <Content>
              {firstpages1 ? 
                <Components.ImageSliderScreen ImageSliderData={firstpages1} />
              :null}
              <ScrollView>
                {livecasinoitems && livecasinoitems.length ? 
                  <Components.CasinoMapScreen 
                    setItem={(item)=>this.setState({isVisible : true, selectedItem:item, type:'LiveCasino'})}
                    data={livecasinoitems} 
                    // values={this.props.user.values} 
                    p_this = {this.props} 
                    title = {'LiveCasino'}
                    moreUrl = {'/live-casino'}
                    type = {'LiveCasino'} 
                />:null}
                {casinoitems && casinoitems.length ?
                  <Components.CasinoMapScreen 
                    setItem={(item)=>this.setState({isVisible : true, selectedItem:item,type:'Casino'})}
                    data={casinoitems} 
                    values={this.props.user.values} 
                    p_this = {this.props} 
                    title = {'Casino'}
                    moreUrl = {'/casino'}
                    type = {'Casino'} 
                />:null}
              </ScrollView>
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
          <Components.BottomModel
            setIsVisible = {()=>this.setState({isVisible:!this.state.isVisible})}
            selectedItem = {this.state.selectedItem}
            isVisible = {this.state.isVisible}
            type={this.state.type}
          />
      </Container>
    )
  }
}

const load_data = (state) => {
	return {
    user : state.auth.login,
    firstpage : state.auth.register
	}
}
const mapDispatchToProps = {
}
export default connect(load_data, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
  center:{
    backgroundColor:COLOR.headerColor,
    alignItems:'center',
    justifyContent:'center',
    padding:LAYOUT.window.width*0.01,
    height:LAYOUT.window.height*0.04
  },
  centerText:{
    color:COLOR.greenColor,
    fontSize:LAYOUT.window.width*0.02
  },
  provider:{
    backgroundColor:COLOR.headerColor,
    alignItems:'center',
    justifyContent:'center',
    padding:LAYOUT.window.width*0.01,
  },
})
