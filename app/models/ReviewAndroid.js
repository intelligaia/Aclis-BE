'use strict';
const gplay = require('google-play-scraper').memoized(); //https://www.npmjs.com/package/google-play-scraper
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const SW = require('stopword');
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
class ReviewAndroid {
    constructor(){
        this.multi = [];
    }

    async get_reviews(params) {

        //Fetch AppID from URL
        let id_key = params.url.split('=')[1];
        id_key = id_key.split('&')[0]

        //App Details
        let app_details = await gplay.app({appId: id_key})

        //Declaring Variables for Assigning Data after processing
        var nume = 100

        //Getting Review data from Playstore
        var res = await gplay.reviews({
            appId: app_details.appId,
            num: nume
          })

        //Only Reading first 20 reviews
        // res = res.slice(0, nume)
        
        //Declaring Variables for Assigning Data after processing
        var googleData =  res.data;
        var sentimentAvg = 0.0;
        var ratingAvg = 0.0;
        var sentimentByDate = [];
        var ratingByDate = [];
        var wordCount = [];
        var wordData;



        //Processing Data
        googleData.forEach(element => {
            const lexedReview = aposToLexForm(element.text);
            const casedReview = lexedReview.toLowerCase();
            const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
            const { WordTokenizer } = natural;
            const tokenizer = new WordTokenizer();
            const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
            // tokenizedReview.forEach((word, index) => {
            //     tokenizedReview[index] = spellCorrector.correct(word);
            //   })
            const filteredReview = SW.removeStopwords(tokenizedReview);
            const analysis = analyzer.getSentiment(filteredReview);
            var dateData = element.date.split('T')[0]
            
            if(isNaN(analysis)){
                console.log("Not a Number",sentimentAvg);
            }else{
                sentimentAvg = sentimentAvg + analysis
                ratingAvg = ratingAvg + element.score
                if(sentimentByDate.length === 0){
                    sentimentByDate.push({date:dateData, sentiment:analysis, count:1})
                }else{
                    sentimentByDate.find((o, i) => {
                        if(o.date == dateData) {
                            sentimentByDate[i].sentiment = sentimentByDate[i].sentiment + analysis;
                            sentimentByDate[i].count = sentimentByDate[i].count + 1;
                            
                        }else if( (o.date != dateData) && ((sentimentByDate.length -1) == i)){ 
                            sentimentByDate.push({date:dateData, sentiment:analysis, count:1})
                        }
                    }); 
                }
                if(ratingByDate.length === 0){
                    ratingByDate.push({date:dateData, rating:element.score, count:1})
                }else{
                    ratingByDate.find((o, i) => {
                            if (o.date === dateData) {
                                ratingByDate[i].rating = ratingByDate[i].rating + element.score;
                                ratingByDate[i].count = ratingByDate[i].count + 1;
                                
                            }else if((o.date != dateData) && ((ratingByDate.length -1) == i)){
                                ratingByDate.push({date:dateData, rating:element.score, count:1})
                            }
                        });
                }
                if(filteredReview.length > 0){
                    wordCount = wordCount.concat(filteredReview);
                }
            }
        });


        wordData = wordCount.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});


        var user_details = await db(`
            SELECT * 
            FROM users
            WHERE browser_unique_id = ?
        `,[params.browser_unique_id])

        if(user_details.length > 0){
            
            var add_logs = await db(`
            INSERT INTO search_logs(
                id_users,
                app_id,
                average_sentiment,
                average_rating,
                app_type
            )
            VALUES(?,?,?,?,?)`,[user_details[0].id_users, app_details.appId, sentimentAvg/50, ratingAvg/50, 1]);
        }else{

            var add_user = await db(`
            INSERT INTO users(
                browser_unique_id,
                browser,
                location
            )
            VALUES(?,?,?)
            `,[params.browser_unique_id, params.browser, params.location]);

            var add_logs = await db(`
            INSERT INTO search_logs(
                id_users,
                app_id,
                average_sentiment,
                average_rating,
                app_type
            )
            VALUES(?,?,?,?,?)`,[add_user.insertId, app_details.appId, sentimentAvg/50, ratingAvg/50, 1]);
        }


        var retVal = {
            status_code: 200,
            message: "Data Fetched successfully.",
            data: {
                app_details:app_details,
                average_sentiment: sentimentAvg/nume,
                average_rating: ratingAvg/nume,
                sentiment_by_date: sentimentByDate,
                rating_by_date: ratingByDate,
                word_count: wordData,
                reviews_processed: nume

            }
        }

        return retVal;
    }
}

module.exports.getInstance = () => new ReviewAndroid();