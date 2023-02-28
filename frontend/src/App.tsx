import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./Pages";
import { LoginProtected } from "./Components";
import ContextProvider from "./Context/ContextProvider";
import Patients from "./Pages/Patients/Patients";
import Appointments from "./Pages/Appointments/Appointments";
import PatientDetails from "./Pages/Patients/PatientDetails";
import AppointmentDetails from "./Pages/Appointments/AppointmentDetails";
function App() {
    return (
        <>
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<LoginProtected />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route
                                path="/patients/:id"
                                element={<PatientDetails />}
                            />
                            <Route
                                path="/appointments"
                                element={<Appointments />}
                            />
                            <Route
                                path="/appointments"
                                element={<Appointments />}
                            />
                            <Route
                                path="/appointments/:id"
                                element={<AppointmentDetails />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </>
    );
}

export default App;
