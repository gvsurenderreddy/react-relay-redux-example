export function language(state = 'GB', action) {
	switch(action.type) {
		case 'SET_LANGUAGE':
			return action.lang;
		default:
			return state;
	}
}