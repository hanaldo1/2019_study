var express = require('express');
var router = express.Router();
var Hero = require('../models/hero');

// hero - Index
router.get("/", function(req, res, next){
    var query = {};
    if(req.query.name) query.name = { $regex: req.query.name, $options: 'i'};

    Hero.find(query)
    .sort({id : 1})
    .exec(function(err, heroes){
        if(err){
            res.status(500);
            res.json({success: false, message: err});
        }
        else{
            res.json({success: true, data: heroes});
        }
    });
});

// hero - Show
router.get("/:id", function(req, res, next){
    Hero.findOne({id : req.params.id})
    .exec(function(err, hero){
        if(err){
            res.status(500);
            res.json({success: false, message: err});
        }
        else if(!hero){
            res.status(500);
            res.json({success: false, message: `no ${req.params.id} hero`});
        }
        else{
            res.json({success: true, data: hero});
        }
    });
});

// hero - Create
router.post("/", 
    function(req, res, next){
        Hero.findOne({})
        .sort({id:-1})
        .exec(function(err, hero){
            if(err){
                res.status(500);
                res.json({success: false, message: err});
            }
            else{
                res.locals.lastId = hero? hero.id: 0;
                next();
            }
        });
    },
    function(req, res, next){
        var newHero = new Hero(req.body);
        newHero.id = res.locals.lastId + 1;
        Hero.create(newHero, function(err, hero){
            if(err){
                res.status(500);
                res.json({success: false, message: err});
            }
            else{
                res.json({success: true, data: hero});
            }
        });
    }
);

// hero - Update
router.put("/:id", function(req, res, next){
    Hero.findOneAndUpdate({id : req.params.id}, req.body, function(err, hero){
        if(err){
            res.status(500);
            res.json({success: false, message: err});
        }
        else{
            res.json({success: true});
        }
    });
});

// hero - Destroy
router.delete("/:id", function(req, res, next){
    Hero.deleteOne({id:req.params.id}, function(err, hero){
        if(err){
            res.status(500);
            res.json({success: false, message: err});
        }
        else{
            res.json({success: true});
        }
    });
});

module.exports = router;