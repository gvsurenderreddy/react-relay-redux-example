export function language(state = 'pl', action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.lang;
    default:
      return state;
  }
}