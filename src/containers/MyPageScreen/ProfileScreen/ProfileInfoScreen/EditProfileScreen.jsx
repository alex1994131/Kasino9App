import React from 'react';
import { connect } from "react-redux";
import normalize from 'react-native-normalize';
import * as ImagePicker from 'expo-image-picker';
import PhoneInput from 'react-native-phone-input';
import { Container, Input, Form, Item, Label, Button, Content } from 'native-base';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLOR, Root, profileStyles, baseStyles } from "../../../../constants";
import { ProfileSave } from "../../../../redux/actions/profile";

class EditProfileScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            image:require('../../../../assets/avatar.png'),
            mobilenumber : 0,
            username : '',
            firstname : '',
            lastname : ''
        }
    }
    componentDidMount(){
        const { email, username, firstname, lastname, mobilenumber } = this.props.userInfo;
        let image;
        if(this.props.userInfo.avatar){
            image = {uri:Root.imageurl + this.props.userInfo.avatar};
        }else{
            image = require('../../../../assets/avatar.png');
        }
        this.setState({ image, email, username, firstname, lastname, mobilenumber });
    }

    ProfileSave(){
        const { image, username, firstname, lastname, mobilenumber, email } = this.state;
        const formData = new FormData();
        formData.append('email',email)
        formData.append('username',username)
        formData.append('mobilenumber',mobilenumber)
        formData.append('firstname',firstname)
        formData.append('lastname',lastname)
        formData.append('fpImgFile', {
            uri: image.uri, 
            type: "image/png", 
            name: Math.random()+'.png',
        });
        this.props.ProfileSave(formData)
    }

    async pickImage(){
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!result.cancelled) {
                this.setState({ image: result });
            }
        }catch (err) {
            console.log(err);
        }
    }

    render(){
        const { image, username, firstname, lastname, mobilenumber } = this.state;
        return(
            <Container style={styles.baseBack}>
                <Content>
                    <View style={[styles.PH20, styles.Acenter]}>
                        <View style={[styles.userstyle, styles.MV30]}>
                            <TouchableOpacity 
                                style={[styles.avatar, styles.Hidden, {borderWidth:2, borderColor:COLOR.whiteColor}]} 
                                onPress={()=>this.pickImage()}
                            >
                                <Image source={image} style={styles.avatar}/>
                            </TouchableOpacity>
                        </View>
                        <Form style={styles.form}>  
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Username</Label>
                                <Input 
                                    style={styles.input} 
                                    value={username}
                                    onChangeText={(e)=>this.setState({username:e})}
                                />
                            </Item>
                            <View style={styles.inpuWrapper}>
                                <Item floatingLabel style={styles.item}>
                                    <Label style={styles.label}>First Name</Label>
                                    <Input 
                                        style={styles.input}
                                        value={firstname}
                                        onChangeText={(e)=>this.setState({firstname:e})}
                                    />
                                </Item>
                                <Item floatingLabel style={styles.item}>
                                    <Label style={styles.label}>last Name</Label>
                                    <Input 
                                        style={styles.input}  
                                        value={lastname}
                                        onChangeText={(e)=>this.setState({lastname:e})} 
                                    />
                                </Item>
                            </View>
                            <View style={styles.phone}>
                                <PhoneInput
                                    initialCountry={'in'} 
                                    value={String(mobilenumber)} 
                                    ref={ref => {this.phone = ref}}
                                    style={styles.input}  
                                    textStyle={styles.input}
                                    flagStyle={[styles.H30, styles.W50]}
                                    textProps={{placeholder:"Input Phone Number...", keyboardType:'phone-pad'}}
                                    onChangemobilenumber={e=>this.setState({mobilenumber:e})}
                                />
                            </View>
                        </Form>
                        <View style={styles.ButtonWrapper}>
                            <Button style={[styles.Button, styles.PH50]} onPress={()=>this.ProfileSave(this.state)}>
                                <Text style={styles.ButtonText}> SAVE </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo:state.profile.userInfo
})

const mapDispatchToProps = {
    ProfileSave
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)


const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    userstyle:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    avatar:{
        width:normalize(100),
        height:normalize(100),
        borderRadius:normalize(100),
        
    },  
    phone:{
        padding:normalize(20),
        marginTop:normalize(10),
        alignItems:'center',
        flexDirection:'row'
    },
    inpuWrapper:{
        flexDirection:'row',
        width:'50%',
        alignItems:'center'
    },  
    ButtonWrapper:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:normalize(10)
    },
})