
const initialState = {
  livecasino_images:null,
  casino_images:null,
  virtual_images:null,
  poker_images:null,
  cockfight_images:null,
  animal_images:null,
}

const sliderReducer = (state = initialState,  action) => {
  switch (action.type) {
    case "LIVECASINOSLIDERIMGS" : {
      return {...state, livecasino_images : action.data
      }
    }
    case "CASINOSLIDERIMGS" : {
      return {...state, casino_images : action.data
      }
    }
    case "VIRTUALSLIDERIMGS" :{
      return {...state, virtual_images : action.data
      }
    }
    case "POKERSLIDERIMGS" :{
      return {...state, poker_images : action.data
      }
    }
    case "COCKFIGHTSLIDERIMGS" : {
      return {...state, cockfight_images : action.data
      }
    }
    case "ANIMALSLIDERIMGS" : {
      return {...state, animal_images : action.data
      }
    }
    default:
      return state
  }
}

export default sliderReducer
