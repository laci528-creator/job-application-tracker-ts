import type { JobApplication } from "../types/JobApplication";

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

export async function fetchApplications(): Promise<JobApplication[]> {

    try {
        const apiAntwort = await Promise.resolve(mockApplications);
        console.log(apiAntwort);
        return apiAntwort;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;

    }

}