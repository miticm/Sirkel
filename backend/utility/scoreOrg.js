module.exports = scoreOrg = (org, currentUser, tags) => {
  if ((tags === null || !tags || tags.length === 0) 
    && currentUser.survey !== undefined
    && currentUser.survey.shortQuestions
    && currentUser.survey.shortQuestions.tags !== undefined) {
    const userSurvey = Object.assign({}, currentUser.survey);
    tags = userSurvey.shortQuestions.tags.split(',');
    tags = tags.map(tag => tag = tag.trim().toLowerCase());
    tags = tags.filter(tag => tag !== '');
  }

  let score = 0;

  tags.forEach(tag => {
    score += (org.description.toLowerCase().match(new RegExp(tag, "g")) || []).length
    if (org.tags) {
      score += (org.tags.toLowerCase().match(new RegExp(tag, "g")) || []).length
    }
  });

  return score;
}