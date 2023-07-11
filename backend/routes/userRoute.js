const { getAllUsers, getSingleUser, updateUser, deleteUserAccounts, deleteAccount } = require('../controller/user');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.patch('/', updateUser);
router.delete('/', deleteAccount);
router.delete('/:id', deleteUserAccounts);

module.exports = router