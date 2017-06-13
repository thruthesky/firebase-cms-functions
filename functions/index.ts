
import * as functions from 'firebase-functions';

import { Post } from './model/post';

exports.categoryPost = functions.database.ref('/forum/post/data/{pushId}')
    .onWrite( event => {
        console.log("pushId", event.params.pushId);
        console.log("data", event.data.val());
        

        let data = event.data.val();
        let key = event.data.key;
        data['key'] = key;
        

        let post = new Post( { root: event.data.adminRef.root } );

        return post.setCategoryPostRelation( key, data );

    });