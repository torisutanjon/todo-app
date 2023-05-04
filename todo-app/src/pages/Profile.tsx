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
    <div className="h-screen w-screen top-0 left-0 bg-[#2D2727] flex items-center justify-center">
      <button
        className="relative h-[50px] w-[300px] border-[2px] border-[#8F43EE] rounded-[10px] text-[#8F43EE] hover:bg-[#8F43EE] hover:text-white"
        onClick={() => logoutHandler()}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
