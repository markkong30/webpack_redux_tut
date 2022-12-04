import { configureStore } from './configureStore';

export const store = configureStore();

export const getStore = () => {
	return store;
};
