import React from 'react';
import { connect } from "react-redux";
import Moment from 'moment'
import * as ImagePicker from 'expo-image-picker';
import normalize from 'react-native-normalize';
import { Table, Row } from 'react-native-table-component';
import { Container, Button, Icon, Picker, Content } from 'native-base';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LAYOUT, COLOR, baseStyles } from "../../../../constants";
import { getDocuments, documentUpload } from "../../../../redux/actions/profile";

const verify_options = [
    { value: 1, label: "BankSlip" },
    { value: 2, label: "IdentityDocument" },
    { value: 3, label: "Passport" },
    { value: 4, label: "DriversLicense" },
    { value: 5, label: "IBAN" },
    { value: 6, label: "SocialId" },
    { value: 7, label: "Other" }
]

const status = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Reject" },
    { value: 2, label: "Allow" },
]

class DocumentScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            items:null,
            tableHead: ['Id', 'Name', 'Type', 'Date', 'Status'],
            widthArr: [30, 150, 80, 150, 50],
            image1 : null,
            image2 : null,
            verifyId : verify_options[0].value,
        }
    }
    componentDidMount(){
        this.props.getDocuments()
    }
    componentDidUpdate(Pprops, PState){
        if(Pprops.DocumentsData !==this.props.DocumentsData){
          const tableData = [];
          var allData =this.props.DocumentsData;
          for (var i in allData){
            const rowData = [];
            const date = (new Date(allData[i].date)).toLocaleString((new Date()).getTimezoneOffset(),{hour12 : false}).replace(",", "")
            const verifyId = verify_options[verify_options.findIndex(data => data.value === parseInt(allData[i].verifyId))];
            const state = status[status.findIndex(data => data.value === parseInt(allData[i].status))];
            var id = parseInt(i)+1;
            rowData.push(id);
            rowData.push(allData[i].name.replace(/#\|@\|#/gi, "  "));
            rowData.push(verifyId ? verifyId.label : '');
            rowData.push(date);
            rowData.push(state ? state.label : '');
            tableData.push(rowData);
          }
          this.setState({items : tableData});
        }
        if(PState.startDate!==this.state.startDate || PState.endDate!==this.state.endDate){
          this.props.reports_email_load(
            this.state.startDate,
            this.state.endDate
          );
        }
    }

    async _pickImage(e){
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });
            if(!result.cancelled) {
                if(e===1){
                    this.setState({ image1: result });
                }else{
                    this.setState({ image2: result });
                }
            }
        }catch(err){
            console.log(err);
        }
    };

    documentUpload(){
        const formData = new FormData();
        formData.append('email',this.props.userInfo.email)
        formData.append('verifyId',this.state.verifyId)
        if(!this.state.image1){
            alert('image')
        }else{
            if(this.state.image1){
                formData.append('image1', {
                    uri: this.state.image1.uri, 
                    type: "image/png", 
                    name: `img_${Moment(new Date()).format('YYYYMMDDhhmmss')}.png`,
                });
            }
            if(this.state.image2){
                formData.append('image2', {
                    uri: this.state.image2.uri, 
                    type: "image/png", 
                    name: `img_${Moment(new Date()).format('YYYYMMDDhhmmss')}.png`,
                });
            }
            this.props.documentUpload(formData);
            this.setState({
                image1 : null,
                image2 : null,
                verifyId : verify_options[0].value,
            })
        }
    }

    render(){
        const {
            verifyId,
            image1,
            image2,
            tableHead,
            widthArr,
            items,
        }=this.state;
        return(
            <Container style={styles.baseBack}>
                <Content style={styles.PH20}>
                    <View style={[styles.select]}>
                        <View>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select type..."
                                style={styles.picker}
                                selectedValue={verifyId}
                                onValueChange={(e)=>this.setState({verifyId:e})}
                            >
                                {verify_options.map((item, key)=>(
                                    <Picker.Item key={key} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                        <View style={{width:LAYOUT.window.width*0.4}}>
                            <Button style={styles.Button} onPress={()=>this.documentUpload()}>
                                <Text style={styles.ButtonText}>UPLOAD</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.userstyle}>
                        <TouchableOpacity style={styles.image} onPress={()=>this._pickImage(1)}>
                            {image1 ? 
                                <Image source={image1} style={styles.imageItem}></Image>:
                                <Text style={styles.ChooseItext}>Choose Image</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.image} onPress={()=>this._pickImage(2)}>
                            {image2 ? 
                                <Image source={image2} style={styles.imageItem}></Image>:
                                <Text style={styles.ChooseItext}>Choose Image</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableHight}>
                        <ScrollView nestedScrollEnabled = {true} horizontal={true}>
                            {items&&items.length ? 
                                <View>
                                    <Table borderStyle={styles.Theader}>
                                        <Row 
                                            data={tableHead} 
                                            widthArr={widthArr} 
                                            style={styles.header} 
                                            textStyle={styles.text}
                                        />
                                    </Table>
                                    <ScrollView nestedScrollEnabled = {true} style={styles.dataWrapper}>
                                        <Table borderStyle={styles.Theader}>
                                            {items.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={widthArr}
                                                    style={[styles.row, index%2 && {backgroundColor: COLOR.table.row1Color}]}
                                                    textStyle={styles.text}
                                                />
                                            ))}
                                        </Table>
                                    </ScrollView>
                                </View>
                            :null}
                        </ScrollView>
                    </View>
                    <View style={styles.comment}>
                        <Text style={styles.Text}>
                            {"Dear user, in order to validate your account you need to upload a personal identification document.\n hile uploading, make sure it corresponds to the following criteria:\n • The file is in JPG, PNG, GIF or PDF format and doesn't exceed 3MB.• The document in its validity period.\n • The picture should be in real colors, not black and white.\n • The picture should be taken from the original document, it is not allowed to do any digital photo montage.\n • The document picture, personal data, signature, seal and other information should be clearly readable.\n • If necessary the company can ask you to present other documents."}
                        </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo:state.profile.userInfo,
    DocumentsData:state.profile.DocumentsData,
})

const mapDispatchToProps = {
    getDocuments, documentUpload  
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentScreen)


const styles = StyleSheet.create({
    ...baseStyles,
    select:{
        height:normalize(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:normalize(10)
    },
    userstyle:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        height:LAYOUT.window.height*0.15,
        width:'100%',
    },
    image:{
        width:LAYOUT.window.width*0.44,
        height:LAYOUT.window.height*0.15,
        borderRadius:LAYOUT.window.width*0.02,
        justifyContent:'center',
        borderColor:COLOR.whiteColor,
        borderWidth:1
    },  
    imageItem:{
        width:'100%', 
        height:'100%',
        borderRadius:LAYOUT.window.width*0.02,
    },  
    comment:{
        marginVertical:10,
    },
    Text:{
        color:COLOR.greenColor,
        fontSize:normalize(14),
    },
    picker:{
        padding:LAYOUT.window.width*0.01,
        color:COLOR.greenColor,
        fontWeight:'bold',
        height:LAYOUT.window.height*0.05,
        width:LAYOUT.window.width*0.6,
    },
    tableHight:{
        height:LAYOUT.window.height*0.3,
        backgroundColor:COLOR.table.borderColor,
        marginTop:10,
    },
    Theader:{
        borderWidth: 1, 
        borderColor:COLOR.table.borderColor
    },
    header: { 
        height: LAYOUT.window.height*0.05, 
        backgroundColor: COLOR.table.headerColor 
    },
    text: { 
        textAlign: 'center', 
        fontWeight: '400',
        fontSize:LAYOUT.window.width*0.023
    },
    row: { 
        height: LAYOUT.window.height*0.04, 
        backgroundColor: COLOR.table.row2Color 
    },
    ChooseItext:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.03,
        textAlign:'center'
    }
})