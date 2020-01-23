const {
  Stitch
} = require('mongodb-stitch-browser-sdk');

const stitchClient = Stitch.initializeDefaultAppClient('kollecting-kiss-qctxo');

export default stitchClient;

// import {
//     Stitch,
//     RemoteMongoClient,
//     BSON
//   } from "mongodb-stitch-browser-sdk";