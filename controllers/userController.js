const router = require('express').Router();
const { User } = require('.././models');

exports.getUsers = (async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

exports.getSingleUser = (async (req, res) => {
    try {
        const data = await User.find({ _id: req.params.userId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

exports.createUser = (async (req, res) => {
    try {
        const data = await User.create({
            username: req.body.username,
            email: req.body.email,
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

exports.updateUser = (async (req, res) => {
    try {
        const data = await User.update(
            {
                username: req.body.username,
                email: req.body.email,
            },
            {
                where: {
                    _id: req.params.userId,
                },
            }
        );
        if (!data) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

exports.deleteUser = (async (req, res) => {
    try {
        const data = await User.destroy({
            where: {
                _id: req.params.userId,
            },
        });
        if (!data) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});