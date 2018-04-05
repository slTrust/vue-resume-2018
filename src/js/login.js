Vue.component('login',{
    data(){
        return {
            login:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password)
                .then((user)=>{
                    user = user.toJSON();
                    this.$emit('login',user);
                    // this.currentUser.objectId = user.objectId;
                    // this.currentUser.email = user.email;
                    // this.loginVisible = false;
                }, ( (error)=>{
                    if(error.code===211){
                        alert('用户不存在')
                    }else if(error.code===210){
                        alert('用户名或密码错误')
                    }
                })
            );
        },
        onClickSignUp(){
            this.$emit('goTosignUp')
        }
    },
    template:
    `
    <div  class="login" v-cloak>
        <form action="" class="form" @submit.prevent="onLogin">
            <h2>登录</h2>
            <button type="button" @click="$emit('close')">关闭</button>
            <div class="row">
                <label for="">邮箱</label>
                <input type="text" v-model="login.email">
            </div>
            <div class="row">
                <label for="">密码</label>
                <input type="text" v-model="login.password">
            </div>
            <div class="actions">
                <button type="submit">提交</button>
                <a href="#" @click="onClickSignUp">注册</a>
            </div>
        </form>
    </div>
    
    `
})