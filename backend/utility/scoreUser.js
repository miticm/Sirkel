module.exports = scoreUser = (otherUser, currentUser, tags) => {
  if (tags === null || !tags) {
    const userSurvey = Object.assign({}, currentUser.survey);
    tags = userSurvey.shortQuestions.tags.split(',');
    tags.map(tag => tag.trim().toLowerCase());
  }

  let score = 0;

  tags.forEach(tag => {
    if (otherUser.survey && otherUser.survey.shortQuestions && otherUser.survey.shortQuestions.tags) {
      score += (otherUser.survey.shortQuestions.tags.toLowerCase().match(new RegExp(tag, "g")) || []).length
    }
  });

  return score;
}