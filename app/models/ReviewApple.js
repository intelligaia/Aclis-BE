'use strict';
const astore = require('app-store-scraper').memoized(); //https://www.npmjs.com/package/app-store-scraper
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const SW = require('stopword');
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

class ReviewApple {
    constructor(){
        this.multi = [];
    }

    async get_reviews(params) {
        //Fetch AppId from URL
        let id_key = params.url.split('id')[1];

        //App Details
        let app_details = await astore.app({id: id_key})

        //Declaring Variables for Assigning Data after processing
        var nume = 100

        //Getting Review data from App Store
        let res  = await astore.reviews({
            appId: app_details.appId,
            page: 1
          })
        let res1  = await astore.reviews({
            appId: app_details.appId,
            page: 2
          })
        
        //Only Reading first 100 reviews
        res = res.concat(res1);

        //Declaring Variables for Assigning Data after processing
        var appleData =  res;
        var sentimentAvg = 0.0;
        var ratingAvg = 0.0;
        var sentimentByDate = [];
        var ratingByDate = [];
        var wordCount = [];
        var wordData;


        //Processing Data
        appleData.forEach(element => {
            const lexedReview = aposToLexForm(element.text);
            const casedReview = lexedReview.toLowerCase();
            const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
            const { WordTokenizer } = natural;
            const tokenizer = new WordTokenizer();
            const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
            tokenizedReview.forEach((word, index) => {
                tokenizedReview[index] = spellCorrector.correct(word);
              })
            const filteredReview = SW.removeStopwords(tokenizedReview);
            const analysis = analyzer.getSentiment(filteredReview);
            
            if(isNaN(analysis)){
                console.log("Not a Number",sentimentAvg);
            }else{
                sentimentAvg = sentimentAvg + analysis
                ratingAvg = ratingAvg + element.score
                if(filteredReview.length > 0){
                    wordCount = wordCount.concat(filteredReview);
                }
            }
        });

        wordData = wordCount.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});


        // var user_details = await db(`
        //     SELECT * 
        //     FROM users
        //     WHERE browser_unique_id = ?
        // `,[params.browser_unique_id])

        // if(user_details.length > 0){
            
        //     var add_logs = await db(`
        //     INSERT INTO search_logs(
        //         id_users,
        //         app_id,
        //         average_sentiment,
        //         average_rating,
        //         app_type
        //     )
        //     VALUES(?,?,?,?,?)`,[user_details[0].id_users, app_details.appId, sentimentAvg/nume, ratingAvg/nume, 1]);
        // }else{

        //     var add_user = await db(`
        //     INSERT INTO users(
        //         browser_unique_id,
        //         browser,
        //         location
        //     )
        //     VALUES(?,?,?)
        //     `,[params.browser_unique_id, params.browser, params.location]);

        //     var add_logs = await db(`
        //     INSERT INTO search_logs(
        //         id_users,
        //         app_id,
        //         average_sentiment,
        //         average_rating,
        //         app_type
        //     )
        //     VALUES(?,?,?,?,?)`,[add_user.insertId, app_details.appId, sentimentAvg/nume, ratingAvg/nume, 2]);
        // }


        var retVal = {
            status_code: 200,
            message: "Data Fetched successfully.",
            data: {
                app_details: app_details,
                average_sentiment: sentimentAvg/nume,
                average_rating: ratingAvg/nume,
                sentiment_by_date: sentimentByDate,
                rating_by_date: ratingByDate,
                word_count: wordData,
                reviews_processed: nume,
                actual_response: res

            }
        }


        return retVal;
    }
}

module.exports.getInstance = () => new ReviewApple();