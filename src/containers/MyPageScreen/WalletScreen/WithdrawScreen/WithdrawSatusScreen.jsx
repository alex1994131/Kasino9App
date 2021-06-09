import React, { Component } from 'react';
import moment from "moment";
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import DateRangePicker from "react-native-daterange-picker";
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { WithdrawHistoryLoad } from '../../../../redux/actions/paymentGateWay';
import { baseStyles, COLOR, LAYOUT, profileStyles } from '../../../../constants';
import { Container, Content } from 'native-base';

class WithdrawSatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      tableHead: ['ID', 'Requested At', 'Amount', 'Details', 'Status'],
      widthArr: [50, 200, 150, 150, 150],
      startDate : new Date(),
      endDate : new Date(new Date().valueOf() + 86400000),
      displayedDate: moment(),
    }
  }

  componentDidMount(){
    this.props.WithdrawHistoryLoad({ 
      start: this.state.startDate, end: this.state.endDate 
    });
  }

  componentDidUpdate(Pprops, PState){
    if(Pprops.WithdrowHistoryData !==this.props.WithdrowHistoryData && this.props.WithdrowHistoryData.length){
      const tableData = [];
      var allData =this.props.WithdrowHistoryData;
      for (var i in allData){
        const rowData = [];
        const date = (new Date(allData[i].createDate)).toLocaleString((new Date()).getTimezoneOffset(),{hour12 : false}).replace(",", "")
        var id = parseInt(i)+1;
        rowData.push(id);
        rowData.push(date);
        rowData.push(allData[i].amount);
        rowData.push(allData[i].type);
        rowData.push(allData[i].status);
        tableData.push(rowData);
      }
      this.setState({items : tableData});
    }
    if(PState.startDate!==this.state.startDate || PState.endDate!==this.state.endDate){
      this.props.WithdrawHistoryLoad({ 
        start: this.state.startDate, end: this.state.endDate 
      });
    }
  }
 
  render() {
    const{
      startDate,
      endDate,
      displayedDate,
      tableHead,
      widthArr,
      items,
    }=this.state;
    return (
      <Container style={styles.baseBack}>
        <View style={[styles.PH20, styles.PT20]}>
          <DateRangePicker
            backdropStyle={{height:LAYOUT.window.height*0.85}}
            onChange={e=>this.setState({...e})}
            endDate={endDate}
            startDate={startDate}
            displayedDate={displayedDate}
            moment={moment}
            range
          >
            <Text style={styles.daterangeText}>
              {`${moment(startDate).format('DD-MM-YYYY')} ~ ${moment(endDate).format('DD-MM-YYYY')}`}
            </Text>
          </DateRangePicker>
        </View>
        <Content horizontal={true} style={[styles.MH20,styles.MV10]}>
          <View>
            <Table borderStyle={styles.Theader}>
              <Row 
                data={tableHead} 
                widthArr={widthArr} 
                style={styles.TRheader} 
                textStyle={styles.Ttext}
              />
            </Table>
            <ScrollView style={styles.TdataWrapper}>
              <Table borderStyle={styles.Theader}>
                {
                  items.length?items.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.Trow, index%2 && {backgroundColor: COLOR.table.row1Color}]}
                      textStyle={styles.Ttext}
                    />
                  )):null
                }
              </Table>
            </ScrollView>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  WithdrowHistoryData : state.paymentGateWay.WithdrowHistoryData
})

const mapDispatchToProps = {WithdrawHistoryLoad}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawSatusScreen)

const styles = StyleSheet.create({
  ...profileStyles,
  ...baseStyles,
});