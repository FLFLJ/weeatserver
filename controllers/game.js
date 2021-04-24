var GameModel=require('../models/game.js')

let playgamematch=async(req,res,next)=>{
	let {playLevel,playerId,playerName,userHead}=req.body
	req.session.playerName=playerName
	req.session.playerId=playerId
	req.session.playLevel=playLevel
	req.session.userHead=userHead
	console.log("玩家ID："+playerId+"游戏水平："+playLevel+"玩家头像："+userHead)
	let result=await GameModel.gamematch({playLevel})
	if(!result){
		console.log("匹配失败,创建队列！")
		res.send("匹配失败,创建队列！")
		await GameModel.gamecreat({
			playerId,
			playLevel, 
			playerName
		})
	}
	else{
	console.log(result)
	let playerName=result.playerName
	await GameModel.gamedelete({
			playerName
		})
	res.send({result})

	}
	
	
}

let playgamecancel=async(req,res,next)=>{
	let {playLevel,playerId,playerName}=req.body
	console.log("删除玩家ID："+playerId+"删除游戏水平："+playLevel)
		await GameModel.gamedelete({
			playerName
		})
}



module.exports={
	playgamematch,
	playgamecancel
	
}