import {Middleware, Store} from "redux";
import {RootState} from "./types";
import {preserveStateToStorage} from "./localStorage";

// @ts-ignore
const storageMiddleware: Middleware = (store: Store<RootState>) => next => (action: any) => {

    let result = next(action);

    console.log('Next state:', store.getState());
    preserveStateToStorage(store.getState())
    return result;
};

export default storageMiddleware;