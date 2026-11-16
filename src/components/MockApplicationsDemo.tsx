import { useState } from "react";
import { fetchApplications } from "../utils/mockApi";



function MockApplicationsDemo() {

    const [isLoading, setIsLoading] = useState(false);

    async function loadApplications(): Promise<void> {

        setIsLoading(true);

        try {
            const result = await fetchApplications();
            console.log(result);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw error;

        }
        finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="button-container">
            <button onClick={loadApplications} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load applications"}
            </button>
        </div>

    )




}

export default MockApplicationsDemo;