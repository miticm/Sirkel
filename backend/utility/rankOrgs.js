module.exports = rankOrgs = (orgs, user) => {
  const userSurvey = Object.assign({}, user.survey);
  let tags = userSurvey.shortQuestions.tags.split(',');
  tags.map(tag => tag.trim().toLowerCase());

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

  const newOrgs = orgs.filter((org) => {
    let inOrg = false;

    org.members.forEach(member => {
      if (member.username === user.username) {
        inOrg = true;
      }
    });

    return !inOrg;
  });

  newOrgs.sort((org1, org2) => org2.score - org1.score);

  const topOrgs = newOrgs.splice(0, 10);
  
  return topOrgs;
}