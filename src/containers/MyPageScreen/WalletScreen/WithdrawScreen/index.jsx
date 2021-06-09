import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Container, Header, Tab, Tabs } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import WithdrawSatusScreen from './WithdrawSatusScreen';
import WithdrawPage from './WithdrawPage';
// import WithdrawMethodsScreen from './WithdrawMethodsScreen';
import { LAYOUT, COLOR, profileStyles } from "../../../../constants";
import { renderTabBar } from '../../../../components';

class WithdrawScreen extends React.Component{
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Withdraw</Text>
                    </View>
                </Header>
                <Tabs 
                    locked 
                    tabContainerStyle={styles.tabStyle}
                    tabBarUnderlineStyle={{height:2}}  
                    renderTabBar={renderTabBar}
                >
                    <Tab 
                        heading="Withdraw Method"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <WithdrawPage/>
                    </Tab>
                    <Tab 
                        heading="Withdraw Status"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <WithdrawSatusScreen/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default WithdrawScreen;

const styles = StyleSheet.create({
    ...profileStyles,
    ...profileStyles,
})