function handleInitialLoad() {
  //set the array
  const animals = [
    "bear.png",
    "bee.png",
    "koala.png",
    "lion.png",
    "owl.png",
    "panda.png",
    "tiger.png",
    "turtle.png",
  ];
  const totalAnimalGrid = [...animals, ...animals];

  //shuffle images
  totalAnimalGrid?.forEach((_, index) => {
    const count = Math.floor(
      Math.random() * (totalAnimalGrid?.length - index) + 1
    );
    [totalAnimalGrid[index], totalAnimalGrid[count]] = [
      totalAnimalGrid[count],
      totalAnimalGrid[index],
    ];
  });
  console.log("test", { totalAnimalGrid });
  //set shuffled image in the attribute
  totalAnimalGrid?.forEach((item, index) => {
    const card = document.getElementById(`card-${index}`);
    console.log("test", { card, index });
    card.setAttribute("data-image", `assets/${item}`);
  });

  document.querySelectorAll(".card")?.forEach((card) => {
    card.classList.add("rotate");
    card.classList.remove("flipped");
    card.classList.remove("matched");
    const img = card.querySelector("img");
    img.src = "assets/squareImage.png";
    setTimeout(() => {
      card.classList.remove("rotate");
    }, 100);
  });
}
