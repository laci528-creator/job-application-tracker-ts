import type { JobApplication } from "../types/JobApplication";
import { isJobApplicationArray } from "./validation";

const mockApplications: JobApplication[] = [
    {
        id: 1,
        company: "Company A",
        position: "Software Engineer",
        status: "applied",
        notes: "junior position",
    },
    {
        id: 2,
        company: "Company B",
        position: "Frontend Developer",
        status: "interview",
        notes: null,
    }
];

function delay(ms:number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    })
}

export async function fetchApplications(): Promise<JobApplication[]> {

    try {
        const apiAntwort: unknown = mockApplications;
        await delay(1500);
        console.log(apiAntwort);
        
        if (!isJobApplicationArray(apiAntwort)) {
            throw new Error("Invalid API response");
        }

        return apiAntwort;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;

    }

}