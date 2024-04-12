import { configureStore } from "@reduxjs/toolkit";
import { votingApi } from "../features/votingApi";

export const store = configureStore({
	reducer: {
		[votingApi.reducerPath]: votingApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(votingApi.middleware),
});

import { setupListeners } from "@reduxjs/toolkit/query";
setupListeners(store.dispatch)