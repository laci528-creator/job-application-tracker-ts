import type { ReactNode } from "react";
import { ApplicationsContext } from "./ApplicationsContext";
import { useApplications } from "../hooks/useApplications";

interface ApplicationsProviderProps {
  children: ReactNode;
}

export function ApplicationsProvider({
  children,
}: ApplicationsProviderProps) {

const applicationsContextValue = useApplications();

return (    

<ApplicationsContext.Provider value={applicationsContextValue}>
  {children}
</ApplicationsContext.Provider>  

);
}