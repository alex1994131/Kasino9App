import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Header } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { GamePlayer, GameExit } from '../../redux/actions/player'
import { LAYOUT, COLOR, Root } from "../../constants";

class GamePlayScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            gamedata:{},
            gameurl:null,
        }
    }
    goBack(){
        Actions.pop();
    }

    UNSAFE_componentWillUnmount(){
        if(this.props.mode == 'real'){
            Root.socket.emit("gamedelete",{data : this.props.token});
        }
    }

    NavigationCh(e){
        if(Root.returnurl.indexOf(e.url)>-1){
            Actions.pop();
        }
    }

    render(){
        return(
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>this.goBack()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.orangeColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>{this.props.gamedata.NAME?this.props.gamedata.NAME:null}</Text>
                    </View>
                </Header>
                <Content style={styles.game}>
                    <WebView
                        source={{ uri: this.props.gameurl ? this.props.gameurl : null }}
                        ref={(ref) => (this.webview = ref)}
                        onNavigationStateChange={(e)=>this.NavigationCh(e)}
                        style={styles.webview}
                    />
                </Content>
            </Container>
        )
    }
}

const load_game = (state) => {
    return{
        gamedata : state.player.gamedata,
        gameurl : state.player.gameurl,
        mode:state.player.mode,
        token:state.player.token
    }
}

export default connect(load_game, {GamePlayer, GameExit})(GamePlayScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:'black'
    },
    game:{
        height:LAYOUT.window.height*0.95,
    },
    header:{
        backgroundColor:COLOR.headerColor,
        alignItems:'center',
        justifyContent:'flex-start',
        height:LAYOUT.window.height*0.05
    },
    closeButton:{
        backgroundColor:COLOR.headerColor,
        borderRadius:LAYOUT.window.width*0.06, 
        height:LAYOUT.window.width*0.06, 
        width:LAYOUT.window.width*0.06, 
        justifyContent:'center', 
        alignItems:'center', 
        position:'absolute', 
        zIndex:1000, 
        left:10, 
        top:30, 
    },
    headerBody:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    headerBodyText:{
        fontSize:LAYOUT.window.width*0.04,
        color:COLOR.whiteColor,
        paddingLeft:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
    back:{
        padding:LAYOUT.window.width*0.02,
        flexDirection:'row',
        alignItems:'center'
    }, 
    closeIcon:{
        fontWeight:"bold"
    },
    webview:{
        backgroundColor:'black',
        height:LAYOUT.window.height*0.95
    }
})