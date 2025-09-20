import "./App.css";
import { MainLayout } from "./layouts/main/MainLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage.jsx";
import { useState } from "react";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { AccessPage } from "./pages/access/AccessPage.jsx";
import { ProtectedAccess } from "./components/common/ProtectedAccess.jsx";
import { ProtectedHome } from "./components/common/ProtectedHome.jsx";
import { ProtectedLogin } from "./components/common/ProtectedLogin.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AccessCodeProvider } from "./context/AccessCodeContext.jsx";
import { UsersPage } from "./pages/users/UsersPage.jsx";
import { EnrollPage } from "./pages/enroll/EnrollPage.jsx";
import { ExpirationsPage } from "./pages/expirations/ExpirationsPage.jsx";
import { PaymentsPage } from "./pages/payments/PaymentsPage.jsx";

function App() {

    /* Sidebar mode */
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    /* Function to handle sidebar mode */
    function handleSidebarMode() {
        setSidebarExpanded(actualValue => !actualValue);
    }

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <AccessCodeProvider>
                        <Routes>
                            <Route element={<ProtectedLogin/>}>
                                <Route path={'/login'} element={<LoginPage/>}/>
                            </Route>
                            <Route element={<ProtectedAccess/>}>
                                <Route path={'/acceso'} element={<AccessPage/>}/>
                                <Route element={<ProtectedHome/>}>
                                    <Route path={'/'} element={<MainLayout isExpanded={sidebarExpanded} handleSidebarMode={handleSidebarMode}/>}>
                                        <Route path={'inicio'} element={<HomePage/>}/>
                                        <Route path={'usuarios'} element={<UsersPage/>}/>
                                        <Route path={'registro'} element={<EnrollPage/>}/>
                                        <Route path={'vencimientos'} element={<ExpirationsPage/>}/>
                                        <Route path={'pagos'} element={<PaymentsPage/>}/>
                                    </Route>
                                </Route>
                            </Route>
                        </Routes>
                    </AccessCodeProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
