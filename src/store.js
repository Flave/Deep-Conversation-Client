import rootReducer from 'App/reducer';
import _forEach from 'lodash/forEach';

const createStore = (reducer) => {
  let state;
  let prevState;
  let listeners = [];

  const getState = () => state;

  const getChangedProps = () => {
    const changedProps = [];
    _forEach(state, (prop, key) => {
      // console.log(prop, prevState[key])
      if(prop !== prevState[key]) 
        changedProps.push(key)
    })
    return changedProps;
  }

  const didPropertiesChange = (props) => {
    const changedProps = getChangedProps();
    let changed = false;
    // console.log(changedProps)
    props.forEach((key) => {
      if(changed) return;
      if(changedProps.indexOf(key) !== -1)
        changed = true;
    });
    return changed;
  }

  const dispatch = (action) => {
    prevState = state;
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  dispatch({});

  return {getState, didPropertiesChange, dispatch, subscribe};
}

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if(!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state: ', 'color: gray', store.getState());
    console.log('%c action: ', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state: ', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if(typeof action.then === 'function') {
      return action
        .then(rawDispatch, err => console.log(err))
        .catch(err => {throw err;})
    }
    return rawDispatch(action);
  }
}

const store = createStore(rootReducer);

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV !== 'production') {
  store.dispatch = addLoggingToDispatch(store);
}

store.dispatch = addPromiseSupportToDispatch(store)

export default store;