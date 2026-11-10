import ApplicationList from "./components/ApplicationList";
import { ApplicationsProvider } from "./context/ApplicationsProvider";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ApplicationsProvider>
      <div>
        <h1>Job Tracker</h1>
        <Dashboard />
        <ApplicationList />
      </div>
    </ApplicationsProvider>
  );
}

export default App;