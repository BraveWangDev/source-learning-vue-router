import createRouteMap from "./create-route-map"
import { createRoute } from './history/base'

/**
 * 路由匹配器函数
 *  对路由配置进行扁平化处理
 *  addRoutes：动态添加路由匹配规则
 *  match：根据路径进行路由匹配
 * @param {*} routes 
 * @returns 返回路由匹配器的两个核心方法 addRoutes、match
 */
export default function createMatcher(routes) {

    //  路由配置扁平化处理
    let { pathMap } = createRouteMap(routes);

    /**
     * 根据路径进行路由匹配
     * @param {*} location 路径
     * @returns 路由匹配的全部结果
     */
    function match(location) {
        // 获取路由记录
        let record = pathMap[location]; // 一个路径可能有多个记录 
        // 匹配成功
        if (record) {
            return createRoute(record, {
                path: location
            })
        }
        // 匹配失败
        return createRoute(null, {
            path: location
        })
    }

    /**
     * 动态添加路由匹配规则
     *  将追加的路由规则进行扁平化处理
     * @param {*} routes 
     */
    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }

    return {
        addRoutes, // 添加路由 
        match // 用于匹配路径
    }
}