const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: "niveustraining",
    keyFilename: '/home/niveus/Desktop/node-training/assignment/niveustraining-231707681007.json',
});

const bucket = storage.bucket('roshan-assignment');
const bucketFolder = 'nodeUpload';

class GCPService {

    static async uploadToGcpStorage(file) {
        return new Promise((resolve, reject) => {
            const { originalname, buffer } = file

            const blob = bucket.file(originalname.replace(/ /g, "_"))
            const blobStream = blob.createWriteStream({
                resumable: false
            })
            blobStream.on('finish', () => {
                const publicUrl = format(
                    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                )
                resolve(publicUrl)
            })
                .on('error', (err) => {
                    console.log(err)
                    reject(`Unable to upload image, something went wrong`)
                })
                .end(buffer)
        })
    }

}

module.exports = GCPService;