const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  bankId: {
    type: Schema.Types.ObjectId,
    ref: "Banks",
    required: true,
  },
});

const AccountModel = mongoose.model("Account", AccountSchema)

module.exports = AccountModel;
