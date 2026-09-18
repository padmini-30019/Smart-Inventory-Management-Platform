import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  const theme =
    localStorage.getItem("theme") || "light";

  const [currentTime, setCurrentTime] =
    useState("");

  const [sessionDuration,
    setSessionDuration] =
    useState("");

  useEffect(() => {

    if (
      !localStorage.getItem("sessionStart")
    ) {

      localStorage.setItem(
        "sessionStart",
        Date.now()
      );

    }

    const timer =
      setInterval(() => {

        setCurrentTime(
          new Date().toLocaleString()
        );

        const start =
          Number(
            localStorage.getItem(
              "sessionStart"
            )
          );

        const diff =
          Math.floor(
            (Date.now() - start) / 1000
          );

        const hrs =
          Math.floor(diff / 3600);

        const mins =
          Math.floor(
            (diff % 3600) / 60
          );

        const secs =
          diff % 60;

        setSessionDuration(
          `${hrs}h ${mins}m ${secs}s`
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  return (

    <div className="profile-page">

      <div className="profile-card-page">

        <div className="profile-avatar-large">
          {username?.charAt(0).toUpperCase()}
        </div>

        <h1>{username}</h1>

        <p className="profile-role">
          {role}
        </p>

        <div className="profile-details">

          <div className="detail-row">
            <span>Username</span>
            <strong>{username}</strong>
          </div>

          <div className="detail-row">
            <span>Role</span>
            <strong>{role}</strong>
          </div>

          <div className="detail-row">
            <span>Theme</span>
            <strong>{theme}</strong>
          </div>

          <div className="detail-row">
            <span>Current Time</span>
            <strong>{currentTime}</strong>
          </div>

          <div className="detail-row">
            <span>Session Duration</span>
            <strong>{sessionDuration}</strong>
          </div>

          <div className="detail-row">
            <span>Account Type</span>
            <strong>
              {role === "ADMIN"
                ? "Administrator"
                : "Standard User"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <strong className="active-status">
              Active
            </strong>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;