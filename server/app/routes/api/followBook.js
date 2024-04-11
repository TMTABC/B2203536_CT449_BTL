const express = require("express");
const followBook = require("../../controllers/followBooksController");

const router = express.Router();

router.route("/")
    .get(followBook.findAll)
    .post(followBook.create)
    .delete(followBook.deleteAll);

router.route("/:id")
    .get(followBook.findOne)
    //.put(followBook.update)
    .delete(followBook.delete)
    .put(followBook.giveBookBack);

module.exports = router;