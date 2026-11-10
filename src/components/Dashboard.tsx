import { useApplicationsContext } from "../hooks/useApplicationsContext";

function Dashboard() {
    const { applications } = useApplicationsContext();


    const appliedCount = applications.filter(
        (app) => app.status === "applied"
    ).length;

    const interviewCount = applications.filter(
        (app) => app.status === "interview"
    ).length;

    const offerCount = applications.filter(
        (app) => app.status === "offer"
    ).length;

    const rejectedCount = applications.filter(
        (app) => app.status === "rejected"
    ).length;


    return (
        <div>
            <p>Applied: {appliedCount}</p>
            <p>Interviewing: {interviewCount}</p>
            <p>Offered: {offerCount}</p>
            <p>Rejected: {rejectedCount}</p>
        </div>
    )

}

export default Dashboard;