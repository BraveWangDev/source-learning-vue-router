import createRouteMap from "./create-route-map"

export default function createMatcher(routes) {

    let { pathMap } = createRouteMap(routes); //  路由配置扁平化处理

    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }

    function match(location) {
    }
    return {
        addRoutes, // 添加路由 
        match // 用于匹配路径
    }
}