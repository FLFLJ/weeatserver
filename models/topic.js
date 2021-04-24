let mongoose=require('mongoose');

mongoose.set('useCreateIndex',true)
let TopicSchema=new mongoose.Schema({
	topicAndanswer:{type:Object,required:true},
	answers:{type:Array,required:true},
	playLevel:{type:String,required:true}

});

let TopicModel=mongoose.model('topic',TopicSchema);
TopicModel.createIndexes();


let createtopic=(data)=>{
	let topic=new TopicModel(data)
	return topic.save()
}

let gettopic=async(playLevel)=>{
	return await TopicModel.find({playLevel}).limit(5);
}

module.exports={
	gettopic,
	createtopic
	
}