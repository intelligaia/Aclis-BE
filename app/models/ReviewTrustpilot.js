'use strict';
const puppeteer = require('puppeteer'); // Import Puppeteer
const { SentimentAnalyzer, PorterStemmer } = require('natural');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

class ReviewTrustpilot {
    constructor() {
        this.multi = [];
    }

    async get_reviews(params) {
        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to Trustpilot URL
        await page.goto(params.url, { waitUntil: 'networkidle2' });

        // Wait for the reviews to load (adjust selector as needed)
        await page.waitForSelector('.review-content', { timeout: 10000 }); // Wait for review elements to appear

        // Extract reviews
        const reviews = await this.extractReviews(page);
        console.log("Checking Reviews", reviews)

        // Close the browser
        await browser.close();

        // Declaring Variables for Assigning Data after processing
        let sentimentAvg = 0.0;
        let ratingAvg = 0.0;
        let wordCount = [];

        // Processing Data
        reviews.forEach(review => {
            const lexedReview = aposToLexForm(review.text);
            const casedReview = lexedReview.toLowerCase();
            const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
            const tokenizer = new natural.WordTokenizer();
            const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
            const correctedWords = tokenizedReview.map(word => spellCorrector.correct(word));
            const filteredReview = SW.removeStopwords(correctedWords);
            const analysis = new SentimentAnalyzer('English', PorterStemmer, 'afinn').getSentiment(filteredReview);

            if (!isNaN(analysis)) {
                sentimentAvg += analysis;
                ratingAvg += review.rating; // Assuming review.rating holds the rating value
                wordCount = wordCount.concat(filteredReview);
            }
        });

        const wordData = wordCount.reduce((prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

        return {
            status_code: 200,
            message: "Data Fetched successfully.",
            data: {
                average_sentiment: sentimentAvg / reviews.length,
                average_rating: ratingAvg / reviews.length,
                word_count: wordData,
                reviews_processed: reviews.length,
                actual_response: reviews
            }
        };
    }

    // Define method to extract reviews from the page
    async extractReviews(page) {
        return await page.evaluate(() => {
            const reviewElements = document.querySelectorAll('.review-content'); // Update selector as needed
            const reviews = [];

            reviewElements.forEach(review => {
                const textElement = review.querySelector('.review-text'); // Update selector as needed
                const ratingElement = review.querySelector('.star-rating'); // Update selector as needed

                const text = textElement ? textElement.innerText : '';
                const rating = ratingElement ? parseFloat(ratingElement.getAttribute('data-rating')) : 0; // Adjust as needed

                if (text) {
                    reviews.push({
                        text: text,
                        rating: rating
                    });
                }
            });

            return reviews;
        });
    }
}

module.exports.getInstance = () => new ReviewTrustpilot();
