const { User, Thought} = require('../models');

module.exports = {
    async getUsers (req, res){
        try {
            const data = await User.find();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async getSingleUser(req, res){
        try {
            const data = await User.findOneAndUpdate({ _id: req.params.userId });
            
            if(!data){
                res.status(404).json({ message: 'No user found with that id!' });
                return;
            }

            res.status(200).json({data});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async createUser(req, res){
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
    },

    async updateUser(req, res){
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    username: req.body.username,
                    email: req.body.email,
                },
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
    },

    async deleteUser(req, res){
        try {
            const data = await User.findOneAndDelete({
                _id: req.params.userId,
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
    },

    async addFriend(req, res){
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
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
    },

    async removeFriend(req, res){
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
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
    }
};