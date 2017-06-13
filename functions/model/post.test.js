var PostTest = (function () {
    function PostTest() {
    }
    PostTest.prototype.run = function () {
        var o = {
            uid: 'abc'
        };
        o['root'] = db.ref('/');
        var post = {
            subject: 'hi from node !!'
        };
        new Post(o).create(post, function (post) {
            console.log();
        }, function (e) {
            console.error(e);
        });
    };
    return PostTest;
}());
//# sourceMappingURL=post.test.js.map