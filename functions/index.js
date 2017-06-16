"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
var forum_1 = require("./firebase-cms/src/model/forum/forum");
exports.categoryPost = functions.database.ref('/forum/post/data/{pushId}')
    .onWrite(function (event) {
    console.log("pushId", event.params.pushId);
    console.log("data", event.data.val());
    var data = event.data.val();
    var key = event.data.key;
    data['key'] = key;
    var post = new forum_1.Forum(event.data.adminRef.root);
    return post.setCategoryPostRelation(key, data);
});
//# sourceMappingURL=index.js.map