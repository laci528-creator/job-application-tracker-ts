
import { useState, useEffect, useMemo, useReducer, type ChangeEvent, useCallback } from "react";
import type { ApplicationFormData, JobApplication, ApplicationStatus, ApplicationUpdate } from "../types/JobApplication";
import JobApplicationCard from "./JobApplicationCard";
import ApplicationForm from "./ApplicationForm";
import { applicationReducer } from "../reducers/applicationReducer";

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

  type FilterStatus = ApplicationStatus | "all";

    function isFilterStatus(value: string): value is FilterStatus {
  return (
    value === "all" ||
    value === "applied" ||
    value === "interview" ||
    value === "offer" ||
    value === "rejected"
  );
}


function ApplicationList() {


const [applications, dispatch] = useReducer(
  applicationReducer,
  undefined,
  getInitialApplications
);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");


const statusCount = useMemo(() => {
  const counts: Record<ApplicationStatus, number> = {
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    offer: applications.filter((app) => app.status === "offer").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };
  return counts;
}, [applications]);


useEffect(() => {
  localStorage.setItem(
    "jobApplications",
    JSON.stringify(applications)
  );
}, [applications]);

function addApplication(data: ApplicationFormData): void {
  const newApplication: JobApplication = {
    id: Date.now(),
    company: data.company,
    position: data.position,
    status: "applied",
  };

  dispatch({ type: "add", data: newApplication });
}


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


function handleSearch(event: ChangeEvent<HTMLSelectElement>): void {
  const value = event.target.value;
  if (!isFilterStatus(value)) {
    return;
  }
      setFilterStatus(value);
}


const filteredApplications = useMemo(() => {
  return applications.filter((application) => {
    if (filterStatus === "all") return true;
    return application.status === filterStatus;
  })}, [applications, filterStatus]);


const updateApplication = useCallback(
  (id: number, changes: ApplicationUpdate): void => {
    dispatch ({ type: "update", data: { id, changes } });
  },
  []
);  


  return (
    <section>
      <h1>Job Application Tracker</h1>
      <div>
        <p>Applied: {statusCount.applied}</p>
        <p>Interviewing: {statusCount.interview}</p>
        <p>Offered: {statusCount.offer}</p>
        <p>Rejected: {statusCount.rejected}</p>
      </div>

      <select
        value={filterStatus}
        onChange={handleSearch}
      >
        <option value="all">All</option>
        <option value="applied">Applied</option>
        <option value="interview">Interviewing</option>
        <option value="offer">Offered</option>
        <option value="rejected">Rejected</option>
      </select>

      <ApplicationForm onAddApplication={addApplication} />

      <p>Applications: {filteredApplications.length}</p>


      {filteredApplications.map((application) => (
        <JobApplicationCard
          onDelete={deleteApplication}
          onStatusChange={updateApplicationStatus}
          key={application.id}
          application={application}
          onSave={updateApplication}
        />
      ))}
    </section>
  );
}

export default ApplicationList;
