// Jump nav
var activeMenuItem = document.querySelector('.sidebar .menu-item.current');
if (activeMenuItem) {
  var headings = document.querySelectorAll('[data-jump]');
  if (headings.length) {
    var ul = document.createElement('ul');
    ul.classList.add('jump-nav');
    for (var i = 0; i < headings.length; i++) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href', '#' + headings[i].getAttribute('id'));
      a.textContent = headings[i].getAttribute('data-jump');
      li.appendChild(a);
      ul.appendChild(li);
    }
    activeMenuItem.appendChild(ul);
  }
}
