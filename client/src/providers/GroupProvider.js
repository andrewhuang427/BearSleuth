import React, { useEffect, useState, useMemo } from "react";
import GroupContext from "./GroupContext";
import { host } from "../index";
import axios from "axios";

function GroupProvider({ children }) {
  const [myGroups, setMyGroups] = useState([]);
  const [friendGroups, setFriendGroups] = useState([]);

  const fetchMyGroups = async () => {
    console.log("fetching my groups");
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(host + "api/groups/me", config);
      console.log(response.data);
      setMyGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendGroups = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(host + "api/groups/friends", config);
      console.log(response.data);
      setFriendGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyGroups();
    fetchFriendGroups();
  }, []);

  const value = useMemo(
    () => ({
      myGroups,
      setMyGroups,
      fetchMyGroups,
      friendGroups,
    }),
    [myGroups, setMyGroups, fetchMyGroups, friendGroups]
  );

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
}

export default GroupProvider;
