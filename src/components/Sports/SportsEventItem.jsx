import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Entypo, Fontisto } from '@expo/vector-icons';
import { COLOR, LAYOUT, actuatedNormalize } from '../../constants';
import { setItem } from '../../redux/actions/sports';

export class SportsItem extends Component {
    constructor(props){
        super(props)
        this.state={
            isopen:false,
            id:0,
        }
    }
  
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    sportsEventsItems(e){
        this.props.setItem(Object.assign({}, e, this.props.team, this.props.Item));
    }

    render() {
        const {sportsSidebarData, Item} = this.props;
        const {isOpen} = this.state;
        return (
            <View>
                <TouchableOpacity 
                    onPress={()=>this.setState({isOpen : !isOpen})} 
                    style={[styles.sportsitem, isOpen?{borderColor:COLOR.greenColor}:{}]}
                >
                    <View style={styles.sportsitembox}> 
                        <Text style={[styles.sportsname,isOpen?{color:COLOR.whiteColor}:null]} numberOfLines={1}>
                            {Item.MarketSpecifiers !== "" ? Item.MarketName + " (" + Item.MarketSpecifiers + ") " : Item.MarketName}
                        </Text>
                        <Entypo 
                            size={actuatedNormalize(12)} 
                            name={isOpen ?"chevron-down":"chevron-right"} 
                            color={isOpen ?COLOR.greenColor:COLOR.grey1Color} 
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.sportsitemfirstlist}>

                    {
                        isOpen&&Item.Outcomes.length ? Item.Outcomes.map((eventItem, key)=>(
                            <View  
                                key={key} 
                                style={[
                                    styles.textBox, 
                                    {width:LAYOUT.window.width*(Item.Outcomes.length===3?0.31:0.478)},
                                    (sportsSidebarData.data.findIndex(
                                        data => data.OutcomeId === eventItem.OutcomeId && 
                                        data.OutcomeName === eventItem.OutcomeName &&
                                        data.MarketId === Item.MarketId && 
                                        data.MarketName === Item.MarketName && 
                                        data.MarketSpecifiers === Item.MarketSpecifiers &&
                                        data.event_id === this.props.team.event_id
                                    )>-1?{backgroundColor:COLOR.greenColor}:{})
                                ]}
                            >
                                {isNaN(eventItem.OutcomeOdds) ? 
                                    <Fontisto size={actuatedNormalize(9)} name='locked' color={COLOR.blackColor} />
                                    : 
                                    <TouchableOpacity style={styles.textItemBox} onPress={()=>this.sportsEventsItems(eventItem)}>
                                        <Text numberOfLines={1} style = {styles.textItemLeft}>
                                            {eventItem.OutcomeName}
                                            </Text>
                                        <Text numberOfLines={1} style = {styles.textItemRight}>
                                            {eventItem.OutcomeOdds}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ))
                    :null}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    setItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsItem)

const styles = StyleSheet.create({
    sportsitem:{
        padding:LAYOUT.window.width*0.02, 
        borderTopWidth:1, 
        borderColor:COLOR.grey1Color
    },
    sportsitembox:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between'
    },
    sportsname:{
        paddingHorizontal:LAYOUT.window.width*0.01,
        color:COLOR.grey1Color, 
        fontWeight:'500', 
        fontSize:actuatedNormalize(10), 
    },
    sportsitemfirstlist:{
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems:'center',
        width:'100%'
    },
    textBox:{
        height:LAYOUT.window.height*0.05,
        margin:LAYOUT.window.width*0.01,
        fontSize:actuatedNormalize(9),
        backgroundColor:COLOR.white1Color,
        color:COLOR.whiteColor,
        alignItems:'center',
        justifyContent:'center',
        padding:LAYOUT.window.width*0.01,
    },
    textItemLeft:{
        maxWidth:'70%',
        fontSize:actuatedNormalize(9),
        textAlign:'center', 
        textAlignVertical:'center', 
        color:COLOR.white3Color
    },
    textItemRight:{
        maxWidth:'25%',
        marginLeft:'5%', 
        fontSize:actuatedNormalize(9),
        textAlign:'center', 
        textAlignVertical:'center', 
        color:COLOR.white3Color
    },
    textItemBox:{
        flexDirection:'row', 
        justifyContent:'center', 
        height:'100%', 
        width:'100%'
    }
})