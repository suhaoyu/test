//let page = 1;
const PAGE_SiZE = 9;

let offset = 0;
let dataset;

fetch("/pokemon")
    .then(res => res.json())
    .then(res => {
        dataset = res;
        render();
    });

const getCard = data => {
    return `
    <div class="card">
      <div class="card-image">
        <img
          src="${data.img}"
        />
      </div>
      <div class="card-content">
        <span class="id">No. ${data.id}</span>
        <p class="name">${data.name}</p>
      </div>
    </div>
  `;
};

const input = document.querySelector("input");
input.addEventListener("keyup", function() {
    const html = dataset
        .filter(obj => obj.name.includes(input.value)) // 過濾出名字有皮的神奇寶貝
        .map(obj => getCard(obj)); // 把寶可夢的資料轉成一張一張卡片

    renderPokemonBox(html);
});

function render() {
    const html = dataset
        .slice(offset, offset + PAGE_SiZE)
        .map(obj => getCard(obj));
    renderPokemonBox(html);
}

render();
//slice((page-1)*9,page*9) //一次取9筆
//.slice((page - 1) * PAGE_SiZE, page * PAGE_SiZE)
// .filter(obj => obj.id >= 130) // 過濾出編號大於130的神奇寶貝
// .filter(obj => obj.name.includes("皮")) // 過濾出名字有皮的神奇寶貝
// .sort(compareDesc) // 從大排到小
//.map(obj => getCard(obj)); // 把寶可夢的資料轉成一張一張卡片

function renderPokemonBox(html) {
    const box = document.getElementById("pokemon-box");
    box.innerHTML = html;
}

// 初始化

// IIFE
// (html => {
//   const box = document.getElementById("pokemon-box");
//   box.innerHTML = html;
// })(html)

//分頁功能

const prevBtn = document.querySelector(".prev-page");
prevBtn.addEventListener("click", function() {
    //page--
    offset = offset - PAGE_SiZE; //順序重要!，要放最前，不然要按兩下按鈕
    //防呆機制
    nextBtn.classList.remove("disabled");
    if (offset <= 0) {
        prevBtn.classList.add("disabled");
    }
    //如果按紐被disable then return
    if (prevBtn.classList.contains("disabled")) return;
    render();
    console.log(offset);
});

const nextBtn = document.querySelector(".next-page");
nextBtn.addEventListener("click", function() {
    //page++;
    offset = offset + PAGE_SiZE; //順序重要!，要放最前，不然要按兩下按鈕
    //防呆機制
    prevBtn.classList.remove("disabled");

    if (offset + PAGE_SiZE >= dataset.length) {
        nextBtn.classList.add("disabled");
    }
    //如果按紐被disable then return

    if (nextBtn.classList.contains("disabled")) return;

    //render data
    render();
    console.log(offset);
});