import { useReducer, useCallback } from "react";
import { applicationReducer } from "../reducers/applicationReducer";
import { useLocalStorageSync } from "./useLocalStorageSync";
import type { ApplicationFormData, JobApplication, ApplicationStatus, ApplicationUpdate } from "../types/JobApplication";



  function getInitialApplications(): JobApplication[] {
    const savedData = localStorage.getItem("jobApplications");

    
    if (savedData === null) {
      return [];
    }

    try {
      return JSON.parse(savedData) as JobApplication[];
    } catch {
      return [];
    }
  }


export function useApplications() {
  const [applications, dispatch] = useReducer(
    applicationReducer,
    undefined,
    getInitialApplications
  );

  useLocalStorageSync("jobApplications", applications);

const addApplication = useCallback(
  (data: ApplicationFormData): void => {
    const newApplication: JobApplication = {
      id: Date.now(),
      company: data.company,
      position: data.position,
      status: "applied",
    };

    dispatch({ type: "add", data: newApplication });
  },
  []
);

const updateApplication = useCallback(
  (id: number, changes: ApplicationUpdate): void => {
    dispatch ({ type: "update", data: { id, changes } });
  },
  []
);  


const updateApplicationStatus = useCallback(
  (id: number, newStatus: ApplicationStatus): void => {
    dispatch({ type: "updateStatus", data: { id, newStatus } });
  },
  []
);


const deleteApplication = useCallback(
  (id: number): void => { dispatch ({ type: "delete", data: id });
  },
  []
);

  return {
    applications,
    addApplication,
    deleteApplication,
    updateApplication,
    updateApplicationStatus,
  };
}