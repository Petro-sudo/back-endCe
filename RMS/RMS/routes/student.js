const express =require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');

//register student 

router.post('/reg', function(req, res){  

    var post = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password,
        "campus_loc": req.body.campus_loc,
        "studno": req.body.studno,
        "id_no": req.body.id_no,
        "cell_no": req.body.cell_no
    };


    var email = req.body.email;ih
    var myQuery1 = "SELECT * FROM student WHERE email = ?";
    db.query(myQuery1,[email],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO student SET ?";
                db.query(myQuery, [post], function(err, results){
                    if(err){
                        
                        res.send({
                            data : err,
                            code : 400,
                            message : "The was an error !!!"
                        });
                            
                    }else{
                        
                        console.log("results")
                        res.send({
                            data : results,
                            code : 200,
                            message : "Registered Successfully..."
            
                        })
                    }
            })
        }
        
    })
});

//Get all student
router.get('/getstud/',(req,res)=>{
    db.query('SELECT * FROM student',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});



//Get all tenant
router.get('/gettenant/',(req,res)=>{
    db.query('SELECT * FROM tenant',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


router.get('/stud/',(req,res)=>{
    db.query('SELECT * FROM student',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


// router.get('/pendingprop/',(req,res)=>{
//     var status="pending";
//     db.query('SELECT * FROM property where status="pending"',(err,rows,fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
    
// });

// router.get('/acceptedprop/',(req,res)=>{
//     var status="pending";
//     db.query('SELECT * FROM property where status="accepted"',(err,rows,fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
    
// })









//accepted properties
router.get('/acceptedprop/',(req,res)=>{
    var status="pending";
    db.query('SELECT landlord.full_name,property.landlord_email ,landlord.telephone,landlord.house_number,landlord.street_name,landlord.suburb,landlord.city,landlord.zip_code,landlord.province,landlord.country,landlord.property_name,property.num_rooms,property.numFemale_beds,property.numMale_beds,property.bedsPerRoom,property.campus,property.blocks,property.date_apply,property.status,property.occupied_rooms FROM landlord,property WHERE  landlord.landlord_email=property.landlord_email and  property.status="accepted"',(err,rows,fields)=>{
    
 
  
  
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})






//pending properties
router.get('/pendingprop/',(req,res)=>{
    var status="pending";
    db.query('SELECT landlord.full_name,property.landlord_email ,landlord.telephone,landlord.house_number,landlord.street_name,landlord.suburb,landlord.city,landlord.zip_code,landlord.province,landlord.country,landlord.property_name,property.num_rooms,property.numFemale_beds,property.numMale_beds,property.bedsPerRoom,property.campus,property.blocks,property.date_apply,property.status,property.occupied_rooms FROM landlord,property WHERE  landlord.landlord_email=property.landlord_email and  property.status="pending"',(err,rows,fields)=>{
    
 
  
  
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})







router.get('/male/',(req,res)=>{
    var status="pending";
    db.query('SELECT gender FROM student where gender="male"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})



router.get('/female/',(req,res)=>{
    var status="pending";
    db.query('SELECT gender FROM student where gender="female"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})





router.get('/dis/',(req,res)=>{
    var status="pending";
    db.query('SELECT disability FROM student where disability="1"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})

router.get('/notdis/',(req,res)=>{
    var status="pending";
    db.query('SELECT COUNT(disability)FROM student where disability="0"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})











//Get a student
router.get('/getstud/:student_no',(req,res)=>{
    db.query('SELECT * FROM student WHERE student_no = ?',[req.params.student_no],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete a student
router.delete('/delstud/:id',(req,res)=>{
    db.query('DELETE FROM student ',(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    }) 
});

//delete property
router.delete('/dlt/:landlord_email',(req,res)=>{
    db.query('DELETE FROM landlord WHERE landlord_email= ?',[req.params.landlord_email],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully ');
        else
            console.log(err);
    }) 
});

//accept landlord application
router.post('/acceptapp/:landlord_email',(req,res)=>{
    db.query('UPDATE property set status="accepted" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application accepted ');
        else
            console.log(err);
    }) 
});



//accept landlord application
router.post('/rejectapp/:landlord_email',(req,res)=>{
    db.query('UPDATE property set status="rejected" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application rejected ');
        else
            console.log(err);
    }) 
});





//update landlord information
router.post('/info/:landlord_email',(req,res)=>{
    db.query('UPDATE property set campus="rejected" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application rejected ');
        else
            console.log(err);
    }) 
});



//decline landlord application
// router.update('/declineapp/:landlord_email',(req,res)=>{
//     db.query('UPDATE property set status="rejected" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows,fields)=>{
//         if(!err)
//             res.send('application rejected');
//         else
//             console.log(err);
//     }) 
// })
/////////////////////////////////////////////////////////////////////////////////////////////



router.get('/getResStatus',(req,res)=>{
    db.query('SELECT * FROM resapplication',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


///////////////////////////////////////////////////////////////////////////////////////////
 
// router.post('/', (ctx) => {
//     const data = ctx.request.body;
//     const errors = {};
	
// 	if (!String(data.name).trim()) {
// 	errors.name = ['Name is required'];
//  	}
	
//  	if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(data.email))) {
//  		errors.email = ['Email is not valid.'];
// 	}
	
//  	if (Object.keys(errors).length) {
//  		return ctx.error(400, {errors});
// 	}
	
//  	const user = await User.create({
//  			name: data.name,
// 		email: data.email,
//  	});
	
//  	ctx.body = user.toJSON();
//  });
 module.exports = router ;