module.exports = scoreOrg = (org, currentUser, tags) => {
  if (tags === null || !tags) {
    const userSurvey = Object.assign({}, currentUser.survey);
    tags = userSurvey.shortQuestions.tags.split(',');
    tags.map(tag => tag.trim().toLowerCase());
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