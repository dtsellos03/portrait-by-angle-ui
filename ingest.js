var sharp = require('sharp');

var keys = require('./keyz.js');
var uuid = require('uuid');
var mime = require('mime-types')

var clientConfig = {
    bucketUri: 's3://tropes/results',
    baseRetryWait: 0,
    retryWaitMax: 0
};

var path = require('path');

let sliceValue = 10;

var awsConfig = {
    region: 'us-east-2',
    accessKeyId: keys.service,
    secretAccessKey: keys.secret
};

const bucket = 'face-angle-images';

function makeS3Url(id, type='jpg') {
    return `https://s3.amazonaws.com/${bucket}/${id}.${type}`
}


const typesOfAttrs = {
    lowAge: `AgeRange.Low`,
    highAge: `AgeRange.High`,
    isSmiling: `Smile.Value`,
    eyeGlasses: `Eyeglasses.Value`,
    sunGlasses: `Sunglasses.Value`,
    gender: `Gender.Value`,
    beard: `Beard.Value`,
    mustache: `Mustache.Value`,
    eyesOpen: `EyesOpen.Value`,
    mouthOpen: `MouthOpen.Value`,
    roll: `Pose.Roll`,
    pitch: `Pose.Pitch`,
    yaw: `Pose.Yaw`
};

var _ = require('lodash');
var CSV = require('csv-string');

var athena = require("athena-client");

var fs = require('fs');
var async = require('async');

var AWS = require('aws-sdk');
var rekognition = new AWS.Rekognition(awsConfig);

function getPictureBuffers(directory, cb) {
    let arr = [];
    fs.readdir(directory, (err, files) => {
        files = files.slice(0, 1000);
        files.forEach(file => {
            let buffer = fs.readFileSync(directory+file);
            arr.push({
                buffer,
                name: file
            });
        });
        cb(arr);
    });
}

function mainResize() {
    getPictureBuffers(('./ingest/'), (buffers) => {
        let finalArr = [];
        buffers.forEach((buffer) => {
            sharp(buffer.buffer)
                .resize(450, 450)
                .toFile('./resized/resized-' + buffer.name, (err, info) => { });
        });
    });
}

function main() {
    getPictureBuffers(('./ingest/'), (buffers) => {
        let finalArr = [];
        async.eachOfLimit(buffers, 10, function (value, key, callback) {
            return makeRekognition(value, finalArr, callback);
        }, function (err) {
            if (err) console.error(err.message);
            fs.writeFileSync(`stuff-${sliceValue}.JSON`, JSON.stringify(finalArr));
            console.log('done');
        });
    });
}

mainResize();

function makeRekognition(file, finalArr, cb) {
        var params = {
            Image: {
                Bytes: file.buffer
            },
            Attributes:    ["ALL"]
        };
        try {
            rekognition.detectFaces(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                if (data &&  data.FaceDetails && data.FaceDetails[0] && data.FaceDetails[0].Pose) {
                    let emptyObj = {};
                    let keys = _.values(typesOfAttrs);
                    let emotions = '';
                    _.map(typesOfAttrs, (value, key) => {
                        emptyObj[key] = _.get(data.FaceDetails[0], value);
                    });
                    _.map(_.get(data.FaceDetails[0], 'Emotions'), (emotion) => {
                        if (emotion.Confidence >= 75) {
                            emotions = emotions+'|'+emotion.Type;
                        }
                    });
                    let id = uuid.v4();
                    emptyObj.id = id;
                    emptyObj.url = makeS3Url(id);
                    emptyObj.emotions = emotions;
                    finalArr.push(emptyObj);
                    console.log('done with rekognition', id);
                    var s3 = new AWS.S3(awsConfig);
                    s3.putObject({
                        Bucket: bucket,
                        Key: `${id}.jpg`,
                        ACL:'public-read',
                        Body: file.buffer,
                        ContentType: mime.lookup(file.name)
                    }, function (err) {
                        console.log('all done');
                        cb(null, 5);
                        if (err) { throw err; }

                    });
                } else {
                    cb(null, 5);
                }
        });
        } catch (E) {
        cb(null, 5);
        }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

