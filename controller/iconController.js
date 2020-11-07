const fetch = require('node-fetch');

module.exports.getIcons = function() {
    let url = 'https://api.iconfinder.com/v4/icons/search';
    let options = {
      method: 'GET',
      qs: {query: 'abstract', count: '50'},
      headers: {
        Authorization: 'Bearer 4Lb0OMq5DBI4t9qEWYNS0Zzhg47Tuye5rPSZSgmjhVPoeKXeDFOyzgUqB7WrjNN0'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
}
