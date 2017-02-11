export default function ({dispatch}) {
  return next => action => {
    // If action does not have a payload
    // OR, the payload does not have a .then property
    // we dont care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // make sure the actions promise is resolved
    action.payload
      .then(function (response) {
        // create a new action with the old type
        // replace the promise with the response data
        const newAction = {...action, payload: response}
        dispatch(newAction);
      });
  };
}
