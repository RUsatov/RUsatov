function getPath (el) {
  let element  = el,
      selector = ''
  do {
    let parentSelector = ''
    const classes = element.classList,
          id      = element.id,
          tag     = element.tagName
    if (id) {
      parentSelector = '#' + id
    } else if (classes.length) {
      parentSelector = '.' + classes[0]
    } else {
      parentSelector = tag
    }
    if (document.querySelectorAll(parentSelector + ' ' + selector).length > 1) {
      const list = document.querySelectorAll(parentSelector)
      if (list.length > 1) {
        let count    = 0,
            position = 0
        for (let item of list) {
          if (item.parentElement === element.parentElement) {
            count++
            if (item === element) position = count
          }
        }
        if (count > 1) parentSelector += `:nth-child(${position})`
      }
    }
    selector = parentSelector.toLowerCase() + (selector !== '' ? ' > ' : '') + selector
    if (document.querySelectorAll(selector).length === 1) return selector
    element = element.parentElement
  } while (element !== null && element.tagName !== 'HTML')
  return selector
}
