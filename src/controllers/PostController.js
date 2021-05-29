var Post = require('../models/Post');
var sharp = require('sharp');
var path = require('path');
var fs = require('fs');

module.exports = {
    async index(req, res){
        const post = await Post.find().sort('-createdAt');

        return res.json(post);
    },

    async store(req, res){
        const { author, place, description, hashtags} = req.body;
        const { filename: image} = req.file;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        })

        req.io.emit('post', post);

        return res.json(post);
    }
};