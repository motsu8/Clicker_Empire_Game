class Commodity {
    constructor(name, isSecInc, returnMoney, maxAmount, price) {
        this.name = name;
        this.isSecInc = isSecInc;
        this.returnMoney = returnMoney;
        this.maxAmount = maxAmount;
        this.currentAmount = 0;
        this.price = price
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.age = 20;
        this.days = 0;
        this.money = 15000;
        // key: commodityName
        // value: amount
        this.hasCommodity = new Map();
        for (let ele of commodity) {
            this.hasCommodity.set(ele.name, 0);
        }
    }
}

const config = {
    welcomePage: document.getElementById("welcome"),
    gamePage: document.getElementById("game"),
    name: document.getElementById("userName"),
};

const commodity = [
    new Commodity("burger", false, 25, Infinity, 0,),
    new Commodity("Flip", true, 25, Infinity, 500,),
    new Commodity("ETF Stock", true, 0.001, Infinity, 300000,),
    new Commodity("ETF Bounds", true, 0.0007, Infinity, 300000,),
    new Commodity("Lemonade Stand", true, 30, 1000, 30000,),
    new Commodity( "Ice Cream Truck", true, 120, 100000,),
    new Commodity("House", true, 32000, 100, 20000000,),
    new Commodity("TownHouse", true, 64000, 100, 40000000,),
    new Commodity("Mansion", true, 500000, 20, 250000000,),
    new Commodity("Industrial Space", true, 2200000, 10, 1000000000,),
    new Commodity("Hotel Skyscraper", true, 25000000, 5, 10000000000,),
    new Commodity("Bullet-Speed Sky Railway", true, 30000000000, 1, 10000000000000,),
];

function hidePage(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function drawPage(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
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
        "text-white",
        "align-items-center",
        "vh-100",
        "d-flex",
        "justify-content-center"
    );
    // container.innerHTML = `
    // ${createBurger(user)}
    // ${createUserInfo(user)}
    // `;

    container.append(createBurger(user))
    container.append(createUserInfo(user))
  
    return container;
}

function updateGamePage(user){
    config.gamePage.innerHTML = "";
    config.gamePage.append(createGamePage(user));
}

function createBurger(user){
    const burger = document.createElement("div");
    burger.setAttribute("id", "burger");
    burger.classList.add("col-4")
    burger.innerHTML = `
        <div id="burgerInfo" class="d-flex flex-column align-items-center bg-navy my-3">
            <div>${user.hasCommodity.get("burger")} Burger</div>
            <div>1click ${user.hasCommodity.get("Flip")}</div>
        </div>
        <div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80%  id="burgerImg">
            </div>
        </div>
    `;

    const burgerEvent = burger.querySelectorAll("#burgerImg")[0]
    burgerEvent.addEventListener("click", ()=>{
        const current = user.hasCommodity.get("burger")
        user.hasCommodity.set("burger", current+1)
        updateGamePage(user);
        console.log(user.hasCommodity.get("burger"))
    })

    console.log(burgerEvent)
    console.log(user.hasCommodity.entries())

    return burger;
}

function createUserInfo(user) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("col-7");
    userInfo.innerHTML = `
        <div id="userInfo" class="container bg-navy">
            <div class="row row-cols-1 row-cols-sm-2">
                <div id="name" class="col">${user.name}</div>
                <div id="age" class="col">${user.age}</div>
                <div id="days" class="col">${user.days}</div>
                <div id="money" class="col">${user.money}</div>
            </div>
        </div>
        <div>123456</div>
    `;

    return userInfo;
}

// setInterval(function(){
//     temp.setAmount()
//     console.log(temp.getReturn());
// },1000)
