import React, { Component } from "react";
import { View, Image, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { LAYOUT, COLOR, Root } from "../../constants";
import { playsaccount } from "../../redux/actions/auth/loginActions"

const width = LAYOUT.window.width;
class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      loading: [],
      images : []
    };
    this.onSnap = this.onSnap.bind(this);
  }
  componentDidMount() {
    let a = [...Array(this.props.alldata.length).keys()].map(i => false);
   
    let imageUrls = [];
    if(this.props.alldata && this.props.alldata.length){
        this.props.alldata.filter((item)=>{
            let imgUrl = Root.imageurl + item.image;
            imageUrls.push(imgUrl);
        })
        this.setState({images : imageUrls});
    }
  }

  realPlay(){
    if(!this.props.isLogin){
      Actions.SignInScreen();
    }else{
      let game = this.props.alldata[this.state.currentImage]
      this.props.playsaccount(game.gameid?game.gameid:game,true);
    }
  }

  onSnap(index) {
    const { currentImageEmitter } = this.props;
    this.setState({ currentImage: index }, () => {
      if (currentImageEmitter) currentImageEmitter(this.state.currentImage);
    });
  }

  _renderItem({ item, index }) {
    const { ImageComponent, ImageComponentStyle = {}, sliderBoxHeight, disableOnPress, resizeMethod, resizeMode, imageLoadingColor = "#E91E63" } = this.props;
    return (
      <View style={{ position: "relative", justifyContent: "center"}}>
        <View key={index}>
          <ImageComponent
            style={[
              {
                width: "100%",
                height: sliderBoxHeight || 200,
                alignSelf: "center"
              },
              ImageComponentStyle
            ]}
            source={typeof item === "string" ? { uri: item } : item}
            resizeMethod={resizeMethod || "resize"}
            resizeMode={resizeMode || "cover"}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {
              let t = this.state.loading;
              t[index] = true;
              this.setState({ loading: t });
            }}
            {...this.props}
          />
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.realPlay()}>
            <Text style={styles.buttonText}>
                Play now
            </Text>
        </TouchableOpacity>
        {/* {!this.state.loading[index] && (
          <ActivityIndicator size="large" color={imageLoadingColor} style={{ position: "absolute", alignSelf: "center"}}/>
        )} */}
      </View>
    );
  }

  get pagination() {
    const { currentImage } = this.state;
    const {
      dotStyle,
      dotColor,
      inactiveDotColor,
      paginationBoxStyle,
      paginationBoxVerticalPadding
    } = this.props;
    return (
      <Pagination
        borderRadius={2}
        dotsLength={this.state.images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colors.dotColors}
        inactiveDotColor={inactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? { paddingVertical: paginationBoxVerticalPadding }
            : {},
          paginationBoxStyle ? paginationBoxStyle : {}
        ]}
        {...this.props}
      />
    );
  }

  render() {
    const {
      circleLoop,
      autoplay,
      parentWidth,
      loopClonesPerSide
    } = this.props;
    return (
      <View>
        <Carousel
          layout={"default"}
          data={this.state.images}
          ref={c => (this._ref = c)}
          loop={circleLoop || false}
          enableSnap={true}
          autoplay={autoplay || false}
          itemWidth={parentWidth || width}
          sliderWidth={parentWidth || width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.onSnap(index)}
          {...this.props}
        />
        {this.state.images.length > 1 && this.pagination}
      </View>
    );
  }
}

SliderBox.defaultProps = {
  ImageComponent: Image
};

const load_data = (state) =>{
    return {
      isLogin : state.auth.login.isLogin,
    }
}

export default connect(load_data,{playsaccount})(SliderBox);  

const styles = {
  paginationBoxStyle: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  },
  buttonStyle:{
      position:'absolute',
      backgroundColor:COLOR.greenColor,
      borderRadius:LAYOUT.window.width*0.01,
      padding:LAYOUT.window.width*0.01,
      bottom:LAYOUT.window.height*0.01,
      right:LAYOUT.window.width*0.02
  },
  buttonText:{
      color:COLOR.whiteColor, 
      fontSize:LAYOUT.window.width*0.03
  }
};

const colors = {
  dotColors: "#BDBDBD",
  white: "#FFFFFF"
};