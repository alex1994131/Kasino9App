import React from 'react';
import { Left, Right } from 'native-base';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR, Root } from "../../constants";

export default class CasinoMapScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            items : [],
            index : 15
        }
    }
    componentDidMount(){
        if(this.props.data && this.props.data.length){
            this.setState({items : this.props.data.slice(0, this.state.index)});
        }
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.setState({
                items : this.props.data.slice(0, this.state.index),
                index : 15
            });
        }
    }

    handleOnScroll(event){
        let x = event.nativeEvent.contentOffset.x;
        let width = event.nativeEvent.layoutMeasurement.width;
        let contentwidth = event.nativeEvent.contentSize.width;
        if(x+width>=contentwidth-1){
            var index = this.state.index + 12;
            this.setState({
                index: index,
                items: this.props.data.slice(0, index)
            });
        }
    }
    
    render(){
        return(
           <View style={{alignItems:'center'}}>
                {this.props.title ? 
                    <View style={styles.title}>
                        <Left>
                            <Text style={styles.casinoText}>{this.props.title}</Text>
                        </Left>
                        <Right>
                            <TouchableOpacity onPress={()=>Actions.push(this.props.moreUrl)}>
                                <MaterialIcons name="more-vert" size={LAYOUT.window.width*0.05} color={COLOR.greenColor} />
                            </TouchableOpacity>
                        </Right>
                    </View>:null
                }
                <ScrollView onScroll={e => this.handleOnScroll(e)} horizontal style={styles.scroll}>
                    <Grid>
                        <Row>
                            {this.state.items.length?
                                this.state.items.map((item, index)=>{
                                if(this.state.items.length > 12){
                                    if(index % 3 == 0){
                                        return(
                                            <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                        )
                                    }
                                }
                                else if(this.state.items.length > 6){
                                    if(index%2 == 0){
                                    return(
                                        <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                    )
                                    }
                                }
                                else{
                                    return(
                                        <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                    )
                                }
                                }):null
                            }
                        </Row>
                        <Row>
                            {this.state.items.length?
                                this.state.items.map((item, index)=>{
                                if(this.state.items.length > 12){
                                    if(index % 3 == 1){
                                        return(
                                            <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                        )
                                    }
                                }
                                else if(this.state.items.length > 6){
                                    if(index % 2 == 1){
                                    return(
                                        <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                    )
                                    }
                                }
                                }):null
                            }
                        </Row>
                        <Row>
                            {this.state.items.length?
                                this.state.items.map((item, index)=>{
                                if(this.state.items.length > 12){
                                    if(index % 3 == 2){
                                        return(
                                            <GameItem key={index} type= {this.props.type} item = {item.gameid?item.gameid:item} setItem={(item)=>this.props.setItem(item)} />
                                        )
                                    }
                                }
                                }):null
                            }
                        </Row>
                    </Grid>
                </ScrollView>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    title : {
        flexDirection:'row',
        paddingLeft:LAYOUT.window.width*0.04,
        paddingRight:LAYOUT.window.width*0.04,
        paddingTop:LAYOUT.window.width*0.02,
        paddingBottom:LAYOUT.window.width*0.01,
      },
    casinoText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
    scroll:{
        width:LAYOUT.window.width*0.95,
    },
})

const GameItem = ({item, setItem, type}) => {
    return (
        <TouchableOpacity style={GameItemStyle.firstImage}  onPress={()=>setItem(item)}>
            {/* {type === 'LiveCasino' ?
                <Text  style={GameItemStyle.amountText} numberOfLines={1}>
                    INR {item.WITHOUT.min && item.WITHOUT.min > 50  ?item.WITHOUT.min : Minbet } -  {item.WITHOUT.max && item.WITHOUT.max > Minbet  ?item.WITHOUT.max : Maxbet }                
                </Text>:null
            } */}
            <Image source={{uri : (item.image.indexOf('http') > -1 ? item.image : Root.imageurl + item.image)}} style={GameItemStyle.image}></Image>
            <Text  style={GameItemStyle.playText} numberOfLines={1}>{type === 'LiveCasino' ? item.TYPE.toLocaleUpperCase() :item.NAME }</Text>
        </TouchableOpacity>
    );
};

const GameItemStyle = StyleSheet.create({
    firstImage:{
        padding:LAYOUT.window.width*0.01,
        width:LAYOUT.window.width*0.23,
    },
    image:{
        borderRadius:LAYOUT.window.width*0.03,
        height:LAYOUT.window.height * 0.08,
    },
    playText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.02,
        fontWeight:'500',
        textAlign: "center",
    },
    amountText:{
        position:'absolute',
        zIndex:1,
        left:LAYOUT.window.width*0.02,
        top:LAYOUT.window.height*0.01,
        backgroundColor:COLOR.baseBackgroundOW1Color,
        paddingHorizontal:LAYOUT.window.width*0.01,
        borderRadius:LAYOUT.window.width*0.05,
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.018,
        fontWeight:'500',
        textAlign: "center",
    },
})