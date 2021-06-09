import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import * as Components from "../../../components";
import { COLOR, LAYOUT } from "../../../constants";

class newScreen extends React.Component{

  constructor(){
    super()
    this.state = {
    }   
  }
  render(){
    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <Text>
            newScreen  
          </Text>
        </Content>
        {this.props.user.menuload ? <Components.FooterScreen data={this.props.user.menuload} /> : null}
        <Components.BottomModel
          setIsVisible = {()=>this.setState({isVisible:!this.state.isVisible})}
          selectedItem = {this.state.selectedItem}
          isVisible = {this.state.isVisible}
        />
      </Container>
    )
  }
}

const load_data  = (state) =>{
  return { 
    user : state.auth.login,
  }
}

export default connect(load_data, {})(newScreen);

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
})
