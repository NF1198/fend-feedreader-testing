/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/* global allFeeds, expect */

$(function () {

    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid URLs', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var obj = allFeeds[i];
                expect(obj.url).toBeDefined();
                expect(obj.url).not.toEqual('');
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid names', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var obj = allFeeds[i];
                expect(obj.name).toBeDefined();
                expect(obj.name).not.toEqual('');
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function () {

        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles visibility when clicked', function () {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least one item after loading', function () {
            var feed = $('.feed');
            var entries = feed.find('.entry');
            console.log(entries);
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var feedContent;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feedContent = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('actually loads new content', function () {
            expect($('.feed').html()).not.toEqual(feedContent);
        });

    });

}());
