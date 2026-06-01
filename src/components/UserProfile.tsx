"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";
import Animatedbutton from "./Animatedbutton";

interface userProfileProps {
  onClose: () => void;
}
const UserProfile: React.FC<userProfileProps> = ({ onClose }) => {
  const { currentUser, signOut, userProfile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-0 sm:px-4 py-8">
      <div className="bg-canvas p-6 sm:rounded-2xl shadow-none sm:shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-md w-full mx-auto border-y sm:border border-hairline">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-hairline">
          <h2 className="text-2xl font-bold text-ink">My Profile</h2>
          <Animatedbutton
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-mute hover:text-ink hover:bg-canvas-soft rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Animatedbutton>
        </div>

        <div className="border-t border-b py-4 my-4">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
              {userProfile?.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg text-gray-400">
                {userProfile?.displayName || "User"}
              </h3>
            </div>
          </div>

          <div className="text-sm text-gray-900">
            <p>
              Account created:{" "}
              {userProfile
                ? new Date(userProfile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Animatedbutton
            onClick={handleSignOut}
            className=" relative inline-flex items-center justify-center px-2 py-2 rounded-md border border-red-700 bg-red-600 text-sm text-white
 shadow-[0_3px_0_rgba(185,28,28,1)]
                               transform transition-all duration-150
                               hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgba(153,27,27,1)]
                                active:translate-y-0 active:shadow-[0_2px_0_rgba(153,27,27,1)]
                                hover:bg-red-500
                                dark:bg-red-700 dark:border-red-900 dark:hover:bg-red-600
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            Sign Out
          </Animatedbutton>
        </div>
      </div>
      <Image
        src={"pro4.svg"}
        alt="Upload Files"
        width={300}
        height={300}
        className="mx-auto mb-50 mt-50 top-1 transition-transform duration-300 group-hover:scale-110 "
      />
    </div>
  );
};

export default UserProfile;
