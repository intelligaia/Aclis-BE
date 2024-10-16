'use strict';
const gplay = require('google-play-scraper').memoized(); 
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
        // Fetch AppID from URL
        let id_key = params.url.split('=')[1];
        id_key = id_key.split('&')[0];

        // App Details
        let app_details = await gplay.app({appId: id_key});
        var nume = 1000;

        // Getting Review data from Playstore
        var res = await gplay.reviews({
            appId: app_details.appId,
            num: nume
        });

        var googleData = res.data;
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
        googleData.forEach(element => {
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
            var dateData = element.date.split('T')[0];

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

                // Sentiment by Date
                if (sentimentByDate.length === 0) {
                    sentimentByDate.push({date: dateData, sentiment: analysis, count: 1});
                } else {
                    sentimentByDate.find((o, i) => {
                        if (o.date == dateData) {
                            sentimentByDate[i].sentiment += analysis;
                            sentimentByDate[i].count++;
                        } else if ((o.date != dateData) && ((sentimentByDate.length - 1) == i)) { 
                            sentimentByDate.push({date: dateData, sentiment: analysis, count: 1});
                        }
                    }); 
                }

                // Rating by Date
                if (ratingByDate.length === 0) {
                    ratingByDate.push({date: dateData, rating: element.score, count: 1});
                } else {
                    ratingByDate.find((o, i) => {
                        if (o.date === dateData) {
                            ratingByDate[i].rating += element.score;
                            ratingByDate[i].count++;
                        } else if ((o.date != dateData) && ((ratingByDate.length - 1) == i)) {
                            ratingByDate.push({date: dateData, rating: element.score, count: 1});
                        }
                    });
                }
                
                if (filteredReview.length > 0) {
                    wordCount = wordCount.concat(filteredReview);
                }
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

module.exports.getInstance = () => new ReviewAndroid();
