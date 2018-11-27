const scoreUser = require('./scoreUser');

module.exports = rankUsers = (otherUsers, currentUser) => {
  const userSurvey = Object.assign({}, currentUser.survey);
  let tags = userSurvey.shortQuestions.tags.split(',');
  tags.map(tag => tag.trim().toLowerCase());

  otherUsers.map(user => {
    user.score = scoreUser(user, currentUser, tags);
  });

  const newUsers = otherUsers.filter((otherUser) => {
    let isConnection = false;

    otherUser.connections.forEach(connection => {
      if (connection.username === currentUser.username) {
        isConnection = true;
      }
    });

    return !isConnection;
  });

  newUsers.sort((user1, user2) => user2.score - user1.score);

  const topUsers = newUsers.splice(0, 10);

  return topUsers;
}