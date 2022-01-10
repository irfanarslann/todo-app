import { AT_SET_LOADING, AT_GET_TODOS } from '../types';

const TodoReducer = (state, action) => {
  switch (action.type) {
    case AT_GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case AT_SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      break;
  }
};

export default TodoReducer;
