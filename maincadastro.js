let cpf = document.querySelector('#cpf');
let labelCpf = document.querySelector('#labelCpf');
let validCpf = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let msgError = document.querySelector ('#msgError');
let msgSucess = document.querySelector ('#msgSucess');

let listaUse

cpf.addEventListener('keyup', () => {
    if (cpf.value.length < 11) {
        labelCpf.setAttribute('style', 'color:red');
        validCpf = false; // Agora está alterando a variável global
    } else {
        labelCpf.setAttribute('style', 'color:green');
        validCpf = true; // Agora está alterando a variável global
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length < 6) { // Definindo um critério mínimo de segurança (6 caracteres)
        labelSenha.setAttribute('style', 'color:red');
        validSenha = false; // Agora está alterando a variável global
    } else {
        labelSenha.setAttribute('style', 'color:green');
        validSenha = true; // Agora está alterando a variável global
    }
});

function cadastrar()  {
    let listaUser = JSON.parse (localStorage. getItem ('listaUser') || '[ ]')
    listaUser.push (
{       
    cpf: cpf.value, 
    senha: senha.value 
}
)

localStorage.setItem ('listaUser', JSON. stringify (listaUser))


    if (validCpf && validSenha) {
        msgSucess.setAttribute('style', 'display: block')
        msgSucess.innerHTML='<strong> Usuário cadastrado</strong>'
        msgError.setAttribute('style', 'display: none',)    
        msgError.innerHTML=''

        console.log('Redirecionando para index.html...');
        window.location.href = 'login.html';
        
       
        
    } else {
        msgError.setAttribute ('style', 'display: block');
        msgError.innerHTML = '<strong> Preencha todos os campos corretamente</strong>'
        msgSucess.innerHTML= ''
        msgSucess.setAttribute('style', 'display: none');
        
    }
}

