import React from "react"
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { COLOR } from "./Color";
import { LAYOUT } from "./Layout";
const styles = StyleSheet.create({
  icon:{
    paddingHorizontal:LAYOUT.window.width*0.008,
    paddingVertical:LAYOUT.window.width*0.01,
    textAlign:'center',
    borderWidth:1,
    borderColor:COLOR.yellow1Color,
    borderRadius:4,
    fontSize:LAYOUT.window.width*0.05,
    color:COLOR.yellow1Color,
  }
})


export const Profile = [
  {
    id: "My Wallet",
    title: "My Wallet",
    type: "collapse",
    icon:    <SimpleLineIcons name="wallet" style={styles.icon}/>,
    badge: "warning",
    children: [
      {
        id: "Deposit",
        title: "Deposit",
        type: "item",
        navLink: "DepositScreen"
      },
      {
        id: "Withdraw",
        title: "Withdraw",
        type: "item",
        navLink: "WithdrawScreen"
      },
    ]
  },
  {
    id: "My Profile",
    title: "My Profile",
    type: "collapse",
    
    icon:<SimpleLineIcons name="user" style={styles.icon}/>,
    badge: "warning",
    children: [
      {
        id: "Profileinformation",
        title: "Profile Information",
        type: "item",
        navLink: "ProfileInfoScreen"
      },
      {
        id: "Changepassword",
        title: "Change Password",
        type: "item",
        navLink: "ChangePassScreen"
      },
    ]
  },
  {
    id: "My Bets",
    title: "My Bets",
    type: "collapse",
    icon:<SimpleLineIcons name="layers" style={styles.icon} color="black"/>,
    children: [
      {
        id: "Casinogames",
        title: "Casinos",
        type: "item",
        navLink: "CasinoBettingHistory"
      },
    ]
  },
  
  {
    id: "Bonuses",
    title: "Bonuses",
    type: "collapse",
    icon: <SimpleLineIcons style={styles.icon} name="diamond"/>,
    badge: "warning",
    children: [
      {
        id: "Bonuses Casinos",
        title: "Casinos",
        type: "item",
        navLink: "BonusesScreen"
      },
    ]
  },
  {
    id: "Sign out",
    title: "Sign out",
    type: "item",
    icon: <SimpleLineIcons style={[styles.icon,{borderWidth:0}]} name="login"/>,
    navLink: "SignOutScreen"
  },
]

