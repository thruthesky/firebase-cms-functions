"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var POST_DATA_PATH = 'forum/post/data';
var CATEGORY_POST_RELATION_PATH = 'forum/category-post-relation';
;
var Post = (function () {
    function Post(o) {
        this.o = o;
        this.root = this.o.root;
    }
    Object.defineProperty(Post.prototype, "postData", {
        get: function () {
            return this.o.root.child(POST_DATA_PATH);
        },
        enumerable: true,
        configurable: true
    });
    Post.prototype.create = function (post, success, error) {
        var ref = this.postData.push();
        console.log("push key: ", ref.key);
        this.setPostData(ref, post, success, error);
    };
    Post.prototype.update = function (post, success, error) {
    };
    Post.prototype.setPostData = function (ref, post, success, error) {
        post.key = ref.key;
        post.stamp = Math.round((new Date()).getTime() / 1000);
        ref.set(post).then(function () { return success(post); }).catch(error);
    };
    Post.prototype.setCategoryPostRelation = function (key, post) {
        console.log(post);
        var categories = Object.keys(post.categories);
        var p;
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var category = categories_1[_i];
            console.log("category test : " + category);
            if (post.categories[category] === true) {
                console.log("writing category: " + category);
                p = this.root.child(CATEGORY_POST_RELATION_PATH).child(category).child(key).set({ uid: post.uid });
            }
        }
        return p;
    };
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.js.map