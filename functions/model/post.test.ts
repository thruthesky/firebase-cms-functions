
class PostTest {
  constructor() {
  }
  run() {
        let o = {
            uid: 'abc'
        };
        o['root'] = db.ref('/');
        let post: POST = {
            subject: 'hi from node !!'
        };
        new Post(o).create( post, (post) => {
            console.log();
        }, e => {
            console.error(e);
        } );
  }
}

