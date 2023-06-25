const { Thought, User, Reaction } = require('../models');

module.exports = {
    async getThoughts(req, res){
        try {
            const data = await Thought.find(); // finds all thoughts
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async getSingleThought(req, res){
        try {
            const data = await Thought.findOne({ _id: req.params.thoughtId }); // finds a single thought by id
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async createThought(req, res){
        try {
            const data = await Thought.create({ // creates a new thought
                thoughtText: req.body.thoughtText,
                username: req.body.username,
                userId: req.body.userId,
            });

            const user = await User.findOneAndUpdate( // adds the thought to the user's thoughts array field
                { _id: req.body.userId },
                { $addToSet: { thoughts: data.id } },
                { new: true }
            )

            if(!user || !data){
                res.status(404).json({ message: 'No user or thought found with that id!' });
                return;
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },

    async updateThought(req, res){
        try {
            const data = await Thought.findOneAndUpdate( // updates a thought by id
                { _id: req.params.thoughtId },
                {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username,
                    userId: req.body.userId,
                },
            );
            if (!data) {
                res.status(404).json({ message: 'No thought found with that id!' });
                return;
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async deleteThought(req, res){
        try {
            const data = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }); // deletes a thought by id
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async addReaction(req, res){
        try {   
            const data = await Reaction.create(req.body); // creates a reaction
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: data._id } },
                { new: true }
            );
            if (!data || !thought) {
                res.status(404).json({ message: 'No thought found with that id!' });
                return;
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async removeReaction(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId }); // removes a reaction
          if (!thought) {
            res.status(404).json({ message: 'No thought found with that id!' });
            return;
          }
      
          thought.reactions.pull(req.params.reactionId);
          await thought.save();
      
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
          console.log(err);
        }
      }
};