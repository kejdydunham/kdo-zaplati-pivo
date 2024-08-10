import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {RootState} from "../types";
import {preserveStateToStorage} from "./localStorage";

const storageMiddleware: Middleware<{}, RootState> = (store: MiddlewareAPI<Dispatch, RootState>) => next => (action: any) => {
    let result = next(action);
    preserveStateToStorage(store.getState())
    return result;
};

export default storageMiddleware;