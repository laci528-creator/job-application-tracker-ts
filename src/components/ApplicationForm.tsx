
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

function ApplicationForm() {

    const [company, setCompany] = useState<string>("");
    const [position, setPosition] = useState<string>("");


  function handleCompanyChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setCompany(event.target.value);
  }

  function handlePositionChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setPosition(event.target.value);
  }


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();

  console.log(` Company: ${company}, Position: ${position}`);
    setCompany("");
  setPosition("");
}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="company">Company:</label>

      <input
        id="company"
        type="text"
        value={company}
        onChange={handleCompanyChange}
        required
      />

      <label htmlFor="position">Position:</label>

      <input
        id="position"
        type="text"
        value={position}
        onChange={handlePositionChange}
        required
      />

        <button type="submit">
            Save application
        </button>
    </form>
  );
}

export default ApplicationForm;
