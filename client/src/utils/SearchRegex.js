function LanguageFind(string) {
  var languagesfind =
    /(?:C\#|C\++|Java\b|JavaScript|\bC\b|Python|Ruby|\bGo\b|Swift|PHP|OOP|Objective C|Assembly|Object Oriented Language|\bR\b|Bash)/gi;
  let languages = new Set(string.toLowerCase().match(languagesfind));
  return Array.from(languages);
}

function TechSkillsFind(string) {
  var skillsfind =
    /(?:Node|Vue|Azure|Angular|Agile|React|AWS|Paas|Linux|Ubuntu|Front-End|Back-End|Excel|((?<!no)SQL)|nosql)/gi;
  let skills = new Set(string.toLowerCase().match(skillsfind));
  return Array.from(skills);
}
function requirementFind(string) {
  var requirementSearch =
    /(?:US Citizen|Bachelor|Master|AUTHORIZATION TO WORK IN US|ABET accreditation|vaccinated| Security Clearance)/gi;
  let requirements = new Set(string.toLowerCase().match(requirementSearch));
  return Array.from(requirements);
}

export { LanguageFind, TechSkillsFind, requirementFind };

// var skillsfind = /(?:Node|Angular|React|AWS|Paas|((?<!no)SQL)|nosql)/gi;
// console.log(new Set(search.jobs_results[i].description.toLowerCase().match(languagesfind)))
// console.log(new Set(search.jobs_results[i].description.toLowerCase().match(skillsfind)))
