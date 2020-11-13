const express = require("express");
const router = express.Router();
const collectionsController = require("../controllers/collections");

router.get("", collectionsController.getCollections);
router.post("", collectionsController.postCollection);

module.exports = router;
