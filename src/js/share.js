Vue.component('share',{
    props:["shareLink"],
    template:
    `
    <div  class="share" v-cloak>
        <h2>请将下面的链接分享给面试官</h2>
        <div>
            <textarea readonly>{{shareLink}}</textarea>
        </div>
    </div>
    `
})