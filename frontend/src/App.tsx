import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./Pages";
import AuthProvider from "./Context/AuthContext";
import { LoginProtected } from "./Components";
function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    {/* <NavBar /> */}
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route element={<LoginProtected />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
