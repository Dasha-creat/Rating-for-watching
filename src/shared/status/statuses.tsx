export type Status = "idle" | "loading" | "succeeded" | "failed";

export const Statuses: { [key in Status]: Status } = {
    idle: "idle",
    loading: "loading",
    succeeded: "succeeded",
    failed: "failed",
};
