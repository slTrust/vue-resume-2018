let app = new Vue({
    el:'#app',
    data:{
        loginVisible:false,
        signUpVisible:false,
        shareVisible:false,
        editingName:false,
        skinPickerVisible:false,
        currentUser:{
            objectId:'',
            email:''
        },
        prevviewUser:{
            objectId:undefined
        },
        previewResume:{},
        resume:{
            name:'xxx',
            gender:'女',
            birthDay:'1990-01-01',
            jobTitle:'前端工程师',
            phone:13611111111,
            email:'example@example.com',
            skills:[
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'}
            ],
            projects:[
                {name:'请填写项目名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'},
                {name:'请填写项目名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'}
            ]
        },
     
       
        shareLink:'不知道',
        mode:'edit',  // preview
        mainClass:'default'
    },
    watch:{
        //监听登录成功后的 objectId
        'currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>this.resume=resume);
            }
        }
    },
    computed:{
        displayResume:function(){
            return this.mode==='edit'?this.resume:this.previewResume;
        }
    },
    methods:{
        onLogin(user){
            this.currentUser.objectId = user.objectId;
            this.currentUser.email = user.email;
            this.getResume(this.currentUser)
            this.loginVisible = false;
        },
        onEdit(key,value){
            //正则替换   skills[0].name[0].aa  ==> skills.0.name.0.aa
            let regex = /\[(\d+)\]/g;
            key = key.replace(regex,(match,number)=>`.${number}`)
            let keys = key.split('.');
            let result = this.resume;
            for(var i=0;i<keys.length;i++){
                //this.resume.['skills']['0']['name'] 因为最后一项name时 已经不是引用了 所以在它前一项保存
                if(i === keys.length-1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
                //result = result[keys[i]]
                //理解
                /*
                result = this.resume
                keys = ['skills','0','name'];
                i=0  result === result[keys[0]] === this.resume.skills
                i=1  result === result[keys[1]] === this.resume.skills.0
                i=2  result === result[keys[2]] === this.resume.skills.0.name
                retult === this.resume.['skills']['0']['name']
                */
            }
            console.log(result)
        },
       
        
        onClickSave(){
            let currentUser = AV.User.current();
            console.log(currentUser)
            if(!currentUser){
                // 当前没登录就显示登录窗口
                this.loginVisible = true;
            }else{
                this.saveResume()
            }
        },
        saveResume(){
            // 第一个参数是 className，第二个参数是 objectId
            let {objectId} = AV.User.current().toJSON();
            var user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume',this.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
            },()=>{
                alert('保存失败')
            });
        },
        
       
        hasLogin(){
            // 存在则已登录  不存在则没登录
            return !!this.currentUser.objectId
        },
        onLogout(){
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            alert('注销成功')
            window.location.reload();
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user)=>{
                let resume = user.toJSON().resume;
                //不进行任何赋值  返回对象数据
                return resume;
            },()=>{
                console.log('获取用户信息失败')
            })
        },
        onShare(){
            
            if(this.hasLogin()){
                this.shareVisible = true;
            }else{
                alert('请先登录')
            }
        },
        print(){
            window.print();
        },
       
    }
})

//获取当前用户
let currentUser = AV.User.current();

if(currentUser){
    app.currentUser = currentUser.toJSON();
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId;
    console.log('currentUserId'+app.currentUser.objectId)
    app.getResume(app.currentUser).then(resume=>{
        app.resume = resume
    })
}
// 获取预览用户id
let search = location.search;
let regex = /user_id=([^&]+)/
let matches = search.match(regex);
let userId;
if(matches){
    userId = matches[1];
    // 如果当前url里有用户id 则切换为预览模式
    app.mode = 'preview';
    console.log('previewID'+userId)
    app.getResume({objectId:userId}).then(resume=>{
        app.previewResume = resume;
    },()=>{
        console.log('err')
    })
}
