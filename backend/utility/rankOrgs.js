module.exports = rankOrgs = (orgs, user) => {
  const userSurvey = Object.assign({}, user.survey);
  let tags = userSurvey.shortQuestions.tags.split(',');
  tags.map(tag => tag.trim().toLowerCase());

  if (userSurvey.shortQuestions) {
    if (userSurvey.shortQuestions.likesSports === 'Yes') {
      tags.push('sports');
      tags.push('intramural');
    }

    if (userSurvey.shortQuestions.likesMusic === 'Yes') {
      tags.push('music');
    }

    if (userSurvey.shortQuestions.likesVideoGames === 'Yes') {
      tags.push('video games');
    }
  }

  orgs.map(org => {
    let score = 0;
    tags.forEach(tag => {
      score += (org.description.toLowerCase().match(new RegExp(tag, "g")) || []).length
      if (org.tags) {
        score += (org.tags.toLowerCase().match(new RegExp(tag, "g")) || []).length
      }
    });
    org.score = score;
  });
  orgs.sort((org1, org2) => org2.score - org1.score);

  return orgs;
}