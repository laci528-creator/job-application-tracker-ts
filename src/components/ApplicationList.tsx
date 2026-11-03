
import { useState } from "react";
import type { JobApplication } from "../types/JobApplication";
import JobApplicationCard from "./JobApplicationCard";

function ApplicationList() {
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

  function addApplication(): void {
    const newApplication: JobApplication = {
      id: 1,
      company: "IKEA",
      position: "Verkäufer",
      status: "applied",
    };

    setApplications((prev) => [
      ...prev,
      newApplication,
    ]);
  }

  return (
    <section>
      <h1>Job Application Tracker</h1>

      <p>Applications: {applications.length}</p>

      <button
        type="button"
        onClick={addApplication}
        disabled={applications.length > 0}
      >
        Add application
      </button>

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
