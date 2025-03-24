function burger(){
    document.addEventListener("DOMContentLoaded", ()=>{
        const burger = document.getElementById("burger-menu");
        const navMenu = document.getElementById("nav-menu");
        
        burger.addEventListener("click",()=>{
            console.log("el burger fue clickeado");
            navMenu.classList.toggle("active");

        });
    });

}

function main(){
    burger();
}
main()