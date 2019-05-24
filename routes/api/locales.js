const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Locale = require("../../models/Locale");

// @route GET api/locales
// @desc Get All Locales
// @access Public
router.get("/", (req, res) => {
  Locale.find()
    .sort({ id: 1 })
    .then(locales => res.json(locales));
});

// @route GET api/locales
// @desc Get A Locale
// @access Public
router.get("/:id", (req, res) => {
  Locale.findById(req.params.id)
    .then(location => res.json({ location }))
    .catch(err => res.status(404).json({ msg: "Not found" }))
});

// @route Update api/locales
// @desc Update A Locale
// @access Private
router.post("/:id&:key=:value", auth, (req, res) => {
  var key = {};
  key[req.params.key] = req.params.value;
  Locale.findByIdAndUpdate(
    req.params.id,
    { $set: key},
    {new: true}, // return the updated version of the document
    (err, location) => {
      if (err) return res.status(500).send(err);
    }
  )
    .then(locales => res.json(locales))
    .catch(err => res.status(404).json({ msg: "Not found" }));
});

// @route POST api/items
// @desc Create An Item
// @access Private
router.post("/", auth, (req, res) => {
  const newLocale = new Locale({
    name: req.body.name,
    id: req.body.id
  });

  newLocale.save()
  .then(locale => res.json(locale));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Locale.findById(req.params.id)
    .then(locale => locale.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
