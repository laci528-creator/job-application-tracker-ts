import { useState } from "react";
import { fetchApplications } from "../utils/mockApi";
import type { LoadingState } from "../types/LoadingState";



function MockApplicationsDemo() {

    const [state, setState] = useState<LoadingState>({
        status: "idle"
    });

    async function loadApplications(): Promise<void> {

        setState({ status: "loading" });

        try {
            const result = await fetchApplications();
            console.log(result);

            setState({ status: "success", data: result });

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                setState({ status: "error", message: error.message });

            } else {
                console.error("Unknown error:", error);
                setState({ status: "error", message: "An unknown error occurred" });
            }

        }
    }

    return (

        <div className="button-container">
            {state.status === "loading" && (
                <p role="status">Loading applications...</p>
            )}
            {state.status === "error" && (
                <p role="alert" className="error-message">
                    {state.message}
                </p>
            )}

            <button onClick={loadApplications} disabled={state.status === "loading"}>
                {state.status === "loading" ? "Loading..." : "Load applications"}
            </button>

            {state.status === "success" && (
                <div>
                    {state.data.map(application => (
                        <div key={application.id}>
                            <p>{application.company}</p>
                            <p>{application.position}</p>
                            <p>{application.status}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>

    )

}

export default MockApplicationsDemo;