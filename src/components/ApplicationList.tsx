
import { useState } from "react";
import type { ApplicationFormData, JobApplication, ApplicationStatus } from "../types/JobApplication";
import JobApplicationCard from "./JobApplicationCard";
import ApplicationForm from "./ApplicationForm";



function ApplicationList() {
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

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

  return (
    <section>
      <h1>Job Application Tracker</h1>
      <ApplicationForm onAddApplication={addApplication} />

      <p>Applications: {applications.length}</p>


      {applications.map((application) => (
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
