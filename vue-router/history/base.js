/**
 * 路由基类
 */
class History {
  constructor(router) {
    this.router = router;
  }
  transitionTo(location, onComplete) {
    // 根据路径匹配到路由配置
    let route = this.router.match(location);
    onComplete && onComplete();
  }
}

export { History }