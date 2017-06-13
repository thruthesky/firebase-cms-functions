import * as firebase from 'firebase/app';

//const POST_META_PATH = 'forum/post/meta';
const POST_DATA_PATH = 'forum/post/data';
//const POST_CONTENT_PATH = 'forum/post/content';
const CATEGORY_POST_RELATION_PATH = 'forum/category-post-relation';
//const POST_LIKE_PATH = 'forum/post/likes';
//const POST_DISLIKE_PATH = 'forum/post/dislikes';
export interface POST {
    key?: string;
    uid?: string;
    subject?: string;
    content?: string;
    categories?: { [ v:string ]: boolean };
    stamp?: number;
    sticky_forum?: boolean;
    sticky_all_forum?: boolean;
};


export class Post {

    o;
    root: firebase.database.Reference;

    constructor( o ) {
        this.o = o;
        this.root = this.o.root;
    }

    get postData() : firebase.database.Reference {
        return this.o.root.child( POST_DATA_PATH );
    }
    
    create( post: POST, success: (post:POST) => void, error: (e) => void ) {

        let ref = this.postData.push();
        console.log("push key: ", ref.key );
        this.setPostData( ref, post, success, error );

    }

    update( post: POST, success: (post:POST) => void, error: (e) => void ) {
        
        // this.setPostMeta( ref, data, success, error );
    }

    setPostData( ref: firebase.database.ThenableReference, post: POST, success: (post:POST) => void, error: (e) => void ) {
        post.key = ref.key;
        post.stamp = Math.round( (new Date()).getTime() / 1000 );
        ref.set( post ).then( () => success( post ) ).catch( error );
    }



    /**
     * 
     * @param key - is the post push key.
     * @param post 
     */
    setCategoryPostRelation( key: string, post: POST ) {

        // @todo error handling
        // what is no categories?
        console.log(post);
        let categories = Object.keys( post.categories );
        let p;
        for ( let category of categories ) {
            console.log(`category test : ${category}`);
            if ( post.categories[ category ] === true ) {
                console.log(`writing category: ${category}`);
                p = this.root.child(CATEGORY_POST_RELATION_PATH).child( category ).child( key).set( { uid: post.uid } );
            }
        }

        // @todo big problem here. return proper promise.
        return p;

    }


    

}