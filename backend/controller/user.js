const asyncHandler = require('express-async-handler');
const User = require('../model/user');

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (!users) return res.status(404).json({ message: "No user found" })

    res.status(200).json(users);
})

const getSingleUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "No user found" });

    res.status(200).json(user);
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { email: newEmail, name: newName, role: newRole } = req.body;

    const roleList = ['buyer', 'seller'];

    if (!roleList.includes(newRole.toLowerCase())) return res.status(400).json({ message: "Invalid Role" });

    const isEmailExist = await User.findOne({ email: newEmail });
    if (isEmailExist) return res.status(400).json({ message: "The email was already taken" });

    const result = await User.updateOne({ _id: userId }, {
        $set: {
            email: newEmail || email,
            name: newName || name,
            role: newRole || role
        }
    })

    if (result.modifiedCount < 1) return res.status(400).json({ message: "Something went wrong" });

    res.status(200).json({ message: "Updated successfully" });
})

const deleteAccount = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount < 1) return res.status(200).json({ message: "No user deleted" });

    res.status(200).json({ message: "deleted successfully" });
})

const deleteUserAccounts = asyncHandler(async (req, res) => {
    const { role } = req.user;
    const { id: userToBeDeletedId } = req.params;

    if (role !== 'admin') return res.sendStatus(401);

    const result = await User.deleteOne({ _id: userToBeDeletedId });

    if (result.deletedCount < 1) return res.status(200).json({ message: "No user deleted" });

    res.status(200).json({ message: "deleted successfully" });
})

module.exports = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteAccount,
    deleteUserAccounts
}