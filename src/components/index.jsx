import React from "react";
import { TouchableOpacity, Text, Image, View, ScrollView, StyleSheet, Animated, PanResponder } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { Actions } from "react-native-router-flux";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Separator, DefaultTabBar } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import { LAYOUT, COLOR, Root, actuatedNormalize } from "../constants";
import FooterScreen from './FooterScreen';
import HeaderScreen from './HeaderScreen';
import SportsItem from "./Sports/SportsItem";
import SportsEventItem from "./Sports/SportsEventItem";
import SliderBox from "./Casino/SliderBox";
import BottomModel from "./Casino/BottomModel";
import CasinoMapScreen from './Casino/CasinoMapScreen';
import { CollapseStyle, FooterTextScreenStyle, GetInTouchScreenStyle, QuickLinkScreenStyle, GameProviderScreenStyle, PaymentMethodStyle, SportsTabStyle, SportsTabScreenStyle } from './style';
import * as Linking from 'expo-linking';

const CollapseList = ({data}) =>{
    return(
        <Collapse style={CollapseStyle.container}>
            <CollapseHeader style={CollapseStyle.header}>
                <Separator style={CollapseStyle.separator}>
                    <Text style={CollapseStyle.title} numberOfLines={1}>{data.title}</Text>
                </Separator>
            </CollapseHeader>
            <CollapseBody style={CollapseStyle.body}>
                <Text style={CollapseStyle.text}>{data.navLink}</Text>
            </CollapseBody>
        </Collapse>
    )
}

const FooterTextScreen = ({TextData}) => {
    return(
        <View style={FooterTextScreenStyle.container}>
            <Text style={FooterTextScreenStyle.text}>
                {TextData?TextData:null}
            </Text>
        </View>
    )
}

const GetInTouchScreen = ({IconData}) => {
    const Tag = {
        "twitter": <Entypo name="twitter" size={LAYOUT.window.width*0.03} color={COLOR.greenColor} style={{padding:10}} />,
        "instagram": <FontAwesome name="instagram" size={LAYOUT.window.width*0.03} color={COLOR.greenColor} style={{padding:10}} />,
        "facebook": <FontAwesome name="facebook" size={LAYOUT.window.width*0.03} color={COLOR.greenColor} style={{padding:10}} />,
    }

    return(
        <View style={GetInTouchScreenStyle.container}>
            <Text style={GetInTouchScreenStyle.text}>
                Get In Touch
            </Text>
            <View style={GetInTouchScreenStyle.content}>
                {IconData&&IconData.length?IconData.map((data, key)=>(
                    <TouchableOpacity key={key} onPress={()=>Linking.openURL(data.navLink)}>
                        {
                            Tag[data.icon]?Tag[data.icon]:''
                        }
                    </TouchableOpacity>
                )):null}
            </View>
        </View>
    )
}

const QuickLinkScreen = ({QuickLinkData}) =>{
    return(
        <View style={QuickLinkScreenStyle.container}>
            <Text style={QuickLinkScreenStyle.text}>
                Quick Link
            </Text>
            <View style={QuickLinkScreenStyle.content}>
                {QuickLinkData && QuickLinkData.length?QuickLinkData.map((data, i)=>(
                    <TouchableOpacity key={i} onPress={()=>Actions.push(data.navLink)}>
                        <Text style={QuickLinkScreenStyle.text1} >{data.title}</Text>
                    </TouchableOpacity>
                )):null}
            </View>
        </View>
    )
}

const GameProviderScreen = ({GameProvider}) =>{
    let imageUrls = [];
    if(GameProvider && GameProvider.length){
        GameProvider.filter((item)=>{
            let imgUrl = Root.imageurl + item.image;
            imageUrls.push(imgUrl);
        })
    }
    const _renderItem = ({item, index}) => {
        return (
            <View style={GameProviderScreenStyle.firstImage} key={index}>
                <Image source={{uri : item}} style={GameProviderScreenStyle.image} resizeMode={'contain'}></Image>
            </View>
        );
    }
    return(
        <View style={GameProviderScreenStyle.container}>
            <Text style={GameProviderScreenStyle.text}>
                Game Providers
            </Text>
            <Carousel
                data={imageUrls}
                renderItem={_renderItem}
                sliderWidth={LAYOUT.window.width*0.9}
                itemWidth={LAYOUT.window.width*0.3}
                loop={true}
                autoplay={false}
            ></Carousel>
        </View>
    )
}

const PaymentMethodScreen = ({PaymentMethodData}) =>{
    let imageUrls = [];
    if(PaymentMethodData && PaymentMethodData.length){
        PaymentMethodData.filter((item)=>{
            let imgUrl = Root.imageurl + item.image;
            imageUrls.push(imgUrl);
        })
    }
    const _renderItem = ({item, index}) => {
        return (
            <View style={PaymentMethodStyle.firstImage} key={index}>
                <Image source={{uri : item}} style={PaymentMethodStyle.image} resizeMode={'contain'}></Image>
            </View>
        );
    }
    return(
        <View style={PaymentMethodStyle.container}>
            <Text style={PaymentMethodStyle.text}>
                Payment Methods
            </Text>
            <Carousel
                data={imageUrls}
                renderItem={_renderItem}
                sliderWidth={LAYOUT.window.width*0.9}
                itemWidth={LAYOUT.window.width*0.3}
                loop={true}
                autoplay={false}
            />
        </View>
    )
}

const ImageSliderScreen = ({ImageSliderData}) =>{
    return(
        <SliderBox
            alldata={ImageSliderData&&ImageSliderData.length?ImageSliderData:[]}
            sliderBoxHeight={LAYOUT.window.height*0.2}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay={true}
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10
            }}
            // onCurrentImagePressed={index =>
            //     console.warn(`image ${index} pressed`)
            // }
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            imageLoadingColor="#2196F3"
        >
        </SliderBox>
    )    
}
const SportsTab = ({item, Active, sport_id}) =>{
    return(
        <View style={SportsTabStyle.container}>
            <View style={[SportsTabStyle.activeItem,{backgroundColor:sport_id===item.sport_id?COLOR.greenColor:'transparent'}]}/>
            <TouchableOpacity onPress={()=>Active(item)} style={SportsTabStyle.button}>
                <Svg height={'100%'} width={'100%'} viewBox={item.viewBox}>
                <Path
                    d={item.icon}
                    strokeWidth="0"
                    fill={item.color}
                />
                </Svg>
            </TouchableOpacity>
            <Text numberOfLines={1} style={SportsTabStyle.activeText,{color:sport_id===item.sport_id?COLOR.whiteColor:COLOR.grey1Color}}>{item.sport_name}</Text>
        </View>
    )    
}
const SportsTabScreen = ({ Item, tab, ActiveChildTab, activeCTab, isSports=true }) =>{
    return(
        <View style={SportsTabScreenStyle.container}>
            <View style={SportsTabScreenStyle.title}>
                <Svg height={LAYOUT.window.width*0.06} width={LAYOUT.window.width*0.06} viewBox={Item.viewBox}>
                    <Path
                        d={Item.icon}
                        strokeWidth="0"
                        fill={Item.color}
                    />
                </Svg>
                <Text style={SportsTabScreenStyle.titleName}>{Item.sport_name}</Text>
            </View>
            {isSports?
                <ScrollView horizontal={true}>
                    <View style={SportsTabScreenStyle.tabContainer}>
                        {tab.map((tabitem, key)=>(
                            <View key={key} style={SportsTabScreenStyle.tabItem}>
                                <TouchableOpacity onPress={()=>ActiveChildTab(tabitem)}>
                                    <Text style={[
                                        SportsTabScreenStyle.tabItemText,{
                                        color:activeCTab.index===tabitem.index?
                                        COLOR.whiteColor:COLOR.grey1Color}
                                    ]}>{tabitem.title}</Text>
                                </TouchableOpacity>
                                <View style={[
                                    SportsTabScreenStyle.tabItemActive,{
                                    backgroundColor:activeCTab.index==tabitem.index?
                                    COLOR.greenColor:COLOR.green2Color}
                                ]}></View>
                            </View>
                        ))}
                    </View>
                </ScrollView>:
                null
            }
            <View style={SportsTabScreenStyle.homeBox}>
                <View style={SportsTabScreenStyle.homeChild}>
                    <Text style={SportsTabScreenStyle.homeText}>Home</Text>
                    <MaterialIcons name="navigate-next" size={LAYOUT.window.width*0.04} color={COLOR.grey1Color} />
                    <Text style={SportsTabScreenStyle.sportsText}>{Item.sport_name}</Text>
                </View>
            </View>
        </View>
    )    
}


class Draggable extends React.Component {
    constructor(props) {
      super(props);
        
      this.state = {
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
      };
    }
  
    UNSAFE_componentWillMount() {
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => this._val = value);
  
      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (e, gesture) => true,
          onPanResponderGrant: (e, gesture) => {
            this.state.pan.setOffset({
              x: this._val.x,
              y:this._val.y
            })
            this.state.pan.setValue({ x:0, y:0})
          },
          onPanResponderMove: Animated.event([ 
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
          ],{ useNativeDriver: false }),
          onPanResponderRelease: (e, gesture) => {
            if (this.isDropArea(gesture)) {
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
              })
            }
            alert(this.props.sportsSidebarData)
          }
        });
    }
  
    isDropArea(gesture) {
      return gesture.moveY < 200;
    }
  
    render() {
      const panStyle = {
        transform: this.state.pan.getTranslateTransform()
      }
      const { sportsSidebarData, position } = this.props;
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.box, position]}
        >
            <Text
                onLongPress={()=>alert(sportsSidebarData)} 
                style={{
                    fontSize:actuatedNormalize(9), 
                    color:COLOR.whiteColor,
                    backgroundColor:'rgba(0,0,0,0.4)',
                    textAlign:'center',
                    textAlignVertical:'center',
                    borderRadius:10,
                    width:'50%',
                    height:'50%',
                }} 
                numberOfLines={1}>{sportsSidebarData.data?sportsSidebarData.data.length:0}</Text>
        </Animated.View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    box: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent:'center',
      padding:3,
      alignItems:'center',
      position:'absolute',
      bottom:LAYOUT.window.height*0.13,
      right:LAYOUT.window.width*0.03,
    },
});

const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
};


export { 
    FooterTextScreen, 
    GetInTouchScreen, 
    QuickLinkScreen, 
    GameProviderScreen, 
    PaymentMethodScreen, 
    ImageSliderScreen, 
    SportsTab,
    SportsTabScreen,
    BottomModel, 
    FooterScreen, 
    HeaderScreen,
    CasinoMapScreen,
    SportsItem,
    SportsEventItem,
    CollapseList,
    renderTabBar,
    Draggable
};