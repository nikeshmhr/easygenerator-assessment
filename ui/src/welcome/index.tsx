import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "" });

  const handleLogout = useCallback(() => {
    // Remove accessToken and redirect to login
    window.localStorage.removeItem("accessToken");
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userResponse = await getProfile();
        if (userResponse && userResponse.data) {
          setUser({ name: userResponse.data.name })
        }
      } catch (err) {
        handleLogout();
      }
    }

    fetchUser();
  }, [handleLogout, navigate]);

  return (
    <main className="flex flex-col items-center justify-center h-[100vh]">
      <div className="flex justify-evenly items-center flex-grow-0 self-end gap-3 mr-5 mt-5">
        <p className="text">{user?.name}</p>
        <button onClick={handleLogout} className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
          Logout
        </button>
      </div>
      <h1 className="text-xl flex-1 flex items-center">Welcome to the Application</h1>
    </main>
  );
}
