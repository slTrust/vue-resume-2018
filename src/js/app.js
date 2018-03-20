new Vue({
    el:'#app',
    data:{
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
        }
    }
})