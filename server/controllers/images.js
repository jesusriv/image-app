const rp = require('request-promise');
let images;

const options = {
    uri: "https://api.unsplash.com/search/photos?query=travel", 
    headers: {
        "Authorization": "Client-ID 0050c8dd5d5c6700d604024d74f5533cdaa9f1412cbdcdfa9e1997b7169421cb"
        },
    json: true
    };

module.exports = {
    home: (_, res) => {
        res.render('index', {'images': images});
    },

    welcome: (_, res) => {
        res.render('welcome');
    },
    
    getImages: (_, res) => {
        rp(options)
            .then(imgs => images = imgs)
            .then(() => res.redirect('/'))
            .catch(err => console.log(err));
    }
}