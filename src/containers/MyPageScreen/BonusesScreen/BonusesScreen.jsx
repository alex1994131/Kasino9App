import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Separator, Content } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { baseStyles, COLOR, LAYOUT, profileStyles } from '../../../constants';
import { Bonusmenuload, Claim_request } from "../../../redux/actions/promotions/bonus"

class BonusesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active : 0,
      allData : [],
    }
  }

  componentDidMount(){
    this.props.Bonusmenuload(2,this.props.userInfo.email)
  }

  componentDidUpdate(prevProps){
    if(prevProps.BonusData !== this.props.BonusData&&this.props.BonusData.length){
      this.setState({allData:this.props.BonusData})
    }
  }

  getDay(s, e){
    var start = new Date(s);
    var end = new Date(e);
    var m = new Date(end-start);
    return parseInt(m/86400000);
  }

  Claim_Bonus_event(){
    var Bonusitem = this.state.allData[this.state.active];
    var user = this.props.user;
    var row = {
        bonusid : Bonusitem._id,
        email : user.email,
    }
    this.props.Claim_request(row);
  }

  activeHander(key){
    if(key===this.state.active){
      this.setState({active:null})
    }else{
      this.setState({active:key})
    }
  }

  render() {
    const{
      allData
    }=this.state;
    return (
      <Container style={styles.baseBack}>
        <Header style={styles.header}>
          <View style={styles.back}>
            <TouchableOpacity onPress={()=>Actions.pop()}>
              <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
            </TouchableOpacity>
            <Text style={styles.headerBodyText}>Bonuses</Text>
          </View>
        </Header>
        <Content>
          <View style={[styles.Acenter, styles.PV10]}>
            {
              allData.length?allData.map((item, key)=>( 
                <View key={key} style={{ paddingHorizontal:LAYOUT.window.width*0.02, paddingBottom:LAYOUT.window.height*0.01, width:LAYOUT.window.width*0.96 }}>
                  <Collapse style={styles.collapsecontainer} onToggle={()=>this.activeHander(key)}>
                    <CollapseHeader style={styles.collapseheader}>
                      <Separator style={styles.collapseseparator}>
                        <Text style={[styles.collapsetitle]}>{item.bonusname}</Text>
                      </Separator>
                    </CollapseHeader>
                      <CollapseBody style={styles.collapsebody}>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}>Starting Date  :</Text>
                        <Text style={styles.collapsetext}>{moment(item.startdate).format('DD/MM/YYYY hh:mm')}</Text>
                      </View>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}>Ending Date  :</Text>
                        <Text style={styles.collapsetext}>{moment(item.enddate).format('DD/MM/YYYY hh:mm')}</Text>
                      </View>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}> Wagered : {item.Wagered} INR    </Text>
                        <Text style={styles.collapsetext}>Remaining : {item.Remaining} INR</Text>
                      </View>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}>Time to Wager :</Text>
                        <Text style={styles.collapsetext}> {this.getDay(item.startdate, item.enddate)}</Text>
                      </View>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}>Wagering Req</Text>
                        <Text style={styles.collapsetext}>{item.Wageringreq}X</Text>
                      </View>
                      <View style={styles.collapseBox}>
                        <Text style={styles.collapsetext}>Min  /  Max deposit : </Text>
                        <Text style={styles.collapsetext}>{item.mindeposit} INR&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{item.maxdeposit} INR</Text>
                      </View>
                      <Text style={[styles.collapsetext,{textAlign:'center'}]}>  {item.description}</Text>
                      {parseInt(item.Remaining) <= 0?
                        <TouchableOpacity onPress={this.Claim_Bonus_event}  style={{marginTop:LAYOUT.window.height*0.01, alignItems:'center', height:LAYOUT.window.height*0.05, justifyContent:'center', backgroundColor:COLOR.greenColor}}>
                          <Text style={styles.collapsetext} >Claim Bonus</Text>
                        </TouchableOpacity>
                      :
                        <View style={{marginTop:LAYOUT.window.height*0.01, alignItems:'center', height:LAYOUT.window.height*0.05, justifyContent:'center', backgroundColor:COLOR.greenColor,opacity:0.5 }}>
                          <Text style={styles.collapsetext} >Claim Bonus</Text>
                        </View>
                      } 
                    </CollapseBody>
                  </Collapse>
                </View>
              )) : null
            }
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo : state.profile.userInfo,
  BonusData : state.promotions.BonusData,
})

const mapDispatchToProps = {
  Bonusmenuload, Claim_request
}

export default connect(mapStateToProps, mapDispatchToProps)(BonusesScreen)
 
const styles = StyleSheet.create({
  ...profileStyles,
  ...baseStyles,

  collapsecontainer:{
    marginTop:LAYOUT.window.height*0.005,
    width:'100%',
  },
  collapseheader:{
    backgroundColor:COLOR.headerColor, 
    borderRadius:3,
  },
  collapseseparator:{
    backgroundColor:'rgba(0,0,0,0)',
  },
  collapsetitle:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.025,
  },
  collapsebody:{
    backgroundColor:COLOR.headerColor,
    padding:LAYOUT.window.width*0.03,
    marginTop:LAYOUT.window.height*0.005
  },
  collapsetext:{
    fontSize:LAYOUT.window.width*0.025,
    color:COLOR.whiteColor
  },
  collapseBox:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
    borderBottomColor:COLOR.greenColor, 
    borderBottomWidth:1, 
    padding:2,
    marginBottom:LAYOUT.window.height*0.01,
  }
});