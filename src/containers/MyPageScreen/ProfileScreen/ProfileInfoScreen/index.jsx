import React from 'react';
import { Container, Header, Tabs, Tab } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR, profileStyles} from "../../../../constants";
import EditProfileScreen from './EditProfileScreen';
import NotificationScreen from './NotificationScreen';
import DocumentScreen from './DocumentScreen';
import { renderTabBar } from '../../../../components';

class ProfileInfoScreen extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            activeindex : props.data ? props.data : 0
        }
    }
    

    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Profile Infomation</Text>
                    </View>
                </Header>
                <Tabs 
                    locked 
                    initialPage={this.state.activeindex} 
                    tabContainerStyle={styles.tabStyle}
                    tabBarUnderlineStyle={{height:2}}  
                    renderTabBar={renderTabBar}
                >
                    <Tab 
                        heading="Edit Profile"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <EditProfileScreen/>
                    </Tab>
                    <Tab 
                        heading="Documents"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <DocumentScreen/>
                    </Tab>
                    <Tab 
                        heading="Notifications"
                        activeTabStyle={[styles.tabStyle]}
                        tabStyle={[styles.tabStyle]}
                    >
                        <NotificationScreen/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default ProfileInfoScreen

const styles = StyleSheet.create({
    ...profileStyles,
})