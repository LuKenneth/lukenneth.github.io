window.onload = function () {
  let angle = parseFloat(localStorage.getItem('angle')) || 0;

  function clickRight() {
    angle += 0.2;
    arrow.style.transform = `rotate(${angle}rad)`;
    updatePosition(angle);
  }

  function clickLeft() {
    angle -= 0.2;
    arrow.style.transform = `rotate(${angle}rad)`;
    updatePosition(angle);
  }

  function updatePosition(newAngle) {
    localStorage.setItem('angle', newAngle);
  }

  const arrow = document.querySelector('#pointer');
  arrow.style.transform = `rotate(${angle}rad)`;
  const buttonRight = document.querySelector('#button_right');
  const buttonLeft = document.querySelector('#button_left');
  buttonLeft.onclick = clickLeft;
  buttonRight.onclick = clickRight;
};
