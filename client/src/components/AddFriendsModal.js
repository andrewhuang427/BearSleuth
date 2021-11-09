import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { deepOrange, deepPurple, green, blue } from "@mui/material/colors";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddFriendsModal({ open, setOpen, users, addFriend }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper sx={style}>
          <Box marginBottom={3}>
            <Typography variant="subtitle1">Search for connections</Typography>
          </Box>
          <Box></Box>
          <Paper variant="outlined">
            <Box>
              <Users users={users} addFriend={addFriend} />
            </Box>
          </Paper>
        </Paper>
      </Fade>
    </Modal>
  );
}

const colors = [deepOrange, deepPurple, green, blue];

const getColor = () => {
  const random = Math.random();
  const index = parseInt(random * 4);
  return colors[index]["500"];
};

function Users({ users, addFriend }) {
  return (
    <Box>
      <List style={{ maxHeight: 500, overflowY: "scroll" }}>
        {users.length > 0 ? (
          <>
            {users.map((user, index) => {
              return (
                <Box key={user.username}>
                  <ListItem
                    secondaryAction={
                      <Chip
                        variant="outlined"
                        color="primary"
                        clickable
                        label="Add Friend"
                        icon={<AddCircleOutlineIcon />}
                        onClick={() => {
                          addFriend(user._id);
                        }}
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ height: 30, width: 30, bgcolor: getColor() }}
                      >
                        {user.username.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={`Majoring in ${user.major}`}
                    />
                  </ListItem>
                  {index !== users.length - 1 ? <Divider /> : ""}
                </Box>
              );
            })}
          </>
        ) : (
          <Typography style={{ fontSize: 12 }}>
            Your currently do not have any friends
          </Typography>
        )}
      </List>
    </Box>
  );
}
