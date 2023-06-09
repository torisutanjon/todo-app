import React, { useEffect } from "react";

const Profile = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token === null) return (window.location.href = "/login");
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="h-screen w-screen top-0 left-0 bg-white flex items-center justify-center">
      <button
        className="relative h-[50px] w-[300px] bg-[#434343] text-white"
        onClick={() => logoutHandler()}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
