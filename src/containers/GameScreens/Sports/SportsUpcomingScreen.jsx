import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import Draggable from 'react-native-draggable';
import * as Components from "../../../components";
import { COLOR, LAYOUT, sportsconfig } from "../../../constants";
import { get_sports_lists, get_odds, current_select_sport, remove_all_match, TapChange  } from '../../../redux/actions/sports'
import { Actions } from 'react-native-router-flux';

class SportsUpcomingScreen extends React.Component{

  constructor(){
    super()
    this.state={
      id:1,
      Item:null,
      activeCTab:sportsconfig.tab[0],
    }
  }

  componentDidMount() {
    this.props.get_sports_lists(sportsconfig.matchType['Upcoming']);
    this.props.remove_all_match();
  }

  componentDidUpdate(data){
    if(data.sport_list !== this.props.sport_list && this.props.sport_list.length){
      var Item = this.props.sport_list[0];
      this.setState({Item})
      this.props.current_select_sport(Item);
      var sendData = {
        sportid : Item.sport_id,
        EventStatus : "NotStarted"
      }
      this.props.get_odds(sendData);
    }
  }

  Active(Item){
    this.props.current_select_sport(Item);
    var sendData = {
      sportid : Item.sport_id,
      EventStatus : this.props.current_tap.EventStatus
    }
    this.props.get_odds(sendData);
    this.setState({Item})
  }
  
  ActiveChildTab = async (Item) => {
    await this.props.TapChange(Item);
    var sendData = {
        sportid : this.props.current_selected_sport.sport_id,
        EventStatus : Item.EventStatus
    }
    this.props.get_odds(sendData);
  }

  render(){
    const { current_selected_sport, firstpage, sport_list, current_tap, all_matchs, sportsSidebarData } = this.props;
    return(
      <Container style={styles.container}>
        <Components.HeaderScreen />
        <Content>
          <View>
              <View style={{flexDirection:'row', margin:LAYOUT.window.width*0.015}}>
                <ScrollView horizontal={true}>
                    {sport_list && sport_list.length ? sport_list.map((item, key)=>(
                      <Components.SportsTab 
                        key={key} 
                        item={item} 
                        sport_id={current_selected_sport.sport_id?current_selected_sport.sport_id:sport_list[0].sport_id} 
                        Active={(e)=>this.Active(e)} 
                      />
                    )):null}
                </ScrollView>
              </View> 
            {this.state.Item?
              <Components.SportsTabScreen
                isSports = {false}
                ActiveChildTab={(e)=>this.ActiveChildTab(e)}
                activeCTab={current_tap}
                Item={this.state.Item} 
                tab={sportsconfig.tab}
              />
            :null}
            {all_matchs.data&&all_matchs.data.length?all_matchs.data.map((item, key)=>(
              <Components.SportsItem key={key} item={item} sportsSidebarData={sportsSidebarData}/>
            )):null}
          </View>
        </Content>
        {firstpage.firstmenu ? <Components.FooterScreen data={firstpage.firstmenu} /> : null}
        <View style={styles.draggable}>
          <Draggable x={LAYOUT.window.width*0.85} y={LAYOUT.window.height*0.8} renderSize={LAYOUT.window.width*0.13} renderColor='rgba(0,0,0,0.4)' renderText={sportsSidebarData&&sportsSidebarData.data&&sportsSidebarData.data.length?sportsSidebarData.data.length:0} isCircle onShortPressRelease={()=>Actions.push('/sportsbet')}/>
        </View>
      </Container>
    )
  }
}
const mapStateToProps = (state) => ({
  sports : state.sports,
  firstpage : state.auth.register,
  sport_list : state.sports.sports_list,
  current_selected_sport : state.sports.current_selected_sport,
  current_tap : state.sports.current_tap,
  sportsSidebarData : state.sports.sportsSidebarData,
  all_matchs : state.sports.all_matchs
})

const mapDispatchToProps = {
  get_sports_lists,
  get_odds,
  current_select_sport,
  remove_all_match,
  TapChange
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsUpcomingScreen)

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
  draggable:{
    height:LAYOUT.window.height, 
    width:LAYOUT.window.width, 
    position:'absolute', 
    top:0,
    left:0
  }
})