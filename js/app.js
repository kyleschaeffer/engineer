// Jump nav
var activeMenuItem = document.querySelector('.sidebar .menu-item.current');
if (activeMenuItem) {
  var headings = document.querySelectorAll('[data-jump]');
  if (headings.length) {
    var ul = document.createElement('ul');
    ul.classList.add('jump-nav');
    headings.forEach((heading) => {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href', '#' + heading.getAttribute('id'));
      a.textContent = heading.getAttribute('data-jump');
      li.appendChild(a);
      ul.appendChild(li);
    });
    activeMenuItem.appendChild(ul);
  }
}
