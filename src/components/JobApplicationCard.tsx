
import type { JobApplication, ApplicationStatus } from "../types/JobApplication";
import type { ChangeEvent } from "react";

interface JobApplicationCardProps {
  application: JobApplication;
  onDelete: (id: number) => void;
  onStatusChange: (
    id: number,
    status: ApplicationStatus
  ) => void;

}


function JobApplicationCard({
  application,
  onDelete,
  onStatusChange
}: JobApplicationCardProps) {

function handleStatusChange(
  event: ChangeEvent<HTMLSelectElement>,
): void {
  const newStatus = event.target.value as ApplicationStatus;
  onStatusChange(application.id, newStatus);
}

  return (
    <article>
      <h2>{application.company}</h2>
      <p>{application.position}</p>
      <p>Status: {application.status}</p>
      <select
        value={application.status}
        onChange={handleStatusChange}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interviewing</option>
        <option value="offer">Offered</option>
        <option value="rejected">Rejected</option>
      </select>

      {application.notes && (
        <p>{application.notes}</p>
      )}
      <button
        type="button"
        onClick={() => onDelete(application.id)}
      >
        Delete
      </button>
    </article>
  );
}

export default JobApplicationCard;
