var express = require('express');
var app = express();
var froccsRouter = express.Router();

var Froccs = require('../Models/Froccs_Model');
var User = require('../Models/User');
//POST
froccsRouter.route('/add/post').post(
    function (req, res) {
        console.log(req.body);

        //megvan a db-be
        //TODO egyezes eseten ujragondolni   

        Froccs.find({wine:req.body.wine,water:req.body.water,total_dl:req.body.total_dl}).then((check)=> {

            console.log("matched: \n"+check);

            if(check.length == 0){

                var froccs = new Froccs();
                froccs.name= req.body.name;
                froccs.wine= req.body.wine;
                froccs.water= req.body.water;
                froccs.total_dl= req.body.total_dl;
                froccs.uploaded_by= req.body.email;
                froccs.uploaded_at= Date.now();
                
                
                froccs.save().then(froccs => {
                    console.log("added");
                    res.json('froccs added successfully');
                })
                .catch(err => {
                        console.log(err);
                    res.status(400).send('Unable to save to DB');
                });
            }else{
                                                              
                Froccs.update({_id:check[0]._id},{$push:{other_name:req.body.name}},
                    function(err){
                        if(err){ 
                            console.log(err);
                            res.status(400).send('Unable to save to DB');
                        }else{
                            console.log("new name added");
                            res.json('new name added successfully');
                        }
                })
                
            }

        })

    }
);


//GET
froccsRouter.route('/').get(
    function (req, res) {
        Froccs.find(
            function (err, froccsok) {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.json(froccsok);
                }
            }
        );
    }
);
/*EDIT es UPDATE nem is kell*/
//EDIT
froccsRouter.route('/edit/:id').get(function (req,res) {
    var id = req.params.id;
    Froccs.findById(id, function (err, froccs) {
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(froccs);
        }
    })
});
//UPDATE
froccsRouter.route('/update/:id').post(
    function (req, res) {
        Froccs.findById(req.params.id, function (err, froccs) {
            if(err)
            {
                res.json(err);
            }
            if(!froccs)
            {
                return next(new Error("Could not load froccs"));
            }
            else
            {
                //do update
                //if logged in
                froccs.name= req.body.name;
                froccs.wine = req.body.wine;
                froccs.water = req.body.water;
                froccs.total_dl = req.body.total_dl;
                froccs.other_name = req.body.other_name;
                froccs.uploaded_at = Date.now();

                froccs.save().then(froccs =>{
                    res.json('Update complete');
            })
            .catch( err => {
                res.status(400).send("Unable to update");
            });
            }
        });
    }
);
//DELETE
froccsRouter.route('/delete/:id').get(function (req, res) {
    Froccs.findByIdAndRemove({_id: req.params.id},
        function (err, froccs) {
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json('Removed');
            }
        });
});

module.exports = froccsRouter;