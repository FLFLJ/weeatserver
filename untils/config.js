var mongoose=require('mongoose');
var nodemailer=require('nodemailer')
//连接数据库mongoose
var Mongoose={
	url:'mongodb://localhost:27017/weeat',
	connect(){
		mongoose.connect(this.url,{useUnifiedTopology:true,useNewUrlParser: true},(err)=>{
			if(err){
				console.log('数据库连接失败');
				return
			}
			console.log('数据库连接成功')
			console.log(this.url)
		})
	}
}
//代理邮箱
var Email={
	config:{
		host:'smtp.qq.com',
		port:587,
		auth:{
			user:'460643726@qq.com',
			pass:'mfsqwiblimrycbdc'
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config)
	},
	get verify(){
		return Math.random().toString().substring(2,6)
	},
	get time(){
		return Date.now()
	}
};

var Head={
	baseUrl:'http://localhost:3000/uploads/'
}

module.exports={
	Mongoose,
	Email,
	Head
}