import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, Statuses } from "../../shared/status/index"

interface MainPageState {
    students: Array<{ name: string; id: string; groupName: string}>;
    groups: Array<{name: string; id: string;}>;
    status: Status;
    error: string | null;
}

const initialState: MainPageState = {
    students: [],
    groups: [],
    status: Statuses.idle,
    error: null,
}

export const { reducer, actions } = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        loadStudentsPending: (state) => {
            state.status = Statuses.loading;
        },
        loadStudentsFulfilled: (state, action: PayloadAction<Array<{ name: string; id: string; groupName: string}>>) => {
            state.status = Statuses.succeeded;
            state.students = action.payload;
        },
        loadStudentsFailed: (state, action: PayloadAction<string>) => {
            state.status = Statuses.failed;
            state.error = action.payload;
        },
        loadGroupsPending: (state) => {
            state.status = Statuses.loading;
        },
        loadingGroupsFulfilled: (state, action: PayloadAction<Array<{name: string; id: string;}>>) => {
            state.status = Statuses.succeeded;
            state.groups = action.payload;
        },
        loadingGroupsFailed: (state, action: PayloadAction<string>) => {
            state.status = Statuses.failed;
            state.error = action.payload;
        }
    },
});