import { createStore } from 'redux';
import memberReducer from './memberReducer';

const store = createStore(memberReducer);

export default store;