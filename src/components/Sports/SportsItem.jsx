import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Entypo, Fontisto } from '@expo/vector-icons';
import { COLOR, LAYOUT, actuatedNormalize } from '../../constants';
import { setItem } from '../../redux/actions/sports';
import { Actions } from 'react-native-router-flux';

export class SportsItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            activeiId:'',
            isOpen:false
        }
    }

    sportsEvent(e){
        Actions.push('/sportsevent',e);
    }
    
    setOdds(p1 , p2 , p3){
        var param = Object.assign({}, p1 , p2);
        param.event_id = p3.event_id
        param.HomeCompetitor = p3.HomeCompetitor
        param.AwayCompetitor = p3.AwayCompetitor
        this.props.setItem(param);
    }

    render() {
        const { sportsSidebarData, item } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={()=>this.setState({isOpen : !this.state.isOpen})} style={styles.sportsitem}>
                    <View style={styles.sportsitembox}> 
                        <Entypo 
                            size={actuatedNormalize(12)} 
                            name={this.state.isOpen ?"chevron-down":"chevron-right"} 
                            color={this.state.isOpen ?COLOR.greenColor:COLOR.grey1Color} 
                        />
                        <Text style={[styles.sportsname,this.state.isOpen?{color:COLOR.whiteColor}:null]} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <View style={styles.sportsitems}>
                            <Text style={styles.sportsitemlength} numberOfLines={1}>{item.data.length}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    this.state.isOpen?
                    <View style={{width:'100%'}}>
                        <Text style={styles.sportstype}>1 X 2</Text>
                        {item.data.map((data, key)=>(
                            <View key={key} style={styles.sportsitemlistbox}>
                                <View style={styles.sportsitemfirstlist}>
                                    <TouchableOpacity style={styles.teamNameBox} onPress={()=>this.sportsEvent(data)}>
                                        <Text style={styles.teamName} numberOfLines={1}>
                                            {data.HomeCompetitor}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.teamsScoreBox}>
                                        <Text style={styles.teamsScore} numberOfLines={1}>
                                            {!data.Status.HomeScore ? 0 : data.Status.HomeScore}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.teamNameBox} onPress={()=>this.sportsEvent(data)}>
                                        <Text style={styles.teamName} numberOfLines={1}>
                                            {data.HomeCompetitor}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.teamsScoreBox}>
                                        <Text style={styles.teamsScore} numberOfLines={1}>
                                            {!data.Status.AwayScore ? 0 : data.Status.AwayScore}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.sportsitemsecondlist}>
                                    {
                                        data.oneTotwo.one && data.produceStatus === true && !isNaN(data.oneTotwo.one.OutcomeOdds)?
                                        <Text onPress={(e)=>this.setOdds(data.oneTotwo , data.oneTotwo.one , data)}
                                            style = {
                                                    [styles.oneTotwo,
                                                            (sportsSidebarData.data.findIndex( datas => 
                                                                datas.OutcomeId === data.oneTotwo.one.OutcomeId && 
                                                                datas.OutcomeName === data.oneTotwo.one.OutcomeName && 
                                                                datas.MarketId === data.oneTotwo.MarketId && 
                                                                datas.MarketName === data.oneTotwo.MarketName && 
                                                                datas.MarketSpecifiers === data.oneTotwo.MarketSpecifiers && 
                                                                datas.event_id === data.event_id
                                                            ) > -1 ? 
                                                            (data.oneTotwo.MarketStatus !== "Active" ? {color:'black', backgroundColor:COLOR.greenColor} : {backgroundColor:COLOR.greenColor}):{}
                                                        )
                                                    ]
                                                }
                                            >
                                            {data.oneTotwo.one.OutcomeOdds}
                                        </Text> : 
                                        <Text style={styles.oneTotwo}> 
                                            <Fontisto size={actuatedNormalize(9)} name='locked' color={COLOR.blackColor} />
                                        </Text>
                                    }
                                    {
                                        data.oneTotwo.draw && data.produceStatus === true && !isNaN(data.oneTotwo.draw.OutcomeOdds)?
                                        <Text onPress={(e)=>this.setOdds(data.oneTotwo , data.oneTotwo.draw , data)}
                                            style = {
                                                    [styles.oneTotwo,
                                                            (sportsSidebarData.data.findIndex( datas => 
                                                                datas.OutcomeId === data.oneTotwo.draw.OutcomeId && 
                                                                datas.OutcomeName === data.oneTotwo.draw.OutcomeName && 
                                                                datas.MarketId === data.oneTotwo.MarketId && 
                                                                datas.MarketName === data.oneTotwo.MarketName && 
                                                                datas.MarketSpecifiers === data.oneTotwo.MarketSpecifiers && 
                                                                datas.event_id === data.event_id
                                                            ) > -1 ? 
                                                            (data.oneTotwo.MarketStatus !== "Active" ? {backgroundColor:COLOR.greenColor} : {backgroundColor:COLOR.greenColor}):{}
                                                        )
                                                    ]
                                                }
                                            >
                                            {data.oneTotwo.draw.OutcomeOdds}
                                        </Text> : 
                                        <Text style={styles.oneTotwo}> 
                                            <Fontisto size={actuatedNormalize(9)} name='locked' color={COLOR.blackColor} />
                                        </Text>
                                    }
                                    {
                                        data.oneTotwo.two && data.produceStatus === true && !isNaN(data.oneTotwo.two.OutcomeOdds)?
                                        <Text onPress={(e)=>this.setOdds(data.oneTotwo , data.oneTotwo.two , data)}
                                            style = {
                                                    [styles.oneTotwo,
                                                            (sportsSidebarData.data.findIndex( datas => 
                                                                datas.OutcomeId === data.oneTotwo.two.OutcomeId && 
                                                                datas.OutcomeName === data.oneTotwo.two.OutcomeName && 
                                                                datas.MarketId === data.oneTotwo.MarketId && 
                                                                datas.MarketName === data.oneTotwo.MarketName && 
                                                                datas.MarketSpecifiers === data.oneTotwo.MarketSpecifiers && 
                                                                datas.event_id === data.event_id
                                                            ) > -1 ? 
                                                            (data.oneTotwo.MarketStatus !== "Active" ? {color:'black', backgroundColor:COLOR.greenColor} : {backgroundColor:COLOR.greenColor})
                                                                :
                                                            (data.oneTotwo.MarketStatus !== "Active" ? {color:'black'} : {} )
                                                        )
                                                    ]
                                                }
                                            >
                                            {data.oneTotwo.two.OutcomeOdds}
                                        </Text> : 
                                        <Text style={styles.oneTotwo}> 
                                            <Fontisto size={actuatedNormalize(9)} name='locked' color={COLOR.blackColor} />
                                        </Text>
                                    }
                                    <Text style = {styles.marketLength}>
                                        {data.market ? '+'+data.market.length : 0}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>:null
                }
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
        borderBottomWidth:1, 
        borderTopWidth:1, 
        borderColor:COLOR.grey1Color
    },
    sportsitembox:{
        flexDirection:'row', 
        alignItems:'center'
    },
    sportsname:{
        marginLeft:LAYOUT.window.width*0.01,
        marginRight:LAYOUT.window.width*0.01,
        color:COLOR.grey1Color, 
        fontWeight:'500', 
        width:LAYOUT.window.width*0.82,
        fontSize:actuatedNormalize(10), 
    },
    sportsitems:{
        width:LAYOUT.window.width*0.08
    },
    sportsitemlength:{
        width:'100%', 
        textAlign:'center', 
        color:COLOR.greenColor, 
        fontWeight:'500', 
        fontSize:actuatedNormalize(10),
    },
    teamName:{
        fontSize:actuatedNormalize(9),
        color:COLOR.whiteColor,
    },
    teamNameBox:{
        justifyContent:'center',
        width:LAYOUT.window.width*0.4,
        paddingHorizontal:LAYOUT.window.width*0.02,
        paddingVertical:LAYOUT.window.height*0.005,
    },
    teamsScore:{
        color:COLOR.greenColor,
        fontSize:actuatedNormalize(9),
        textAlign:'center'
    },
    teamsScoreBox:{
        alignItems:'center',
        width:LAYOUT.window.width*0.1,
    },
    sportsitemlistbox:{
        backgroundColor:COLOR.green2Color,
        borderBottomWidth:LAYOUT.window.height*0.002,
        borderColor:COLOR.grey1Color,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    sportsitemfirstlist:{
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:LAYOUT.window.width*0.5,
    },
    sportsitemsecondlist:{
        flexDirection:'row',
        width:LAYOUT.window.width*0.5,   
    },
    sportstype:{
        width:LAYOUT.window.width*0.4,
        fontSize:actuatedNormalize(9),
        marginLeft:LAYOUT.window.width*0.5,
        color:COLOR.grey1Color,
        textAlign:'center',
    },
    oneTotwo:{
        width:LAYOUT.window.width*0.1,
        height:LAYOUT.window.height*0.07,
        margin:LAYOUT.window.width*0.015,
        fontSize:actuatedNormalize(9),
        backgroundColor:COLOR.white1Color,
        color:COLOR.white3Color,
        textAlignVertical:'center',
        textAlign:'center',
    },
    marketLength:{
        width:LAYOUT.window.width*0.08,
        height:LAYOUT.window.height*0.07,
        marginHorizontal:LAYOUT.window.width*0.01,
        marginVertical:LAYOUT.window.width*0.015,
        fontSize:actuatedNormalize(9),
        backgroundColor:COLOR.white1Color,
        color:COLOR.greenColor,
        textAlignVertical:'center',
        textAlign:'center',
    }
})