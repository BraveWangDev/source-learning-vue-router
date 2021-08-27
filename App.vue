<template>
    <div>
        <!-- 添加路由切换 -->
        <router-link to="/">跳转至首页</router-link> 
        &nbsp;
        <router-link to="/mine">跳转至我的</router-link>
        <!-- 页面渲染结果 -->
        <router-view  a="1" b="2"></router-view>
    </div>
</template>


<script>
export default {
    name:'app', 
    mounted(){
        console.log(this._routerRoot._router)
    }
}
</script>