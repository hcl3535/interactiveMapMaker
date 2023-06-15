require('dotenv').config()
const fs = require('fs')
const s3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_ICON_BUCKET_NAME
const region = process.env.AWS_ICON_BUCKET_REGION
const accessKeyId = process.env.IAM_ACCESS_KEY
const secretAccessKey = process.env.IAM_SECRET_ACCESS_KEY

const S3 = new s3({
  region,
  accessKeyId,
  secretAccessKey
})

//uploads a file to icon s3

function uploadIconFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return S3.upload(uploadParams).promise()
}
exports.uploadIconFile = uploadIconFile

//deletes a file from icon s3

function deleteIconFile(key) {

  const deleteParams = {
      Bucket: bucketName,
      Key: key
  }
  S3.deleteObject(deleteParams).promise()
}
exports.deleteIconFile = deleteIconFile

const mapBucketName = process.env.AWS_MAP_BUCKET_NAME

function uploadMapFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
      Bucket: mapBucketName,
      Body: fileStream,
      Key: file.filename
  }

  return S3.upload(uploadParams).promise()
}
exports.uploadMapFile = uploadMapFile


