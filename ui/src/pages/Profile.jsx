import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { 0: token } = useGlobal("token");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await client.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [token]);

  return (
    <div>
      <h1>Profile:</h1>
      {profile && (
        <div>
          <div>
            <div>testing profile page</div>
            <em>{profile.email}</em>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
