var $ = function (selector) {
  var selectors = selector.split(/(?=\#)|(?=\.)/);
  var domElements = [].slice.call(document.body.children);
  var selector = new Selector(domElements, selectors);
  return selector.collectElements();
};

function Selector(elements, selectors) {
  this.selector = {};
  this.cleanSelectors(selectors);
  this.elements = elements;
  this.collector = [];
}

Selector.prototype.cleanSelectors = function(selectors) {
  selectors.forEach((function(selector) {
    if (!selector.match(/\W/)) this.selector.tag = selector.toUpperCase();
    if (selector[0] === '#') this.selector.elementId = selector.slice(1);
    if (selector[0] === '.') this.selector.elementClass = selector.slice(1);
  }).bind(this));
};

Selector.prototype.collectByClassorId = function(element) {
  if (this.selector.elementId === element.id) this.collector.push(element);
  else if (this.selector.elementClass === element.className.split(' ')[0]) {
    this.collector.push(element);
  }
};

Selector.prototype.collectByTag = function(element) {
  if (!this.selector.elementId && !this.selector.elementClass) {
    this.collector.push(element);
  }
  this.collectByClassorId(element);
};

Selector.prototype.collectElements = function() {
  this.elements.forEach((function(element) {
    if (this.selector.tag === element.tagName) this.collectByTag(element);
    else if (!this.selector.tag) this.collectByClassorId(element);
  }).bind(this));
  return this.collector;
};
