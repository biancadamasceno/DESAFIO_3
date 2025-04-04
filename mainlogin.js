function entrar() {
    let cpf = document.querySelector('#cpf');
    let senha = document.querySelector('#senha');
    let msgError = document.querySelector('#msgError');

    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || []; // Se for null, vira []

    let userValid = null; // Começa como null

    listaUser.forEach((item) => {
        if (cpf.value === item.cpf && senha.value === item.senha) {
            userValid = {
                cpf: item.cpf,
                senha: item.senha
            };
        }
    });

    if (userValid) {
        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;

        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));

        window.location.href = 'forms.html'; // Redireciona após salvar o login
    } else {
        cpf.setAttribute('style', 'border-color: red');
        senha.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Usuário ou senha incorretos';
        cpf.focus();
    }
}

  
 


    