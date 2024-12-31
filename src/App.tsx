import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { LandingPage } from "./components/landing-page";
import { Dashboard } from "./components/dashboard";
import { AuthProvider } from "./providers/auth-providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoProvider } from "@/providers/todo-providers";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
