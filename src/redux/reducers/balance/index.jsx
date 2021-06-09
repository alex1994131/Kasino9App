const initialState = {
  balance : 0
}
const balance = (state = initialState, action) => {
  switch (action.type) {
    case "GETBALANCE" : 
      return { ...state, balance : action.data}
    default:
      return state
  }
}
  
export default balance