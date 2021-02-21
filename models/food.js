var mongoose=require('mongoose');

mongoose.set('useCreateIndex',true)
let FoodSchema=new mongoose.Schema({
	foodclass:{type:String,required:true},
	food:{type:Array,required:true}
});

let FoodModel=mongoose.model('food',FoodSchema);
FoodModel.createIndexes();


let foodclass=(foodclass)=>{
	return FoodModel.findOne({foodclass:foodclass});
}

let foodsave=(data)=>{
	let foods=new FoodModel(data);
	/*let foodclass=data.foodclass
	let food=data.food
	console.log(foodclass)
	console.log(food)*/
	return foods.save()
	.then(()=>{
		return true;
	})
	.catch(()=>{
		return false
	})
}

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
}



module.exports={
	foodclass,
	foodsave,
	foodupdate
}