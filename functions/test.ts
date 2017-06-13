import * as admin from "firebase-admin";
const serviceAccount = require("./test-service-key.json");
// Admin Key 초기화. 중요. 앱에서 한번만 초기화 해야 한다.
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-ec3e3.firebaseio.com"
});
const db = app.database();

import { Post, POST } from './model/post';



class AppTest {

  root;
  post: Post;
  constructor() {

    this.root = db.ref();

    this.post = new Post( { root: this.root } );
    this.run();

  }


  run() {
    this.createPost();
  }


  createPost() {
    let post: POST = {
      subject: this.testSubject(),
      uid: 'abc'
    };
    this.post.create( this.testPostData(), post => {
      console.log( "Post created: ", post);

      this.post.setCategoryPostRelation( post.key, post );


    }, e => console.error(e) );
  }



  testPostData() : POST {
    return {
      uid: this.testUid(),
      subject: this.testSubject(),
      content: this.testContent(),
      categories: this.testCategories()
    };
  }
  testSubject() : string {
    let d = new Date();
    return 'SUBJECT: ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  testContent() : string {let d = new Date();
    return 'TEST CONTENT' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  testUid() : string {
    return '0PNzxFcsyiQ4LqOXPLtYbgFtgTw1';
  }

  testCategories() {
    return {
      movie: true,
      music: true,
      qna: false
    };
  }
}


new AppTest();
