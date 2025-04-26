"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import { toast } from "react-toastify";

function Header({ className }) {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = () => {
      const role = getUserRole();
      setUserRole(role);
    };

    checkRole();

    window.addEventListener("roleChanged", checkRole);

    return () => {
      window.removeEventListener("roleChanged", checkRole);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    setUserRole(null);
    window.dispatchEvent(new Event("roleChanged"));
    toast.success("Logged out successfully");
    navigate("/");
  };

  const renderNavLinks = () => {
    // If not logged in
    if (!userRole) {
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Signup
          </Link>
        </div>
      );
    }

    // If logged in as dentist
    if (userRole === "dentist") {
      return (
        <div className="flex items-center space-x-4 flex-wrap">
          <Link
            to="/dailytreat"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Daily Treatment
          </Link>
          <Link
            to="/patientdb"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Search Patient
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Register Patient
          </Link>
          <Link
            to="/appointment"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Appointment
          </Link>
          <Link
            to="/treatmentcrud"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Edit Treatments
          </Link>
          <Link
            to="/prescriptioncrud"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Edit Prescription
          </Link>
          <Link
            to="/doctordashboard"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Doctor Dashboard
          </Link>
          <Link
            to="/resetpassword"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Reset Password
          </Link>
          <Link
            to="/changephone"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Change Phone
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Logout
          </button>
        </div>
      );
    }

    // If logged in as admin
    if (userRole === "admin") {
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Home
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Register Patient
          </Link>
          <Link
            to="/appointment"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Appointment
          </Link>
          <Link
            to="/patientdb"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Search Patient
          </Link>
          <Link
            to="/sendmessage"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Send Message
          </Link>
          <Link
            to="/admindashboard"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/resetpassword"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Reset Password
          </Link>
          <Link
            to="/changephone"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Change Phone
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Logout
          </button>
        </div>
      );
    }

    // If logged in as patient
    if (userRole === "patient") {
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Home
          </Link>
          <Link
            to="/patientdashboard"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Dashboard
          </Link>
          <Link
            to="/appointment"
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Book Appointment
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
          >
            Logout
          </button>
        </div>
      );
    }

    // Fallback if role is undefined or not recognized
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]"
        >
          Login
        </Link>
      </div>
    );
  };

  return (
    <div>
      <header
        className={`${className} justify-between p-2 bg-[var(--darkgreen)]`}
      >
        <div className="flex items-center">
          <Link to="/">
            <img src="./src/assets/logo.svg" alt="Logo" className="w-18 h-16" />
          </Link>
        </div>
        {renderNavLinks()}
      </header>
    </div>
  );
}

export default Header;
