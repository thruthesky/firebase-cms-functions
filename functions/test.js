"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("./test-service-key.json");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-ec3e3.firebaseio.com"
});
var db = app.database();
var post_1 = require("./model/post");
var AppTest = (function () {
    function AppTest() {
        this.root = db.ref();
        this.post = new post_1.Post({ root: this.root });
        this.run();
    }
    AppTest.prototype.run = function () {
        this.createPost();
    };
    AppTest.prototype.createPost = function () {
        var _this = this;
        var post = {
            subject: this.testSubject(),
            uid: 'abc'
        };
        this.post.create(this.testPostData(), function (post) {
            console.log("Post created: ", post);
            _this.post.setCategoryPostRelation(post.key, post);
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
            qna: false
        };
    };
    return AppTest;
}());
new AppTest();
//# sourceMappingURL=test.js.map