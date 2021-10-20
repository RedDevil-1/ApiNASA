async function PicDayFetch(
  api = "https://api.nasa.gov/planetary/apod?api_key=wzEWBcCyCMUgzT3e0iHMaeDspeY42bWAtNJVyarO"
) {
  const PicResponse = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=wzEWBcCyCMUgzT3e0iHMaeDspeY42bWAtNJVyarO"
  );
  const PicData = await PicResponse.json();
  getRequestOfPic = "https://api.nasa.gov/planetary/apod";

  image = document.getElementById("image");
  explanation = document.getElementById("explanation");
  title = document.getElementById("title");
  date1 = document.getElementById("date");
  date1.value = PicData.date;
  image.src = PicData.url;
  title.textContent = PicData.title;
  explanation.textContent = PicData.explanation;
  console.log(PicData);
}

PicDayFetch();
buttonClick = document.getElementById("go");
buttonClick.addEventListener("click", function () {
  date1 = document.getElementById("date").value.toString();
  PicDayFetch(
    `https://api.nasa.gov/planetary/apod?api_key=wzEWBcCyCMUgzT3e0iHMaeDspeY42bWAtNJVyarO&date=${date1}`
  );
});
