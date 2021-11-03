function LanguageFind(string) {
    var languagesfind = /(?:C\#|C\++|Java\b|JavaScript|\bC\b|Python|Ruby|\bGo\b|Swift|PHP|OOP|Object Oriented Language|\bR\b)/gi;
    var j = (new Set(string.description.toLowerCase().match(languagesfind)))
    //   console.log(j)
       let ret = "Reccomended Languages: "
   //    for(let key of j) console.log(key)
       j.forEach(key => ret += (key + ", "))
       ret = ret.substring(0, ret.length - 2);
   
       return ret
}

function TechSkillsFind(string) {
    var skillsfind = /(?:Node|Angular|React|AWS|Paas|((?<!no)SQL)|nosql)/gi;
    var j = (new Set(string.description.toLowerCase().match(skillsfind)))
    //   console.log(j)
       let ret = "Reccomended Technologies/Skills: "
   //    for(let key of j) console.log(key)
       j.forEach(key => ret += (key + ", "))
       ret = ret.substring(0, ret.length - 2);
   
       return ret
}







export {LanguageFind, TechSkillsFind}


// var skillsfind = /(?:Node|Angular|React|AWS|Paas|((?<!no)SQL)|nosql)/gi;
// console.log(new Set(search.jobs_results[i].description.toLowerCase().match(languagesfind)))
// console.log(new Set(search.jobs_results[i].description.toLowerCase().match(skillsfind)))
