import { combineReducers } from "redux"
import auth from "./auth"
import casinolist from "./casino"
import livecasinolist from "./livecasino"
import virtuallist from "./virtuallist"
import profile from "./profile"
import paymentGateWay from "./paymentGateWay"
import player from "./player"
import sports from "./sports"
import balance from "./balance"
import promotions from "./promotions"
import slider from "./slider"

const rootReducer = combineReducers({
    auth,
    casinolist,
    livecasinolist,
    virtuallist,
    profile,
    paymentGateWay,
    player,
    sports,
    balance,
    promotions,
    slider,
})

export default rootReducer