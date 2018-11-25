module.exports = rankUsers = (otherUsers, currentUser) => {
  const userSurvey = Object.assign({}, currentUser.survey);
  let tags = userSurvey.shortQuestions.tags.split(',');
  tags.map(tag => tag.trim().toLowerCase());

  otherUsers.map(user => {
    let score = 0;
    
    tags.forEach(tag => {
      if (user.survey && user.survey.shortQuestions && user.survey.shortQuestions.tags) {
        score += (user.survey.shortQuestions.tags.toLowerCase().match(new RegExp(tag, "g")) || []).length
      }
    });

    user.score = score;
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