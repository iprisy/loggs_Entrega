const {Router} = require ('express');
const handlePolicies = require ('../middleware/handle-policies.middleware');
const productModel = require ('../models/product.model');
const productCtrl=require('../controller/product.controller')
const router = Router ();
router.get ('/', handlePolicies (['PUBLIC']), async (req, res) => {
  try {
  } catch (error) {}
});
router.get (
  '/:productId',
  handlePolicies (['user', 'ADMIN']),
  async (req, res) => {
    try {
      const productData = await productModel.findById ({_id: req.params.productId});
      //.populate("notes.note");

      if (!productData) {
        return res.status (404).json ({message: `getproductById empty`});
      }
      return res.json ({message: `getproductById for product ROLE`, product: productData});
    } catch (error) {
      console.log ('🚀 ~ router.get ~ error:', error);
    }
  }
);
router.post (
  '/', productCtrl.createProduct(), async (req, res) => {}
);

//Hacer el update sin actualizar el password

router.delete ('/:productId', handlePolicies (['ADMIN']), async (req, res) => {
  console.log (
    '🚀 ~ file: product.routes.js:36 ~ aqui solo entra el ADMIN',
    req.product
  );
  try {
    const deleteproduct = await productModel.deleteOne ({_id: req.params.productId});
    return res.json ({
      message: `deleteproductById with ROLE ADMIN`,
      product: deleteproduct,
    });
  } catch (error) {
    console.log (
      '🚀 ~ file: product.routes.js:47 ~ router.delete ~ error:',
      error
    );
  }
});

module.exports = router;
