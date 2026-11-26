
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
/*
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
}*/


export async function fetchValidatedData<T>(
    data: unknown,
    validator: (value: unknown) => value is T
): Promise<T> {
    await delay(1500);
    if(!validator(data)){
        throw new Error("Invalid API response");
    }
    return data;
}

export async function fetchApplications(): Promise<JobApplication[]> {

    return (fetchValidatedData(mockApplications, isJobApplicationArray));

}