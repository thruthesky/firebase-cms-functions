"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("./test-service-key.json");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-ec3e3.firebaseio.com"
});
var db = app.database();
var TestSpec = (function () {
    function TestSpec() {
        this.msg = "Hello test";
    }
    TestSpec.prototype.run = function () {
        var _this = this;
        describe("A", function () {
            it("B", function () {
                var ref = db.ref('/m').push();
                ref.set({ msg: _this.msg });
                ref.once('value').then(function (snap) {
                    var v = snap.val();
                    expect(v['msg']).toBe(_this.msg);
                });
            });
        });
    };
    return TestSpec;
}());
var t = new TestSpec();
t.run();
//# sourceMappingURL=test.spec.js.map