class Commodity {
    constructor(name, isSecInc, value, maxAmount, price, currentAmount, url) {
        this.name = name;
        this.isSecInc = isSecInc;
        this.value = value;
        this.maxAmount = maxAmount;
        this.currentAmount = currentAmount;
        this.price = price;
        this.url = url;
        this.returnMoney = 0
    }
    increase(i){
        this.currentAmount += i;
        this.returnMoney = this.value * this.currentAmount
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

    fncPerSec(){
        // 日付
        this.days += 1
        // 年齢
        this.age = 20 + Math.floor(this.days / 365)
        // 毎秒所得
        for(let commodity of this.amountCommodity.values()){
            if(commodity.isSecInc){
                this.money += commodity.returnMoney
            }
        }
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
};

const commodity = [
    new Commodity("burger", false, 25, Infinity, 0, 0, "https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png"),
    new Commodity("Flip", false, 25, 500, 15000, 0, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
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
    createBurger(user);
    createUserInfo(user);
    createBuyItems(user);

    setInterval(()=>{
        user.fncPerSec();
        update(user, config.userInfo, createUserInfo)
    }, 1000)
}

function update(user, element, fnc){
    element.innerHTML = "";
    fnc(user);
}

const createBurger = (user) => {
    const currentBurger = user.amountCommodity.get("burger")
    config.burger.innerHTML = `
        <div id="burgerInfo" class="d-flex flex-column align-items-center bg-navy my-3">
            <div>${currentBurger.currentAmount} Burger</div>
            <div>1click ${user.amountCommodity.get("Flip")}</div>
        </div>
        <div>
            <img src="${currentBurger.url}" width=80%  id="burgerImg">
        </div>
    `;

    const burgerEvent = burger.querySelectorAll("#burgerImg")[0]
    burgerEvent.addEventListener("click", ()=>{
        currentBurger.currentAmount += 1
        update(user, config.burger, createBurger);
    })
}

const createUserInfo = (user) => {
    config.userInfo.innerHTML = `
        <div class="row row-cols-1 row-cols-sm-2">
            <div id="name" class="col">${user.name}</div>
            <div id="age" class="col">${user.age}</div>
            <div id="days" class="col">${user.days}</div>
            <div id="money" class="col">${user.money}</div>
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
            drawPage(commodityPage)
            const item = user.amountCommodity.get(commodity.id);
            commodityPage.innerHTML = createBuyPage(item)
            
            const increaseNum = commodityPage.querySelectorAll("#increaseValue")[0]
            commodityPage.querySelectorAll("#submit")[0].addEventListener("click",()=>{
                if(item.maxAmount < item.currentAmount + parseInt(increaseNum.value)){
                    alert("最大購入数を超えています。")
                }else if(user.money < item.price * parseInt(increaseNum.value)){
                    alert("現在の所持金では購入できません。")
                }else{
                    item.increase(parseInt(increaseNum.value))
                }
                update(user, config.buyItems, createBuyItems)
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
        <div class="items">
            <h3 class="p-3">${ele.name}</h3>
            <div class="container d-flex justify-content-around">
                <img src="${ele.url}" class="col-4 itemImg">
                <div class="col-8 d-flex flex-column">
                    <div>maxAmount: ${ele.maxAmount}</div>
                    <div>currentAmount: ${ele.currentAmount}</div>
                    <div>price: ${ele.price}</div>
                </div>
            </div>
            <div id="increase">
                <input id="increaseValue" type="number" min=0 value=0 class=""></input>
                <button id="submit" class="btn btn-primary">submit</button>
                <button id="back" class="btn btn-primary">back</button>
            </div>
        </div>
    `;

    return container;
}
