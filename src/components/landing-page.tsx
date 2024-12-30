import { Button } from "./ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] absolute inset-0">
      <div className="w-[600px] p-10 rounded-lg bg-[#030a1c] border border-[#1d283a] text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Todo</h1>
        <p className="text-lg text-gray-400 mb-8">
          Organize your tasks efficiently with our powerful todo application
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            className="bg-white text-black hover:bg-gray-200 px-8"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="border-[#1d283a] hover:bg-[#1d283a] px-8"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
