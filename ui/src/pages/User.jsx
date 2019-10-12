import React, { useState, useEffect } from "reactn";
import client from "../api/client";
import { useParams } from "react-router-dom";

const User = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  const getProfile = async () => {
    const { data } = await client.get("/users/profile/" + userId);
    setProfile(data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profile) {
    return (
      <div>
        <h2>{profile.email}</h2>
      </div>
    );
  } else {
    return <em>Loading...</em>;
  }
};

export default User;
