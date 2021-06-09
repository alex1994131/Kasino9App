const initialState = {
    userInfo : null,
    DocumentsData : null,
    CasinoBetHistoryData : [],
    notification : null,
}
const profileReducers = (state = initialState, action) => {
    switch (action.type) {
        case "PROFILE_USER":
            return {...state, userInfo : action.data}
        case "DOCUMENT_DATA":
            return {...state, DocumentsData: action.data}
        case "REPORT_CASINO_DATA":
            return {...state, CasinoBetHistoryData: action.data}
        case "NOTIFICATION_DATA" :
            return {...state, notification : action.data}
        default:
            return state
    }
}
    
export default profileReducers