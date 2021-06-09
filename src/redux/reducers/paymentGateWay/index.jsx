const initialState = {
  PaymentMethod : null,
  WithdrowHistoryData : null,
  PayResultsData : null,
  QpayCheckOutData : null,
  YaarPayCheckOutData : null,
  TransactionHistoryData : null,
  PaymentMenuData:[]
}
const PaymentGateWayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSACTION_HISTORY_DATA":
      return {...state, TransactionHistoryData: action.data}
    case "WITHDRAW_HISTORY_DATA":
      return {...state, WithdrowHistoryData: action.data}
    case "PAYMENTMENU_DATA":
      return {...state, PaymentMenuData: action.data}

    case "PAYMENTMETHOD_DATA":
      return {...state, PaymentMethod: action.data}
    case "PAYMENT_RESULTS_DATA":
      return {...state, PayResultsData: action.data}
    
    case "PAYMENTGATEWAY_QPAY_CHEKOUT_DATA":
      return {...state, QpayCheckOutData: action.data}
    case "PAYMENTGATEWAY_YAARPAY_CHEKOUT_DATA":
      return {...state, YaarPayCheckOutData: action.data}
    default:
      return state
  }
}
  
export default PaymentGateWayReducer