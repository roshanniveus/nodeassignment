const GCPService = require('../services/gcp.service');

exports.uploadToGCP = async (req, res, next) => {
    try {
        console.log("in gcp controller==", req.file);
        const myFile = req.file

        const upload = await GCPService.uploadToGcpStorage(myFile);

        res.json({
            message: "Upload was successful",
            data: upload
        })
    } catch (error) {
        console.log("err file upload==",error);
        next(error);
    }
}