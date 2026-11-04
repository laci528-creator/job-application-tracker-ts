
import type { JobApplication, ApplicationStatus, ApplicationUpdate } from "../types/JobApplication";
import { useState, type ChangeEvent } from "react";
import ApplicationEditForm from "./ApplicationEditForm";

interface JobApplicationCardProps {
  application: JobApplication;
  onDelete: (id: number) => void;
  onStatusChange: (
    id: number,
    status: ApplicationStatus
  ) => void;
  onSave: (
    id: number, 
    changes: ApplicationUpdate
  ) => void;  

}

function JobApplicationCard({
  application,
  onDelete,
  onStatusChange,
  onSave
}: JobApplicationCardProps) {

  const [isEditing, setIsEditing] = useState<boolean>(false);

function handleStatusChange(
  event: ChangeEvent<HTMLSelectElement>,
): void {
  const newStatus = event.target.value as ApplicationStatus;
  onStatusChange(application.id, newStatus);
}


function handleSave(
  id: number,
  changes: ApplicationUpdate  
): void {
  onSave(id, changes);
  setIsEditing(false);
}


return (
  isEditing ? (
  <ApplicationEditForm
    application={application}
    onSave={handleSave}
    onCancel={() => setIsEditing(false)}
  />
) : (
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
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        >
      Edit
      </button>
    </article>
  ));


}

export default JobApplicationCard;
