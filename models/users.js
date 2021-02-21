var mongoose=require('mongoose');
var {Head}=require('../untils/config.js');
var url=require('url');
mongoose.set('useCreateIndex',true)
var UserSchema=new mongoose.Schema({
	username:{type:String,required:true,index:{unique:true}},
	password:{type:String,required:true},
	email:{type:String,required:true,index:{unique:true}},
	date:{type:Date,default:Date.now()},
	isAdmin:{type:Boolean,default:false},
	isFreeze:{type:Boolean,default:false},
	userHead:{type:String,default:url.resolve(Head.baseUrl,'default.jpg')},
});

var UserModel=mongoose.model('user',UserSchema);
UserModel.createIndexes();

var save=(data)=>{
	var user=new UserModel(data);
	return user.save()
	.then(()=>{
		return true;
	})
	.catch(()=>{
		return false
	})
};

var findLogin=(data)=>{
	return UserModel.findOne(data)
}

var updatePassword=(email,password)=>{
	return UserModel.update({email},{$set:{password}})
	.then(()=>{
		return true
	})
	.catch(()=>{
		return false
	})
}

var updateUserHead=(username,userHead)=>{
	return UserModel.update({username},{$set:{userHead}})
	       .then(()=>{
	       	return true;
	       })
	       .catch(()=>{
	       	return false;
	       })
}

let usersList=()=>{
	return UserModel.find();
}

let updateFreeze=(email,isFreeze)=>{
	return UserModel.update({email},{$set:{isFreeze}})
	       .then(()=>{
	       	return true;
	       })
	       .catch(()=>{
	       	return false
	       })
}

let deleteUser=(email)=>{
	return UserModel.deleteOne({email});
}

let totest=(foodclass)=>{

	return UserModel.findOne({foodclass});
}



module.exports={
	save,
	findLogin,
	updatePassword,
	updateUserHead,
	usersList,
	updateFreeze,
	deleteUser,
	totest
}