import  { all } from "redux-saga/effects";
import { watchLoadStudentsAndGroups } from "../pages/MainPage/index.tsx";

export function* rootSaga(): Generator {
    yield all([
        watchLoadStudentsAndGroups()
    ])
}