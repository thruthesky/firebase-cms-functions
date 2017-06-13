import * as admin from "firebase-admin";
const serviceAccount = require("./test-service-key.json");
// Admin Key 초기화. 중요. 앱에서 한번만 초기화 해야 한다.
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-ec3e3.firebaseio.com"
});
const db = app.database();

//import { Post, POST } from './model/post';

import { Forum } from './firebase-cms/src/model/forum/forum';
import { POST } from './firebase-cms/src/model/forum/forum.interface';




class AppTest {

  root;
  forum: Forum;
  constructor() {
    this.root = db.ref('/');
    this.forum = new Forum( this.root );
    this.forum.debugPath = 'a/';
    this.run();
  }

  run() {
    this.createCategory(() => this.createPost() );
    
  }


  /**
   * 
   * Create test categories.
   * 
   * @param callback 
   */
  createCategory( callback ) {
    let count = 0;
    let no = this.testCreateCategory().length;
    for( let c of this.testCreateCategory() ) {
      this.forum.createCategory( c, () => {
        count ++;
        console.log("create category: ", count);
        if ( count >= no ) {
          console.log("All category created: ");
          callback();
        }
      }, e => console.log( e ) );
    }
  }

  createPost() {
    let post: POST = {
      subject: this.testSubject(),
      uid: 'abc'
    };
    this.forum.createPost( this.testPostData(), post => {
      console.log( "Post created: ", post);

      this.forum.setCategoryPostRelation( post.key, post )
        .then(() => {
            // @todo check if success or false.
        });

    }, e => console.error(e) );
  }





  // extras


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
      qna: false,
      noexist: true
    };
  }

  testCreateCategory() {
    return [
      { id: 'movie', name: 'Movie', description: "Let's go to Movie!", owner: 'thruthesky' },
      { id: 'music', name: 'Music', description: "Play music", owner: 'eunsu' },
      { id: 'play', name: 'Play', description: "Play with me", owner: 'thruthesky' },
      { id: 'game', name: 'Game', description: "Lineage game!", owner: 'lineage' }
    ];
  }
}


new AppTest();
