class Commodity {
    constructor(name, isSecInc, value, maxAmount, price, currentAmount, url, type) {
        this.name = name;
        this.isSecInc = isSecInc;
        this.value = value;
        this.maxAmount = maxAmount;
        this.currentAmount = currentAmount;
        this.price = price;
        this.url = url;
        this.returnMoney = currentAmount * value
        this.type = type;
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.age = 20;
        this.days = 0;
        this.money = 15000;
        this.daysIncrease = 0;
        this.intervalId = null
        this.commodity = [
            new Commodity("burger", false, 25, Infinity, 0, 0, "https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png", "ability"),
            new Commodity("Flip", false, 1000, 500, 15000, 1, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", "ability"),
            new Commodity("ETF Stock", true, 0.001, Infinity, 300000, 0, "https://cdn.pixabay.com/photo/2018/03/15/11/29/bitcoin-3227945_960_720.png", "Stock"),
            new Commodity("ETF Bounds", true, 0.0007, Infinity, 300000, 0, "https://cdn.pixabay.com/photo/2018/03/15/11/29/bitcoin-3227945_960_720.png", "Bounds"),
            new Commodity("Lemonade Stand", true, 30, 1000, 30000, 0, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", "realEstate"),
            new Commodity("Ice Cream Truck", true, 120, 500, 100000, 0, "https://cdn.pixabay.com/photo/2016/07/27/03/11/ice-cream-1544475_960_720.png", "realEstate"),
            new Commodity("House", true, 32000, 100, 20000000, 0, "https://cdn.pixabay.com/photo/2013/07/13/12/48/cottage-160367_960_720.png", "realEstate"),
            new Commodity("TownHouse", true, 64000, 100, 40000000, 0, "https://cdn.pixabay.com/photo/2012/05/07/17/51/apartment-48821_960_720.png", "realEstate"),
            new Commodity("Mansion", true, 500000, 20, 250000000, 0, "https://cdn.pixabay.com/photo/2017/11/21/10/26/building-2967810_960_720.png", "realEstate"),
            new Commodity("Industrial Space", true, 2200000, 10, 1000000000, 0, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", "realEstate"),
            new Commodity("Hotel Skyscraper", true, 25000000, 5, 10000000000, 0, "https://cdn.pixabay.com/photo/2018/08/04/17/33/hotel-3584086_960_720.png", "realEstate"),
            new Commodity("Bullet-Speed Sky Railway", true, 30000000000, 1, 10000000000000, 0, "https://cdn.pixabay.com/photo/2023/04/05/21/47/train-7902370_960_720.png", "realEstate"),
        ];
    }

}

const config = {
    welcomePage: document.getElementById("welcome"),
    gamePage: document.getElementById("game"),
    name: document.getElementById("userName"),
    burger: document.getElementById("burger"),
    userCtrl: document.getElementById("userCtrl"),
    userInfo: document.getElementById("userInfo"),
    buyItems: document.getElementById("buyItems"),
    btns: document.getElementById("btns"),
};

function fncPerSec(user){
    // 日付
    user.days += 1
    // 年齢
    user.age = 20 + Math.floor(user.days / 365)
    // 毎秒所得
    setReturnPerDays(user);
    user.money += user.daysIncrease
}

function setReturnPerDays(user){
    user.daysIncrease = 0;
    for(let commodity of user.commodity){
        if(commodity.isSecInc){
            switch(commodity.type){
                case("ability"):
                case("realEstate"):
                    user.daysIncrease += commodity.returnMoney;
                    break;
                case("Stock"):
                case("Bounds"):
                    user.daysIncrease += Math.floor(user.money * commodity.returnMoney);
                    break;
            }
        }
    }
}

function purchase(commodity, i){
    commodity.currentAmount += i;
    const fee = i * commodity.price;
    
    switch(commodity.type){
        case("ability"):
        case("realEstate"):
        case("Bounds"):
            commodity.returnMoney = commodity.value * commodity.currentAmount;
            break;
        case("Stock"):
            commodity.price = Math.floor(commodity.price * 1.1)
            commodity.returnMoney = commodity.value * commodity.currentAmount;
            break;
    }
    return fee;
}

function payment(user, fee){
    user.money -= fee;
}

function makeBurger(user){
    const performance = user.commodity.find(ele => ele.name == "Flip").returnMoney
    user.money += performance;
}

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
    createBurger(user);
    createUserInfo(user);
    createBuyItems(user);
    
    user.intervalId = setInterval(()=>{
        fncPerSec(user);
        update(user, config.userInfo, createUserInfo)
        update(user, config.burger, createBurger)
        createLocalBtn(user);
    }, 1000)
}

function drawUser(ele) {
    const user = JSON.parse(ele);
    hidePage(config.welcomePage);
    drawPage(config.gamePage);
    createBurger(user);
    createUserInfo(user);
    createBuyItems(user);
    
    user.intervalId = setInterval(()=>{
        fncPerSec(user);
        update(user, config.userInfo, createUserInfo)
        update(user, config.burger, createBurger)
        createLocalBtn(user);
    }, 1000)
}

function update(user, element, fnc){
    element.innerHTML = "";
    fnc(user);
}

const createBurger = (user) => {
    const currentBurger = user.commodity.find(ele => ele.name == "burger")
    config.burger.innerHTML = `
        <div id="burgerInfo" class="d-flex flex-column justify-content-center align-items-center bg-navy my-3">
            <div class="info">${currentBurger.currentAmount} Burger</div>
            <div class="info">$${user.commodity.find(ele => ele.name == "Flip").returnMoney} / click</div>
            <div class="info">$${user.daysIncrease} / days</div>
        </div>
        <div class="">
            <img src="${currentBurger.url}" width=80%  id="burgerImg" class="itemImg jump-target">
        </div>
    `;

    const burgerEvent = burger.querySelectorAll("#burgerImg")[0]
    burgerEvent.addEventListener("click", (e)=>{
        currentBurger.currentAmount += 1
        jumpAnimation(e.target.parentElement);
        makeBurger(user)
        update(user, config.userInfo, createUserInfo);
        update(user, config.burger, createBurger);
    })
}

const jumpAnimation = (ele) => {
    ele.addEventListener("mousedown", () => {ele.classList.add("jump");});
    ele.addEventListener("animationend", () => {ele.classList.remove("jump");});
    ele.addEventListener("animationcancel", () => {ele.classList.remove("jump");});
}

const createUserInfo = (user) => {
    config.userInfo.innerHTML = `
        <div class="row row-cols-1 row-cols-sm-2">
            <div id="name" class="col info">${user.name}</div>
            <div id="age" class="col info">${user.age} years old</div>
            <div id="days" class="col info">${user.days} days</div>
            <div id="money" class="col info">$ ${user.money}</div>
        </div>
    `;
}

const createBuyItems = (user) => {
    const commodityList = document.createElement("div");
    const commodityPage = document.createElement("div");
    commodityList.classList.add(
        "d-flex",
        "flex-column",

    )
    commodityPage.classList.add(
        "bg-navy",
        "flex-column",
    )
    for(let ele of user.commodity){
        if(ele.name == "burger") continue;
        if(ele.type == "ability" || ele.type == "realEstate"){            
            commodityList.innerHTML += `
                <div id="${ele.name}" class="items my-2 container d-flex info jump-target">
                    <img src="${ele.url}" class="img-fluid p-3 col-4">
                    <div class="col-8">
                        <div class="d-flex justify-content-between">
                            <h3 class="p-3">${ele.name}</h3>
                            <h3 class="p-3">${ele.currentAmount}</h3>
                        </div>
                        <div class="p-2">price: $${ele.price}</div>
                        <div class="p-2">return: $${ele.value}</div>
                    </div>
                </div>
            `;
        }else if(ele.type == "Stock" || ele.type == "Bounds"){
            commodityList.innerHTML += `
            <div id="${ele.name}" class="items my-2 container d-flex info jump-target">
                <img src="${ele.url}" class="img-fluid p-3 col-4">
                <div class="col-8">
                    <div class="d-flex justify-content-between">
                        <h3 class="p-3">${ele.name}</h3>
                        <h3 class="p-3">${ele.currentAmount}</h3>
                    </div>
                    <div class="p-2">price: $${ele.price}</div>
                    <div class="p-2">return: ${(100 * ele.value).toPrecision(1)} %</div>
                </div>
            </div>
        `;
        }
    }

    let commodityEvent = commodityList.querySelectorAll('.items');
    commodityEvent.forEach(commodity=>{
        commodity.addEventListener("click", ()=>{
            hidePage(commodityList)
            drawPage(commodityPage)
            const item = user.commodity.find(ele => ele.name == commodity.id);
            commodityPage.innerHTML = createBuyPage(item)
            
            const increaseNum = commodityPage.querySelectorAll("#increaseValue")[0]
            commodityPage.querySelectorAll("#submit")[0].addEventListener("click",()=>{
                if(item.maxAmount < item.currentAmount + parseInt(increaseNum.value)){
                    alert("最大購入数を超えています。")
                }else if(user.money < item.price * parseInt(increaseNum.value)){
                    alert("現在の所持金では購入できません。")
                }else{
                    const fee = purchase(item, parseInt(increaseNum.value))
                    setReturnPerDays(user);
                    payment(user, fee);
                }
                update(user, config.buyItems, createBuyItems)
                update(user, config.burger, createBurger);
                hidePage(commodityPage)
                drawPage(commodityList)
            });

            commodityPage.querySelectorAll("#back")[0].addEventListener("click",()=>{
                hidePage(commodityPage)
                drawPage(commodityList)
            });
        })
    })

    config.buyItems.append(commodityList)
    config.buyItems.append(commodityPage)
}

function createBuyPage(ele){
    const container = `
        <div class="items my-2 container d-flex">
            <img src="${ele.url}" class="p-3 col-4 img-fluid">
            <div class="col-8">
                <div class="d-flex">
                    <h3 class="py-3">${ele.name}</h3>
                    <div class="d-flex flex-column p-3">
                        <div>price: ${ele.price}</div>
                        <div>currentAmount: ${ele.currentAmount}</div>
                        <div>maxAmount: ${ele.maxAmount}</div>
                    </div>
                </div>
                <div id="increase" class="p-1">
                    <input id="increaseValue" type="number" min=0 value=0 class=""></input>
                    <button id="submit" class="btn btn-primary">submit</button>
                    <button id="back" class="btn btn-primary">back</button>
                </div>
            </div>
        </div>

    `;
    return container;
}

function createLocalBtn(user){
    config.btns.innerHTML = `
        <button id="reset" class="m-2 btn btn-primary">reset</button>
        <button id="save" class="m-2 btn btn-primary">save</button>
    `;

    const jsonUser = JSON.stringify(user)

    config.btns.querySelectorAll("#save")[0].addEventListener("click", ()=>{
        localStorage.setItem(user.name, jsonUser);
        alert("save!");
        clearGamePage();
        clearInterval(user.intervalId)
        hidePage(config.gamePage);
        drawPage(config.welcomePage);
    })

    config.btns.querySelectorAll("#reset")[0].addEventListener("click", ()=>{
        clearGamePage();
        clearInterval(user.intervalId);
        initializeUser();
    })
}

function clearGamePage(){
    config.burger.innerHTML = "";
    config.userInfo.innerHTML = "";
    config.buyItems.innerHTML = "";
    config.btns.innerHTML = "";
}

function login(){
    const user = localStorage.getItem(config.name.value)
    if(user == null) alert("ユーザー情報がありません。");
    else drawUser(user);
}
