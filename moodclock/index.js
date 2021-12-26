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
  const clock = document.querySelector('#clock');
  const aw = arrow.getBoundingClientRect().width / 2;
  const ah = arrow.getBoundingClientRect().height / 2;
  const clockCenter =
    clock.getBoundingClientRect().width / 2 +
    clock.getBoundingClientRect().left;
  const spacerHeight = 80;
  const pointerX = clockCenter - aw;
  const pointerY =
    clock.getBoundingClientRect().height * 0.41 - ah + spacerHeight;
  arrow.style.left = pointerX;
  arrow.style.top = pointerY;

  arrow.style.transform = `rotate(${angle}rad)`;
  const buttonRight = document.querySelector('#button_right');
  const buttonLeft = document.querySelector('#button_left');
  buttonLeft.onclick = clickLeft;
  buttonRight.onclick = clickRight;
};
