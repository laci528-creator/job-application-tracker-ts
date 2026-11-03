
import { useState } from "react";
import type { ApplicationFormData, JobApplication } from "../types/JobApplication";
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

  return (
    <section>
      <h1>Job Application Tracker</h1>
      <ApplicationForm onAddApplication={addApplication} />

      <p>Applications: {applications.length}</p>


      {applications.map((application) => (
        <JobApplicationCard
          key={application.id}
          application={application}
        />
      ))}
    </section>
  );
}

export default ApplicationList;
