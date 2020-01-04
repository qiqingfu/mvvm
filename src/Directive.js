/**
 * @author qiqingfu
 * @date 2020-01-01 23:21
 */

/**
 * 1. 和编译阶段结合, 对指令进行处理
 * 2. 订阅数据变化, 绑定Watcher函数
 */

/**
 * 策略模式, 对一种结果设置多种算法
 * @param node DOM元素
 * @param type 指令对应的值 v-text="msg"  msg
 * @param vm Mvue实例
 * @param modifiers 修饰符:后面的值 v-on:click (click)
 */

import util from './util.js';
import Watcher from './Watcher.js';

class Directive {
  constructor () {
    this.updater = {
      /**
       * 更新 v-text, v-html 指令视图
       * @param node
       * @param val
       */
      updateText (node, val) {
        node.textContent = val;
      },
      updateHtml (node, val) {
        node.innerHTML = val;
      }
    };
  }

  text (node, type, vm) {
    const val = util.getValue(vm, type);
    // 订阅 watcher 通知, 更新视图
    new Watcher(vm, type, (updateVal) => {
      this.updater.updateText(node, updateVal);
    });
    this.updater.updateText(node, val);
  }

  html (node, type, vm) {
    const val = util.getValue(vm, type);
    new Watcher(vm, type, (updateVal) => {
      this.updater.updateHtml(node, updateVal);
    });
    this.updater.updateHtml(node, val);
  }

  model (node, type, vm) {
    new Watcher(vm, type, (updateVal) => {
      node.value = updateVal;
    });
    // 视图 => 数据 => 视图
    node.addEventListener('input', (e) => {
      const val = e.target.value;
      util.setValue(vm, type, val);
    });
    node.value = util.getValue(vm, type);
  }

  bind (node, type, vm, attr) {
    const val = util.getValue(vm, type);
    new Watcher(vm, type, (updateVal) => {
      node.setAttribute(attr, updateVal);
    });
    node.setAttribute(attr, val);
  }

  if (node, type, vm) {
    const nextNode = node.nextElementSibling;
    const ifUtil = this._utils().if;
    new Watcher(vm, type, (updateVal) => {
      ifUtil.update(node, updateVal, nextNode);
    });
    const val = util.getValue(vm, type);

    ifUtil.update(node, val, nextNode);
  }

  show (node, type, vm) {
    new Watcher(vm, type, (updateVal) => {
      node.style.display = updateVal ? 'block' : 'none';
    });
    node.style.display = util.getValue(vm, type) ? 'block' : 'none';
  }

  on (node, type, vm, eventName) {
    const eventFn = vm.$options.methods && vm.$options.methods[type];
    node.addEventListener(eventName, eventFn.bind(vm));
  }

  _utils () {
    return {
      if: {
        update (node, val, nextNode) {
          if (val) {
            if (nextNode !== null) {
              node.parentNode.insertBefore(node, nextNode);
            } else {
              node.parentNode.appendChild(node);
            }
          } else {
            node.parentNode.removeChild(node);
          }
        }
      }
    };
  }
}

export default Directive;
