import { configureStore } from './configureStore';

export const store = configureStore();

export const getStore = () => {
	return {
		getState: () => store.getState(),
		dispatch: (item: any) => store.dispatch(item)
	};
};
