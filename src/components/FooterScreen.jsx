import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Footer, FooterTab } from 'native-base';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { Overlay } from 'react-native-elements';
import { LAYOUT, COLOR } from "../constants";

export default class FooterScreen extends React.Component{
  render(){
    return(
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            {this.props.data?this.props.data.map((item, index)=>(
              <FooterButtonScreen key={index} data={item} index={++index} total={this.props.data}></FooterButtonScreen>
            )):null}
          </FooterTab>
        </Footer>
    )
  }
}

const styles = StyleSheet.create({
  footer : {
    borderTopWidth:1,
    borderTopColor:COLOR.headerColor,
    height:LAYOUT.window.height*0.08,
  },
  footerTab:{
    backgroundColor:COLOR.baseBackgroundColor,
    flexDirection:'row'
  },
  footerText:{
    color:COLOR.orangeColor,
    fontSize:LAYOUT.window.width*0.02
  },
  text:{
    color:COLOR.baseBackgroundColor,
    fontSize:LAYOUT.window.width*0.04,
    fontWeight:'800',
    padding:5,
    marginLeft:2
  },
  overlay:{
    width:LAYOUT.window.width*0.8,
    padding:LAYOUT.window.width*0.08,
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  listbutton:{
    justifyContent:'space-between', 
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
  },
  button:{
    justifyContent:'center', 
    alignItems:'center', 
    flex:1
  }
})

class FooterButtonScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      visible:false
    }
  }
  menuModal(){
    this.setState({visible : !this.state.visible})
  }
  render(){
    const Tag = {
      "AntDesign": AntDesign,
      "Entypo": Entypo,
      "EvilIcons": EvilIcons,
      "Feather": Feather,
      "FontAwesome": FontAwesome,
      "FontAwesome5": FontAwesome5,
      "Fontisto": Fontisto,
      "Foundation": Foundation,
      "Ionicons": Ionicons,
      "MaterialCommunityIcons": MaterialCommunityIcons,
      "MaterialIcons": MaterialIcons,
      "Octicons": Octicons,
      "SimpleLineIcons": SimpleLineIcons,
      "Zocial": Zocial,
    }
    const icon = this.props.data.mobileicon.split('$');
    var TagName = Tag[icon[0]];
    if(this.props.index < 5){
      return (
        <TouchableOpacity style={styles.button} onPress={()=>Actions.push(this.props.data.navLink)}>
          <TagName name={icon[1]} size={LAYOUT.window.width*0.05} color={COLOR.orangeColor} />
          <Text style={styles.footerText}>{this.props.data.title}</Text>
        </TouchableOpacity>
      )
    }
    else if(this.props.index == 5){
      if(this.props.total.length > 5){
        return(
          <>
            <TouchableOpacity style={styles.button} onPress={()=>this.menuModal()}>
              <Entypo name="menu" size={LAYOUT.window.width*0.05} color={COLOR.orangeColor} />
              <Text style={styles.footerText}>MENU</Text>
            </TouchableOpacity>
            <Overlay isVisible={this.state.visible} onBackdropPress={()=>this.setState({visible : false})}>
              <View style={styles.overlay}>
                {this.props.total.map((item, i)=>{
                  const icons = item.mobileicon.split('$');
                  var TagNames = Tag[icons[0]];
                  return(
                    <TouchableOpacity  key = {i} onPress={()=>Actions.push(item.navLink)} style={styles.listbutton}>
                      <TagNames name={icons[1]} size={LAYOUT.window.width*0.05} color={COLOR.orangeColor} />
                      <Text style={styles.text}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Overlay>
          </>
        );
      }
      else{
        return (
          <TouchableOpacity style={styles.button} onPress={()=>Actions.push(this.props.data.navLink)}>
            <TagName name={icon[1]} size={LAYOUT.window.width*0.05} color={COLOR.orangeColor} />
            <Text style={styles.footerText}>{this.props.data.title}</Text>
          </TouchableOpacity>
        )
      }
    }
    return null;
  }
}
