let index = 2;
let tickName = document.getElementById('ticketName');
let ticketImgUrl = document.getElementById('ticketImgUrl');
let ticketRegion = document.getElementById('ticketRegion');
let ticketPrice = document.getElementById('ticketPrice');
let ticketNum = document.getElementById('ticketNum');
let ticketRate = document.getElementById('ticketRate');
let ticketDescription = document.getElementById('ticketDescription');
let submit = document.getElementById('submit');
let searchResultText = document.getElementById('searchResult-text');
let searchResultFail = document.querySelector('.searchResultFail');
let ul = document.querySelector('.ticketCard-area');
let searchValue = document.querySelector('.searchValue');
let regionSearch = document.querySelector('.regionSearch');
let searchResult = [];
let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

formInit();
getData('全部地區', false);

submit.addEventListener('click',(e)=>{
    index += 1;
    let ticketData = {
        id: index,
        name: tickName.value,
        imgUrl: ticketImgUrl.value,
        area: ticketRegion.value,
        price: ticketPrice.value,
        group: ticketNum.value,
        rate: ticketRate.value,
        description: ticketDescription.value,
    }

    formInit();
    data.push(ticketData);
    getData('全部地區', false);
})

regionSearch.addEventListener('click', (e)=>{
    if(searchValue.textContent == '全部地區' || (e.target.value != searchValue.textContent)){
      searchValue.textContent = e.toElement.value;
      getData(e.toElement.value, true);
    }
})

function formInit(){
    tickName.value = '';
    ticketImgUrl.value = '';
    ticketRegion.value = '';
    ticketPrice.value = '';
    ticketNum.value = '';
    ticketRate.value = '';
    ticketDescription.value = '';
    regionSearch.value = '全部地區'
}

function buildTicketCard(ticketData){
    let ticketCardTemplate = `<li class="ticketCardBox col-12 col-sm-6 col-lg-4">
    <div class="ticketCard position-relative rounded-sm mb-xxs-10">
      <div class="ticketCard-img position-relative">
        <a href="#">
          <img class="img-fluid" src="${ticketData.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region position-absolute bg-fountainBlue py-xxs-3 px-xxs-4 text-white border-right-radius top-y-xxs-10">${ticketData.area}</div>
        <div class="ticketCard-rank position-absolute bg-teal py-xxs-3 px-xxs-4 text-white border-right-radius bottom-y-xxs-20">${ticketData.rate}</div>
      </div>
      <div class="ticketCard-content p-xxs-5">
        <div class="mb-xxs-4">
          <h3 class="border-bottom mb-xxs-4">
            <a href="#" class="ticketCard-name text-xxs-sm text-teal">${ticketData.name}</a>
          </h3>
          <p class="ticketCard-description text-gray-600">
          ${ticketData.description}
          </p>
        </div>
        <div class="ticketCard-info d-flex justify-content-between align-items-center">
          <p class="ticketCard-num text-xxs-16 text-teal">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${ticketData.group} </span> 組
          </p>
          <div class="ticketCard-price text-teal d-flex align-items-center">
            <span class="text-xxs-xs mr-xxs-1">TWD </span>
            <span id="ticketCard-price" class="text-xxs-lg text-teal">${ticketData.price}</span>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  ul.innerHTML += ticketCardTemplate;
}

function getData(target, state){
  ul.innerHTML = '';
  searchResult = [];

  data.forEach( item => {
      if(target == item.area || target == '全部地區'){
        buildTicketCard(item);
        searchResult.push(item);
      }
  });

  searchResultText.textContent = `本次搜尋共 ${searchResult.length} 筆資料`;

  if(searchResult.length == 0 && state == true){
    searchResultFail.classList.remove('d-none');
    searchResultFail.classList.add('d-block');
  }else{
    searchResultFail.classList.remove('d-block');
    searchResultFail.classList.add('d-none');
  }
}
