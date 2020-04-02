import * as actionTypes from "../action/types";

const initialState = {
    loading :false,
    users: [],
    chat : [] 
};

export default function(state = initialState, action) {
  console.log("action" ,action )
  switch (action.type) {
    
    case actionTypes.START_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case actionTypes.USERS: {
      console.log("action may khol" , action)
      return {
        ...state,
        users: action.payload
      };
    }
    case actionTypes.CHAT: {
      console.log("action may chat" , action)
      return {
        ...state,
        chat: action.payload
      };
    }

    default:
      return state;
  }
}
