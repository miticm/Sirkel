import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  card: {
    display: "flex",
    marginTop: "10px",
    padding: "4px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
  },
  btn: {
    padding: "0",
    width: "60%",
    marginLeft: "10%"
    }
});

class ChatRoomCard extends React.Component {
  ChatWith = "";
  handleOnClick = e => {
    this.props.history.push(`/chats/${this.props.chat._id}`);
  };
  render() {
    const { classes, theme, chat } = this.props;
    const currentLoginUserID = localStorage.getItem("userID");
    chat.receivers.map(re => {
      if (re._id != currentLoginUserID) {
        this.ChatWith = re.username;
      }
    });
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/1200px-Purdue_Boilermakers_logo.svg.png"
          title="ChatRoom"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            {this.props.chat.name ? (
              <Typography>Group chat: {this.props.chat.name}</Typography>
            ) : (
              <Typography>Chat with {this.ChatWith}</Typography>
            )}

            <Typography color="textSecondary">
              {chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : "No messages yet"}
            </Typography>
          </CardContent>
        </div>
        <Button className={classes.btn} onClick={this.handleOnClick}>
          Message now
        </Button>
      </Card>
    );
  }
}

ChatRoomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ChatRoomCard);
