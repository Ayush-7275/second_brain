import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProtectedRoute } from "./lib/ProtectedRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
