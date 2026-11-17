import { useState } from "react";
import { fetchApplications } from "../utils/mockApi";
import type { JobApplication } from "../types/JobApplication";



function MockApplicationsDemo() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [applications, setApplications] =
        useState<JobApplication[]>([]);

    async function loadApplications(): Promise<void> {

        setIsLoading(true);
        setError(null);
        setApplications([]);

        try {
            const result = await fetchApplications();
            console.log(result);
            setApplications(result);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                setError(error.message);

            } else {
                console.error("Unknown error:", error);
                setError("An unknown error occurred");
            }

        }
        finally {
            setIsLoading(false);
        }

    }

    return (

        <div className="button-container">
            {isLoading && (
                <p role="status">Loading applications...</p>
            )}
            {error && (
                <p role="alert" className="error-message">
                    {error}
                </p>
            )}

            <button onClick={loadApplications} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load applications"}
            </button>

            <div>
                {applications.map(application => (
                    <div key={application.id}>
                        <p>{application.company}</p>
                        <p>{application.position}</p>
                        <p>{application.status}</p>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default MockApplicationsDemo;