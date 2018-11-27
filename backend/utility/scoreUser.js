module.exports = scoreUser = (otherUser, currentUser, tags) => {
  if ((tags === null || !tags || tags.length === 0) 
    && currentUser.survey
    && currentUser.survey.shortQuestions
    && currentUser.survey.shortQuestions.tags) {
    const userSurvey = Object.assign({}, currentUser.survey);
    tags = userSurvey.shortQuestions.tags.split(',');
    tags = tags.map(tag => tag = tag.trim().toLowerCase());
    tags = tags.filter(tag => tag !== '');
  }

  let score = 0;

  tags.forEach(tag => {
    if (otherUser.survey && otherUser.survey.shortQuestions && otherUser.survey.shortQuestions.tags) {
      score += (otherUser.survey.shortQuestions.tags.toLowerCase().match(new RegExp(tag, "g")) || []).length
    }
  });

  return score;
}