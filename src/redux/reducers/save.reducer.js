const saveReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_SAVE':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default saveReducer;