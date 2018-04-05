Vue.component('signUp',{
    data(){
        return {
            signUp:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onSignUp(e){
            // e.preventDefault(); //阻止表单默认的提交刷新页面事件  可以直接在@submit.prevent
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email);
            // 设置密码
            user.setPassword(this.signUp.password);
            // 设置邮箱
            user.setEmail(this.signUp.email);
            user.signUp().then((user)=>{
                console.log(user);
                alert('注册成功,请登录')
                //帮用户登录
                user = user.toJSON();
                console.log(user)
                this.$emit('signUp')
                // this.currentUser.objectId = user.objectId;
                // this.currentUser.email = user.email;
                // this.signUpVisible = false;
            }, (error)=>{
                alert(error.rawMessage)
                for(var name in error){
                    console.log(name)
                }
            });
        },
        onClickLogin(){
            this.$emit('goToLogin')
        }
    },
    template:
    `
    <div class="singUp" v-cloak>
        <form action="" class="form" @submit.prevent="onSignUp">
            <h2>注册</h2>
            <button type="button" @click="signUpVisible = false;">关闭</button>
            <div class="row">
                <label for="">邮箱</label>
                <input type="text" v-model="signUp.email">
            </div>
            <div class="row">
                <label for="">密码</label>
                <input type="text" v-model="signUp.password">
            </div>
            <div class="actions">
                <button type="submit">提交</button>
                <a href="#" @click="onClickLogin">登录</a>
            </div>
        </form>
    </div>
    
    `
})