import React from "react";
import { IoMdSettings } from "react-icons/io";

const SettingsButton = () => {
  // TODO Fetch User Profile Picture; Display Login when not logged in; add functionality
  return (
    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat text-white bg-blue-600 focus:outline-none hover:brightness-75">
      <IoMdSettings className="w-6 h-6" />
    </button>
  );
};

export default SettingsButton;
