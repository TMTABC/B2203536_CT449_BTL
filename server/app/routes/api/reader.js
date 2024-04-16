const express = require("express");
const reader = require("../../controllers/readerController");

const router = express.Router();

router.route("/")
    .get(reader.findAll)
    .post(reader.create)
    .delete(reader.deleteAll);

router.route("/:id")
    .get(reader.findOne)
    .put(reader.update)
    .delete(reader.delete);

router.route("/login")
    .post(reader.login)
module.exports = router;