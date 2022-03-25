const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const categoryInfo = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find all categories
  // be sure to include its associated Products

  router.get("/:id", async (req, res) => {
    try {
     //obtains only a single entry from the table, using the provided primary key.
      const categoryInfo = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      res.status(200).json(categoryInfo);

    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
