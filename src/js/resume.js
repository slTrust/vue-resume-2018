Vue.component('resume',{
    props:['mode','displayResume'],
    data(){
        return {
            mode:'edit',  // preview
        }
    },
    methods:{
        addSkill(){
            this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
       
        removeProject(index){
            this.resume.projects.splice(index,1)
        },
        addProject(){
            this.resume.projects.push({name:'请填写项目名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'})
        },
    },
    template:`
    <div class="resume">
        <section class="profile">
            <h1>
                <editable-span :disabled="mode === 'preview' " :value="displayResume.name" v-on:edit="onEdit('name',$event)"></editable-span>
            </h1>
            <p>应聘职位：
                <editable-span :disabled="mode === 'preview' " :value="displayResume.jobTitle" v-on:edit="onEdit('jobTitle',$event)"></editable-span>
            </p>
            <p>
                <editable-span :disabled="mode === 'preview' " :value="displayResume.birthDay" v-on:edit="onEdit('birthDay',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview' " :value="displayResume.gender" v-on:edit="onEdit('gender',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview' " :value="displayResume.email" v-on:edit="onEdit('email',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview' " :value="displayResume.phone" v-on:edit="onEdit('phone',$event)"></editable-span>
            </p>
        </section>
        <section class="skills">
            <h1>技能</h1>
            <ul>
                <li v-for="skill,index in displayResume.skills">
                    <editable-span :disabled="mode === 'preview' " class="name" :value="skill.name" v-on:edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                    <div class="description">
                            <editable-span :disabled="mode === 'preview' " :value="skill.description" v-on:edit="onEdit('skills['+index+'].description',$event)"></editable-span>
                    </div>
                    <span class="remove" v-if="index>=4 && mode==='edit'" @click="removeSkill(index)">X</span>
                </li>
                <li v-if="mode==='edit'" class="add">
                    <span @click="addSkill" >
                        添加
                    </span>
                </li>
            </ul>
        </section>
        <section class="projects">
            <h2>项目经历</h2>
            <ol>
                <li v-for="project,index in displayResume.projects">
                    <header>
                        <div class="start">
                            <h3 class="name">
                                <editable-span :disabled="mode === 'preview' " :value="project.name" v-on:edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                            </h3>
                            <span class="link">
                                <editable-span :disabled="mode === 'preview' " :value="project.link" v-on:edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                            </span>
                        </div>
                        <div class="end">
                            <span class="keywords">
                                <editable-span :disabled="mode === 'preview' " :value="project.keywords" v-on:edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                            </span>
                        </div>
                    </header>
                    <p class="description">
                        <editable-span :disabled="mode === 'preview' " :value="project.description" v-on:edit="onEdit('projects['+index+'].description',$event)"></editable-span>
                    </p>
                    <span class="remove" @click="removeProject" v-if="index>=2 && mode==='edit'">X</span>
                </li>
                <li v-if="mode==='edit'" class="add">
                    <span class="" @click="addProject">添加</span>
                </li>
            </ol>
        </section>
    </div>
    `
})