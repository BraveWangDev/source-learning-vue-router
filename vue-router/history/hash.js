import { History } from "./base";

function ensureSlash() {
  // location.hash 存在兼容性问题，可根据完整 URL 判断是否包含'/'
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/'; // 默认 hash 为 /
}

function getHash() {
  return window.location.hash.slice(1);
}

/**
 * Hash模式的路由实现
 */
class HashHistory extends History {
  constructor(router) {
    super(router);
    this.router = router;
    // Hash 模式下，对URL路径进行处理，确保包含'/'
    ensureSlash();
  }
  getCurrentLocation() {
    // 获取路径的 hash 值
    return getHash();
  }
  push(location) {
    // 跳转路径，并在跳转完成后更新 hash 值；
    // transitionTo内部会查重：hash 值变化虽会再次跳转，但不会更新current属性;
    this.transitionTo(location, () => {
      window.location.hash = location;// 更新hash值
    })
  }
  setupListener() {
    // 当 hash 值变化时，拿到新的 hash 值，并进行匹配跳转
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash());
    })
  }
}

export default HashHistory