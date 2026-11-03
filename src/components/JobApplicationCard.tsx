
import type { JobApplication } from "../types/JobApplication";

interface JobApplicationCardProps {
  application: JobApplication;
}

function JobApplicationCard({
  application,
}: JobApplicationCardProps) {
  return (
    <article>
      <h2>{application.company}</h2>
      <p>{application.position}</p>
      <p>Status: {application.status}</p>

      {application.notes && (
        <p>{application.notes}</p>
      )}
    </article>
  );
}

export default JobApplicationCard;
