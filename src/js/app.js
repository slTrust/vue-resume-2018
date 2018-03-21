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
        }
    },
    methods:{
        onEdit(key,value){
            this.resume[key] = value;
        },
        onClickSave(){
            console.log(this.resume)
            let currentUser = AV.User.current();
            console.log(currentUser)
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

        }
    }
})