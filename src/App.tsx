import ApplicationList from "./components/ApplicationList";
import ApplicationForm from "./components/ApplicationForm";

function App() {
  return (
    <div>
      <h1>Job Tracker</h1>
      <ApplicationForm />
      <ApplicationList />
    </div>
  );
}

export default App;