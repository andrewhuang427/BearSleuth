import React, { useEffect, useState, useMemo } from "react";
import GroupContext from "./GroupContext";
import { host } from "../index";
import axios from "axios";

function GroupProvider({ children }) {
  const [myGroups, setMyGroups] = useState([]);

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

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const value = useMemo(
    () => ({
      myGroups,
      setMyGroups,
      fetchMyGroups,
    }),
    [myGroups, setMyGroups, fetchMyGroups]
  );

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
}

export default GroupProvider;
