import "./App.css";
import { Provider } from "react-redux";
import CandidatesList from "./components/CandidatesList";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>VotingApp</h1>
        <CandidatesList />
      </div>
    </Provider>
  );
}

export default App;
