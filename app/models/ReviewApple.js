'use strict';
const astore = require('app-store-scraper').memoized(); 
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
        // Fetch AppId from URL
        let id_key = params.url.split('id')[1];

        // App Details
        let app_details = await astore.app({id: id_key});

        // Declaring Variables for Assigning Data after processing
        var nume = 100;

        // Getting Review data from App Store
        let res = await astore.reviews({
            appId: app_details.appId,
            page: 1
        });
        let res1 = await astore.reviews({
            appId: app_details.appId,
            page: 2
        });
        
        // Only Reading first 100 reviews
        res = res.concat(res1);

        // Declaring Variables for Assigning Data after processing
        var appleData = res;
        var sentimentAvg = 0.0;
        var ratingAvg = 0.0;
        var sentimentByDate = [];
        var ratingByDate = [];
        var wordCount = [];
        var wordData;
        var promoters = 0;
        var passives = 0;
        var detractors = 0;

        // Processing Data
        appleData.forEach(element => {
            const lexedReview = aposToLexForm(element.text);
            const casedReview = lexedReview.toLowerCase();
            const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
            const tokenizer = new natural.WordTokenizer();
            const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
            tokenizedReview.forEach((word, index) => {
                tokenizedReview[index] = spellCorrector.correct(word);
            });
            const filteredReview = SW.removeStopwords(tokenizedReview);
            const analysis = analyzer.getSentiment(filteredReview);
            
            if (!isNaN(analysis)) {
                sentimentAvg += analysis;
                ratingAvg += element.score;

                // NPS Calculation
                if (element.score >= 9) {
                    promoters++;
                } else if (element.score >= 7) {
                    passives++;
                } else {
                    detractors++;
                }

                if (filteredReview.length > 0) {
                    wordCount = wordCount.concat(filteredReview);
                }
            } else {
                console.log("Not a Number", sentimentAvg);
            }
        });

        wordData = wordCount.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

        // NPS Calculation
        const totalReviews = nume; // total number of reviews processed
        const nps = ((promoters - detractors) / totalReviews) * 100;

        // CSAT Calculation
        const csat = (ratingAvg / totalReviews) || 0; // Average rating as CSAT

        var retVal = {
            status_code: 200,
            message: "Data Fetched successfully.",
            data: {
                app_details: app_details,
                average_sentiment: sentimentAvg / nume,
                average_rating: ratingAvg / nume,
                sentiment_by_date: sentimentByDate,
                rating_by_date: ratingByDate,
                word_count: wordData,
                reviews_processed: nume,
                actual_response: res,
                nps: nps,
                csat: csat
            }
        };

        return retVal;
    }
}

module.exports.getInstance = () => new ReviewApple();
