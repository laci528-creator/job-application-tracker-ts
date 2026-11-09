import type { JobApplication, ApplicationStatus, ApplicationUpdate } from "../types/JobApplication";

type ApplicationAction = 
| { type: "delete"; data: number }
| { type: "update"; data: { id: number; changes: ApplicationUpdate } }
| { type: "updateStatus"; data: { id: number; newStatus: ApplicationStatus } }
| { type: "add"; data: JobApplication };


export function applicationReducer(
  state: JobApplication[],
  action: ApplicationAction
): JobApplication[] {
  switch (action.type) {
    case "delete":
      return state.filter((application) => application.id !== action.data);
    case "update":
      return state.map((application) =>
        application.id === action.data.id ? { ...application, ...action.data.changes } : application
      );
    case "updateStatus":
      return state.map((application) =>
        application.id === action.data.id ? { ...application, status: action.data.newStatus } : application
      );
    case "add":
      return [...state, action.data];
  }
}