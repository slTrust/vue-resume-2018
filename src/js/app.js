new Vue({
    el:'#app',
    data:{
        loginVisible:false,
        signUpVisible:false,
        editingName:false,
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
            return
            if(!currentUser){
                this.showLogin()
            }else{
                this.saveResume()
            }
            // // 声明类型
            // var User = AV.Object.extend('User');
            // // 新建对象
            // var user = new User();
            // // 设置名称
            // user.set('resume',this.resume);
            // user.save().then(function (todo) {
            //     console.log('objectId is ' + todo.id);
            // }, function (error) {
            //     console.error(error);
            // });

        },
        saveResume(){

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
                .then(function (user) {
                    console.log(user);
                }, (function (error) {
                    if(error.code===211){
                        alert('用户不存在')
                    }else if(error.code===210){
                        alert('用户名或密码错误')
                    }
                })
            );
        }
    }
})