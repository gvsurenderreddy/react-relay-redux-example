export function language(state = 'gb', action) {
	switch(action.type) {
		case 'SET_LANGUAGE':
			return action.lang;
		default:
			return state;
	}
}