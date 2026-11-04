
import { useState, useEffect } from "react";
import type { ApplicationFormData, JobApplication, ApplicationStatus } from "../types/JobApplication";
import JobApplicationCard from "./JobApplicationCard";
import ApplicationForm from "./ApplicationForm";
import type { ChangeEvent } from "react";

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

  
  const [applications, setApplications] =
      useState<JobApplication[]>(getInitialApplications);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

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

  setApplications((prev) => [...prev, newApplication]);
}

function updateApplicationStatus(id: number, newStatus: ApplicationStatus): void {

  setApplications((prev) =>
    prev.map((application) =>
      application.id === id ? { ...application, status: newStatus } : application
    )
  );
}

function deleteApplication(id: number): void {
  setApplications((prev) =>
    prev.filter((application) => application.id !== id)
  );
}


function handleSearch(event: ChangeEvent<HTMLSelectElement>): void {
  const value = event.target.value;
  if (!isFilterStatus(value)) {
    return;
  }
      setFilterStatus(value);
}

const filteredApplications = applications.filter((application) => {
    if (filterStatus === "all") return true;
    return application.status === filterStatus;
  });


  return (
    <section>
      <h1>Job Application Tracker</h1>


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
        />
      ))}
    </section>
  );
}

export default ApplicationList;
