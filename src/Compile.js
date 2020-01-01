/**
 * @author qiqingfu
 * @date 2020-01-01 00:09
 */
import util from './util.js';

/**
 * 策略模式, 对一种结果设置多种算法
 * @param node DOM元素
 * @param type 指令对应的值 v-text="msg"  msg
 * @param vm Mvue实例
 * @param modifiers 修饰符:后面的值 v-on:click (click)
 */
const compileUtil = {
  getValue (vm, type) {
    if (type === 'false') {
      return false;
    }
    if (type === 'true') {
      return true;
    }
    return type.split('.').reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  text (node, type, vm) {
    const val = this.getValue(vm, type);
    this.updater.updateText(node, val);
  },
  html (node, type, vm) {
    const val = this.getValue(vm, type);
    this.updater.updateHtml(node, val);
  },
  model (node, type, vm) {
    node.value = this.getValue(vm, type);
  },
  bind (node, type, vm, attr) {
    const val = this.getValue(vm, type);
    node.setAttribute(attr, val);
  },
  if (node, type, vm) {
    const nextNode = node.nextElementSibling;
    const val = this.getValue(vm, type);

    if (val) {
      if (nextNode !== null) {
        node.parentNode.insertBefore(node, nextNode);
      } else {
        node.parentNode.appendChild(node);
      }
    } else {
      node.parentNode.removeChild(node);
    }
  },
  show (node, type, vm) {
    node.style.display = this.getValue(vm, type) ? 'block' : 'none';
  },
  on (node, type, vm, eventName) {
    const eventFn = vm.$options.methods && vm.$options.methods[type];
    node.addEventListener(eventName, eventFn.bind(vm));
  },
  updater: {
    /**
     * 更新 v-text 指令视图
     * @param node
     * @param val
     */
    updateText (node, val) {
      node.textContent = val;
    },
    updateHtml (node, val) {
      node.innerHTML = val;
    }
  }
};

class Compile {
  /**
   * 指令解析器
   * @param el 需要解析的DOM
   * @param vm Mvue构造出的实例对象
   */
  constructor (el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    if (this.el) {
      // 1. 创建一个文档片段
      const fragment = this.createFragment(this.el);
      // 2. 编译文档片段
      this.compile(fragment);
      // 3. 编译后的文档片段插入根DOM节点
      this.el.appendChild(fragment);
    } else {
      throw new Error(`
        el 参数错误, 不是一个DOM元素也不是一个合法的元素选择器
        ========== ===== ===== ===== ===== ===== ===== 
        传递的el参数: ${el}
        根据el参数获取的值: ${this.el}
      `);
    }
  }

  /**
   * 核心编译函数
   * 递归遍历DOM节点
   * @param frag 放入到内存中的文档片段
   */
  compile (frag) {
    const childNodes = frag.childNodes;
    util.toArray(childNodes)
      .forEach(child => {
        // 1. 当前节点为元素节点
        if (this.isElementNode(child)) {
          this.compileElement(child);
        } else {
          // 2. 当前节点为文本节点
          this.compileText(child);
        }

        if (child.childNodes && child.childNodes.length) {
          this.compile(child);
        }
      });
  }

  /**
   * 处理元素节点
   * @param node
   */
  compileElement (node) {
    // 处理元素节点上的属性
    const attributes = node.attributes;
    util.toArray(attributes)
      .forEach(attr => {
        /**
         * v-text="message"
         * v-bind:href="url"
         * name = v-text
         * value = message
         */
        const { name, value } = attr;
        if (this.isDirective(name)) {
          const [, directiveName] = name.split('-');
          const [type, modifiers] = directiveName.split(':');
          compileUtil[type](node, value, this.vm, modifiers);
          node.removeAttribute(name);
        }
      });
  }

  /**
   * 处理文本节点
   * {{ prosen.name }} 插值的处理
   * @param text
   */
  compileText (text) {
    const textContent = text.textContent;
    if (util.matchTextNode(textContent)) {
      const regText = /{{(\s?.+?\s?)}}/g;
      const match = regText.exec(textContent);
      const type = match[1].trim();

      compileUtil.text(text, type, this.vm);
    }
  }

  /**
   * 判断 name 是否为 v-指令
   * @param name
   * @returns {*|boolean}
   */
  isDirective (name) {
    return name && name.startsWith('v-');
  }

  /**
   * 根据 el 根元素创建文档片段
   * @param el
   */
  createFragment (el) {
    const fragment = document.createDocumentFragment();
    let firstChild = el.firstChild;

    while (firstChild) {
      fragment.append(firstChild);
      firstChild = el.firstChild;
    }

    return fragment;
  }

  /**
   * 判断一个节点是否为元素节点
   * @param node
   * @return Boolean
   */
  isElementNode (node) {
    return node.nodeType === 1;
  }
}

export default Compile;
