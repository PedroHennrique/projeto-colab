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

// --- Conectar com PHP ---
// Registrar usuário
const registerForm = document.querySelector('.formsRegister form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    fetch('../../backend/registro.php', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.text())
    .then(data => alert(data))
    .catch(err => alert('Erro: ' + err));
});

// Login
const loginForm = document.querySelector('.formsLogin form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    fetch('../../backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            // Salva no localStorage
            localStorage.setItem('usuarioLogado', data.username);

            // Atualiza interface
            mostrarUsuarioLogado();

            alert(`Bem-vindo, ${data.username}!`);
            sobressair.classList.remove('ativoLogin', 'ativo', 'ativot');
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert('Erro: ' + err));
});

// Log-out
function logout() {
    localStorage.removeItem('usuarioLogado');
    location.reload();
}

function mostrarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
        document.querySelector('.btnLogin').style.display = 'none';
        document.querySelector('.usuarioLogado').style.display = 'flex';
        document.getElementById('nomeUsuario').textContent = usuario;
    }
}

// Executa ao carregar a página
window.onload = mostrarUsuarioLogado;

// ------------------- CARRINHO -------------------
// Função que será chamada pelo onclick dos botões "Comprar"
function adicionarCarrinho(botao) {
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));
    const imagem = botao.parentElement.querySelector('img').src; // pega o caminho da imagem do card

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(item => item.nome === nome);
    if(produtoExistente){
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({nome, preco, quantidade: 1, imagem}); // adiciona imagem ao objeto
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} adicionado ao carrinho!`);

    // Redireciona para a página do carrinho
    window.location.href = 'carrinho.html';
}

//  Atualizar quantidade do carrinho 
function atualizarQtdCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;

    carrinho.forEach(item => {
        total += item.quantidade;
    });

    const spanQtd = document.getElementById('qtdCarrinho');
    if (spanQtd) spanQtd.textContent = total;
}

// Atualiza o número do carrinho sempre que a página carrega
window.addEventListener('load', atualizarQtdCarrinho);

// Atualiza também quando adiciona um item
function adicionarCarrinho(botao) {
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));
    const imagem = botao.parentElement.querySelector('img').src;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1, imagem });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarQtdCarrinho(); // 🔥 Atualiza o contador imediatamente
}

// --- FINALIZAR COMPRA ---
// Essa função verifica se o usuário está logado antes de ir para o checkout
document.addEventListener("DOMContentLoaded", () => {
    const btnFinalizar = document.getElementById("btnFinalizar");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            
            // Se o carrinho estiver vazio, mostra alerta
            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            // Verifica se o usuário está logado
            const usuarioLogado = localStorage.getItem("usuarioLogado");

            if (!usuarioLogado) {
                // Usuário não logado → avisa e redireciona
                alert("Você precisa estar logado para finalizar a compra!");
                window.location.href = "carrinho.html"; 
                return;
            }

            // Usuário logado → pode ir para o checkout
            window.location.href = "checkout.html";
        });
    }
});