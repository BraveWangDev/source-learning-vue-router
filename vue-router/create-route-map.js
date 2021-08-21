/**
 * 路由配置扁平化处理
 * @param {*} routes 
 * @param {*} oldPathMap 目标对象
 * @returns 
 */
export default function createRouteMap(routes, oldPathMap) {

  let pathMap = oldPathMap || Object.create(null); // 默认没有传递就是直接创建映射关系

  routes.forEach(route => {
    addRouteRecord(route, pathMap);
  });

  return {
    pathMap
  }
}

/**
 * 添加一个路由记录
 * @param {*} route   路由记录
 * @param {*} pathMap 路由集合
 * @param {*} parent  当前路由所属的父路由
 */
function addRouteRecord(route, pathMap, parent) {
  // 当访问/ 时 应该渲染home组件   /  => {Home}
  let path = parent ? (parent.path + '/' + route.path) : route.path
  let record = {
    path,
    component: route.component,
    parent //  这个属性用来标识当前组件的父亲是谁
  }
  if (!pathMap[path]) { // 不能定义重复的路由 否则值生效第一个
    pathMap[path] = record;
  }
  if (route.children) {
    route.children.forEach(childRoute => {
      // 在遍历儿子时 将父亲的记录传入进去
      addRouteRecord(childRoute, pathMap, record);
    })
  }
}