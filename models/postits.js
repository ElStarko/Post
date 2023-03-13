const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        content: { type: String, required: true },
        media: [{ type: String }],
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Post = model('Post', postSchema);

module.exports = Post;



