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

  //set shuffled image in the attribute
  totalAnimalGrid?.forEach((item, index) => {
    const card = document.getElementById(`card-${index}`);
    if (card) {
      card.setAttribute("data-image", `assets/${item}`);
    }
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

function handleFlipCard(cardId) {
  const card = document.getElementById(cardId);
  card.classList.add("rotate");
  card.classList.add(`flipped`);
  const dataImage = card.getAttribute("data-image");
  const image = card.querySelector("img");
  image.src = dataImage;

  setTimeout(() => {
    card.classList.remove("rotate");
  }, 100);

  //check the match
  const flippedCard = document.querySelectorAll(".flipped");
  const previousFlippedCard = flippedCard[0];
  const lastFlippedCard = flippedCard[1];

  const removeClassName = (name) => {
    previousFlippedCard.classList.remove(name);
    lastFlippedCard.classList.remove(name);
  };

  const addClassName = (name) => {
    previousFlippedCard.classList.add(name);
    lastFlippedCard.classList.add(name);
  };

  if (flippedCard?.length > 1) {
    removeClassName("flipped");
    if (
      lastFlippedCard?.dataset?.image !== previousFlippedCard?.dataset?.image
    ) {
      setTimeout(() => {
        addClassName("rotate");
        const image = previousFlippedCard.querySelector("img");
        const lastFlippedCardImage = lastFlippedCard.querySelector("img");
        lastFlippedCardImage.src = "assets/squareImage.png";
        image.src = "assets/squareImage.png";
      }, 900);
      setTimeout(() => {
        removeClassName("rotate");
      }, 1000);
    } else {
      addClassName("matched");
      setTimeout(() => {
        removeClassName("rotate");
        if (document.querySelectorAll(".matched")?.length === 16) {
          const header = document.querySelector("#winner");
          header.style.display = "block";
        }
      }, 500);
    }
  }
}

function handleReset() {
  handleInitialLoad();
  const header = document.querySelector("#winner");
  header.style.display = "none";
}
