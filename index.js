class Commodity {
    constructor(name, isSecInc, returnMoney, maxAmount, price, currentAmount, url) {
        this.name = name;
        this.isSecInc = isSecInc;
        this.returnMoney = returnMoney;
        this.maxAmount = maxAmount;
        this.currentAmount = currentAmount;
        this.price = price;
        this.url = url;
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.age = 20;
        this.days = 0;
        this.money = 15000;
        this.amountCommodity = new Map();
        for (let ele of commodity) {
            this.amountCommodity.set(ele.name, ele);
        }
    }
}

const config = {
    welcomePage: document.getElementById("welcome"),
    gamePage: document.getElementById("game"),
    name: document.getElementById("userName"),
};

const commodity = [
    new Commodity("burger", false, 25, Infinity, 0, 1, "https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png"),
    new Commodity("Flip", true, 25, Infinity, 500, 0, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
    new Commodity("ETF Stock", true, 0.001, Infinity, 300000, 0, "https://cdn.pixabay.com/photo/2018/03/15/11/29/bitcoin-3227945_960_720.png"),
    new Commodity("ETF Bounds", true, 0.0007, Infinity, 300000, 0, "https://cdn.pixabay.com/photo/2018/03/15/11/29/bitcoin-3227945_960_720.png"),
    new Commodity("Lemonade Stand", true, 30, 1000, 30000, 0, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
    new Commodity("Ice Cream Truck", true, 120, 500, 100000, 0, "https://cdn.pixabay.com/photo/2016/07/27/03/11/ice-cream-1544475_960_720.png"),
    new Commodity("House", true, 32000, 100, 20000000, 0, "https://cdn.pixabay.com/photo/2013/07/13/12/48/cottage-160367_960_720.png"),
    new Commodity("TownHouse", true, 64000, 100, 40000000, 0, "https://cdn.pixabay.com/photo/2012/05/07/17/51/apartment-48821_960_720.png"),
    new Commodity("Mansion", true, 500000, 20, 250000000, 0, "https://cdn.pixabay.com/photo/2017/11/21/10/26/building-2967810_960_720.png"),
    new Commodity("Industrial Space", true, 2200000, 10, 1000000000, 0, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
    new Commodity("Hotel Skyscraper", true, 25000000, 5, 10000000000, 0, "https://cdn.pixabay.com/photo/2018/08/04/17/33/hotel-3584086_960_720.png"),
    new Commodity("Bullet-Speed Sky Railway", true, 30000000000, 1, 10000000000000, 0, "https://cdn.pixabay.com/photo/2023/04/05/21/47/train-7902370_960_720.png"),
];

function hidePage(ele) {
    ele.classList.remove("d-flex");
    ele.classList.add("d-none");
}

function drawPage(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-flex");
}

function initializeUser() {
    const user = new User(config.name.value);
    hidePage(config.welcomePage);
    drawPage(config.gamePage);
    config.gamePage.append(createGamePage(user));
}

function createGamePage(user) {
    const container = document.createElement("div");
    container.classList.add(
        "container",
        "d-flex",
        "justify-content-center",
        "text-white",
        "vh-100",
        "flex-nowrap",
    );

    container.append(createBurger(user))
    container.append(createUserInfo(user))
  
    return container;
}

function updateGamePage(user){
    config.gamePage.innerHTML = "";
    config.gamePage.append(createGamePage(user));
}

function createBurger(user){
    const currentBurger = user.amountCommodity.get("burger")
    const burger = document.createElement("div");
    burger.setAttribute("id", "burger");
    burger.classList.add("col-4")
    burger.innerHTML = `
        <div id="burgerInfo" class="d-flex flex-column align-items-center bg-navy my-3">
            <div>${currentBurger.currentAmount} Burger</div>
            <div>1click ${user.amountCommodity.get("Flip")}</div>
        </div>
        <div>
            <div>
                <img src="${currentBurger.url}" width=80%  id="burgerImg">
            </div>
        </div>
    `;

    const burgerEvent = burger.querySelectorAll("#burgerImg")[0]
    burgerEvent.addEventListener("click", ()=>{
        currentBurger.currentAmount += 1
        updateGamePage(user);
    })

    return burger;
}

function createUserInfo(user) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("col-7");
    userInfo.innerHTML = `
        <div id="userInfo" class="container bg-navy my-3">
            <div class="row row-cols-1 row-cols-sm-2">
                <div id="name" class="col">${user.name}</div>
                <div id="age" class="col">${user.age}</div>
                <div id="days" class="col">${user.days}</div>
                <div id="money" class="col">${user.money}</div>
            </div>
        </div>
    `;
    userInfo.append(createBuyItems(user))

    return userInfo;
}

function createBuyItems(user){
    const container = document.createElement("div");
    const commodityList = document.createElement("div");
    const commodityPage = document.createElement("div");
    container.classList.add(
        "commodity",
        "overflow-scroll",
    )
    commodityList.classList.add(
        "d-flex",
        "flex-column",

    )
    commodityPage.classList.add(
        "bg-navy",
        "flex-column",
    )
    for(let ele of user.amountCommodity.values()){
        if(ele.name == "burger") continue;
        commodityList.innerHTML += `
            <div id="${ele.name}" class="items my-2">
                <h3 class="p-3">${ele.name}</h3>
                <img src="${ele.url}" class="itemImg px-3">
                <div>${ele.currentAmount}</div>
            </div>
        `;
    }

    let commodityEvent = commodityList.querySelectorAll('.items');
    commodityEvent.forEach(commodity=>{
        commodity.addEventListener("click", ()=>{
            hidePage(commodityList)
            commodityPage.innerHTML = createBuyPage(user, commodity.id)
            
            commodityPage.querySelectorAll("#submit")[0].addEventListener("click",()=>{
                user.amountCommodity.get(commodity.id).currentAmount += 1
                hidePage(commodityPage)
                updateGamePage(user)
                drawPage(commodityList)
            });
            commodityPage.querySelectorAll("#back")[0].addEventListener("click",()=>{
                hidePage(commodityPage)
                updateGamePage(user)
                drawPage(commodityList)
            });
            drawPage(commodityPage)
        })
    })

    container.append(commodityList)
    container.append(commodityPage)

    return container
}

function createBuyPage(user, ele){
    const commodity = user.amountCommodity.get(ele);
    const container = `
        <div class="items">
            <h3 class="p-3">${commodity.name}</h3>
            <div class="container d-flex justify-content-around">
                <img src="${commodity.url}" class="col-4 itemImg">
                <div class="col-8 d-flex flex-column">
                    <div>maxAmount: ${commodity.maxAmount}</div>
                    <div>currentAmount: ${commodity.currentAmount}</div>
                    <div>price: ${commodity.price}</div>
                </div>
            </div>
            <button id="submit" class="btn btn-primary">submit</button>
            <button id="back" class="btn btn-primary">back</button>
        </div>
    `;
    return container;
}

// setInterval(function(){
//     temp.setAmount()
//     console.log(temp.getReturn());
// },1000)
