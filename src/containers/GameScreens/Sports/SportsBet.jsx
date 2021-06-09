import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Container, Content, Header, Icon, Item, Picker, Input, Tabs, Tab } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Draggable from 'react-native-draggable';
import { actuatedNormalize, COLOR, LAYOUT } from '../../../constants';
import { removeItem, removeAllItem, placeBet , updateSportsSidebar, changeBetType, setItem } from "../../../redux/actions/sports"

export class SportsBet extends Component {
    
    constructor(props) {
        super(props)
        this.state={
            active : 'Single',
            isopen : true,
            smartBetFlag : false,
            multiAmount : 0,
            priceBoost : false,

            matchData : [{value : "" , label : "Please select Match"}],
            marketData : [{value : "" , label : "Please select Market"}],
            OddsData : [{value : "" , label : "Please select Odd"}],

            smartMatchId: "",
            smartMarketId: "",
            smartOddId: "",
        }
    }

    componentDidMount(){
        var setData = [];
        for(var i = 0 ; i < this.props.all_matchs.length ; i ++){
            var temp = {
                value : this.props.all_matchs.data[i].event_id,
                label : this.props.all_matchs.data[i].event_id.split(":")[2]
            }
            setData.push(temp);
        }
        this.setState({matchData : setData});
    }

    componentDidUpdate(prevProps){
        if(prevProps.all_matchs !== this.props.all_matchs && this.props.all_matchs){
            var setData = [];
            for(var i = 0 ; i < this.props.all_matchs.length ; i ++){
                var temp = {
                    value : this.props.all_matchs[i].event_id,
                    label : this.props.all_matchs[i].event_id.split(":")[2]
                }
                setData.push(temp);
            }
            this.setState({matchData : setData});
        }
    }

    bet(){
        var betData = this.props.sportsSidebarData;
        var sendData = {};
        var navBetData = [];
        var userId = this.props.user._id;
        var data = betData.data;

        if(this.state.active === "single"){
            for(var i = 0 ; i <data.length ;i ++){
                if( !data[i].amount || data[i].amount < 5){
                    alert("The minimum bet is 5 INR.");
                    return;
                }
                if(data[i].MarketStatus === "Suspended"){
                    alert("There are exist not allowed market!")
                    return;
                } 
                if(data[i].EventStatus === "Finished"){
                    alert("There are exist not allowed market!")
                    return;
                }
                var singleTemp = {
                    GAMEID : data[i].event_id,
                    USERID : userId,
                    LAUNCHURL : "SPORTS",
                    AMOUNT : data[i].amount,
                    betting : {
                        OutcomeId : data[i].OutcomeId,
                        OutcomeName : data[i].OutcomeName,
                        OutcomeOdds : data[i].OutcomeOdds,
                        MarketId : data[i].MarketId,
                        MarketSpecifiers : data[i].MarketSpecifiers,
                        MarketName : data[i].MarketName,
                        sportid : data[i].sportid,
                        MatchName : data[i].AwayCompetitor + " - " + data[i].HomeCompetitor,
                        priceBoost : data[i].priceBoost ? data[i].priceBoost : false
                    },
                }
                navBetData.push(singleTemp);
            }
            sendData.betType = "SINGLE";
            sendData.allAmount = betData.totalMoney;
        }
        else{
            if(this.state.multiAmount < 5){
                alert("The Bet Minimum Amount is 5 INR.");
                return;
            }
            for(var j = 0 ; j < data.length ; j ++){
                if(data[j].MarketStatus === "Suspended"){
                    alert("There are exist not allowed market!")
                    return;
                } 
                if(data[j].EventStatus === "Finished"){
                    alert("There are exist not allowed market!")
                    return;
                }
                var multiTemp = {
                    GAMEID : data[j].event_id,
                    USERID : userId,
                    LAUNCHURL : "SPORTS",
                    AMOUNT : this.state.multiAmount,
                    betting : {
                        OutcomeId : data[j].OutcomeId,
                        OutcomeName : data[j].OutcomeName,
                        OutcomeOdds : data[j].OutcomeOdds,
                        MarketId : data[j].MarketId,
                        MarketSpecifiers : data[j].MarketSpecifiers,
                        MarketName : data[j].MarketName,
                        sportid : data[j].sportid,
                        MatchName : data[j].HomeCompetitor + " - " + data[j].AwayCompetitor,
                        priceBoost : data[j].priceBoost ? data[j].priceBoost : false,
                        handleState : false
                    },
                }
                navBetData.push(multiTemp);
            }
            sendData.betType = "MULTI";
            sendData.allAmount = this.state.multiAmount;
        }
        sendData.bet = navBetData;
        sendData.user = userId;
        sendData.betId = this.props.betId;
        this.setState({multiAmount : 0})
        this.props.placeBet(sendData);
    }

    updateOdds(){
        var betData = this.props.sportsSidebarData;
        for(var bet_i = 0 ; bet_i < betData.data.length ; bet_i ++){
            betData.totalOdds = (parseFloat(betData.totalOdds) - parseFloat(betData.data[bet_i].OutcomeOdds) + parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);
            if(betData.data[bet_i].amount){
                if(this.state.active === "single"){
                    betData.totalStack = (parseFloat(betData.totalStack) - 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * parseFloat(betData.data[bet_i].amount) + 
                        parseFloat(betData.data[bet_i].OutcomeOdds_) * parseFloat(betData.data[bet_i].amount)).toFixed(2);
                }else{
                    betData.totalStack = (parseFloat(betData.totalStack) / 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * 
                        parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);                    
                }
            }
            if(betData.data[bet_i].OutcomeOdds_){
                if(betData.data[bet_i].priceBoost){
                    betData.data[bet_i].OutcomeOdds = parseFloat(betData.data[bet_i].OutcomeOdds_) + 0.05;
                }else{
                    betData.data[bet_i].OutcomeOdds = betData.data[bet_i].OutcomeOdds_;
                }
                betData.data[bet_i].OutcomeOdds_ = null;
            }
        }
        betData.oddsChange = false;
        this.props.updateSportsSidebar(betData);
    }

    changeAmount(item , value){
        var data = this.props.sportsSidebarData.data;
        var totalStack = 0;
        var totalOdds = 0;
        var totalMoney = 0;

        for(var i = 0 ; i < data.length ; i ++){
            if(data[i].OutcomeId === item.OutcomeId && 
                data[i].OutcomeName === item.OutcomeName && 
                data[i].MarketId === item.MarketId && 
                data[i].MarketName === item.MarketName && 
                data[i].MarketSpecifiers === item.MarketSpecifiers && 
                data[i].event_id === item.event_id){
                data[i].amount = value; 
            }
            if(data[i].amount){
                totalStack = (parseFloat(totalStack) + parseFloat(data[i].amount * data[i].OutcomeOdds)).toFixed(2);
                if(data[i].amount < 5) {
                    data[i].message = "The minimum bet amount is 5 INR.";
                }else{
                    totalMoney = (parseFloat(totalMoney) + parseFloat(data[i].amount)).toFixed(2);
                    data[i].message = "";
                }
            }
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }

        let sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : totalMoney
        }

        this.props.updateSportsSidebar(sendData);
    }

    multiAmountChange(value){
        if(!value) value = 0
        this.setState({multiAmount : value});
        var data = this.props.sportsSidebarData.data;
        var totalStack = value;
        var totalOdds = 0;
        for(var i = 0 ; i < data.length ; i ++){
            totalStack = (parseFloat(totalStack) * parseFloat(data[i].OutcomeOdds)).toFixed(2);
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }
        var sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : value,
            message : value < 5 ? "The minimum bet amount is 5 INR." : ""
        }
        this.props.updateSportsSidebar(sendData);
    }

    changeType(type){
        this.setState({active:type, isopen:true});
        this.props.changeBetType(type);
        var data = this.props.sportsSidebarData;
        var totalOdds = 0;
        if(type === "multi"){
            var totalStack = this.state.multiAmount;
            for(var i = 0 ; i < data.data.length ; i ++){
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
                if(totalStack) totalStack = (parseFloat(totalStack) * parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
            }
            data.totalStack = totalStack;
            data.totalOdds = totalOdds;
            data.totalMoney = this.state.multiAmount
        }else{
            var totalStack1 = 0;
            var totalMoney = 0;
            for(var j = 0 ; j < data.data.length ; j ++){
                totalStack1 = (parseFloat(totalStack1) + (parseFloat(data.data[j].amount) * parseFloat(data.data[j].OutcomeOdds))).toFixed(2);
                totalMoney = (parseFloat(totalMoney) + parseFloat(data.data[j].amount)).toFixed(2);
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[j].OutcomeOdds)).toFixed(2);
            }
            data.totalStack = totalStack1
            data.totalMoney = totalMoney
            data.totalOdds = totalOdds
        }
        this.props.updateSportsSidebar(data);
    }

    changeSmartBetFlag(){
        this.setState({smartBetFlag : !this.state.smartBetFlag})
    }

    priceBoost(){
        this.setState({priceBoost : !this.state.priceBoost});
    }

    setPriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = parseFloat(data.OutcomeOdds) + 0.05
        betData.data[index].priceBoost = true
        betData.priceBoost = true;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }

    removePriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = parseFloat(data.OutcomeOdds) - 0.05
        betData.data[index].priceBoost = false;
        betData.priceBoost = false;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }
    
    matchChange(e){
        this.setState({smartMatchId : e});
        var index = this.props.all_matchs.findIndex(item => item.event_id === e);
        var market = [{value : "" , label : "Please Select Market"}];
        if(index > -1){
            market = [];
            if(this.props.all_matchs.data[index].market && this.props.all_matchs.data[index].market.length){
                for(var i = 0 ; i < this.props.all_matchs.data[index].market.length ; i ++){
                    var temp = {
                        value : this.props.all_matchs.data[index].market[i].MarketId
                    }
                    if(this.props.all_matchs.data[index].market[i].MarketSpecifiers){
                        temp.label = this.props.all_matchs.data[index].market[i].MarketName + "(" + this.props.all_matchs.data[index].market[i].MarketSpecifiers + ")";
                    }else{
                        temp.label = this.props.all_matchs.data[index].market[i].MarketName;
                    }
                    market.push(temp);
                }
            }
        }
        this.setState({marketData : market})
    }

    changeMarket(e){
        this.setState({smartMarketId : e});
        var index = this.props.all_matchs.findIndex(item => item.event_id === this.state.smartMatchId);
        var index_ = this.props.all_matchs.data[index].market.findIndex(item => item.MarketId === e);
        var odd = [{value : "" , label : "Please Select Odds"}];
        if(this.props.all_matchs.data[index].market[index_].Outcomes && this.props.all_matchs.data[index].market[index_].Outcomes.length){
            odd = [];
            for(var i = 0 ; i < this.props.all_matchs.data[index].market[index_].Outcomes.length ; i ++){
                var temp = {
                    value : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeId,
                    label : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeName,
                }
                odd.push(temp);
            }
        }
        this.setState({OddsData : odd});
    }

    smartBet(){
        if(!this.state.smartMatchId || !this.state.smartMarketId || !this.state.smartOddId){
            alert("Please select correct odds.");
            return;
        }
        var match = this.props.all_matchs.findIndex(item => item.event_id === this.state.smartMatchId);
        var market = this.props.all_matchs.data[match].market.findIndex(item => item.MarketId === this.state.smartMarketId);
        var odd = this.props.all_matchs.data[match].market[market].Outcomes.findIndex(item => item.OutcomeId === this.state.smartOddId);
        this.props.setItem(Object.assign({}, this.props.all_matchs.data[match] , this.props.all_matchs.data[match].market[market] , this.props.all_matchs.data[match].market[market].Outcomes[odd]));
    }

    render() {
        const { priceBoost, tabLabel, active, smartBetFlag, matchData, smartMatchId, marketData, smartMarketId, OddsData, smartOddId } = this.state;
        const { betId, sportsSidebarData, user, balance } = this.props;
        return (
            <Container style={styles.container}>
                <Header style={styles.Mheader}>
                <View style={styles.back}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerBodyText}>&nbsp;&nbsp;SPORTS MENU</Text>
                </View>
                </Header>
                <Tabs locked>
                    <Tab 
                        heading="Single"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <View>
                            <TouchableOpacity style={styles.smartBetButton} onPress={()=>this.changeSmartBetFlag()}>
                                <Text style={styles.smartBetText}>SMART BET</Text>
                                <Entypo 
                                    size={actuatedNormalize(15)} 
                                    name={smartBetFlag ?"chevron-down":"chevron-right"} 
                                    color={smartBetFlag ?COLOR.greenColor:COLOR.grey1Color} 
                                />
                            </TouchableOpacity>
                            {
                                smartBetFlag?
                                    <View>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                // modalStyle={{backgroundColor:'red',width:'100%', height:'100%'}}
                                                selectedValue={smartMatchId}
                                                defaultValue={matchData[0]}
                                                onValueChange={e => this.matchChange(e)}
                                            >
                                                {matchData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={smartMarketId}
                                                defaultValue={marketData[0]}
                                                onValueChange={e => this.changeMarket(e)}
                                            >
                                                {marketData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={smartOddId}
                                                defaultValue={OddsData[0]}
                                                onValueChange={e => this.setState({smartOddId:e})}
                                            >
                                                {OddsData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <TouchableOpacity style={styles.addButton} onPress={() => this.smartBet()}>
                                            <Text style={styles.smartBetText}>+ ADD BET</Text>
                                        </TouchableOpacity>
                                    </View>
                                :null
                            }
                            <View style={{borderTopWidth:1, borderColor:COLOR.greyColor}}>
                                <TouchableOpacity style={styles.addButton} onPress={() => this.priceBoost()}>
                                    <Text style={styles.smartBetText}>Price Boost</Text>
                                </TouchableOpacity>
                            </View>
                            <Item rounded>
                                <Input value={"Bet Id : " + betId } style={styles.betidText}/>
                            </Item>
                            <View style={{maxHeight:LAYOUT.window.height*(smartBetFlag?0.3:0.5),marginVertical:LAYOUT.window.height*0.01, }}>
                                <ScrollView nestedScrollEnabled = {true}>
                                    {
                                        active === 'Single' ? (sportsSidebarData.data ? sportsSidebarData.data.map((item, key)=>(
                                            <View key={key} style={{borderTopWidth:1,borderBottomWidth:1,borderColor:COLOR.grey1Color, marginVertical:LAYOUT.window.height*0.01,paddingVertical:LAYOUT.window.height*0.01, }}>
                                                <View style={styles.itemNameBox}>
                                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                                        {item.AwayCompetitor+' - '+item.HomeCompetitor}
                                                    </Text>
                                                    <Text style={styles.itemNameRight} numberOfLines={1}>
                                                        {item.event_id.split(":")[2]}
                                                    </Text>
                                                </View>
                                                <Text style={styles.itemName} numberOfLines={1}>
                                                    {item.MarketName}
                                                </Text>
                                                <View style={styles.itemNameBox}>
                                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                                        {item.OutcomeName}
                                                    </Text>
                                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                                        {item.OutcomeOdds}
                                                    </Text>
                                                </View>
                                                {
                                                    priceBoost ? 
                                                    (
                                                        sportsSidebarData.priceBoost ? 
                                                            (
                                                                item.priceBoost ? 
                                                                <TouchableOpacity style={styles.addButton} onPress={() => this.removePriceBoost(item)}>
                                                                    <Text style={styles.smartBetText}>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05)}</Text>
                                                                </TouchableOpacity> : null
                                                            ): 
                                                            <TouchableOpacity style={styles.addButton} onPress={() => this.setPriceBoost(item)}>
                                                                <Text style={styles.smartBetText}>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05)}</Text>
                                                            </TouchableOpacity>
                                                    ): (
                                                        active === 'Single'?<Item rounded>
                                                            <Input value={item.amount ? item.amount : ''} style={[styles.betidText, {textAlign:'right'}]} onChangeText = {(e) =>this.changeAmount(item , e)}/>
                                                        </Item>:null
                                                    )
                                                }
                                                <View style={styles.itemNameBox}>
                                                    <TouchableOpacity style={{maxWidth:'30%'}} onPress={()=>this.props.removeItem(item)}>
                                                        <Text style={styles.itemName} numberOfLines={1}>
                                                            Remove&nbsp;&nbsp;×
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {
                                                        active === 'Single'?
                                                        <Text style={[styles.itemName,{maxWidth:'65%'}]} numberOfLines={1}>
                                                            Potential win : INR { item.amount ? parseFloat(item.amount * item.OutcomeOdds).toFixed(2) : 0.00}
                                                        </Text>:null
                                                    }
                                                </View>
                                                {
                                                    item.message?<Text style={styles.itemName} numberOfLines={1}>{item.message}</Text>:null
                                                }
                                            </View>
                                        )):null):null
                                    }
                                </ScrollView>
                            </View>
                            <View>
                                <View style={[styles.itemNameBox, {paddingVertical:0}]}>
                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                        Total stake :
                                    </Text>
                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                        {"INR "}{sportsSidebarData.totalStack ? sportsSidebarData.totalStack : 0.00}
                                    </Text>
                                </View>
                                <View style={[styles.itemNameBox, {paddingVertical:0}]}>
                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                        Total Odds :
                                    </Text>
                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                        {sportsSidebarData.totalOdds ? sportsSidebarData.totalOdds : 0.00}
                                    </Text>
                                </View>
                                {
                                    user ? (
                                        balance && balance >= sportsSidebarData.totalMoney ? (
                                            sportsSidebarData.oddsChange ? (
                                                <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                                    <Text style={styles.smartBetText}>Update Odds</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity style={styles.addButton} onPress={() => this.bet()}>
                                                    <Text style={styles.smartBetText}>{sportsSidebarData.totalMoney ? "Place Bet " + sportsSidebarData.totalMoney + " INR": "Place Bet "}</Text>
                                                </TouchableOpacity>
                                            )
                                        ) : 
                                        <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                            <Text style={styles.smartBetText}>Deposit</Text>
                                        </TouchableOpacity>
                                    ) : 
                                    <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                        <Text style={styles.smartBetText}>Login</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={()=>this.props.removeAllItem()}>
                                    <Text style={styles.smartBetText}>Remove all bets&nbsp;&nbsp;×</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Tab>
                    <Tab 
                        heading="Multi"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <View>
                            <TouchableOpacity style={styles.smartBetButton} onPress={()=>this.changeSmartBetFlag()}>
                                <Text style={styles.smartBetText}>SMART BET</Text>
                                <Entypo 
                                    size={actuatedNormalize(15)} 
                                    name={smartBetFlag ?"chevron-down":"chevron-right"} 
                                    color={smartBetFlag ?COLOR.greenColor:COLOR.grey1Color} 
                                />
                            </TouchableOpacity>
                            {
                                smartBetFlag?
                                    <View>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                // modalStyle={{backgroundColor:'red',width:'100%', height:'100%'}}
                                                selectedValue={smartMatchId}
                                                defaultValue={matchData[0]}
                                                onValueChange={e => this.matchChange(e)}
                                            >
                                                {matchData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={smartMarketId}
                                                defaultValue={marketData[0]}
                                                onValueChange={e => this.changeMarket(e)}
                                            >
                                                {marketData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <Item picker>
                                            <Picker
                                                textStyle={{fontSize: 1}}
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, height:LAYOUT.window.height*0.05 }}
                                                placeholder="Match Id"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={smartOddId}
                                                defaultValue={OddsData[0]}
                                                onValueChange={e => this.setState({smartOddId:e})}
                                            >
                                                {OddsData.map((item, key)=>
                                                    <Picker.Item key={key} label={item.label} value={item.value}/>
                                                )}
                                            </Picker>
                                        </Item>
                                        <TouchableOpacity style={styles.addButton} onPress={() => this.smartBet()}>
                                            <Text style={styles.smartBetText}>+ ADD BET</Text>
                                        </TouchableOpacity>
                                    </View>
                                :null
                            }
                            <View style={{borderTopWidth:1, borderColor:COLOR.greyColor}}>
                                <TouchableOpacity style={styles.addButton} onPress={() => this.priceBoost()}>
                                    <Text style={styles.smartBetText}>Price Boost</Text>
                                </TouchableOpacity>
                            </View>
                            <Item rounded>
                                <Input value={"Bet Id : " + betId } style={styles.betidText}/>
                            </Item>
                            <View style={{maxHeight:LAYOUT.window.height*(smartBetFlag?0.3:0.43),marginVertical:LAYOUT.window.height*0.01, }}>
                                <ScrollView nestedScrollEnabled = {true}>
                                    {
                                        active !== 'Single' ? (sportsSidebarData.data ? sportsSidebarData.data.map((item, key)=>(
                                            <View key={key} style={{borderTopWidth:1,borderBottomWidth:1,borderColor:COLOR.grey1Color, marginVertical:LAYOUT.window.height*0.01,paddingVertical:LAYOUT.window.height*0.01, }}>
                                                <View style={styles.itemNameBox}>
                                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                                        {item.AwayCompetitor+' - '+item.HomeCompetitor}
                                                    </Text>
                                                    <Text style={styles.itemNameRight} numberOfLines={1}>
                                                        {item.event_id.split(":")[2]}
                                                    </Text>
                                                </View>
                                                <Text style={styles.itemName} numberOfLines={1}>
                                                    {item.MarketName}
                                                </Text>
                                                <View style={styles.itemNameBox}>
                                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                                        {item.OutcomeName}
                                                    </Text>
                                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                                        {item.OutcomeOdds}
                                                    </Text>
                                                </View>
                                                {
                                                    priceBoost ? 
                                                    (
                                                        sportsSidebarData.priceBoost ? 
                                                            (
                                                                item.priceBoost ? 
                                                                <TouchableOpacity style={styles.addButton} onPress={() => this.removePriceBoost(item)}>
                                                                    <Text style={styles.smartBetText}>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05)}</Text>
                                                                </TouchableOpacity> : null
                                                            ): 
                                                            <TouchableOpacity style={styles.addButton} onPress={() => this.setPriceBoost(item)}>
                                                                <Text style={styles.smartBetText}>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05)}</Text>
                                                            </TouchableOpacity>
                                                    ): (
                                                        active === 'Single'?<Item rounded>
                                                            <Input value={item.amount ? item.amount : ''} style={[styles.betidText, {textAlign:'right'}]} onChangeText = {(e) =>this.changeAmount(item , e)}/>
                                                        </Item>:null
                                                    )
                                                }
                                                <View style={styles.itemNameBox}>
                                                    <TouchableOpacity style={{maxWidth:'30%'}} onPress={()=>this.props.removeItem(item)}>
                                                        <Text style={styles.itemName} numberOfLines={1}>
                                                            Remove&nbsp;&nbsp;×
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {
                                                        active === 'Single'?
                                                        <Text style={[styles.itemName,{maxWidth:'65%'}]} numberOfLines={1}>
                                                            Potential win : INR { item.amount ? parseFloat(item.amount * item.OutcomeOdds).toFixed(2) : 0.00}
                                                        </Text>:null
                                                    }
                                                </View>
                                                {
                                                    item.message?<Text style={styles.itemName} numberOfLines={1}>{item.message}</Text>:null
                                                }
                                            </View>
                                        )):null):null
                                    }
                                </ScrollView>
                            </View>
                            <View>
                                {
                                    <Item rounded>
                                        <Input value={this.state.multiAmount ? this.state.multiAmount : ""} style={[styles.betidText, {textAlign:'right'}]} onChangeText = {(e) => this.multiAmountChange(e)}/>
                                    </Item>
                                }
                                {
                                    active !== 'Single'?
                                    <Text style={styles.itemName} numberOfLines={1}>
                                        Potential Winnings
                                    </Text>:null
                                }
                                <View style={[styles.itemNameBox, {paddingVertical:0}]}>
                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                        Total stake :
                                    </Text>
                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                        {"INR "}{sportsSidebarData.totalStack ? sportsSidebarData.totalStack : 0.00}
                                    </Text>
                                </View>
                                <View style={[styles.itemNameBox, {paddingVertical:0}]}>
                                    <Text style={styles.itemNameLeft} numberOfLines={1}>
                                        Total Odds :
                                    </Text>
                                    <Text style={[styles.itemNameRight,{color:COLOR.greenColor}]} numberOfLines={1}>
                                        {sportsSidebarData.totalOdds ? sportsSidebarData.totalOdds : 0.00}
                                    </Text>
                                </View>
                                {
                                    user ? (
                                        balance && balance >= sportsSidebarData.totalMoney ? (
                                            sportsSidebarData.oddsChange ? (
                                                <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                                    <Text style={styles.smartBetText}>Update Odds</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity style={styles.addButton} onPress={() => this.bet()}>
                                                    <Text style={styles.smartBetText}>{sportsSidebarData.totalMoney ? "Place Bet " + sportsSidebarData.totalMoney + " INR": "Place Bet "}</Text>
                                                </TouchableOpacity>
                                            )
                                        ) : 
                                        <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                            <Text style={styles.smartBetText}>Deposit</Text>
                                        </TouchableOpacity>
                                    ) : 
                                    <TouchableOpacity style={styles.addButton} onPress={() => this.updateOdds()}>
                                        <Text style={styles.smartBetText}>Login</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={()=>this.props.removeAllItem()}>
                                    <Text style={styles.smartBetText}>Remove all bets&nbsp;&nbsp;×</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Tab>
                </Tabs>
                <View style={styles.draggable}>
                    <Draggable x={LAYOUT.window.width*0.8} y={LAYOUT.window.height*0.1} renderSize={LAYOUT.window.width*0.13} renderColor='rgba(0,0,0,0.4)' renderText={sportsSidebarData&&sportsSidebarData.data&&sportsSidebarData.data.length?sportsSidebarData.data.length:0} isCircle onShortPressRelease={()=>Actions.push('/sportsbet')}/>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    sportsSidebarData : state.sports.sportsSidebarData,
    all_matchs : state.sports.all_matchs,
    balance : state.balance.balance,
    user : state.auth.login.values,
    betId : state.sports.betId
})

const mapDispatchToProps = {
    removeItem,
    removeAllItem,
    placeBet,
    updateSportsSidebar,
    changeBetType,
    setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsBet)

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
    mainTabcontainer : {
        height:LAYOUT.window.height,
        padding:LAYOUT.window.width*0.01,
        alignItems:'center',
        justifyContent:'center'
    },
    mainTab:{
        width:LAYOUT.window.width * 0.9,
        height:LAYOUT.window.height,
        padding:LAYOUT.window.width*0.02
    },
    tabBar:{
        color:COLOR.greenColor,
        fontWeight:'bold',
        fontStyle: "italic"
    },
    tabText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.window.width*0.03
    },
    tabStyle:{
        backgroundColor:COLOR.baseBackgroundColor,
    },
    smartBetText:{
        fontSize:actuatedNormalize(15),
        color:COLOR.whiteColor
    },
    smartBetButton:{
        borderBottomWidth:1,
        borderColor:COLOR.grey1Color, 
        paddingHorizontal:LAYOUT.window.width*0.025,
        paddingVertical:LAYOUT.window.height*0.01,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    addButton:{
        backgroundColor:COLOR.greenColor,
        padding:LAYOUT.window.width*0.015,
        alignItems:'center',
        marginVertical:LAYOUT.window.height*0.01
    },
    betidText:{
        fontSize:actuatedNormalize(12), 
        height:LAYOUT.window.height*0.05,
        textAlign:'center',
        color:COLOR.whiteColor,
    },
    itemName:{
        fontSize:actuatedNormalize(11), 
        color:COLOR.whiteColor,
    },
    itemNameLeft:{
        fontSize:actuatedNormalize(12), 
        fontWeight:'700',
        color:COLOR.whiteColor,
        maxWidth:'65%',
    },
    itemNameRight:{
        fontSize:actuatedNormalize(12), 
        fontWeight:'700',
        color:COLOR.whiteColor,
        marginLeft:'5%', 
        maxWidth:'30%',
    },
    itemNameBox:{
        flexDirection:'row', 
        justifyContent:'space-between',
        paddingVertical:LAYOUT.window.height*0.005,
    }
  })