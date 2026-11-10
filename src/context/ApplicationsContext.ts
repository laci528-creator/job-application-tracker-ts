import { createContext } from "react";
import { useApplications } from "../hooks/useApplications";

export type ApplicationsContextType =
  ReturnType<typeof useApplications>;

export const ApplicationsContext = createContext<ApplicationsContextType | null>(null);