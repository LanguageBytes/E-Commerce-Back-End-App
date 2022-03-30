const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all
  router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(TagInfo => res.json(TagInfo))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET One
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((Response) => {
      res.json(Response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((Response) => {
    res.json(Response);
  })
  .catch((err) => {
    res.json(err);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
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
  // delete on tag by its `id` value
  Tag.destroy({
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
module.exports = router;
