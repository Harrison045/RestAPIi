const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  accountNumber: {
    type: Number,
    require: true,
  },
  accounts: [
    {
      accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },
    },
  ],
});

const BankModel = mongoose.model("Banks", BankSchema);

module.exports = BankModel;
