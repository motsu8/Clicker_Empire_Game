const config = {
    "welcome": document.getElementById("welcome"),
    "game": document.getElementById("game"),
    "buger": document.getElementById("buger"),
    "user": {
        "name": document.getElementById("userName"),
        "info": document.getElementById("userInfo"),
        "commodity": document.getElementById("commodity"),
    }
}

class UserAccount{
    constructor(name){
        this.name = name;
        this.money = 15000
        this.commodity = new Commodity();
    }
}

class Commodity{
    returnMoney = 0
    secondsIncrease = false
    constructor(){
        this.amount = 0
        this.totalReturn = 0
    }
    setAmount(){
        this.amount += 1
        this.totalReturn += this.returnMoney
    }
    getReturn(){
        return this.totalReturn
    }
}

class Burger extends Commodity{
    constructor(){
        super()
        this.returnMoney = 25
        this.secondsIncrease = false
    }
}

function initializeUser(){
    const user = new UserAccount(config.user.name.value)
    console.log(`Name: ${user.name}`)
    config.welcome.classList.add("d-none")
    config.game.append(htmlEle(user))
}

function htmlEle(user){
    const temp = document.createElement("div");
    temp.innerHTML = `
    Name: ${user.name}
    `;
    return temp
}

const temp = new Burger();

// setInterval(function(){
//     temp.setAmount()
//     console.log(temp.getReturn());
// },1000)