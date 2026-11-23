import type { JobApplication  } from "./JobApplication";

export type LoadingState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: JobApplication[] }
    | { status: "error"; message: string };