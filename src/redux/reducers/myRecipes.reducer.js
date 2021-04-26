const myRecipesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MY_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default myRecipesReducer;