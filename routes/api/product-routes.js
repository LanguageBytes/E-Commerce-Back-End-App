const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//GET all products

router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  })
    .then((Response) => {
      res.json(Response);
    })
    .catch((err) => {
      res.json(err);
    });
});

//GET one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }, { model: Tag }],
  })
    .then((Response) => {
      res.json(Response);
    })
    .catch((err) => {
      res.json(err);
    });
});

//CREATE
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      
      if (req.body.tagIds.length) {
        const productTagInfo = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagInfo);
      }
      res.status(200).json(product);
    })

    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


//UPDATE
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const RemovePreviousTag = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      return Promise.all([
        ProductTag.destroy({ where: { id: RemovePreviousTag } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })


    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
  Product.destroy({
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
