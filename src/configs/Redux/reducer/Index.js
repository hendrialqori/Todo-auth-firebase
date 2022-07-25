
const initialValue = {
  isLogin: false,
  user : {},
  isLoading : false,
  notes : []
}

export const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN":
      return {
        ...state,
        isLogin: action.payload
      }
    case "CHANGE_USER":
      return {
        ...state,
        user : action.payload
      }
    case "CHANGE_LOADING":
      return{
        ...state, 
        isLoading : action.payload
      }
    case "SET_NOTES":
      return{
        ...state,
        notes : action.payload
      }
    default:
      return state
    }
  }
  

