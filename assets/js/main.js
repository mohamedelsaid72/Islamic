/* Date & Time */

// date
let today = new Date(),
  day = today.getDate(),
  month = today.getMonth() + 1;

function appendZero(value) {
  return "0" + value;
}

if (day < 10) {
  day = appendZero(day);
}
if (month < 10) {
  month = appendZero(month);
}

today = `${day} / ${month} / ${today.getFullYear()}`;
document.getElementById("date").innerHTML = today;

// time
let myVar = setInterval(() => {
  document.getElementById("time").innerHTML = new Date().toLocaleTimeString(
    "en-us"
  );
}, 1000);

/* Date & Time */

/* Start btn */
let startBtn = document.querySelector(".landing .btn");
startBtn.addEventListener("click", () => {
  scrollTo(0, 550);
});
/* Start btn */

/* Menu toggle */
let menu_icon = document.querySelector(".menu-icon"),
  links = document.querySelector(".links"),
  close = document.querySelector(".close");
menu_icon.addEventListener("click", () => {
  links.classList.add("active");
});
close.addEventListener("click", () => {
  links.classList.remove("active");
});

let link = document.querySelectorAll(".navbar .container .links li");
link.forEach((link) => {
  link.addEventListener("click", (e) => {
    links.classList.remove("active");
  });
});
/* Menu toggle */

/* Sticky Navbar */
window.addEventListener("scroll", () => {
  if (window.scrollY > document.querySelector(".date-time").offsetHeight) {
    document.querySelector(".navbar").classList.add("sticky");
  } else {
    document.querySelector(".navbar").classList.remove("sticky");
  }
});
/* Sticky Navbar */

/* active links onscroll */
const sections = document.querySelectorAll("section"),
  navLinks = document.querySelectorAll(".navbar .links li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop,
      sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((navLink) => {
    navLink.classList.remove("check");
    if (navLink.classList.contains(current)) {
      navLink.classList.add("check");
    }
  });
});
/* active links onscroll */

/* audio player */
let play = document.querySelector(".play"),
  playicon = document.querySelector(".play i"),
  audio = document.querySelector("audio");

play.addEventListener("click", () => {
  if (playicon.classList.contains("fa-play")) {
    audio.play();
    playicon.classList.remove("fa-play");
    playicon.classList.add("fa-pause");
  } else if (playicon.classList.contains("fa-pause")) {
    audio.pause();
    playicon.classList.remove("fa-pause");
    playicon.classList.add("fa-play");
  }
});

audio.onended = function () {
  playicon.classList.remove("fa-pause");
  playicon.classList.add("fa-play");
};
/* audio player */

/* Prayer Time */
hijri = document.querySelector(".tarikh-hijri");
fetch(
  "http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt%20Arab%20Emirates&method=8"
)
  .then((response) => response.json())
  .then((data) => {
    hijri.innerHTML = `${data.data.date.hijri.weekday.ar} : ${data.data.date.hijri.month.number}  ${data.data.date.hijri.month.ar}  ${data.data.date.hijri.year}`;
    document.querySelector(".Fajr .salat-time").innerHTML =
      data.data.timings.Fajr;
    document.querySelector(".Dhuhr .salat-time").innerHTML =
      data.data.timings.Dhuhr;
    document.querySelector(".Asr .salat-time").innerHTML =
      data.data.timings.Asr;
    document.querySelector(".Maghrib .salat-time").innerHTML =
      data.data.timings.Maghrib;
    document.querySelector(".Isha .salat-time").innerHTML =
      data.data.timings.Isha;
  });
/* Prayer Time */

/* Quran */
let surahsContainer = document.querySelector(".quran-box ul");
getSurah();
function getSurah() {
  // fetch surahs meta data
  fetch("http://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((quranAPI) => {
      let surahs = quranAPI.data.surahs.references;
      let numOfSurah = 114;
      surahsContainer.innerHTML = "";
      for (let i = 0; i < numOfSurah; i++) {
        surahsContainer.innerHTML += `
            <li class="surah">
            <p>${surahs[i].name}</p>
            </li>`;
      }

      /* Popup Model */
      let closeIcon = document.querySelector(".popup-model .close"),
        surahsTitle = document.querySelectorAll(".quran .quran-box .surah"),
        popupModel = document.querySelector(".popup-model"),
        ayat = document.querySelector(".ayat");

      surahsTitle.forEach((surah, index) => {
        surah.addEventListener("click", () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((surahApi) => {
              ayat.innerHTML = "";
              let ayas = surahApi.data.ayahs;
              ayas.forEach((aya) => {
                popupModel.classList.add("active");
                ayat.innerHTML += `<p>${aya.text}  <span>${aya.numberInSurah}</span></p>`;

                let plus = document.querySelector(".plus"),
                  minus = document.querySelector(".minus"),
                  reset = document.querySelector(".reset"),
                  value = 16;

                plus.addEventListener("click", () => {
                  value += 2;
                  ayat.querySelectorAll("p").forEach((oneAyat) => {
                    oneAyat.style.fontSize = `${value}px`;
                  });
                });

                minus.addEventListener("click", () => {
                  if (value === 16) {
                    ayat.querySelectorAll("p").forEach((oneAyat) => {
                      oneAyat.style.fontSize = "16px";
                    });
                  } else if (value > 16) {
                    value -= 2;
                    ayat.querySelectorAll("p").forEach((oneAyat) => {
                      oneAyat.style.fontSize = `${value}px`;
                    });
                  }
                });
                reset.addEventListener("click", () => {
                  value = 16;
                  ayat.querySelectorAll("p").forEach((oneAyat) => {
                    oneAyat.style.fontSize = `${value}px`;
                  });
                });
              });
            });
        });
      });

      closeIcon.addEventListener("click", () => {
        popupModel.classList.remove("active");
      });
    });
  /* Popup Model */
}
/* Quran */

/* Tasbeh Slider */
let i = 0;
let classes = ["one", "two", "three", "four", "five", "six"],
  arrows = document.querySelectorAll(".arrow"),
  sebhas = document.querySelectorAll(".sebha"),
  sebhaBtns = document.querySelectorAll(".sebha-btn");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    if (arrow.classList.contains("right-arrow")) {
      i++;
      if (i >= classes.length) {
        i = 0;
      }
    } else if (arrow.classList.contains("left-arrow")) {
      i--;
      if (i < 0) {
        i = classes.length - 1;
      }
    }
    let target = classes[i];
    sebhas.forEach(function (sebha) {
      sebha.classList.remove("active");
      if (sebha.classList.contains(target)) {
        sebha.classList.add("active");
      }
    });
  });
});
sebhaBtns.forEach((sebhaBtn) => {
  sebhaBtn.innerHTML = 0;
  sebhaBtn.addEventListener("click", (e) => {
    e.target.value++;
    e.target.innerHTML = e.target.value;
  });
});
/* Tasbeh Slider */

/* Azkar */
let azkarLinks = document.querySelectorAll(".zkr-li"),
  zkrTexts = document.querySelectorAll(".zkr-text "),
  moreBtns = document.querySelectorAll(".azkar .moreBtn"),
  moreDivs = document.querySelectorAll(".azkar .container #moreDiv ");

azkarLinks.forEach((azkarLink) => {
  azkarLink.addEventListener("click", () => {
    document.querySelector(".zkr-li.checked").classList.remove("checked");
    azkarLink.classList.add("checked");
    document.querySelector(".zkr-text.active").classList.remove("active");
    let target = azkarLink.dataset.filter;
    zkrTexts.forEach((zkrText) => {
      if (zkrText.classList.contains(target)) {
        zkrText.classList.add("active");
      }
    });
  });
});

moreBtns.forEach((moreBtn) => {
  moreBtn.addEventListener("click", (e) => {
    if (e.target.innerHTML === "أظهر المزيد") {
      moreDivs.forEach((moreDiv) => {
        if (moreDiv.className === e.target.id) {
          document.querySelector(`.azkar .${e.target.id}`).style.display =
            "block";
        }
      });
      e.target.innerHTML = "إخفاء";
    } else {
      document.querySelector(`.azkar .${e.target.id}`).style.display = "none";
      e.target.innerHTML = "أظهر المزيد";
    }
  });
});
/* Azkar */
