const singleRecipeReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_USER_RECIPE':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default singleRecipeReducer;