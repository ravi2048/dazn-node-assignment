const mongoose = require("mongoose");
// const {ObjectId} = require("mongodb")
const Movie = require("../models/movieSchema");

module.exports = {
    getMovies: async (req, res, next) => {
        // sort by latest updated
        const query = Movie.find().sort( { date: -1 });
        query.exec()
        .then( result => {
            console.log(result);
            res.status(200).send(result);
        }).catch( err => {
            res.status(500).send(err);
        })
    },
    addMovie: async (req, res, next) => {
        const movieObj = new Movie( {
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            streamingLink: req.body.streamingLink,
            lastUpdated: req.body.date
        })
        
        movieObj.save()
        .then( (result) => {
            res.status(200).json({ 
                message: 'successfully added movie to database',
                id: movieObj._id,
                title: result.title
            })
        })
        .catch( (err) => {
            // console.log(err);
            res.status(500).json({ message: 'error while adding movie to database'})
        });
    },
    updateMovie: async (req, res, next) => {
        Movie.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            streamingLink: req.body.streamingLink,
        }, {new: true})
        .then( result => {
            if(result) {
                res.status(200).json({
                    message: 'updated successfully', 
                    title: result.title
                })
            } else {
                res.status(200).json({message: 'could not find record to update'})
            }
        })
        .catch( err => res.status(500).json({
            message: 'failed to update item',
            error: err
        }))
    },
    deleteMovie: async (req, res, next) => {
        Movie.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then(result => {
            if(result) {
                res.status(200).json({message: 'deleted successfully', result})
            } else {
                res.status(200).json({message: 'could not find record to delete'})
            }
        })
        .catch( err => res.status(500).json({
            message: 'failed to delete item',
            error: err
        }));
    },
    searchMovie: async (req, res, next) => {
        const searchQuery = {
            title: { $regex: new RegExp(req.query.title, "i") },
            genre: { $elemMatch: { $regex: new RegExp(req.query.genre, "i") } }
        }
        Movie.find(searchQuery)
        .then(result => {
            if(result) {
                res.status(200).json({result})
            } else {
                res.status(200).json({message: 'No result found!'})
            }
        })
        .catch( err => res.status(500).json({
            message: 'failed to search',
            error: err
        }));
    }
}