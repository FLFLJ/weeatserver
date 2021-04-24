var TopicModel=require('../models/topic.js')

let createtopic=async(req,res,next)=>{
	console.log("题目信息：")
	let {topicAndanswer,answers,playLevel}=req.body
	console.log("题目信息：")
	console.log(topicAndanswer)
	console.log(answers)
	console.log(playLevel)
	let retult=await TopicModel.createtopic({
			topicAndanswer,
			answers, 
			playLevel
		})
	}
	if(this.retult){
		res.send("上传成功！")
	}


module.exports={
	createtopic
}