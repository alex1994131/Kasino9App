import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Header } from 'native-base';
import { Table, Row } from 'react-native-table-component';
import DateRangePicker from "react-native-daterange-picker";
import { AntDesign } from '@expo/vector-icons';
import { ReportsEmailLoad } from "../../../redux/actions/profile"
import { baseStyles, COLOR, LAYOUT, profileStyles } from '../../../constants';

class CasinoBettingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:null,
      tableHead: ['ID', 'PROVIDERID', 'NAME', 'PREVIOUS BALANCE', 'AMOUNT', 'NET BALANCE', 'COURRENCY', 'TYPE', 'DATE'],
      widthArr: [50, 100, 150, 90, 80, 80, 80, 100, 80],
      startDate : new Date(),
      endDate : new Date(new Date().valueOf() + 86400000),
      displayedDate: moment(),
    }
  }

  componentDidMount(){
    this.props.ReportsEmailLoad({ 
        start: this.state.startDate, end: this.state.endDate 
    });
  }

  componentDidUpdate(Pprops, PState){
    if(Pprops.CasinoBetHistoryData !==this.props.CasinoBetHistoryData){
      const tableData = [];
      var allData =this.props.CasinoBetHistoryData;
      for (var i in allData){
        const rowData = [];
        var id = parseInt(i)+1;
        rowData.push(id);
        rowData.push(allData[i].gameid.PROVIDERID);
        rowData.push(allData[i].gameid.NAME);
        rowData.push(allData[i].betting.prevbalance ? allData[i].betting.prevbalance.toFixed(0) : "0");
        rowData.push(allData[i].AMOUNT ? allData[i].TYPE==='BET' ?  "-"+ allData[i].AMOUNT.toFixed(0) : allData[i].AMOUNT.toFixed(0) : "0");
        rowData.push(allData[i].betting.prevbalance ? allData[i].TYPE==='BET' ? (allData[i].betting.prevbalance - allData[i].AMOUNT).toFixed(0) : (allData[i].betting.prevbalance + allData[i].AMOUNT).toFixed(0)  : "0");
        rowData.push('INR');
        rowData.push(allData[i].TYPE);
        rowData.push(moment(allData[i].DATE).format('YYYY-MM-DD'));
        tableData.push(rowData);
      }
      this.setState({items : tableData});
    }
    if(PState.startDate!==this.state.startDate || PState.endDate!==this.state.endDate){
        if(this.state.endDate&&this.state.startDate)
            this.props.ReportsEmailLoad({start: this.state.startDate, end: this.state.endDate});
    }
  }
 
  render() {
    const{
        startDate,
        endDate,
        displayedDate,
      }=this.state;
    return (
        <Container style={styles.baseBack}>
            <Header style={styles.header}>
                <View style={styles.back}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                    </TouchableOpacity>
                    <Text style={styles.headerBodyText}>CasinoBettingHistory</Text>
                </View>
            </Header>
            <View style={[styles.PH20, styles.PT20]}>
                <DateRangePicker
                    backdropStyle={{height:LAYOUT.window.height*0.9}}
                    onChange={e=>this.setState({...e})}
                    endDate={endDate}
                    startDate={startDate}
                    displayedDate={displayedDate}
                    moment={moment}
                    range
                >
                    <Text 
                    style={styles.daterangeText}>
                    {`${moment(startDate).format('DD-MM-YYYY')} ~ ${moment(endDate).format('DD-MM-YYYY')}`}
                    </Text>
                </DateRangePicker>
            </View>
            <Content horizontal={true} style={[styles.MH20,styles.MV10]}>
                <View>
                    <Table borderStyle={styles.Theader}>
                    <Row 
                        data={this.state.tableHead} 
                        widthArr={this.state.widthArr} 
                        style={styles.TRheader} 
                        textStyle={styles.Ttext}
                    />
                    </Table>
                    <ScrollView style={styles.TdataWrapper}>
                    <Table borderStyle={styles.Theader}>
                        {this.state.items&&this.state.items.length?this.state.items.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                widthArr={this.state.widthArr}
                                style={[styles.Trow, index%2 && {backgroundColor: COLOR.table.row1Color}]}
                                textStyle={styles.Ttext}
                            />
                        )):null}
                    </Table>
                    </ScrollView>
                </View>
            </Content>
        </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  CasinoBetHistoryData : state.profile.CasinoBetHistoryData
})

const mapDispatchToProps = {ReportsEmailLoad}

export default connect(mapStateToProps, mapDispatchToProps)(CasinoBettingHistory)
 
const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
});