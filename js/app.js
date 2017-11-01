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

// Video controls
var player = {
  // Elements
  stage: document.querySelector('.stage'),
  video: document.querySelector('video'),
  playBtn: document.querySelector('.play'),
  againBtn: document.querySelector('.play-again'),

  // Clear the stage
  clear: function() {
    player.stage.classList.remove('lobby');
    player.stage.classList.remove('curtains');
  },

  // Put stage in lobby mode
  lobby: function() {
    player.stage.classList.add('lobby');
  },

  // Put stage in curtains mode
  curtains: function() {
    player.stage.classList.add('curtains');
  },

  // Play video
  play: function() {
    player.clear();
    player.video.play();
    player.playBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    player.playBtn.classList.add('paused');
  },

  // Pause video
  pause: function() {
    player.video.pause();
    player.playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    player.playBtn.classList.remove('paused');
  },

  // Toggle play/pause
  toggle: function() {
    if (player.video.paused) player.play();
    else player.pause();
  },

  // Restart video
  restart: function() {
    player.clear();
    player.video.currentTime = 0;
    if (player.video.paused) player.play();
  },

  // Init player
  init: function() {
    if (player.stage) player.lobby();
    if (player.playBtn) player.playBtn.addEventListener('click', player.toggle);
    if (player.againBtn) player.againBtn.addEventListener('click', player.restart);
    if (player.video) {
      player.video.addEventListener('ended', player.curtains);
      player.video.addEventListener('click', player.toggle);
    }
  },
};
player.init();
