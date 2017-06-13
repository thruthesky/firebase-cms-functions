"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("./test-service-key.json");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-ec3e3.firebaseio.com"
});
var db = app.database();
var forum_1 = require("./firebase-cms/src/model/forum/forum");
var AppTest = (function () {
    function AppTest() {
        this.root = db.ref('/');
        this.forum = new forum_1.Forum(this.root);
        this.forum.debugPath = 'a/';
        this.run();
    }
    AppTest.prototype.run = function () {
        var _this = this;
        this.createCategory(function () { return _this.createPost(); });
    };
    AppTest.prototype.createCategory = function (callback) {
        var count = 0;
        var no = this.testCreateCategory().length;
        for (var _i = 0, _a = this.testCreateCategory(); _i < _a.length; _i++) {
            var c = _a[_i];
            this.forum.createCategory(c, function () {
                count++;
                console.log("create category: ", count);
                if (count >= no) {
                    console.log("All category created: ");
                    callback();
                }
            }, function (e) { return console.log(e); });
        }
    };
    AppTest.prototype.createPost = function () {
        var _this = this;
        var post = {
            subject: this.testSubject(),
            uid: 'abc'
        };
        this.forum.createPost(this.testPostData(), function (post) {
            console.log("Post created: ", post);
            _this.forum.setCategoryPostRelation(post.key, post)
                .then(function () {
            });
        }, function (e) { return console.error(e); });
    };
    AppTest.prototype.testPostData = function () {
        return {
            uid: this.testUid(),
            subject: this.testSubject(),
            content: this.testContent(),
            categories: this.testCategories()
        };
    };
    AppTest.prototype.testSubject = function () {
        var d = new Date();
        return 'SUBJECT: ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    };
    AppTest.prototype.testContent = function () {
        var d = new Date();
        return 'TEST CONTENT' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    };
    AppTest.prototype.testUid = function () {
        return '0PNzxFcsyiQ4LqOXPLtYbgFtgTw1';
    };
    AppTest.prototype.testCategories = function () {
        return {
            movie: true,
            music: true,
            qna: false,
            noexist: true
        };
    };
    AppTest.prototype.testCreateCategory = function () {
        return [
            { id: 'movie', name: 'Movie', description: "Let's go to Movie!", owner: 'thruthesky' },
            { id: 'music', name: 'Music', description: "Play music", owner: 'eunsu' },
            { id: 'play', name: 'Play', description: "Play with me", owner: 'thruthesky' },
            { id: 'game', name: 'Game', description: "Lineage game!", owner: 'lineage' }
        ];
    };
    return AppTest;
}());
new AppTest();
//# sourceMappingURL=test.js.map