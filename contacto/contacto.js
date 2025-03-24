async function loadComponent(url){
    const res = await fetch(url);
    return await res.text()
}

function setupForm() {
    const formEl = document.getElementById('form');
    const url = 'https://apx.school/api/utils/email-to-student'
    
    formEl.addEventListener("submit",(event)=>{
        event.preventDefault(); 

        const emailInput = formEl.querySelector('input[name="email"], #email');
        const messageInput = formEl.querySelector('textarea[name="message"], #message');

        if (!emailInput || !messageInput) {
            console.error("No se encontraron los inputs dentro del formulario.");
            return;
        }

        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!email || !message) {
            console.warn("El email o el mensaje están vacíos.");
            return;
        }
        const data = {
            to: email,
            message: message
        }
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data=>{
            console.log('Exito:', data);
        })
        .catch((error)=>{
            console.error('Error:', error);
        })
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

async function main(){
    setupForm();
    await loadComponent('../componentes/header.html').then(html=>{
        document.getElementById('header').innerHTML = html
        setupBurgerMenu();
    });

    await loadComponent('../componentes/form.html').then(html=>{
        document.getElementById('form').innerHTML = html
    });

    await loadComponent('../componentes/footer.html').then(html=>{
        document.getElementById('footer').innerHTML = html
    })
}


main();