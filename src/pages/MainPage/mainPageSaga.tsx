import { takeEvery, call, put } from "redux-saga/effects";
import { fetchStudents, fetchGroups } from "../../shared/api";
import { MainPageActions } from "./index";

export function* loadStudentsAndGroups(): Generator {

    try {
        const students = yield call(fetchStudents);
        const groups = yield call(fetchGroups);

        yield put(MainPageActions.loadStudentsFulfilled(students));
        yield put(MainPageActions.loadingGroupsFulfilled(groups));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        yield put(MainPageActions.loadStudentsFailed(errorMessage));
        yield put(MainPageActions.loadingGroupsFailed(errorMessage));
    }
}

function* init() {
    yield put(MainPageActions.loadStudentsPending());
    yield put(MainPageActions.loadGroupsPending());
}

export function* watchLoadStudentsAndGroups(): Generator {
    yield takeEvery(MainPageActions.loadStudentsPending.type, loadStudentsAndGroups);
    yield takeEvery(MainPageActions.loadGroupsPending.type, loadStudentsAndGroups); 
    yield call(init);
}