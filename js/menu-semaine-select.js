allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

const containerFav = document.getElementById("container-fav-list");
containerFav.style.display = "none";

// bouton bas de page pour scroll to top
const noFitAll = window.matchMedia("(max-width: 1340px)");
const buttonBottom = document.getElementById("bottom-button");

console.log(noFitAll.matches);

if (noFitAll.matches) {
  buttonBottom.style.display = "flex";
  buttonBottom.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
} else {
  buttonBottom.style.display = "none";
}

// affiche planning
const showPlanning = () => {
  const weekDay = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const weekDayContainer = document.getElementById("week-day-container");

  weekDay.forEach((day) => {
    weekDayContainer.innerHTML += `
      <div class="day">
            <h2>${day}</h2>
            <div class="box-planning">
              <!-- midi -->
              <div id="time-day" class="time-day">
                <h4 class="title-meal">Midi</h4>
                <div class="meal-time-box">
                  <div class="meal-box">
                    <h3>Entrée</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-starter">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                  <div class="meal-box">
                     <h3>Plat</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-dish">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                  <div class="meal-box">
                    <h3>Dessert</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-dessert">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="separator">
              <!-- soir -->
              <div id="time-day" class="time-day">
                <h4 class="title-meal">Soir</h4>
                <div class="meal-box">
                    <h3>Entrée</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-starter">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
                <div class="meal-box">
                    <h3>Plat</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-dish">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
                <div class="meal-box">
                    <h3>Dessert</h3>
                    <div class="saved-recipe"></div>
                    <div class="button-select">
                        <select name="category" class="category-dessert">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
          </div>
      `;
  });
};
showPlanning();

// remplissage des selects avec les recettes recipes-week
const selectButton = () => {
  const selectStarter = document.getElementsByClassName("category-starter");
  const selectDish = document.getElementsByClassName("category-dish");
  const selectDessert = document.getElementsByClassName("category-dessert");

  recipesWeek.forEach((recipe) => {
    // const index = recipesWeek.indexOf(recipe);
    if (recipe.categorie === "Entrée") {
      for (let select of selectStarter) {
        select.classList.add("starter");
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", recipe.nom);
        select.appendChild(option);
      }
    } else if (recipe.categorie === "Plat principal") {
      for (let select of selectDish) {
        select.classList.add("dish");
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", recipe.nom);
        select.appendChild(option);
      }
    } else {
      for (let select of selectDessert) {
        select.classList.add("dessert");
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", recipe.nom);
        select.appendChild(option);
      }
    }
  });
};
selectButton();

// sauvegarde planning
const selectAll = document.getElementsByName("category");
const savePlanning = () => {
  let savedPlanning = [];
  for (let select of selectAll) {
    console.log(select.value);
    if (select.value === "--Choix--") {
      savedPlanning.push(null);
    } else {
      const recipeName = select.value;
      savedPlanning.push(recipeName);
    }
    localStorage.setItem("saved-planning", JSON.stringify(savedPlanning));
  }
};

// remplir planning
const fillPlanningP = () => {
  const savedPlanning = JSON.parse(localStorage.getItem("saved-planning"));
  const savedRecipe = document.getElementsByClassName("saved-recipe");
  const select = document.getElementsByClassName("button-select");

  savedPlanning.forEach((element, index) => {
    const selectBox = select[index];
    const box = savedRecipe[index];
    box.innerHTML = "";

    if (element) {
      selectBox.style.display = "none";
      // recréer l'etiquette de la recette
      box.classList.add("saved-recipe", "recipe");

      const newElementP = document.createElement("p");
      newElementP.innerText = element;
      box.appendChild(newElementP);

      // div icon
      const boxIcons = document.createElement("div");
      boxIcons.classList.add("box-icons");

      // icon info recette
      const newElementInfo = document.createElement("img");
      newElementInfo.setAttribute("src", "../assets/img/icon-info.png");
      newElementInfo.classList.add("info-tag");
      boxIcons.appendChild(newElementInfo);

      newElementInfo.addEventListener("click", () => {
        let index;
        allRecipe.forEach((recipe) => {
          if (element === recipe.nom) {
            index = allRecipe.indexOf(recipe);
          }
        });
        window.scrollTo(0, 0);
        openModal();
        createModal(index);
      });

      // icon remove image
      const newElementImg = document.createElement("img");
      newElementImg.setAttribute("src", "../assets/img/icon-remove.png");
      newElementImg.classList.add("remove-tag");
      boxIcons.appendChild(newElementImg);

      newElementImg.addEventListener("click", () => {
        box.innerHTML = "";
        box.classList.remove("recipe");
        selectBox.style.display = "block";
        const selectElement = selectBox.querySelector("select");
        if (selectElement) {
          selectElement.value = "--Choix--";
        }
        savedPlanning[index] = null;
        localStorage.setItem("saved-planning", JSON.stringify(savedPlanning));
      });

      box.appendChild(boxIcons);
    }
  });
};

// évènement sauvegarde button
const buttonSave = document.getElementById("save-planning");
buttonSave.addEventListener("click", () => {
  savePlanning();
  fillPlanningP();
  const savedPlanning = JSON.parse(localStorage.getItem("saved-planning"));
  const recipeIn = savedPlanning.some((recipe) => recipe !== null);
  if (recipeIn) {
    infoMsg.classList.add("greenMsg");
    infoMsg.innerHTML = "Planning sauvegardé !";
    setTimeout(() => {
      infoMsg.innerHTML = "";
      infoMsg.classList.remove("greenMsg");
    }, 700);
  }
});

// rempli planning si sauvegarde
if (localStorage.getItem("saved-planning") !== null) {
  fillPlanningP();
}

// P:
// si supprimer => supprimer de la sauvegarde et reaffiche le select (remettre box?)

// GENERATION LISTE DE COURSES:
// si sauvegarde => possibilité de générer la liste de courses

// REINITIALISER LE PLANNING:
// supprime les p et les remplace par des selects
