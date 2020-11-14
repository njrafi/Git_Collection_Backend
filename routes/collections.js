const express = require("express");
const router = express.Router();
const collectionsController = require("../controllers/collections");

router.get("", collectionsController.getCollections);
router.post("", collectionsController.postCollection);
router.delete("", collectionsController.deleteCollection);

module.exports = router;
