import install from './install'
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';

class VueRouter {
    constructor(options) {  // 传入配置对象

        // 路由匹配器-处理路由配置：将树形结构的嵌套数组转化为扁平化结构的对象，便于后续的路由匹配
        // 路由匹配器返回两个核心方法：match、addRoutes
        this.matcher = createMatcher(options.routes || []);// options.routes 默认[]
        // 根据不同的路径进行切换
        options.mode = options.mode || 'hash'; // 默认没有传入就是hash模式
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this);
                break;
            case 'history':
                this.history = new BrowserHistory(this);
                break;
        }
    }
    /**
     * 根据路径匹配到路由映射表 matcher 中进行路由匹配
     * 备注：VueRouter 类通过 match 方法对外提供 matcher 的访问，而不是直接访问 matcher
     * @param {*} location 路径
     * @returns createMatcher.match 匹配结果（数组）
     */
    match(location) {
        return this.matcher.match(location);
    }

    /**
     * 路由初始化方法，供 install 安装时调用
     * 初始化时，获取当前hash值进行跳转, 并设置监听器
     * @param {*} app 根组件实例（在处理根组件时被调用）
     */
    init(app) {
        // 当前的history实例：可能是HashHistory，也可能是BrowserHistory；
        const history = this.history;
        // 设置监听器：内部调用的是不同子类中的实现
        const setUpListener = () => {
            history.setupListener();
        }
        // 初始化时，获取当前hash值进行跳转, 并设置监听器
        history.transitionTo(
            history.getCurrentLocation(), // 获取当前的位置
            setUpListener
        )
        // 每次路径变化时，都会调用此方法
        // 触发根实例 app 上响应式数据 _route 的更新
        history.listen((route)=>{
            app._route = route; 
        });
    }
}
VueRouter.install = install;

// vue-router 插件将导出一个类，外部可通过 new Router({}) 创建实例并使用
export default VueRouter;