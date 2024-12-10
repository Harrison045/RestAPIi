const BankModel = require("./models");
const AccountModel = require("./account");

const createBankDetails = (req, res) => {
  const { name, branch, location, address, accountNumber } = req.body;

  const banks = new BankModel({
    name,
    branch,
    location,
    address,
    accountNumber,
  });
  banks.save();
  res.json({ message: "banks created successfully", data: banks });
};

const retrieveBankDetails = (req, res) => {
  const { id } = req.params;

  if (id) {
    BankModel.find({ _id: id }).then((banks) => {
      res.json({ message: "Bnk retrieved", data: banks });
    });
  } else {
    BankModel.find().then((banks) => {
      res.json({ message: "All Bank retrieved", data: banks });
    });
  }
};

const updateBankDetails = (req, res) => {
  const { id, name, branch, location, address, accountNumber } = req.body;

  BankModel.findById(id).then((bank) => {
    if (bank) {
      bank.name = name;
      bank.branch = branch;
      bank.location = location;
      bank.address = address;
      bank.accountNumber = accountNumber;

      bank.save();

      res.json({ message: "Bank updated", data: bank });
    }
    res.json({ message: "Could not update bank" });
  });
};

const deleteBankDetails = (req, res) => {
  const { id } = req.body;

  BankModel.findByIdAndDelete(id).then((deleteBanks) => {
    if (deleteBanks) {
      AccountModel.deleteMany({ bankId: deleteBanks._id })
        .then((result) => {
          res.json({ message: "Bank deleted", data: deleteBanks });
        })
        .catch((err) => console.log(err));
    } else {
      res.json({ message: "Bank not found" });
    }
  });
};

//Acount Controllers

const createAccountDetails = (req, res) => {
  const { name, number, accoutType, bankId } = req.body;

  const account = new AccountModel({ name, number, accoutType, bankId });

  account.save().then((result) => {
    if (result) {
      res.json({ message: "Account created successfully", data: account });
    } else {
      res.json({ message: "Failed to create account" });
    }
  });
};

const listAccountDetails = (req, res) => {
  AccountModel.find()
    .populate("bankId", "name location branch -_id")
    .then((accounts) => {
      res.json({ message: "account retrieved", data: accounts });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createBankDetails,
  retrieveBankDetails,
  updateBankDetails,
  deleteBankDetails,
  createAccountDetails,
  listAccountDetails,
};
