// 返回顶部按钮 | Back to Top Button
(function() {
  'use strict';

  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = '返回顶部 | Back to Top';
  btn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #660874;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9998;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  btn.addEventListener('mouseenter', () => {
    btn.style.background = '#4ecdc4';
    btn.style.transform = 'scale(1.1)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = '#660874';
    btn.style.transform = 'scale(1)';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  });
})();
