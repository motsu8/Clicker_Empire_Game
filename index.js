const config = {
    welcomePage: document.getElementById("welcome"),
    gamePage: document.getElementById("game"),
    name: document.getElementById("userName"),
};

const commodity = [
    {
        name: "buger",
        isSecInc: false,
        return: 25,
        maxPurchases: 500,
        price: 15000,
    },
    {
        name: "ETF Stock",
        isSecInc: true,
        return: 0.001,
        maxPurchases: Infinity,
        price: 300000,
    },
    {
        name: "ETF Bounds",
        isSecInc: true,
        return: 0.0007,
        maxPurchases: Infinity,
        price: 	300000,
    },
    {
        name: "Lemonade Stand",
        isSecInc: true,
        return: 30,
        maxPurchases: 1000,
        price: 30000,
    },
    {
        name: "Ice Cream Truck",
        isSecInc: true,
        return: 120,
        maxPurchases: 500,
        price: 	100000,
    },
    {
        name: "House",
        isSecInc: true,
        return: 32000,
        maxPurchases: 100,
        price: 20000000,
    },
    {
        name: "TownHouse",
        isSecInc: true,
        return: 64000,
        maxPurchases: 100,
        price: 40000000,
    },
    {
        name: "Mansion",
        isSecInc: true,
        return: 500000,
        maxPurchases: 20,
        price: 	250000000,
    },
    {
        name: "Industrial Space",
        isSecInc: true,
        return: 2200000,
        maxPurchases: 10,
        price: 	1000000000,
    },
    {
        name: "Hotel Skyscraper",
        isSecInc: true,
        return: 25000000,
        maxPurchases: 5,
        price: 10000000000,
    },
    {
        name: "Bullet-Speed Sky Railway",
        isSecInc: true,
        return: 30000000000,
        maxPurchases: 1,
        price: 10000000000000,
    },
];

class User {
    constructor(name) {
        this.name = name;
        this.old = 20;
        this.days = 0;
        this.money = 15000;
        this.commodity = new Commodity();
    }
}

class Commodity {
    returnMoney = 0;
    constructor() {
        this.amount = 0;
        this.totalReturn = 0;
    }
    setAmount() {
        this.amount += 1;
    }
    setIncreaseMoney() {
        this.totalReturn = this.returnMoney * this.amount;
    }
    getMoney() {
        return this.totalReturn;
    }
}

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
    const gamePage = document.createElement("div");
    gamePage.classList.add(
        "container",
        "align-items-center",
        "vh-100",
        "d-flex",
        "justify-content-center"
    );
    gamePage.innerHTML = `
        <div id="buger" class="col-4">Buger</div>
        <div class="col-7">
            ${createUserInfo(user)}
            <div id="buyArea">123456</div>
        </div>
    `;
    return gamePage;
}

function createUserInfo(user) {
    const userInfo = `
        <div id="userInfo" class="container bg-navy">
            <div class="row row-cols-1 row-cols-sm-2">
                <div id="name" class="col">${user.name}</div>
                <div id="old" class="col">${user.old}</div>
                <div id="days" class="col">${user.days}</div>
                <div id="money" class="col">${user.money}</div>
            </div>
        </div>
    `;

    return userInfo;
}

// setInterval(function(){
//     temp.setAmount()
//     console.log(temp.getReturn());
// },1000)
