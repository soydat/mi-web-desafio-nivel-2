async function loadComponent(url){
    const res = await fetch(url);
    return await res.text()
}

async function fetchContentfulApi(){
    try {
        const response = await fetch("https://cdn.contentful.com/spaces/2jra57kofc88/environments/master/entries?access_token=O-Hn_wgs1sTSuvsA4sOKvU6mu71txmAzaSVfYnE74VY&content_type=portfolio");
        const data = await response.json();

        console.log("data: ", data)
        
        const cardsContainer = document.getElementById('cards-container');
        
        for (let i = 0; i < data.items.length; i++) {
            console.log("FOR SE EJECUTO");
            const el = data.items[i];
            
            const html = await loadComponent('../componentes/card.html');
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add("card-overlay-" + (i + 1));
            cardWrapper.innerHTML = html;
            
            let imgUrl = ""
            if (el.fields.miniatura){
                const asset = data.includes?.Asset.find(asset => asset.sys.id === el.fields.miniatura.sys.id)
                if(asset){
                    imgUrl = `https:${asset.fields.file.url}`;
                }
            }
            
            const imgEl = cardWrapper.querySelector('.card__img');
            const titleEl = cardWrapper.querySelector('.card__title-container label');
            const descEl = cardWrapper.querySelector('.card__p-container p');
            
            if (imgEl && imgUrl) {console.log("imgAsset funciona");imgEl.src = imgUrl;}
            if (titleEl) titleEl.textContent = el.fields.titulo || 'sin titulo';
            if (descEl) descEl.textContent = el.fields.descripcion?.content[0]?.content[0]?.value || 'Sin Descripcion';
            
            cardsContainer.appendChild(cardWrapper);
        }
    } catch(error){
        console.error("Error:", error);
    }
}

async function main(){
    fetchContentfulApi();
    await loadComponent('../componentes/header.html').then(html=>{
        document.getElementById('header').innerHTML = html
        setupBurgerMenu();
    });
    await loadComponent('../componentes/bg.html').then(html=>{
        document.getElementById('bg').innerHTML = html
    })
    
    await loadComponent('../componentes/footer.html').then(html=>{
        document.getElementById('footer').innerHTML = html
    })
}

function setupBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    } else {
        console.error("No se encontró el menú burger o la navegación.");
    }
}



main();