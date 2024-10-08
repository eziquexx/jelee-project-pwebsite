const header = document.getElementById("header");
const mainMenu = document.getElementById("menu");
const headerHeight = header.offsetHeight;
const section = document.querySelector("section");
const aboutSection = document.getElementById("aboutSection");
const toggleBtn = document.getElementById("toggle-btn");
const toggleMenu = document.getElementById("toggle-menu");
const toggleBtnShape = document.querySelector(".toggle-btn-shape");

// header와 cardSection 거리 지정
section.style.marginTop = headerHeight + 70 + "px";

// header mouse event handler
// scrollY가 0일 때에만 header mouseenter, mouseleave 이벤트 효과
let mouseEnterHandler = function() {
  if (window.scrollY === 0) {
    header.style.backgroundColor = "#fff";
    header.style.borderBottom = "1px solid #ddd";
    header.style.boxShadow = "0px 1px 20px -10px rgba(0, 0, 0, 0.3)";
  }
};
let mouseLeaveHandler = function() {
  if (window.scrollY === 0) {
    header.style.backgroundColor = "transparent";
    header.style.borderBottom = "none";
    header.style.boxShadow = "none";
  }
};
function addMouseEventHandlers() {
  header.addEventListener("mouseenter", mouseEnterHandler);
  header.addEventListener("mouseleave", mouseLeaveHandler);
}
function removeMouseEventHandlers() {
  header.removeEventListener("mouseenter", mouseEnterHandler);
  header.removeEventListener("mouseleave", mouseLeaveHandler);
}
addMouseEventHandlers();



// window wheel event handler
// mouse wheel up일 때와 wheel down일 때의 효과
let wheelHandler = function() {
  let wheelMove = event.deltaY * -0.01;

  // toggleMenu가 block이 아니면 실행하게 만들기.
  if (toggleMenu.style.display !== "block") {
    // wheel down -1, wheel up +1
    // wheel down하면 navbar 안 보이게, wheel up하면 navbar 보이게
    if (wheelMove === 1) {
      header.style.transform = "translateY(0px)";
    } else if (wheelMove === -1 && this.window.scrollY >= 0) {
      //scrollY가 1미만이면 배경 안 보임. 1이상이면 배경과 togglebtn배경색 보임.
      header.style.transform = "translateY(-150px)";
    }
    // 스크롤 위치에 따라 navbar(header) 스타일 조정
    if (this.window.scrollY <= 100) {
      header.style.backgroundColor = "transparent";
      header.style.borderBottom = "none";
      header.style.boxShadow = "none";
    } else {
      header.style.backgroundColor = "#fff";
      header.style.borderBottom = "1px solid #ddd";
      header.style.boxShadow = "0px 1px 20px -10px rgba(0, 0, 0, 0.3)";
    }
  }
}
window.addEventListener("wheel", wheelHandler);


// 모바일 터치 이벤트 핸들러
let touchStartY = 0;
let touchEndY = 0;
// 모바일 터치후 움직일 때의 이벤트
function handleTouchMove(event) {
  const touchCurrentY = event.touches[0].clientY;
  if (touchCurrentY < touchStartY) {
      // 터치 다운 했을 때
      header.style.transform = "translateY(-150px)";
      header.style.backgroundColor = "transparent";
      header.style.borderBottom = "none";
      header.style.boxShadow = "none";
  } else {
      // 터치 업 했을 때
      header.style.transform = "translateY(0px)";
      header.style.backgroundColor = "#fff";
      header.style.borderBottom = "1px solid #ddd";
      header.style.boxShadow = "0px 1px 20px -10px rgba(0, 0, 0, 0.3)";
  }
}
// 모바일 터치 시작점의 Y값 구하기
function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY;
}
function handleTouchEnd() {
  // 모바일 터치가 끝난 시점의 Y값 구하여 저장
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  if (currentScrollTop === 0) {
    header.style.transform = "translateY(0px)";
    header.style.backgroundColor = "transparent";
    header.style.borderBottom = "none";
    header.style.boxShadow = "none";
  }
}
window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchmove', handleTouchMove);
window.addEventListener('touchend', handleTouchEnd);



// toggleBtn click event handler
toggleBtn.addEventListener("click", function() {

  toggleBtnShape.classList.toggle("on");

  if (toggleMenu.style.display === "block") {
    toggleMenu.style.display = "none";
    document.body.style.overflow = 'auto';
  } else {
    toggleMenu.style.display = "block";
    document.body.style.overflow = 'hidden';
    header.style.backgroundColor = "#fff";
    header.style.borderBottom = "1px solid #ddd";
    header.style.boxShadow = "0px 1px 20px -10px rgba(0, 0, 0, 0.3)";
    header.style.transform = "translateY(0px)";
    removeMouseEventHandlers();
  }
});


// 웹브라우저 너비에 따른 카드 스타일 요소들 나열 방식
function resizeStyle() {
  const cards = document.querySelectorAll(".cards");
  const windowW = window.innerWidth;
  // 브라우저 너비 마다 카드 갯수 제한
  cards.forEach(card => {
    for(let i = 0; i < cards.length; i++){
      
      // windowW >= 1200 경우, 4의 배수 카드는 marginRgiht 없음.
      if (windowW >= 1200) {
        cards[i].style.width = "23%";
        cards[i].style.marginRight = "0";
        cards[i].style.marginBottom = "4%";
        if (i % 4 === 0 ) {
          continue;
        }
        cards[i-1].style.marginRight = "2.5%";
      } else if (windowW >= 800) {
        // windowW >= 800 경우, 3의 배수 카드는 marginRgiht 없음.
        cards[i].style.width = "31%";
        cards[i].style.marginRight = "0";
        cards[i].style.marginBottom = "4%";
        if (i % 3 === 0 ) {
          continue;
        }
        cards[i-1].style.marginRight = "3.5%";
      } else if (windowW >= 600) {
        // windowW >= 600 경우, 2의 배수 카드는 marginRgiht 없음.
        cards[i].style.width = "48%";
        cards[i].style.marginRight = "0";
        cards[i].style.marginBottom = "6%";
        if (i % 2 === 0 ) {
          continue;
        }
        cards[i-1].style.marginRight = "4%";
      } else {
        // windowW 600 이하 경우, 2의 배수 카드는 marginRgiht 없음.
        cards[i].style.width = "86%";
        cards[i].style.margin = "0 auto 12%";
      }
    }
  });
}

// 브라우저 창의 크기가 변할 때마다 resize 이벤트 적용시키기
// 브라우저 창의 크기가 변할 때마다 resizeStyle 함수가 호출되어
// 카드가 media screen 을 사용했을 때 처럼 적용된다.
window.addEventListener("resize", resizeStyle);
resizeStyle();


// 로딩되었을 때 스크롤 위치를 구하는 코드 구하기.
// header가 load 이벤트를 통해 스크롤 위치가 어디인지에 따라서 효과 적용시켜주기.
window.addEventListener("load", function(){
  const windowY = window.scrollY;
  if (windowY > 100) {
    header.style.backgroundColor = "#fff";
    header.style.borderBottom = "1px solid #ddd";
    header.style.boxShadow = "0px 1px 20px -10px rgba(0, 0, 0, 0.3)";
  }
});


