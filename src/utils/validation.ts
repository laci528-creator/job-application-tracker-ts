import type {
    ApplicationStatus,
    JobApplication
} from "../types/JobApplication";


export function isApplicationStatus(
    value: unknown
): value is ApplicationStatus {

    return (
        value === "applied" || 
        value === "interview" || 
        value === "rejected" || 
        value === "offer" );
}

export function isObject(
    value: unknown
): value is Record<string, unknown> {

    return (
        typeof value === "object" && value !== null && !Array.isArray(value)
    )

}

export function isJobApplication(
    value: unknown
): value is JobApplication {

    if (!isObject(value)) {
        return false;
    }

    return (typeof value.id === "number" && 
        typeof value.company === "string" &&
        typeof value.position === "string" &&
        isApplicationStatus(value.status) &&
        (typeof value.notes === "string" || 
                value.notes === null || 
                value.notes === undefined)
        );

}

export function isJobApplicationArray(
    value: unknown
): value is JobApplication[] {

    return ( Array.isArray(value) &&
        value.every(
            application => isJobApplication(application)
        )
    );

}