import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";
import { wsCloseFeed, wsConnectFeed, wsConnectingFeed, wsDisconnectFeed, wsErrorFeed, wsMessageFeed, wsOpenFeed } from "./feed/actions";
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsCloseOrder, wsConnectOrder, wsConnectingOrder, wsDisconnectOrder, wsErrorOrder, wsMessageOrder, wsOpenOrder } from "./all-orders/actions";

const wsActionsFeed = { wsConnect: wsConnectFeed,  wsDisconnect: wsDisconnectFeed, wsConnecting: wsConnectingFeed, wsOpen: wsOpenFeed, wsClose: wsCloseFeed, wsMessage: wsMessageFeed, wsError: wsErrorFeed};

const wsActionsOrder = { wsConnect: wsConnectOrder, wsDisconnect: wsDisconnectOrder, wsConnecting: wsConnectingOrder, wsOpen: wsOpenOrder, wsClose: wsCloseOrder, wsMessage: wsMessageOrder, wsError: wsErrorOrder};

const webSocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const webSocketFeedMiddleware = socketMiddleware(wsActionsFeed);

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketOrderMiddleware, webSocketFeedMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
