const mongoose = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  blackListedAt: {
    type: Date,
    default: Date.now,
  },
});

const BlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema);

module.exports = BlacklistModel;
