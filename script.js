// 무한 부드러운 자동 슬라이드 구성
const sliderContainer = document.getElementById('sliderContainer');
const sliderTrack = document.getElementById('sliderTrack');

sliderContainer.style.scrollbarWidth = 'none'; // Firefox
sliderContainer.style.msOverflowStyle = 'none'; // IE 10+
sliderContainer.style.overflow = 'scroll';

const imageCount = 11;
const imageSources = Array.from({ length: imageCount }, (_, i) => `images/image${i + 1}.jpeg`);

let allSlides = [];

function createSlide(src) {
  const div = document.createElement('div');
  div.classList.add('slide');
  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);
  return div;
}

function populateSlides() {
  // 이미지 두 세트를 만들어 무한처럼 보이게
  const extendedSources = [...imageSources, ...imageSources];
  extendedSources.forEach(src => {
    const slide = createSlide(src);
    sliderTrack.appendChild(slide);
  });
  allSlides = document.querySelectorAll('.slide');
}

function startSmoothAutoSlide() {
  let position = 0;
  const slideWidth = allSlides[0].offsetWidth + 16; // 16은 여백 고려

  // 초기 스타일 설정
  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = `translateX(0px)`;

  function animate() {
    position += 0.5; // 이동 속도 (픽셀 단위)
    if (position >= slideWidth * imageSources.length) {
      position = 0;
      sliderTrack.style.transition = 'none';
      sliderTrack.style.transform = `translateX(0px)`;
    } else {
      sliderTrack.style.transition = 'transform 0.03s linear';
      sliderTrack.style.transform = `translateX(-${position}px)`;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  populateSlides();
  setTimeout(startSmoothAutoSlide, 100);
});
