const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes.js");
const dashRoutes = require("./dashRoutes.js");
router.use((req, res) => {
    res.status(404).end();
});
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
module.exports = router;
