"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var test_service_key_1 = require("../test-service-key");
var forum_1 = require("../firebase-cms/src/model/forum/forum");
var app = admin.initializeApp({
    credential: admin.credential.cert(test_service_key_1.default),
    databaseURL: "https://test-ec3e3.firebaseio.com"
});
var db = app.database();
exports.helloApi = function (req, res) {
    console.log("Going to send Hello world message.");
    var forum = new forum_1.Forum(db.ref('/'));
    forum.getCategory(req.param('category'))
        .then(function (c) { return res.send(JSON.stringify(c)); });
    console.log("Send");
};
//# sourceMappingURL=index.js.map