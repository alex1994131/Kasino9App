import React from 'react';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { Container, Header, Accordion, Content } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LAYOUT, COLOR, Root, Profile, profileStyles, baseStyles } from "../../constants";

class MyPageScreen extends React.Component{
    _renderHeader(item, expanded) {
        return (
            <View>
                {
                    item.navLink ?
                    <TouchableOpacity onPress={()=>Actions.push(item.navLink)}>
                        <View style={styles.accordionitem}>
                            {item.icon?item.icon:<View style={styles.W10}/>}
                            <Text style={item.icon?styles.accordiontext:styles.accordiontext1}>
                                {item.title}
                            </Text>
                        </View>
                        {item.icon&&!expanded?<View style={styles.expanded}/>:null}
                    </TouchableOpacity>:
                    <>
                        <View style={styles.accordionitem}>
                            {item.icon?item.icon:<View style={styles.W10}/>}
                            <Text style={item.icon?styles.accordiontext:styles.accordiontext1}>
                                {item.title}
                            </Text>
                        </View>
                        {item.icon&&!expanded?<View style={styles.expanded}/>:null}
                    </>
                }
            </View>
        )
    }

    _renderContent(item,expanded) {
        if(item.children){
            return (
                <View>
                    {item.children.map((child_item, i)=>(
                        <TouchableOpacity key={i} style={styles.accordionitemleft} onPress={()=>Actions.push(child_item.navLink)}>
                            <View style={{width:LAYOUT.window.width*0.06}}></View>
                            <Text style={styles.accordionitemtext}>
                                {child_item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    {item.icon&&!expanded?<View style={styles.expanded}/>:null}
                </View>
            )
        }
    }

    render(){
        return(
            <Container style={styles.baseBack}>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>My Page</Text>
                    </View>
                </Header>
                <Content>
                    <View style={[styles.Acenter]}>
                        <View style={styles.userstyle}>
                            {this.props?.userInfo?.avatar?
                                <Image source={{uri:Root.imageurl + this.props?.userInfo?.avatar}} style={styles.avatar}></Image>
                            :
                                <Image source={require('../../assets/avatar.png')} style={styles.avatar}></Image>
                            }
                            <Text style={styles.userInfoText}>Welcome back, {this.props.userInfo?.username}</Text>
                        </View>
                        <View style={styles.accordion}>
                            <Accordion
                                style={{borderWidth:0}}
                                dataArray={Profile}
                                animation={true}
                                expanded={[0]}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo : state.profile.userInfo,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen)


const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    expanded:{
        width:'100%',
        opacity:0.5,
        height:1,
        backgroundColor:COLOR.white1Color,
        marginTop:LAYOUT.window.width*0.025,
        marginBottom:LAYOUT.window.width*0.025,
    }
})