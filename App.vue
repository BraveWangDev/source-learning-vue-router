<template>
    <div>
        <!-- 添加路由切换 -->
        <router-link to="/">跳转至首页</router-link> 
        &nbsp
        <router-link to="/mine">跳转至我的</router-link>
        <!-- 页面渲染结果 -->
        <router-view></router-view>
    </div>
</template>
