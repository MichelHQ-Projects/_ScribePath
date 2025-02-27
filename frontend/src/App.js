import React from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { useAuth } from "./context/AuthContext";
import Page from "./components/Page";


import HomeLanding from "./screens/HomeLanding";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Dashboard from "./screens/Dashboard";
import NewItem from "./screens/NewItem";

import "./styles/app.sass";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes (Only for Non-Authenticated Users) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* ✅ Protected Routes (Only for Authenticated Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" 
            element={
              <Page title="Dashboard">
                  <Dashboard />
              </Page>} />
          <Route path="item/create"
            element={
              <Page title="Create">
                  <NewItem />
              </Page>
            }
            />
        </Route>
        

        {/* ✅ Fallback Route */}
        <Route path="*" element={<HomeLanding />} />
      </Routes>
    </Router>
  );
};

export default App;