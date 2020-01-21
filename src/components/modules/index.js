import stitchClient from '../../components/stitch';
const {
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

// export const fetchData = (id) => {
//         const mongodb = stitchClient.getServiceClient(
//             RemoteMongoClient.factory,
//             "mongodb-atlas"
//         );
//         const items = mongodb.db("memorabilia").collection("items");
//         let ObjectId = BSON.ObjectId(id);
//         items.find({"_id": ObjectId}) // Match any document with {} query. Pass the options as the second argument.
//   .toArray()
//   .then(item => console.log(item))
//   .catch(console.error)

// //   let ObjectId = new ObjectId('58c85d1b7932a14c7a0a320d');
// // db.yourCollection.findOne({ _id: ObjectId }, function (err, info) {
// //    console.log(info)
// // });

//         // stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
//         //     items.findOne({ category: this.state._id })
//         // });
//         // console.log(items);
//     }
    // export const fetchData = (id) => {
    //     const mongodb = stitchClient.getServiceClient(
    //                     RemoteMongoClient.factory,
    //                     "mongodb-atlas"
    //                 );
    //     const collection = mongodb.db("memorabilia").collection("items");
      
    //     return collection
    //       .findOne({"_id": id})
    //       .then(doc => {
    //         const asBase64 = doc.binary_data.toBase64();
    //         const asOidString = doc._id.toString();
    //         return { asBase64, asOidString }
    //       }).then(console.log(collection))
    //   }

//     .then(item => console.log(item))
//   .catch(console.error)