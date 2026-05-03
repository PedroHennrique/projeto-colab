const btnLoginBarra = document.querySelector('.btnLogin'); // pega o botão "Login" do menu
const fecharLogin = document.querySelector('.fechar'); // pega o botão de fechar (X)
const sobressair = document.querySelector('.sobressair'); // pega a caixa de login/registro
const formsLogin = document.querySelectorAll('.telaLogin'); // pega o botão "Login" do menu do HTML
const resgisterLink = document.querySelectorAll('.registrar'); // pega o link "Registrar-se"
const alterarLink = document.querySelector('.alterar'); // pega o link "Esqueci a senha/alterar os dados"

//Quando clica no botão Login do menu principal, ele adiciona a classe ativoLogin. Isso faz a janela de Login aparecer na tela.
btnLoginBarra.addEventListener('click', ()=> {
    sobressair.classList.add('ativoLogin');}
); 

//Quando clica no X (fechar), remove a classe ativoLogin. Assim, a janela de login/registro some da tela.
fecharLogin.addEventListener('click', ()=> {
    if (sobressair.classList.contains('ativo') || sobressair.classList.contains('ativot')) {
        sobressair.classList.remove('ativoLogin', 'ativo', 'ativot');
    } else {
        sobressair.classList.remove('ativoLogin');
    }
});

//Quando clica em "Registrar-se", adiciona a classe ativo. No CSS, isso vai trocar a tela de Login para a tela de Registro.
resgisterLink.forEach(link => { // forEach percorre a lista e aplica o mesmo evento em cada link.
    link.addEventListener('click', ()=> {
        if (sobressair.classList.contains('ativot')) {
            sobressair.classList.remove('ativot'),
            sobressair.classList.add('ativo');
        } else {
            sobressair.classList.add('ativo');}
    }); 
});

//Quando clica em "Forgot Password", adiciona a classe ativo. No CSS, isso vai trocar a tela de Login para a tela de Registro.
alterarLink.addEventListener('click', ()=> {
    sobressair.classList.add('ativot');
});

//Quando clica em "Login" (dentro da tela de Registro e Esqueci Senha), ele remove a classe ativo e atvot. Assim, volta para a tela de Login.
formsLogin.forEach(link => { 
    link.addEventListener('click', ()=> {
        sobressair.classList.remove('ativo', 'ativot');
    }); 
});