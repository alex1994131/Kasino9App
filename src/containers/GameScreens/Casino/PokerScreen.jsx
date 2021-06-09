import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { Container, Content, Picker, Form, Icon, Header } from 'native-base';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import { FontAwesome5 } from '@expo/vector-icons';
import { LAYOUT, COLOR, providerconfig } from "../../../constants";
import { providerchange, gametypechange, filterData, data_load } from "../../../redux/actions/casino/index" 
import * as Components from "../../../components";
import { AntDesign } from '@expo/vector-icons';
import normalize from 'react-native-normalize';

class PokerScreen extends React.Component{

  constructor(){
    super()
    this.state = {
      casinoItems : [],
      index : 1,
      data: [],
      allData: [],
      value: "",
      bool : false,
      isVisible:false,
      selectedItem:{},
      selectectedItems2: [],
      isShownPicker:false,
      isAllCheck:false
    }   
  }

  componentDidMount(){
    this.props.data_load(providerconfig["POKER"],"3","POKERSLIDERIMGS");
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.dataList.data.length !== prevState.data.length|| prevProps.dataList.filteredData !== this.props.dataList.filteredData){
      this.setState({
        data: this.props.dataList.data,
        allData: this.props.dataList.filteredData,
      })
    }
  }

  handleFilter(value){
    this.setState({ value: value });
    this.props.filterData(value);
  }
  values(e){
    var data = ''
    for (var i in e) {
      var j = parseInt(i)+1;
      if(e.length == j){
        data+=e[i].label
      }else{
        data+=e[i].label+' ,  '
      }
    }
    return data
  }
  render(){
    let {data,allData,value} = this.state;
    let indata=value.length ? allData : data;
    const {providerimgs,paymentimgs,sociallink,firstquick,firstmenu,footertext} = this.props.firstpage;

    return(
      <Container style={styles.container}>
          {this.props.dataList.providerData.length&&this.state.isShownPicker?
            <View style={{position:'absolute', height:LAYOUT.window.height, width:LAYOUT.window.width, zIndex:100, backgroundColor:COLOR.whiteColor}}>
              <Header style={styles.header}>
                  <View style={styles.back}>
                      <TouchableOpacity onPress={()=>this.setState({isShownPicker:!this.state.isShownPicker})}>
                          <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                      </TouchableOpacity>
                      <Text style={styles.headerBodyText}>Select Provider</Text>
                  </View>
              </Header>
            <View style={{height:LAYOUT.window.height*0.875, width:LAYOUT.window.width, zIndex:100, backgroundColor:COLOR.whiteColor}}>
              <ScrollView>
                <MultipleSelectPicker
                  items={this.props.dataList.providerData}
                  onSelectionsChange={(ele) =>this.props.providerchange(ele)}
                  selectedItems={this.props.setprovider}
                  buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                  buttonText='hello'
                  checkboxStyle={{ height: 20, width: 20 }}
                  />
              </ScrollView>
              </View>
            </View>
            :null
          }
          <Components.HeaderScreen data={this.props.user} />
          <Content>
            {this.props.slider_images&&this.props.slider_images.length ? 
              <Components.ImageSliderScreen ImageSliderData={this.props.slider_images} />
            :null}
            <View style={styles.amount}>
                <View style={styles.inputLeft}>
                  <FontAwesome5 name="searchengin" size={LAYOUT.window.width*0.05} color={COLOR.yellow1Color} />
                </View>
                <TextInput
                  onChange={(e)=>this.handleFilter(e.nativeEvent.text)}
                  placeholderTextColor={COLOR.white1Color}
                  style={styles.InputBox} 
                  placeholder='Search'
                />
            </View>
            <Form style={styles.select}>
                <View style={{ backgroundColor:COLOR.baseBackgroundWOColor, borderRadius:LAYOUT.window.height * 0.005, height: LAYOUT.window.height * 0.05, width: "49%", justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                  <Picker
                    mode="modal"
                    iosHeader="Select Your Type"
                    style={styles.picker}
                    itemTextStyle={{ color: COLOR.whiteColor }}
                    selectedValue={this.props.settype.value}
                    onValueChange={(e)=>this.props.gametypechange(e,providerconfig["LIVECASINO"])}
                  >
                    {this.props.dataList.types.length?this.props.dataList.types.map((item, i)=>(
                      <Picker.Item label={item.label} key={i} value={item.value} />
                    )):null}
                  </Picker>
                </View>
                <TouchableOpacity 
                    style={{ backgroundColor:COLOR.baseBackgroundWOColor, borderRadius:LAYOUT.window.height * 0.005, height: LAYOUT.window.height * 0.05, width: "49%", marginLeft: "2%", justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}
                    onPress={() => {
                      this.setState({ isShownPicker: !this.state.isShownPicker })
                  }}>
                    <Text style={{width:LAYOUT.window.width * 0.35, color:COLOR.whiteColor, fontSize:normalize(18)}} numberOfLines={1}>{this.values(this.props.setprovider)}</Text>
                    <AntDesign name="caretdown" size={normalize(10)} color={'rgba(0,0,0,0.6)'}/>
                </TouchableOpacity>
            </Form>
            {indata&&indata.length ? 
              <Components.CasinoMapScreen 
                setItem={(item)=>this.setState({isVisible : true, selectedItem:item})} 
                data={indata} 
                values={this.props.user.values} 
                p_this = {this.props} 
                type = {'poker'}
              />
            :null}
            <View style={styles.provider}>
              {providerimgs?<Components.GameProviderScreen GameProvider = {providerimgs} />:null}
              {paymentimgs?<Components.PaymentMethodScreen PaymentMethodData = {paymentimgs} />:null}
              <View style={{flexDirection:'row'}}>
                {firstquick?<Components.QuickLinkScreen QuickLinkData = {firstquick} />:null}
                {sociallink?<Components.GetInTouchScreen IconData = {sociallink} />:null}
              </View>
              {footertext?<Components.FooterTextScreen TextData = {footertext} />:null}
            </View>     
          </Content>
          {firstmenu ? <Components.FooterScreen data={firstmenu} /> : null}
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
    slider_images : state.slider.poker_images,
    dataList: state.casinolist,
    settype : state.casinolist.settype,
    setprovider : state.casinolist.setprovider,
    firstpage : state.auth.register

  }
}

export default connect(load_data, {providerchange,gametypechange,filterData,data_load})(PokerScreen);

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.baseBackgroundColor,
  },
  header:{
    backgroundColor:COLOR.headerColor,
    height:LAYOUT.window.height*0.085,
    justifyContent:'flex-start'
  },
  back:{
      padding:LAYOUT.window.width*0.02,
      flexDirection:'row',
      alignItems:'center'
  },
  headerBodyText:{
      textAlign:'center',
      width:LAYOUT.window.width*0.83,
      fontSize:LAYOUT.window.width*0.04,
      color:COLOR.whiteColor,
      fontWeight:'bold'
  },
  slider:{
    alignItems:'flex-start',
    justifyContent:'flex-start',
    padding:LAYOUT.window.window * 0.03,
    position:'absolute',
  },
  sliderText:{
    color:COLOR.whiteColor,
    fontWeight:'bold'
  },
  sliderText1:{
    color:COLOR.whiteColor,
    fontWeight:'bold',
    fontSize:LAYOUT.window.width * 0.04
  },
  searchBar:{
    paddingLeft:LAYOUT.window.width * 0.04,
    paddingRight:LAYOUT.window.width * 0.04,
    paddingTop:LAYOUT.window.width * 0.01,
    paddingBottom:LAYOUT.window.width * 0.01,
  },
  searchText:{
    color:COLOR.greenColor,
    fontSize:20,
    paddingRight:10
  },
  searchInputText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width * 0.04,
    paddingLeft:10,
  },
  provider:{
    backgroundColor:COLOR.headerColor,
    alignItems:'center',
    justifyContent:'center',
    padding:1,
  },
  select:{
    paddingLeft:LAYOUT.window.width * 0.04,
    paddingRight:LAYOUT.window.width * 0.04,
    paddingTop:LAYOUT.window.width * 0.01,
    paddingBottom:LAYOUT.window.width * 0.01,
    flexDirection:'row',
  },
  picker:{
    color:COLOR.whiteColor,
    fontWeight:'bold',
    padding:5,
    height:LAYOUT.window.height * 0.05,
  },


  amount : {
    padding: 15,
    paddingTop:1,
    paddingBottom: 1,
    marginVertical: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: 'transparent',
    width: LAYOUT.window.width*0.99,
  },
  inputLeft: {
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
  },
  label: {
      color: COLOR.whiteColor,
      fontSize: LAYOUT.window.width*0.05,
  },
  InputBox: {
      padding:1,
      flex: 1,
      borderBottomWidth: 1,
      color: COLOR.whiteColor,
      height: LAYOUT.window.height*0.05,
      fontSize: LAYOUT.window.height*0.025,
      borderBottomColor: COLOR.whiteColor,
  },
})