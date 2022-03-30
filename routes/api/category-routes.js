const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  // be sure to include its associated Products
   
  // GET all categories
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

  // GET one product
    router.get("/:id", async (req, res) => {
      try {
        const categoryInfo = await Category.findByPk(req.params.id, {
          include: [{ model: Product }],
        });
        res.status(200).json(categoryInfo);
  
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
// CREATE
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((Response) => {
    res.json(Response);
  })
  .catch((err) => {
    res.json(err);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Response) => {
      res.json(Response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((Response) => {
      res.json(Response);
    })
    .catch((err) => {
      res.json(err);
    });
  });
})

module.exports = router;
