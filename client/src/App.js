import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import UpdateMember from "./components/pages/UpdateMember";
import { Routes, Route } from 'react-router-dom';
import CreateMember from "./components/pages/CreateMember";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateMember />} />
        <Route path="/update/:id" element={<UpdateMember />} />
      </Routes>
    </Provider>
  );
}

export default App;
