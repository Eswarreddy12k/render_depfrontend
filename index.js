const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express(); // create express app
const mongoose = require('./config/mongoose');
const Dummylogin=require('./model/Dummylogin')
const Visitorpass=require('./model/Visitorpass')
const Announcements=require('./model/Announcements')
const Worka=require('./model/Worka')
const UserDB=require('./model/UserDB')
const CommunityADMINS=require('./model/CommunityADMINS')
const Notifications=require('./model/Notifications')
const Emergencyc=require('./model/Emergencyc')
const multer  = require('multer')
const Complaint=require('./model/Complaint')
const ManagingStaff=require('./model/ManagingStaff')
const Servicer=require('./model/Servicer')
const Uploaddoc=require('./model/Uploaddoc')
const Bills=require('./model/Bills')
const jwt=require('jsonwebtoken');

const jsonParser = bodyParser.json();
app.use(jsonParser);


// add middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+'.jpg')
  }
});
const upload = multer({storage:storage})

const storagex = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+'.pdf')
  }
});
const upload1 = multer({storage:storagex})

app.get('/uploads/images/:img_id',(req,res)=>{
  res.sendFile('C:/Users/eswar/CMS/view/cms/server/uploads/'+req.params.img_id)
})

app.get('/logindb/:id',(req,res)=>{
  Dummylogin.find({id:req.params.id},(err,s)=>{
    
    res.send(s)
  })
})

app.get('/getuserbills/:u_id',(req,res)=>{
  UserDB.find({userx_id:req.params.u_id},(err,ss)=>{
    Bills.find({billsx_user:ss[0].userx_name},(err1,ss1)=>{
      res.send(ss1)
    })
  })
})
app.get('/getmanaging/:u_id',(req,res)=>{
  UserDB.find({userx_id:req.params.u_id},(err,ss)=>{
    CommunityADMINS.find({communityx_name:ss[0].userx_community},(err1,ss1)=>{
      ManagingStaff.find({managex_comm:ss1[0].communityx_admin_id},(err2,ss2)=>{
        res.send(ss2)
      })
    }) 
})
})




app.get('/visitorsdb/:id',(req,res)=>{
  Visitorpass.find({owner_id:req.params.id},(err,s)=>{
    res.send(s)
  })
})

app.get('/anndb/:c_id',(req,res)=>{

  UserDB.find({userx_id:req.params.c_id},(err,ss)=>{
      CommunityADMINS.find({communityx_name:ss[0].userx_community},(err1,ss1)=>{
        Announcements.find({ann_community:ss1[0].communityx_admin_id},(err2,ss2)=>{
          res.send(ss2)
        })
      }) 
  })
})
app.get('/Dummylogins',(req,res)=>{
  Dummylogin.find({},(err,s)=>{
    res.send(s)
  })
})
isloggedin=false
app.get('/isloggedin',(req,res)=>{
    res.send(isloggedin)
})

app.get('/getresidents/:resident_id',(req,res)=>{
  UserDB.find({userx_id:req.params.resident_id},(err,s)=>{
    UserDB.find({userx_floor:s[0].userx_floor},(err1,s1)=>{
        res.send(s1)
    })
  })
})
app.get('/getdocuments/pdf/:c_id',(req,res)=>{
  
    Uploaddoc.find({documentx_user:req.params.c_id},(err1,s1)=>{
        res.send(s1)
    })
})
app.post('/addcomplaint/:u_id/:complaintx_comm',upload.single('complaintx_img'),(req,res)=>{
  console.log('complaint add')
  const complaintx=new Complaint({
    complaintx_user:req.params.u_id,
    complaintx_category:req.body.complaintx_category,
    complaintx_subcategory:req.body.complaintx_subcategory,
    complaintx_desc:req.body.complaintx_desc,
    complaintx_img:req.file.filename,
    complaintx_comm:req.params.complaintx_comm
  })
  complaintx.save();
  res.redirect('/Community')
})

app.post('/uploaddoc/:u_id',upload1.single('documentx_pdf'),(req,res)=>{
  
  const docx=new Uploaddoc({
    documentx_user:req.params.u_id,
    documentx_name:req.body.documentx_name,
    documentx_desc:req.body.documentx_desc,
    documentx_pdf:req.file.filename
  })
  docx.save();
  res.redirect('/Community')
})
app.get('/getviss',(req,res)=>{
  Visitorpass.find({},(err,ss)=>{
    res.send(ss)
  })
})

app.post('/addsrequest/:u_id/:ids',(req,res)=>{
  
  const servicex=new Servicer({
    servicex_user:req.params.u_id,
    servicex_category:req.body.servicex_category,
    servicex_subcategory:req.body.servicex_subcategory,
    servicex_desc:req.body.servicex_desc,
    servicex_comm:req.params.ids
    
  })
  servicex.save();
  res.redirect('/Community')
})
app.post('/homes',jsonParser,(req,res)=>{
  const usernamej=req.body.id
    const userj={name:usernamej}
    const accesstoken=jwt.sign(userj,"abc123")
    
  
  if(req.body.id==="admin" && req.body.p=="admin"){
    res.send({auth:true,token:accesstoken,username:usernamej,type:"admin"})
  }
  else if(req.body.id==="security" && req.body.p=="security"){
    res.send({auth:true,token:accesstoken,username:usernamej,type:"security"})
  }
  else{
  UserDB.find({userx_id:req.body.id},(err,s)=>{
    
    
    try{
      
        
          ManagingStaff.find({managex_id:req.body.id},(err1x,s1x)=>{
            try{
              if(s1x[0].managex_password==req.body.p){
                res.send({auth:true,token:accesstoken,username:usernamej,type:"manager"})
              }
            }
            catch
        {CommunityADMINS.find({communityx_admin_id:req.body.id},(err1,s1)=>{
          try{
          if(s1[0].communityx_admin_id==req.body.id && s1[0].communityx_admin_password==req.body.p){
            res.send({auth:true,token:accesstoken,username:usernamej,type:"cadmin"})
            }}
            catch{
              try{
                if(req.body.id=='work'){
                  isloggedin=req.body.id
                  console.log(isloggedin)
                  res.send({auth:false})
                  
                }
                else if(s[0].userx_id==req.body.id && s[0].userx_password==req.body.p){
                  isloggedin=req.body.id
                  console.log('userlogged'+req.body.id)

                  res.send({auth:true,token:accesstoken,username:usernamej,type:"user"})
                }
              }
              catch{
                res.redirect('/')
              }
              
            }
            
        })}
          })
        
        
        

      

      
      
      
      
    }
    catch{
      res.redirect('/')
    }
    
    
    
  })}
})

function authverify(req,res,next){
    const tokenx=req.headers["xaccesstoken"]
    if(!tokenx){
      res.json({auth:false})
    }
    else{
      jwt.verify(tokenx,"abc123",(err,dec)=>{
        if(err){
          res.json({auth:false})
        }
        else{
          res.json({auth:true,userid:dec.name})
        }
      })
    }
}
app.get('/gethome',jsonParser,authverify,(req,res)=>{
  
})
app.get('/getseru',(req,res)=>{
  CommunityADMINS.find({},(err,ss)=>{
    res.send(ss)
  })
})
app.post('/postvisitor/:o_id',(req,res)=>{
  console.log(req.body.visitor_name)
  const visitor=new Visitorpass({
    visitor_name:req.body.visitor_name,
    visitor_reason:req.body.visitor_reason,
    visitor_mobile:req.body.visitor_mobile,
    visitor_date:req.body.visitor_date,
    owner_id:req.params.o_id
  })
  visitor.save()
  console.log('success')
  res.redirect('/home/'+req.params.o_id)

})
app.get('/getuserscadmin/:ca_id',(req,res)=>{
  CommunityADMINS.find({communityx_admin_id:req.params.ca_id},(err,ss)=>{
    UserDB.find({userx_community:ss[0].communityx_name},(err2,ss2)=>{
      res.send(ss2)
    })
  })
})
app.get('/getmanagecadmin/:ca_id',(req,res)=>{
  ManagingStaff.find({managex_comm:req.params.ca_id},(err,ss)=>{
    res.send(ss)
  })
})
app.get('/getuserbyid/:u_id',(req,res)=>{
  UserDB.findById({_id:req.params.u_id},(err,ss)=>{
    res.send(ss)
  })
})
app.post('/updateuserx/:uid/:a_id',(req,res)=>{
  const updateduser={
    userx_name:req.body.userx_name,
    userx_id:req.body.userx_id,
    userx_mobile:req.body.userx_mobile,
    userx_community:req.body.userx_community,
    userx_floor:req.body.userx_floor,
    userx_door_no:req.body.userx_door_no
}
  UserDB.findByIdAndUpdate({_id:req.params.uid},updateduser,(err,ss)=>{
    res.redirect('/admin/'+req.params.a_id)
  })
})
app.get('/delete/:dbname/:idm/:c_id',(req,res)=>{
  if(req.params.dbname=="UserDB"){
    UserDB.findByIdAndDelete({_id:req.params.idm},(err,ss)=>{
      res.redirect('/admin/'+req.params.c_id)
    })
  }
  if(req.params.dbname==="Manage"){
    ManagingStaff.findByIdAndDelete({_id:req.params.idm},(err,ss)=>{
      res.redirect('/admin/'+req.params.c_id)
    })
  }
})

app.get('/userdet/:userid',(req,res)=>{
  UserDB.find({userx_id:req.params.userid},(err,ss)=>{
    res.send(ss)
  })
})
app.get('/getusers/:manage_id',(req,res)=>{
  ManagingStaff.find({managex_id:req.params.manage_id},(err,ss)=>{
      CommunityADMINS.find({communityx_admin_id:ss[0].managex_comm},(err2,ss2)=>{
        UserDB.find({userx_community:ss2[0].communityx_name},(err3,ss3)=>{
          res.send(ss3)
        })
      })
  })
})


app.get('/getcomplaint/:manage_id',(req,res)=>{
  
  
    ManagingStaff.find({managex_id:req.params.manage_id},(err,ss)=>{
      CommunityADMINS.find({communityx_admin_id:ss[0].managex_comm},(err2,ss2)=>{
        Complaint.find({complaintx_comm:ss2[0].communityx_name},(err3,ss3)=>{
          res.send(ss3) 
          
      })
  })
  
  
  
})})

app.get('/getservice/:manage_id',(req,res)=>{
  
  
  ManagingStaff.find({managex_id:req.params.manage_id},(err,ss)=>{
    CommunityADMINS.find({communityx_admin_id:ss[0].managex_comm},(err2,ss2)=>{
      Servicer.find({servicex_comm:ss2[0].communityx_name},(err3,ss3)=>{
        res.send(ss3) 
        
    })
})



})})

app.post('/postbills/:m_id',(req,res)=>{
  const billx=new Bills({
    billsx_user:req.body.billsx_user,
    billsx_rent:req.body.billsx_rent,
    billsx_amenity:req.body.billsx_amenity,
    billsx_others:req.body.billsx_others,
    billsx_electricity:req.body.billsx_electricity,
    billsx_water:req.body.billsx_water,
    billsx_gas:req.body.billsx_gas,
    billsx_othersothers:req.body.billsx_othersothers,

  })
  billx.save();
  res.redirect('/manage/'+req.params.m_id)
})
app.post('/addmanage/:a_id', upload.single('managex_photo'),(req, res)=>{
  const managex=new ManagingStaff({
     managex_name:req.body.managex_name,
     managex_id:req.body.managex_id,
     managex_designation:req.body.managex_designation,
     managex_photo:req.file.filename,
     managex_mobile:req.body.managex_mobile,
     managex_email:req.body.managex_email,
     managex_comm:req.params.a_id
  })
  managex.save();
  res.redirect('/admin/'+req.params.a_id)
});
app.post('/addemergencycontacts/:u_id',(req,res)=>{
  const emer1=new Emergencyc({
    emergencyx_name:req.body.emergencyx_name,
    emergencyx_designation:req.body.emergencyx_designation,
    emergencyx_mobile:req.body.emergencyx_mobile,
    emergencyx_alt_mobile:req.body.emergencyx_alt_mobile,
    emergencyx_comm:req.params.u_id
  })
  emer1.save()
  res.redirect('/admin/'+req.params.u_id)
})
app.get('/getemergency/:u_id',(req,res)=>{
  UserDB.find({userx_id:req.params.u_id},(err,ss)=>{
    CommunityADMINS.find({communityx_name:ss[0].userx_community},(err1,ss1)=>{
      Emergencyc.find({emergencyx_comm:ss1[0].communityx_admin_id},(err2,ss2)=>{
        res.send(ss2)
      })
    }) 
})
})
app.post('/addannouncement/:c_id',(req,res)=>{
  const annon=new Announcements({
    ann_name:req.body.annname,
    ann_desc:req.body.anndesc,
    ann_community:req.params.c_id
  })
  annon.save()
  res.redirect('/admin/'+req.params.c_id)
})
app.get('/getnotifications/:notifuserid',(req,res)=>{
  Notifications.find({notificationx_userid:req.params.notifuserid},(err,s)=>{
    res.send(s)
  })
})

app.post('/sendnotification/:cid',(req,res)=>{
  const notif=new Notifications({
    notificationx_title:req.body.notificationx_title,
    notificationx_text:req.body.notificationx_text,
    notificationx_userid:req.body.notificationx_userid
  })
  notif.save()
  res.redirect('/admin/'+req.params.cid)
})
app.post('/uploadwork',(req,res)=>{
  const work1=new Worka({
    work_name:req.body.work_name,
    work_mobile:req.body.work_mobile,
    work_work:req.body.work_work,
    work_prefered_area:req.body.work_prefered_area
  })
  work1.save()
  res.redirect('/work')
})
app.post('/adduserx/:cid',(req,res)=>{
    const userx=new UserDB({
        userx_name:req.body.userx_name,
        userx_id:req.body.userx_id,
        userx_mobile:req.body.userx_mobile,
        userx_community:req.body.userx_community,
        userx_floor:req.body.userx_floor,
        userx_door_no:req.body.userx_door_no
    })
    userx.save()
    res.redirect('/admin/'+req.params.cid)
})

app.post('/addcommunityx',(req,res)=>{
  const communityx=new CommunityADMINS({
      communityx_name:req.body.communityx_name,
      communityx_id:req.body.communityx_id,
      communityx_location:req.body.communityx_location,
      communityx_admin_name:req.body.communityx_admin_name,
      communityx_admin_id:req.body.communityx_admin_id,
      communityx_admin_mobile:req.body.communityx_admin_mobile
      
      
  })
  communityx.save()
  res.redirect('/headadmin')
})

app.get('/availablework1/:workn',(req,res)=>{
  Worka.find({work_work:req.params.workn},(err,s)=>{
    res.send(s)
  })
})





// start express server on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});