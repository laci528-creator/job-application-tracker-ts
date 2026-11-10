import { useContext } from "react";
import { ApplicationsContext } from "../context/ApplicationsContext";



export function useApplicationsContext() {

    const context = useContext(ApplicationsContext);

    if (context === null) {
        throw new Error(
            "useApplicationsContext must be used within an ApplicationsProvider"
        );
    }

    return context;

}