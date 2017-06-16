import * as functions from 'firebase-functions';

import { Forum } from './firebase-cms/src/model/forum/forum';


exports.categoryPost = functions.database.ref('/forum/post/data/{pushId}')
    .onWrite(event => {
        console.log("pushId", event.params.pushId);
        console.log("data", event.data.val());


        let data = event.data.val();
        let key = event.data.key;
        data['key'] = key;

        let post = new Forum(event.data.adminRef.root);

        return post.setCategoryPostRelation(key, data);

    });
