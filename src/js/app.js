let app = new Vue({
    el:'#app',
    data:{
        loginVisible:false,
        signUpVisible:false,
        editingName:false,
        currentUser:{
            objectId:'',
            email:''
        },
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
            ]
        },
        login:{
            email:'',
            password:''
        },
        singUp:{
            email:'',
            password:''
        }
    },
    methods:{
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
        addSkill(){
            this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
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
        onSingUp(e){
            // e.preventDefault(); //阻止表单默认的提交刷新页面事件  可以直接在@submit.prevent
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.singUp.email);
            // 设置密码
            user.setPassword(this.singUp.password);
            // 设置邮箱
            user.setEmail(this.singUp.email);
            user.signUp().then((user)=>{
                console.log(user);
                alert('注册成功,请登录')
                //帮用户登录
                debugger
                user = user.toJSON();
                console.log(user)
                this.currentUser.objectId = user.objectId;
                this.currentUser.email = user.email;
                this.signUpVisible = false;
            }, (error)=>{
                alert(error.rawMessage)
                for(var name in error){
                    console.log(name)
                }
            });
        },
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password)
                .then((user)=>{
                    user = user.toJSON();
                    this.currentUser.objectId = user.objectId;
                    this.currentUser.email = user.email;
                    this.loginVisible = false;
                }, ( (error)=>{
                    if(error.code===211){
                        alert('用户不存在')
                    }else if(error.code===210){
                        alert('用户名或密码错误')
                    }
                })
            );
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
        getResume(){
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user)=>{
                let resume = user.toJSON().resume;
                //这样会把原来的已有的属性干掉
                //this.resume = resume;
                Object.assign(this.resume,resume);

            },()=>{
                console.log('获取用户信息失败')
            })
        }
    }
})

let currentUser = AV.User.current();

if(currentUser){
    app.currentUser = currentUser.toJSON();
    app.getResume()
}