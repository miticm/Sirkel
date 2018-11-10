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

  otherUsers.sort((user1, user2) => user2.score - user1.score);

  return otherUsers;
}