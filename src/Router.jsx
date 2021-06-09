import * as React from 'react';
import { connect } from "react-redux";
import { Router, Scene } from 'react-native-router-flux';
import SignInScreen from './containers/AuthScreen/SignInScreen';
import SignUpScreen from './containers/AuthScreen/SignUpScreen';
import ForgotPasswordScreen from './containers/AuthScreen/ForgotPasswordScreen';
import SignOutScreen from './containers/AuthScreen/SignOutScreen';
import EmailverifySendScreen from './containers/AuthScreen/EmailverifySendScreen';

import GamePlayScreen from './containers/GamePlayScreen/GamePlayScreen';

import HomeScreen from './containers/GameScreens/HomeScreen';
import CasinoScreen from './containers/GameScreens/Casino/CasinoScreen';
import LiveCasinoScreen from './containers/GameScreens/Casino/LiveCasinoScreen';
import VirtualScreen from './containers/GameScreens/Casino/VirtualScreen';
import PokerScreen from './containers/GameScreens/Casino/PokerScreen';
import CockFightScreen from './containers/GameScreens/Casino/CockFightScreen';
import AnimalScreen from './containers/GameScreens/Casino/AnimalScreen';

import SportsScreen from './containers/GameScreens/Sports/SportsScreen';
import SportsInplayScreen from './containers/GameScreens/Sports/SportsInplayScreen';
import SportsUpcomingScreen from './containers/GameScreens/Sports/SportsUpcomingScreen';
import SportsEvent from './containers/GameScreens/Sports/SportsEvent';
import SportsBet from './containers/GameScreens/Sports/SportsBet';

import MyPageScreen from './containers/MyPageScreen/index';
import DepositScreen from './containers/MyPageScreen/WalletScreen/DepositScreen/index';
import DepositPage from './containers/MyPageScreen/WalletScreen/DepositScreen/DepositPage';
import WithdrawScreen from './containers/MyPageScreen/WalletScreen/WithdrawScreen/index';
import WithdrawPage from './containers/MyPageScreen/WalletScreen/WithdrawScreen/WithdrawPage';
import ChangePassScreen from './containers/MyPageScreen/ProfileScreen/ChangePassScreen';
import ProfileInfoScreen from './containers/MyPageScreen/ProfileScreen/ProfileInfoScreen/index';
import CasinoBettingHistory from './containers/MyPageScreen/BettingHistory/CasinoBettingHistory';
import BonusesScreen from './containers/MyPageScreen/BonusesScreen/BonusesScreen';

import FAQ from './containers/QuickLinkScreen/FAQ';
import About from './containers/QuickLinkScreen/About';
import Contact from './containers/QuickLinkScreen/Contact';
import PrivacyPolicy from './containers/QuickLinkScreen/PrivacyPolicy';

import { Sport_socket } from "./redux/actions/sports/index";
import { session_setting, load_fp_data, socket_connect, first_slider_load, firstpage_gamelist, logoutWithJWT } from "./redux/actions/auth/loginActions";

class Routes extends React.Component {

  componentDidMount(){
    // await this.props.logoutWithJWT();
    this.props.socket_connect();
    this.props.load_fp_data();
    this.props.first_slider_load();
    this.props.firstpage_gamelist();
    this.props.Sport_socket();
    this.props.session_setting();
  }

  render() {
    return (
      // this.props.user.isLogin?
      <Router>
        <Scene key = "root">
          <Scene key = "/" initial hideNavBar={true} component = {HomeScreen}/>
          <Scene key = "/casino"  hideNavBar={true} component = {CasinoScreen}/>
          <Scene key = "/live-casino" hideNavBar={true} component = {LiveCasinoScreen}/>
          <Scene key = "/virtual-sports" hideNavBar={true} component = {VirtualScreen}/>
          <Scene key = "/poker" hideNavBar={true} component = {PokerScreen}/>
          <Scene key = "/animal" hideNavBar={true} component = {AnimalScreen}/>
          <Scene key = "/cock-fight" hideNavBar={true} component = {CockFightScreen}/>

          <Scene key = "/sports" hideNavBar={true} component = {SportsScreen}/>
          <Scene key = "/Inplay" hideNavBar={true} component = {SportsInplayScreen}/>
          <Scene key = "/Upcoming" hideNavBar={true} component = {SportsUpcomingScreen}/>
          <Scene key = "/sportsevent" hideNavBar={true} component = {SportsEvent}/>
          <Scene key = "/sportsbet" hideNavBar={true} component = {SportsBet}/>

          
          <Scene key = "DepositScreen" hideNavBar={true} component = {DepositScreen}/>
          <Scene key = "DepositPage" hideNavBar={true} component = {DepositPage}/>
          <Scene key = "WithdrawScreen" hideNavBar={true} component = {WithdrawScreen}/>
          <Scene key = "WithdrawPage" hideNavBar={true} component = {WithdrawPage}/>
          
          <Scene key = "GamePlayScreen" hideNavBar={true} component = {GamePlayScreen}/>
          <Scene key = "MyPageScreen" hideNavBar={true} component = {MyPageScreen}/>
          <Scene key = "ChangePassScreen" hideNavBar={true} component = {ChangePassScreen}/>
          <Scene key = "ProfileInfoScreen" hideNavBar={true} component = {ProfileInfoScreen}/>
          <Scene key = "BonusesScreen" hideNavBar={true} component = {BonusesScreen}/>
          <Scene key = "emailverifysend" hideNavBar={true} component = {EmailverifySendScreen}/>
          
          <Scene key = "CasinoBettingHistory" hideNavBar={true} component = {CasinoBettingHistory}/>

          <Scene key = "/FAQ" hideNavBar={true} component = {FAQ}/>
          <Scene key = "/contact" hideNavBar={true} component = {Contact}/>
          <Scene key = "/about" hideNavBar={true} component = {About}/>
          <Scene key = "/PrivacyPolicy" hideNavBar={true} component = {PrivacyPolicy}/>

          
          <Scene key = "SignInScreen" hideNavBar={true} component = {SignInScreen}/>
          <Scene key = "SignUpScreen" hideNavBar={true} component = {SignUpScreen}/>
          <Scene key = "ForgotPasswordScreen" hideNavBar={true} component = {ForgotPasswordScreen}/>
          <Scene key = "SignOutScreen" hideNavBar={true} component = {SignOutScreen}/>

        </Scene>
      </Router>
      // :
      // <Router>
      //   <Scene key = "root">
      //     <Scene key = "/" initial hideNavBar={true} component = {HomeScreen}/>
      //     <Scene key = "/casino"  hideNavBar={true} component = {CasinoScreen}/>
      //     <Scene key = "/live-casino" hideNavBar={true} component = {LiveCasinoScreen}/>
      //     <Scene key = "/virtual-sports" hideNavBar={true} component = {VirtualScreen}/>
      //     <Scene key = "/poker" hideNavBar={true} component = {PokerScreen}/>
      //     <Scene key = "/animal" hideNavBar={true} component = {AnimalScreen}/>
      //     <Scene key = "/cock-fight" hideNavBar={true} component = {CockFightScreen}/>
          
      //     <Scene key = "/sports" hideNavBar={true} component = {SportsScreen}/>
      //     <Scene key = "/Inplay" hideNavBar={true} component = {SportsInplayScreen}/>
      //     <Scene key = "/Upcoming" hideNavBar={true} component = {SportsUpcomingScreen}/>
      //     <Scene key = "/sportsevent" hideNavBar={true} component = {SportsEvent}/>
      //     <Scene key = "/sportsbet" hideNavBar={true} component = {SportsBet}/>

      //     <Scene key = "/FAQ" hideNavBar={true} component = {FAQ}/>
      //     <Scene key = "/contact" hideNavBar={true} component = {Contact}/>
      //     <Scene key = "/about" hideNavBar={true} component = {About}/>
      //     <Scene key = "/PrivacyPolicy" hideNavBar={true} component = {PrivacyPolicy}/>
      //   </Scene>
      // </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user : state.auth.login,
  userInfo : state.profile.userInfo,
  firstpage : state.auth.register
})

const mapDispatchToProps = {
  load_fp_data, 
  Sport_socket,
  socket_connect,
  first_slider_load,
  firstpage_gamelist,
  session_setting,
  logoutWithJWT,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
