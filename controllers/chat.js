
//引入数据库模型
let ChatModel=require('../models/chat.js')


let dailychatSave=async(req,res,next)=>{
	let {chatid,owner,ownerimg,ownerlist,said,ownersaid}=req.body;
	console.log(req.body)
	let result=await ChatModel.save({
		chatid,
		owner,
		ownerimg,
		ownerlist,
		said,
		ownersaid
	});
	if(result){
		res.send({
			msg:'存储成功',
			status:0
		})
	}
	else{
		res.send({
			msg:'存储',
			status:-2
		})
	}
	
}

let dailychatGet=async(req,res,next)=>{
	console.log("获取评论")
	let result=await ChatModel.findChat()
	res.send({result})
	
}

let dailychatUpdate=async(req,res,next)=>{
	console.log("更新小评论")
	let data=req.body

	let result=await ChatModel.upandback(data)
	console.log(result)
	res.send({result})
	
}

let dailychatfoodcopy=async(req,res,next)=>{
	console.log("复制菜单")
	let data=req.body

	let result=await ChatModel.copy(data)
	console.log(result)
	res.send({result})
	
}



module.exports={
	dailychatSave,
	dailychatGet,
	dailychatUpdate,
	dailychatfoodcopy
}