import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Header } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Draggable from 'react-native-draggable';
import * as Components from "../../../components";
import { COLOR, LAYOUT } from "../../../constants";
import { get_odds, currentSelecteGame, get_all_sports_list } from '../../../redux/actions/sports'

class SportsScreen extends React.Component{

  constructor(props){
    super(props)
    this.state={
      allData : null,
      team : props.navigation.state.params,
      category : ""
    }
  }
  async componentDidMount(){
    await this.props.currentSelecteGame(this.state.team);
    await this.props.get_all_sports_list();

    var index = this.props.all_sports_list.findIndex(item => item.sport_id === this.state.team.sportid);
    var category = ""
    if(index > -1){
        category = this.props.all_sports_list[index].sport_name;
    }
    if(this.state.team.Venue){
        category += " > " + this.state.team.Venue.country;
    }
    if(this.state.team.Season){
        category += " > " + this.state.team.Season.Name;
    }
    this.setState({ category });
  }

  render(){
    const { sportsSidebarData, currentSelected } = this.props;
    const { category } = this.state;
    return(
      <Container style={styles.container}>
        <Header style={styles.Mheader}>
          <View style={styles.back}>
            <TouchableOpacity onPress={()=>Actions.pop()}>
                <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.headerBodyText}>&nbsp;&nbsp;{category?category:'SPORTS'}</Text>
          </View>
        </Header>
        <Content>
          <View>
            {currentSelected ? (
              currentSelected.EventStatus === "Finished" ? 
              <Text> Attention! All markets Finished. </Text> : (
                currentSelected.market && currentSelected.market.length ? 
                  currentSelected.market.map((Item, key)=>(
                    <React.Fragment key={key}>
                      {Item.Outcomes&&category?<Components.SportsEventItem sportsSidebarData={sportsSidebarData} team={currentSelected} Item={Item}/>:null}
                    </React.Fragment>                      
                  )):<Text>{category?"Any markets doens't exist!":''}</Text>
              )
            ):<Text>{category?"Attention! All markets Suspended.":''}</Text>}
          </View>
        </Content>
        <View style={styles.draggable}>
          <Draggable x={LAYOUT.window.width*0.8} y={LAYOUT.window.height*0.85} renderSize={LAYOUT.window.width*0.13} renderColor='rgba(0,0,0,0.4)' renderText={sportsSidebarData&&sportsSidebarData.data&&sportsSidebarData.data.length?sportsSidebarData.data.length:0} isCircle onShortPressRelease={()=>Actions.push('/sportsbet')}/>
        </View>
      </Container>
    ) 
  }
}
const mapStateToProps = (state) => ({
  sportsSidebarData : state.sports.sportsSidebarData,
  currentSelected : state.sports.currentSelectedGame,
  all_matchs : state.sports.all_matchs,
  all_sports_list : state.sports.all_sports_list,
})

const mapDispatchToProps = {
  get_odds, currentSelecteGame, get_all_sports_list
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsScreen)

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
  Mheader:{
    backgroundColor:COLOR.headerColor,
    justifyContent:'flex-start'
  },
  back:{
    padding:LAYOUT.window.width*0.02,
    flexDirection:'row',
    alignItems:'center'
  },
  headerBodyText:{
    width:LAYOUT.window.width*0.85,
    fontSize:LAYOUT.window.width*0.04,
    color:COLOR.whiteColor,
    fontWeight:'bold',
  },
  draggable:{
    height:LAYOUT.window.height, 
    width:LAYOUT.window.width, 
    position:'absolute', 
    top:0,
    left:0
  },
  draggablePosition:{
    bottom:LAYOUT.window.height*0.06,
    right:LAYOUT.window.width*0.03,
  }
})