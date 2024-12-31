import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { LandingPage } from "./components/landing-page";
import { Dashboard } from "./components/dashboard";
import { AuthProvider } from "./providers/auth-providers";

import { TodoProvider } from "@/providers/todo-providers";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        {" "}
        {/* Router needs to be first */}
        <AuthProvider>
          {" "}
          {/* Then AuthProvider */}
          <TodoProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Toaster />
          </TodoProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
