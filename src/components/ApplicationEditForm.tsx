import { useState, type SubmitEvent } from "react";
import type { ApplicationEditFormProps } from "../types/JobApplication";


function ApplicationEditForm({application, onSave, onCancel}: ApplicationEditFormProps) {    
    const [company, setCompany] = useState<string>(
  application.company
);

    const [position, setPosition] = useState<string>(
  application.position
);

    const [notes, setNotes] = useState<string>(
  application.notes ?? ""
);

function handleSave(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

    const trimmedCompany = company.trim();
  const trimmedPosition = position.trim();

  if (!trimmedCompany || !trimmedPosition) {
    return;
  }

  onSave(application.id, {
    company,
    position,
    notes,
  });
}


return (
  <form onSubmit={handleSave}>
    <label htmlFor="company">Company:</label>
    <input
      id="company"
      type="text"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
    />  
    <label htmlFor="position">Position:</label>
    <input
      id="position" 
      type="text"   
        value={position}
        onChange={(e) => setPosition(e.target.value)}
    />
    <label htmlFor="notes">Notes:</label>
    <textarea
      id="notes"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    />
    <button 
    type="submit"
    >Save
    </button>

    <button 
    type="button" 
    onClick={onCancel}
    >Cancel
    </button>

  </form>
);

}

export default ApplicationEditForm;