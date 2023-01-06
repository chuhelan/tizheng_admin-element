export const imageError = {
  inserted(dom, options) {
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}

