import ApplicationList from "./components/ApplicationList";
import { ApplicationsProvider } from "./context/ApplicationsProvider";

function App() {
  return (
    <ApplicationsProvider>
      <div>
        <h1>Job Tracker</h1>
        <ApplicationList />
      </div>
    </ApplicationsProvider>
  );
}

export default App;