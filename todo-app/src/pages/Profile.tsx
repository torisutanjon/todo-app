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
    <div className="h-screen w-screen top-0 left-0 bg-white flex flex-col items-center justify-center">
      <button
        className="relative h-[110px] w-[110px] rounded-[50%] bg-[#434343] text-white sm:h-[50px] sm:w-[300px] sm:rounded-[0]"
        onClick={() => logoutHandler()}
      >
        LOGOUT
      </button>

      <button
        className="mt-[25px]"
        onClick={() => (window.location.href = "/")}
      >
        Back
      </button>
    </div>
  );
};

export default Profile;
