let app = new Vue({
    el:'#app',
    data:{
        loginVisible:false,
        signUpVisible:false,
        editingName:false,
        currentUser:{
            id:'',
            email:''
        },
        resume:{
            name:'xxx',
            gender:'女',
            birthDay:'1990-01-01',
            jobTitle:'前端工程师',
            phone:13611111111,
            email:'example@example.com'
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
            this.resume[key] = value;
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
            let {id} = AV.User.current()
            var user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume',this.resume);
            // 保存到云端
            user.save();
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
            user.signUp().then(function (user) {
                console.log('注册succ')
                console.log(user);
                console.log('注册')
            }, function (error) {
            });
        },
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password)
                .then((user)=>{
                    console.log(user);
                    this.currentUser = {
                        id:user.id,
                        email:user.email
                    }
                }, ( (error)=>{
                    if(error.code===211){
                        alert('用户不存在')
                    }else if(error.code===210){
                        alert('用户名或密码错误')
                    }
                })
            );
        },
        onLogout(){
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            alert('注销成功')
            window.location.reload();
        }
    }
})

let currentUser = AV.User.current();

if(currentUser){
    app.currentUser = currentUser
}