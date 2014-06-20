
/*
 * GET home page.
 */	
 
function FormatNum(Source,Length){ 
				var strTemp=""; 
				for(i=1;i<=Length-Source.length;i++){ 
				strTemp+="0"; 
				} 
				return strTemp+Source; 
			} 
function Today(){
	 date = new Date()
	 strTemp=''
	 year = date.getFullYear();
	 month = date.getMonth()+1;
	 day = date.getDate();
	if(2-day.toString().length==1){ 
		day = '0'+day; 
	} 
	if(2-month.toString().length==1){ 
		month = '0'+month; 
	} 
	today = year+"/"+month+"/"+day
	console.log(today)
};

module.exports = function(app){
	app.get('/',function (req,res){
		Today();
		res.render('index', { title: '床上' ,
											name:'统计'});
	});
	
	//礼物按天查看
	app.get('/gift/:yyyy/:mm/:dd',function (req,res){	
		Today();
		var gifts = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::present_"+req.params.yyyy+"-"+req.params.mm+"-"+req.params.dd+"*", function(err, reply){
			if (reply.length>0){
				gifts = reply;
				//console.log(reply)	;	
				var count=0,s='';
				for (var i=0;i<gifts.length;i++){
					client.get(gifts[i],function (err,reply){					
						var pattern = new RegExp("_\{([0-9]+),",'g')
						keys[count] = pattern.exec(gifts[i-gifts.length])[1];
						dic[count] = reply;//数组
						i++;
						count++;
						if (count==gifts.length){
							res.render('gift', {
								title: '礼物' ,
								key: keys,
								year:req.params.yyyy,
								month:req.params.mm,
								day:req.params.dd,
								event:'gift',
								value: dic});	
								//console.log(keys);
						};
					});
				};
				}
				else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:req.params.dd,
											event:'gift',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
			});
		});
	});
	
	//礼物按月查看
	app.get('/gift/:yyyy/:mm',function (req,res){	
		Today();
		var gifts = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::present_"+req.params.yyyy+"-"+req.params.mm+"_*", function(err, reply){
			if (reply.length>0){
				gifts = reply;
				//console.log(reply)	;	
				var count=0,s='';
				for (var i=0;i<gifts.length;i++){
					client.get(gifts[i],function (err,reply){					
						var pattern = new RegExp("_\{([0-9]+),",'g')
						keys[count] = pattern.exec(gifts[i-gifts.length])[1];
						dic[count] = reply;//数组
						i++;
						count++;
						if (count==gifts.length){
							res.render('gift', {
								title: '礼物' ,
								key: keys,
								year:req.params.yyyy,
								month:req.params.mm,
								day:0,
								event:'gift',
								value: dic});	
								//console.log(keys);
						};
					});
				};
				}
				else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:0,
											event:'gift',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
			});
		});
	});
	
	//礼物
	app.get('/gift',function (req,res){	
		Today();
		var gifts = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::present_"+year+"-"+month+"-"+day+"*", function(err, reply){
			if (reply.length>0){
				gifts = reply;
				//console.log(reply)	;	
				var count=0,s='';
				for (var i=0;i<gifts.length;i++){
					client.get(gifts[i],function (err,reply){					
						var pattern = new RegExp("_\{([0-9]+),",'g')
						keys[count] = pattern.exec(gifts[i-gifts.length])[1];
						dic[count] = reply;//数组
						i++;
						count++;
						if (count==gifts.length){
							res.render('gift', {
								title: '礼物' ,
								key: keys,
								year:year,
								month:month,
								day:day,
								event:'gift',
								value: dic});	
								//console.log(keys);
						};
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:year,
											month:month,
											day:day,
											event:'gift',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
//				else{
//					res.render('404', { title: '404 Not Found' ,
//								
//											name:'请求的页面没有找到'});
//				};
			});
		});
	});
	
	//消费
	app.get('/pay',function (req,res){	
		Today();
		var pays = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
			client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::userpay_"+year+"-"+month+"-"+day+"*", function(err, reply){
				if (reply.length>0){
					pays = reply;
					//console.log(reply)	;	
					var count=0,s='';
					for (var i=0;i<pays.length;i++){
						client.get(pays[i],function (err,reply){					
							var pattern = new RegExp("_\{[0-9]+,([0-9]+),([^\{\}]+)\}",'g')
							keys[count] = '"'+pattern.exec(pays[i-pays.length])[2]+'"';
							dic[count] = 0-reply;//数组
							i++;
							count++;
							if (count==pays.length){
								res.render('pay', {
									title: '消费' ,
									key: keys,
									year:year,
									month:month,
									day:day,
									event:'pay',
									value: dic});	
									//console.log(dic);
							};
						});
					};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:year,
											month:month,
											day:day,
											event:'pay',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
//				else{
//					res.render('404', { title: '404 Not Found' ,
//								
//											name:'请求的页面没有找到'});
//				};
			});
		});
	});
	
	//消费按月查看
	app.get('/pay/:yyyy/:mm',function (req,res){	
		Today();
		var pays = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
			client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::userpay_"+req.params.yyyy+"-"+req.params.mm+"_*", function(err, reply){
				if (reply.length>0){
				pays = reply;
				//console.log(reply)	;	
				var count=0,s='';
				for (var i=0;i<pays.length;i++){
					client.get(pays[i],function (err,reply){					
						var pattern = new RegExp("_\{[0-9]+,([0-9]+),([^\{\}]+)\}",'g')
						keys[count] = '"'+pattern.exec(pays[i-pays.length])[2]+'"';
						dic[count] = 0-reply;//数组
						i++;
						count++;
						if (count==pays.length){
							res.render('pay', {
								title: '消费' ,
								key: keys,
								event:'pay',
								year:req.params.yyyy,
								month:req.params.mm,
								day:0,
								value: dic});	
								//console.log(keys);
						};
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:0,
											event:'pay',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
			});
		});
	});
	
	//消费按天查看
	app.get('/pay/:yyyy/:mm/:dd',function (req,res){	
		Today();
		var pays = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
			client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::userpay_"+req.params.yyyy+"-"+req.params.mm+"-"+req.params.dd+"*", function(err, reply){
				if (reply.length>0){
				pays = reply;
				//console.log(reply)	;	
				var count=0,s='';
				for (var i=0;i<pays.length;i++){
					client.get(pays[i],function (err,reply){					
						var pattern = new RegExp("_\{[0-9]+,([0-9]+),([^\{\}]+)\}",'g')
						keys[count] = '"'+pattern.exec(pays[i-pays.length])[2]+'"';
						dic[count] = 0-reply;//数组
						i++;
						count++;
						if (count==pays.length){
							res.render('pay', {
								title: '消费' ,
								key: keys,
								event:'pay',
								year:req.params.yyyy,
								month:req.params.mm,
								day:req.params.dd,
								value: dic});	
								//console.log(keys);
						};
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:req.params.dd,
											event:'pay',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};
//				else{
//					res.render('404', { title: '404 Not Found' ,
//								
//											name:'请求的页面没有找到'});
//				};
			});
		});
	});
	
	//用户
	app.get('/user',function (req,res){	
		Today();
		var users = new Array();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		//var keys2 = new Array();
		//var dic2 = new Array();
		var count=0;
		var count1=0;
		var count2=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			for (var i=0;i<day;i++){
				client.get("CS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
				{
					keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					//console.log(count);
					count+=1;
				});	

				client.get("CS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
				{
					keys1[count1]='"'+year+"-"+month+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==day){
					res.render('user', {
								title: '用户' ,
								year:year,
								month:month,
								day:day,
								key: keys,
								event:'user',
								value: dic,
								key1: keys1,
								value1: dic1,
								//key2: keys2,
								//value2: dic2
								});								
						};		
					//console.log(keys);							
				});	
						
			};
			
		});
	});
	
	//用户按月显示
	app.get('/user/:yyyy',function (req,res){	
		Today();
		var users = new Array();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){
			
				for (var i=0;i<month;i++){
				client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					count1+=1;
					if (count1==month){
					res.render('user', {
								title: '用户' ,
								year:req.params.yyyy,
								month:0,
								day:month,
								key: keys,
								event:'user',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}else{
				for (var i=0;i<12;i++){
				client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
				{
					keys[count]='"'+req.params.yyyy+'-'+FormatNum((count+1).toString(),2)+'"';
					if(reply){dic[count]=reply;}else{dic[count]=0;}
					count+=1;
				});	
				client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
				{
					keys1[count1]='"'+req.params.yyyy+"-"+FormatNum((count1+1).toString(),2)+'"';
					if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
					//console.log(count);
					count1+=1;
					if (count1==12){
					res.render('user', {
								title: '用户' ,
								year:req.params.yyyy,
								month:0,
								day:12,
								key: keys,
								event:'user',
								value: dic,
								key1: keys1,
								value1: dic1,
								});								
						};		
				});	
						
			};
			}
			
			
		});
	});
	
	//用户当月每日显示
	app.get('/user/:yyyy/:mm/:num',function (req,res){	
		Today();
		var users = new Array();
		var keys = new Array();
		var dic = new Array();
		var keys1 = new Array();
		var dic1 = new Array();
		var count=0;
		var count1=0;
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){	
			if (req.params.yyyy==year){//if1
				if (req.params.mm==month)//if2
				{
					for (var i=0;i<day;i++){
						client.get("CS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
						{
							keys[count]='"'+year+'-'+month+'-'+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							count+=1;
						});	
						client.get("CS::A::user_"+year+"-"+month+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
						{
							keys1[count1]='"'+year+"-"+month+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==day){
							res.render('user', {
										title: '用户' ,
										year:req.params.yyyy,
										month:req.params.mm,
										day:day,
										key: keys,
										event:'user',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}else{
					for (var i=0;i<req.params.num;i++){
						client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	

						client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('user', {
										title: '用户' ,
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'user',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
				}//if2
			}else{
				for (var i=0;i<req.params.num;i++){
						client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','0'\}",function (err,reply)
						{
							keys[count]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count+1).toString(),2)+'"';
							if(reply){dic[count]=reply;}else{dic[count]=0;}
							//console.log(count);
							count+=1;
						});	
						client.get("CS::A::user_"+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((i+1).toString(),2)+"_\{'GENDER','1'\}",function (err,reply)
						{
							keys1[count1]='"'+req.params.yyyy+"-"+FormatNum(req.params.mm.toString(),2)+"-"+FormatNum((count1+1).toString(),2)+'"';
							if(reply){dic1[count1]=reply;}else{dic1[count1]=0;};
							//console.log(count);
							count1+=1;
							if (count1==req.params.num){
							res.render('user', {
										title: '用户' ,
										year:req.params.yyyy,
										month:req.params.mm,
										day:req.params.num,
										key: keys,
										event:'user',
										value: dic,
										key1: keys1,
										value1: dic1,
										//key2: keys2,
										//value2: dic2
										});								
								};		
							//console.log(keys);							
						});	
								
					};
			}//if1
				
			
			
			
		});
	});
	
	//用户省份分布（中国）
	app.get('/display',function (req,res){	
		Today();
		var pros = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::user_{'PROVINCE','*_*", function(err, reply){
			if (reply.length>0){
				pros = reply;
				
				var count=0,s='';
				for (var i=0;i<pros.length;i++){
					client.get(pros[i],function (err,reply){					
						var pattern = new RegExp("','[A-Z]+_([^\{\}]+)'\}",'g')
						k = pattern.exec(pros[i-pros.length]);
						if(k){
							keys[count] = '"'+k[1]+'"';
							//console.log(keys[count])	;	
							//console.log(pros[i-pros.length]);
							dic[count] = reply;//数组
							}else{
							//console.log(pros[i-pros.length])
						};
							i++;
							count++;
							if (count==pros.length){
								res.render('display', {
									title: '用户分布' ,
									key: keys,
									value: dic,
									year:year,
									month:month,
									day:0,
									event:'display'
									});	
									//console.log(keys);
							};
						
											
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:year,
											month:month,
											day:0,
											event:'display',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};

			});
		});
	});
	//用户每日省份分布（中国）
	app.get('/display/:yyyy/:mm/:dd',function (req,res){	
		Today();
		var pros = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::user_"+req.params.yyyy+"-"+req.params.mm+"-"+req.params.dd+"_{'PROVINCE','*_*", function(err, reply){
			if (reply.length>0){
				pros = reply;
				
				var count=0,s='';
				for (var i=0;i<pros.length;i++){
					client.get(pros[i],function (err,reply){					
						var pattern = new RegExp("','[A-Z]+_([^\{\}]+)'\}",'g')
						k = pattern.exec(pros[i-pros.length]);
						if(k){
							keys[count] = '"'+k[1]+'"';
							//console.log(keys[count])	;	
							//console.log(pros[i-pros.length]);
							dic[count] = reply;//数组
							}else{
							//console.log(pros[i-pros.length])
						};
							i++;
							count++;
							if (count==pros.length){
								res.render('display', {
									title: '用户分布' ,
									key: keys,
									value: dic,
									year:req.params.yyyy,
									month:req.params.mm,
									day:req.params.dd,
									event:'display'
									});	
									//console.log(keys);
							};
						
											
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:req.params.dd,
											event:'display',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};

			});
		});
	});
	//用户每月省份分布（中国）
	app.get('/display/:yyyy/:mm',function (req,res){	
		Today();
		var pros = new Array();
		var keys = new Array();
		var dic = new Array();
		var redis = require("redis"),
		client = redis.createClient(6379, "192.168.1.178");//"192.168.50.63");//
		client.on("error", function(err){
			console.log("Error: " + err);
		});
		client.on("connect", function(){		
			client.keys("CS::A::user_"+req.params.yyyy+"-"+req.params.mm+"_{'PROVINCE','*_*", function(err, reply){
			if (reply.length>0){
				pros = reply;
				
				var count=0,s='';
				for (var i=0;i<pros.length;i++){
					client.get(pros[i],function (err,reply){					
						var pattern = new RegExp("','[A-Z]+_([^\{\}]+)'\}",'g')
						k = pattern.exec(pros[i-pros.length]);
						if(k){
							keys[count] = '"'+k[1]+'"';
							//console.log(keys[count])	;	
							//console.log(pros[i-pros.length]);
							dic[count] = reply;//数组
							}else{
							//console.log(pros[i-pros.length])
						};
							i++;
							count++;
							if (count==pros.length){
								res.render('display', {
									title: '用户分布' ,
									key: keys,
									value: dic,
									year:req.params.yyyy,
									month:req.params.mm,
									day:0,
									event:'display'
									});	
									//console.log(keys);
							};
						
											
					});
				};
				}else{
					res.render('404', { title: '404 Not Found' ,
											year:req.params.yyyy,
											month:req.params.mm,
											day:0,
											event:'display',
											key: '',
											value: '',
											name:'请求的页面没有找到，请选择其他日期。'});
				};

			});
		});
	});

}