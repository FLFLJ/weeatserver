let mongoose=require('mongoose');

mongoose.set('useCreateIndex',true)
let GameSchema=new mongoose.Schema({
	playLevel:{type:String,required:true},
	playerId:{type:String,required:true},
	playerName:{type:String,required:true}

});

let GameModel=mongoose.model('game',GameSchema);
GameModel.createIndexes();


let gamematch=(playLevel)=>{
	return GameModel.findOne(playLevel)
}

let gamecreat=(data)=>{
	let gamesave=new GameModel(data)
	gamesave.save() 
}

let gamedelete=(data)=>{
	console.log("去吧把吧")
	console.log(data.playerName)
	let playerName=data.playerName
	return GameModel.deleteOne({playerName});
}
let gametopic=(playLevel)=>{
	return GameModel.findOne({playLevel});
}

module.exports={
	gamematch,
	gamecreat,
	gamedelete
}