import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { host } from "../index";
import axios from "axios";

function JobGroup({ groupId }) {
  const [group, setGroup] = useState(null);
  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await axios.get(host + `api/groups/${groupId}`);
      setGroup(response.data);
    };
    fetchGroup();
  }, [groupId]);

  return (
    <Box flexGrow={1}>
      <Toolbar />
      <Box marginTop={5} marginLeft={4} marginRight={4}>
        {group !== null ? (
          <>
            <Box marginTop={8} marginBottom={5}>
              <Toolbar disableGutters>
                <Box flexGrow={1}>
                  <Box marginBottom={1}>
                    <Typography variant="h6" color="secondary">
                      {group.name}
                    </Typography>
                  </Box>
                  <Box marginBottom={1}>
                    <Typography variant="subtitle2">
                      {group.description}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2">
                    Created by: {group.creator.username}
                  </Typography>
                </Box>
              </Toolbar>
            </Box>
            <Box marginBottom={2}>
              <JobTable jobs={group.jobs} />
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default JobGroup;

function JobTable({ jobs }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Company</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="center">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Avatar src={job.thumbnail} sx={{ height: 30, width: 30 }} />
              </TableCell>
              <TableCell>{job.company_name}</TableCell>
              <TableCell align="left">{job.title}</TableCell>
              <TableCell align="left">{job.location}</TableCell>
              <TableCell align="center">
                <Link
                  to={`/jobs/${job._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 100 }}
                  >
                    See more
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
