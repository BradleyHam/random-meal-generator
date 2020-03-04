let button = document.querySelector("button");
let ul = document.getElementById("list");
let section3 = document.querySelector(".section-3");
let section1 = document.querySelector(".section-1")

const getRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(data => data.json())
        .then(data => showMeal(data))
}

const showMeal = ({ meals }) => {
    //   ------   col 1

    let mealsObj = meals[0];



    displayCard(mealsObj)
    displayList(mealsObj)
    displayInstructions(mealsObj)
}

function displayCard(mealsObj) {
    let thumb = mealsObj.strMealThumb;
    let mealTitle = mealsObj.strMeal;
    let area = mealsObj.strArea;
    console.log(area)

    section1.innerHTML =
        `  

    <div id="card">
        <div class="card__title-container" ">
          <h1 class="card__title" id='card-title'>${mealTitle}</h1>
        </div>

      <div class="card__thumbnail" style="background: no-repeat center/cover url('${thumb}')">
           <div class='area-tag'>${area}</div>
        </div>
     </div>
  `
}

const displayInstructions = mealsObj => {
    section3.innerText = '';

    let instructions = document.createElement("h1");
    instructions.innerText = 'Instructions';

    let instructionP = document.createElement("p");
    instructionP.innerText = mealsObj.strInstructions;

    section3.appendChild(instructions);
    section3.appendChild(instructionP);

}


const displayList = mealsObj => {
    ul.innerText = '';
    let ingredientsTitle = document.createElement('h1');
    ingredientsTitle.innerText = "Ingredients";
    ul.appendChild(ingredientsTitle)
    let ingredients =
        Object.keys(mealsObj)
            .filter(i => i.startsWith("strIngredient"))
            .map(i => mealsObj[i])
            .filter(i => i !== '');

    let list = ingredients.forEach(i => {
        let li = document.createElement('li');

        li.innerText = i;


        ul.appendChild(li)
    })
}

button.addEventListener("click", () => {
    getRandomMeal()

})

document.addEventListener("keyup", (e) => {
    if (e.which === 13 || e.which === 32) {
        console.log('hello')
        getRandomMeal()
    }
})