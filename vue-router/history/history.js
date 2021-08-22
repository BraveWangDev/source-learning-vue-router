import { History } from "./base";

/**
 * History 模式的路由实现
 * 备注：BrowserHistory 刷新会丢失，需要 webpack 支持
 */
class BrowserHistory extends History{
    setupListener(){

    }
}

export default BrowserHistory