
//引入数据库模型
var FoodModel=require('../models/food.js')

let truefoodGet=async(req,res,next)=>{
	let {foodclass}=req.query
	console.log(foodclass)
	var result=await FoodModel.foodclass(foodclass)
	res.send({result})
	
}

let foodclassSave=async(req,res,next)=>{
	let {foodclass,food}=req.body
	let result=await FoodModel.foodsave({foodclass,food})
	res.send("656666")
}

let foodclassUpdate=async(req,res,next)=>{
	let {foodclass,food}=req.body
	let result=await FoodModel.foodupdate({foodclass:foodclass,food:food})
	res.send("updatefood")
}

module.exports={
	truefoodGet,
	foodclassSave,
	foodclassUpdate
}