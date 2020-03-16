const express = require("express");

const Account = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  Account.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errroMessage: "Failed to retrieve data" });
    });
});

router.get("/:id", (req, res) => {
  Account("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Account Not Found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errroMessage: "Failed to get Account"
      });
    });
});

router.post("/", (req, res) => {
  Account("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ response: ids });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errroMessage: "Failed to save Account"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Account("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: "account saved successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Failed to update Account"
      });
    });
});

router.delete("/:id", (req, res) => {
  Account("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: "Account Deleted successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errroMessage: "Failed to delete Account"
      });
    });
});

module.exports = router;
