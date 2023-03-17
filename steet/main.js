async function utilityHTML() {
    const date = await fetch(
    "https://ecommercebackend.fundamentos-29.repl.co/");
    const base = await date.json();
    window.localStorage.setItem('utilitys', JSON.stringify(base))
    return base;
}
function printArticle(base){
    const utilitysHTML = document.querySelector(".utilitys");
    console.log(utilitysHTML);
    let html = "";

    for (const utility of base.utility) {
        html += `
            <div class="utility ${utility.category}">
                <div class="utility_img">
                    <img src="${utility.image}" alt""/>
                </div>
                <div class="utility_info">
                    <h3>$${utility.price}.00 <span> Stock: ${utility.quantity}</span></h3>
                    <h4>${utility.name}
                    ${utility.quantity ? `<i class='bx bx-plus' id='${utility.id}'></i>` 
                    : '<span class="Sold">Sold out</span>' }
                    </h4>
                </div>
            </div>
        `     
    }
    utilitysHTML.innerHTML = html
}
function pilot_cart(){
    const bxsHTML = document.querySelector(".bxs-cart-alt");
    const cartHTM = document.querySelector(".cart");

    bxsHTML.addEventListener("click", function(){
        console.log("click");
        cartHTM.classList.toggle("cart_show");
    });
}
function modificInCardOfCart(base){

    const AddCartHTML = document.querySelector(".cart_utilitys");
    
    AddCartHTML.addEventListener("click", function(e){
        if(e.target.classList.contains('bx-plus')){

            const id = (Number(e.target.parentElement.id));
            const AddCardTheCart = 
            base.utility.find((utilit) => utilit.id === id);
        
                if(AddCardTheCart.quantity === base.cart[AddCardTheCart.id].amount) 
                return alert("No tenemos mas disponibles");
        
                base.cart[id].amount++;
            }

        if(e.target.classList.contains('bx-minus')){
            const id = (Number(e.target.parentElement.id));
        
                if(base.cart[id].amount === 1) {
                    const res = confirm ("Estas seguro que deseas eliminar ");
                    
                    if(!res) return
                    delete base.cart[id];
                    
                 }else{
                    base.cart[id].amount--;
                }
        }

        if(e.target.classList.contains('bx-trash')){
            const id = (Number(e.target.parentElement.id));
            delete base.cart[id];
        }
        localStorage.setItem("cart", JSON.stringify(base.cart))
        printUtilityInCart(base);
        CartTotalPrice(base);
        AddNavarCart(base);
});
}
function addUtilitysToCart (base){
    const aggHTML = document.querySelector(".utilitys");

    aggHTML.addEventListener("click", function(a){
        if(a.target.classList.contains("bx-plus")){
            const cont = (Number(a.target.id)); 
            
            const produtAdd = 
            base.utility.find((utilit) => utilit.id === cont);
        
            if(base.cart[produtAdd.id]){
                if(produtAdd.quantity === base.cart[produtAdd.id].amount) 
                    return alert("No tenemos mas disponibles");
                    base.cart[produtAdd.id].amount++;
                }else{
                    base.cart[produtAdd.id] = {...produtAdd, amount: 1};
                }

        window.localStorage.setItem("cart" , JSON.stringify(base.cart));
        printUtilityInCart(base);
        CartTotalPrice(base);
        AddNavarCart(base);
    }
    });
}
function printUtilityInCart(base){
    const cartUtilitysHTML = document.querySelector(".cart_utilitys");
    let html = "";
    for (const utility in base.cart) {
            const {name, image , price , id , quantity, amount} = base.cart[utility];
            html += `
                 <div class="cart_utility">
                    <div class="cart_utility--img">
                        <img src="${image}" alt""/>
                    </div>

                    <div class="cart_utility--info">
                        <h3>${name} | $${price}</h3>
                        <p>Stock: ${quantity}|</p>

                        <div class="cart_utility--icon" id="${id}">
                            <i class='bx bx-minus' ></i> 
                            <span>${amount} units</span> 
                            <i class='bx bx-plus'> 
                            </i><i class='bx bx-trash'></i>
                        </div>
                    </div>
                </div>          
            `
        }
        cartUtilitysHTML.innerHTML = html;
}
function CartTotalPrice(base) {
    const totalCard = document.querySelector(".Total_card");
    const worthCard = document.querySelector(".Cart_worth");

    let pricetotal = 0;
    let totalUtilitys = 0;

    for (const utility in base.cart) {
        const {price , amount} = base.cart[utility];
        totalUtilitys += amount;
        pricetotal += price * amount;   
    }
    totalCard.textContent = pricetotal + '.00';
    worthCard.textContent = totalUtilitys + ' item';
}
function buysFinish(base){
    const buttomFinish = document.querySelector(".Buttom_cart");

    buttomFinish.addEventListener("click", function(a){
        if(!Object.values(base.cart).length)
        return alert("Debes seleccionar por lo menos un articulo");
        
        const consul = confirm ("¿Estas seguro de realizar la compra?");
        if(!consul) return;

        const buysFinish = [];

        for (const utilitys of base.utility) {
            const cartBuys = base.cart[utilitys.id];
                if(utilitys.id === cartBuys?.id){
                    buysFinish.push({
                        ...utilitys, 
                        quantity: utilitys.quantity - cartBuys.amount
                    });
                }else{
                    buysFinish.push(utilitys);
                }
                
        }
        base.utility = buysFinish;
        base.cart = {};

        window.localStorage.setItem("utility",JSON.stringify(base.utility));
        window.localStorage.setItem("cart", JSON.stringify(base.cart));
        
        printUtilityInCart(base);
        CartTotalPrice(base);
        printArticle(base);
        AddNavarCart(base);
    })
}
function AddNavarCart(base) {
    const addCartNav = document.querySelector(".nav_cont");

    let amount = 0;

    for (const utilitys in base.cart) {
        amount += base.cart[utilitys].amount;
    }
    addCartNav.textContent = amount;

}
function dynamicCategory() {
    const leer = document.querySelector(".utilitys");

    const filterHTML = document.querySelectorAll(".filter .btn_filter");

    filterHTML.forEach(filter => {
        filter.addEventListener("click", (e) => {

            filterHTML.forEach(filter => 
                filter.classList.remove("btn_filter--active"
                ));

            e.target.classList.add("btn_filter--active")
        })
    });
    var mixer = mixitup(".utilitys", {
        selectors: {
            target: '.utility'
        },
        animation: {
            duration: 300
        }
    });
}
function prueba(base) {
    const addTime = base.utility;

    const ContCategory = addTime.reduce((acum, curre) => {
        acum[curre.category] = acum[curre.category] + 1 || 1
        return acum;
    }, {});

    let html = '<button class="btn_filter btn_filter--active"  data-filter="all">all</button>';

    for (const key in ContCategory) {
        html += `<button class="btn_filter" data-filter=".${key}">${key} - ${ContCategory[key]} items</button>`
    }

    console.log(html);

    document.querySelector(".filter").innerHTML = html;
}
async function start(){
    const base = 
    {
        utility: 
        JSON.parse(window.localStorage.getItem('utilitys')) || (await utilityHTML()),
        cart: JSON.parse(window.localStorage.getItem("cart")) || {}
    };
    console.log(base);
    printArticle(base);
    pilot_cart();
    addUtilitysToCart(base);
    printUtilityInCart(base);
    modificInCardOfCart(base);
    CartTotalPrice(base);
    buysFinish(base);
    AddNavarCart(base);
    prueba(base);
    dynamicCategory();

}
start();
