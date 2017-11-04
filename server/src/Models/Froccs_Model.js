var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define collection and schema for coordinates
var Froccs = new Schema({
        name: String,
        wine: Number,
        water: Number,
        total_dl: Number,
        other_name: [String],
        uploaded_by: String,
        uploaded_at: {type: Date, default: Date.now}

    },
    {
        collection: 'Froccsok'
    }
);
module.exports = mongoose.model('Froccs', Froccs);