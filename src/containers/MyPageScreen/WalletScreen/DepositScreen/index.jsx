import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Container, Header, Tab, Tabs } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DepositStatusScreen from './DepositStatusScreen';
import DepositMethodsScreen from './DepositMethodsScreen';
import { LAYOUT, COLOR, profileStyles } from "../../../../constants";
import { renderTabBar } from '../../../../components';

class DepositScreen extends React.Component{
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Deposit</Text>
                    </View>
                </Header>
                <Tabs 
                    locked 
                    tabContainerStyle={styles.tabStyle}
                    tabBarUnderlineStyle={{height:2}}  
                    renderTabBar={renderTabBar}
                >
                    <Tab
                        heading="Deposit Methods"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <DepositMethodsScreen/>
                    </Tab>
                    <Tab 
                        heading="Deposit Status"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <DepositStatusScreen/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default DepositScreen


const styles = StyleSheet.create({
    ...profileStyles,
})