/** @type {HTMLElement} */
const previousButton = document.querySelector('.bi-chevron-left')

/** @type {HTMLElement} */
const nextButton = document.querySelector('.bi-chevron-right')

/** @type {HTMLElement} */
const slidesContainer = document.querySelector('.slides-container')

/** @type {HTMLElement} */
const body = document.querySelector('body')

/** @type {NodeListOf<HTMLElement>} */
const sections = document.querySelectorAll('section')

/** @type {NodeListOf<HTMLElement>} */
const bullets = document.querySelectorAll('.bullets > button')

let index = 0
const maxIndex = 2


const setUi = () => {
  if (index === 0) previousButton.style.display = 'none'
  else previousButton.style.display = 'grid'

  if (index === maxIndex) nextButton.style.display = 'none'
  else nextButton.style.display = 'grid'

  slidesContainer.style.transform = `translateX(-${index * 100}%)`

  const { backgroundColor } = getComputedStyle(sections[index])
  body.style.backgroundColor = backgroundColor

  for (const bullet of bullets) bullet.classList.remove('active')
  bullets[index].classList.add('active')
}
setUi()

previousButton.addEventListener('click', () => {
  if (index > 0) index--
  setUi()
})
nextButton.addEventListener('click', () => {
  if (index < maxIndex) index++
  setUi()
})

const touchData = {
  carouselWidth: slidesContainer.offsetWidth,
  startTouchX: 0,
  lastDeltaX: 0,
}

slidesContainer.addEventListener('touchstart', (e) => {
  touchData.startTouchX = e.touches[0].screenX
  touchData.carouselWidth = slidesContainer.offsetWidth
  slidesContainer.style.transition = 'none'
})

slidesContainer.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].screenX - touchData.startTouchX

  if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0)) return

  touchData.lastDeltaX = deltaX

  const basePercentTranslate = index * -100
  const percentTranslate =
    basePercentTranslate + (100 * deltaX) / touchData.carouselWidth
  slidesContainer.style.transform = `translate(${percentTranslate}%)`
})

slidesContainer.addEventListener('touchend', (e) => {
  if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
    if (index !== 0 && touchData.lastDeltaX > 0) index--
    if (index !== maxIndex && touchData.lastDeltaX < 0) index++
  }
  slidesContainer.style.transition = ''
  setUi()
})

for (let i = 0; i < bullets.length; i++)
  bullets[i].addEventListener('click', () => {
    index = i
    setUi()
  })


//suite du code 
let prevButton = null;

const button = document.querySelector('.pays');
const first_btn = document.getElementById('france');
//le bouton france est par defaut activé..
first_btn.classList.add('actived');
prevButton = first_btn;

button.addEventListener('click', (e) => {
  const clickedButton = e.target;
  
  if (clickedButton === prevButton) {   // il va ignore si le bouton deja activé est appuyé
    return; 
  }
  
  prevButton.classList.remove('actived'); // supprime le .actived
  
  clickedButton.classList.add('actived'); // ajoute le .actived
  prevButton = clickedButton; // met a jour le boutton 
});
