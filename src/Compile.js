/**
 * @author qiqingfu
 * @date 2020-01-01 00:09
 */
import util from './util.js';
import Directive from './Directive.js';

const dorective = new Directive();

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
          dorective[type](node, value, this.vm, modifiers);
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

      dorective.text(text, type, this.vm);
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
