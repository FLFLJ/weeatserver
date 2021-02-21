var mongoose=require('mongoose');

mongoose.set('useCreateIndex',true)
let ChatSchema=new mongoose.Schema({
	chatid:{type:String},
	owner:{type:String},
	ownerimg:{type:String},
	ownerlist:{type:Array},
	said:{type:Array},
	ownersaid:{type:String},
	saidlenght:{type:Number},
	copy:{type:Number},
	hot:{type:Number}
});

let ChatModel=mongoose.model('chat',ChatSchema);
ChatModel.createIndexes();


let upandback=async(data)=>{
	let chatid=data.chatid
	let said=data.said
	console.log(chatid)
	console.log(said)
	//let carlist=chatquery.carlist
	await ChatModel.update({chatid},{$push:{said},$inc:{"saidlenght":+1,"hot":+1}}); 
	return ChatModel.find().sort({"hot":-1});
}

let copy=async(data)=>{
	let chatid=data.chatid
	await ChatModel.update({chatid},{$inc:{"copy":+1,"hot":+1}});
}

let findChat=(chatid)=>{
	//let carlist=chatquery.carlist
	return ChatModel.find().sort({"hot":-1});
}

let save=(data)=>{
	let chat=new ChatModel(data);
	return chat.save()
	.then(()=>{
		return true;
	})
	.catch(()=>{
		return false
	})
};

/*
let foodsave=(data)=>{
	let foods=new FoodModel(data);
	return foods.save()
	.then(()=>{
		return true;
	})
	.catch(()=>{
		return false
	})
}
*/
/*
let foodupdate=(data)=>{
	let foodclass=data.foodclass
	let food=data.food
	console.log(foodclass)
	console.log(food)
	return FoodModel.update({foodclass},{$push:{food}})
	.then(()=>{
	       	return true;
	       })
	       .catch(()=>{
	       	return false;
	       })
}*/



module.exports={
	findChat,
	save,
	upandback,
	copy
}