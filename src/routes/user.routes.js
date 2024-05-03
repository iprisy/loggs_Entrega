const {Router} = require ('express');
const handlePolicies = require ('../middleware/handle-policies.middleware');
const userModel = require ('../models/user.model');
const router = Router ();
router.get ('/', handlePolicies (['PUBLIC']), async (req, res) => {
  try {
  } catch (error) {}
});
router.get (
  '/:userId',
  handlePolicies (['USER', 'ADMIN']),
  async (req, res) => {
    try {
      const userData = await userModel.findById ({_id: req.params.userId});
      //.populate("notes.note");

      if (!userData) {
        return res.status (404).json ({message: `getUserById empty`});
      }
      return res.json ({message: `getUserById for USER ROLE`, user: userData});
    } catch (error) {
      console.log ('🚀 ~ router.get ~ error:', error);
    }
  }
);
router.post (
  '/:userId/notes/:noteId',
  handlePolicies (['USER', 'ADMIN']),
  async (req, res) => {}
);

//Hacer el update sin actualizar el password

router.delete ('/:userId', handlePolicies (['ADMIN']), async (req, res) => {
  console.log (
    '🚀 ~ file: user.routes.js:36 ~ aqui solo entra el ADMIN',
    req.user
  );
  try {
    const deleteUser = await userModel.deleteOne ({_id: req.params.userId});
    return res.json ({
      message: `deleteUserById with ROLE ADMIN`,
      user: deleteUser,
    });
  } catch (error) {
    console.log (
      '🚀 ~ file: user.routes.js:47 ~ router.delete ~ error:',
      error
    );
  }
});

module.exports = router;
