import {createActions} from 'redux-actions';

const types = {
  GET_PRODUCT_DATA: 'GET_PRODUCT_DATA',
};

const actions = createActions(
    ...Object.keys(types).map(type => types[type])
);

export default actions;
export {types};
