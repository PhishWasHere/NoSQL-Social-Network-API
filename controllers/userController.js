const { User, Thought} = require('../models');

module.exports = {
    async getUsers (req, res){
        try {
            const data = await User.find(); // finds all users
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async getSingleUser(req, res){
        try {
            const data = await User.findOne({ _id: req.params.userId }); // finds a single user by id
            
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
            const data = await User.findOneAndUpdate( // updates a user by id
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

    async deleteUser(req, res) {
        try {
          const data = req.params.userId; // finds a single user by id

          const user = await User.findOne({ _id: data }).populate('thoughts'); // finds a single user by id and populates their thoughts
      
          if (!user) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
          }
      
          const thoughts = user.thoughts; // gets the user's thoughts
      
 
          await Thought.deleteMany({ _id: { $in: thoughts.map((thought) => thought._id) } }); // deletes all the user's thoughts
      

          await User.deleteOne({ _id: data }); // deletes the user
      
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
          console.log(err);
        }
    },

    async addFriend(req, res){
        try {
            const data = await User.findOneAndUpdate( // updates a user by id and adds a friend
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
            const data = await User.findOneAndUpdate( // updates a user by id and removes a friend
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