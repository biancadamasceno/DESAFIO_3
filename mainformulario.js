document.addEventListener("DOMContentLoaded", function () { 
    // Seleciona os elementos do formulário
    const form = document.querySelector(".conteudo_formulario");
    const nome = document.getElementById("nome");
    const dataNascimento = document.getElementById("data");
    const cpf = document.getElementById("numCpf");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const genero = document.getElementById("genero");
    const rua = document.getElementById("rua");
    const numero = document.getElementById("numero");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const termos = document.querySelector("input[type=checkbox]");
    const documentoIdentidade = document.getElementById("documentoIdentidade");
    const comprovanteResidencia = document.getElementById("comprovanteResidencia");
    const botaoInscricao = document.querySelector(".botao2");
    
// Função para converter arquivos para Base64
function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}


// Função para salvar os dados no localStorage
async function inscrever() {
    try {
        // Converte arquivos para Base64 (se existirem)
        const identidadeBase64 = documentoIdentidade.files.length > 0 
            ? await converterParaBase64(documentoIdentidade.files[0]) 
            : null;

        const comprovanteBase64 = comprovanteResidencia.files.length > 0 
            ? await converterParaBase64(comprovanteResidencia.files[0]) 
            : null;

        // Obtém os dados já armazenados no localStorage
        let dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario') || '[]');
        
        if (dadosUsuario.length > 0 && dadosUsuario[0].comprovante) {
            abrirPDF(dadosUsuario[0].comprovante);
        }
        

        // Adiciona novo usuário
        dadosUsuario.push({
            nome: nome.value,
            dataNascimento: dataNascimento.value,
            cpf: cpf.value,
            email: email.value,
            telefone: telefone.value,
            genero: genero.value,
            cep: cep.value,
            rua: rua.value,
            numero: numero.value,
            cidade: cidade.value,
            estado: estado.value,
            identidade: identidadeBase64,  // Salva o arquivo em Base64
            comprovante: comprovanteBase64, // Salva o arquivo em Base64
            termosAceitos: termos.checked
        });

        // Salva os dados no localStorage
        localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
        alert("Dados salvos com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar os arquivos:", error);
        alert("Ocorreu um erro ao processar os documentos. Tente novamente.");
    }
}

    // Função para exibir mensagens de erro
    function mostrarErro(input, mensagem) {
        let erroSpan = input.nextElementSibling;
        if (!erroSpan || !erroSpan.classList.contains("erro")) {
            erroSpan = document.createElement("span");
            erroSpan.classList.add("erro");
            input.parentNode.insertBefore(erroSpan, input.nextSibling);
        }
        erroSpan.textContent = mensagem;
        erroSpan.style.color = "red";
    }

    // Função para limpar mensagens de erro
    function limparErro(input) {
        let erroSpan = input.nextElementSibling;
        if (erroSpan && erroSpan.classList.contains("erro")) {
            erroSpan.textContent = "";
        }
    }

    // Função para validar CPF (deve conter exatamente 11 números)
    function validarCPF() {
        const cpfLimpo = cpf.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (cpfLimpo.length !== 11) {
            mostrarErro(cpf, "CPF deve conter exatamente 11 dígitos.");
            return false;
        }
        limparErro(cpf);
        return true;
    }

    // Função para validar e-mail
    function validarEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar e-mail
        if (!emailRegex.test(email.value.trim())) {
            mostrarErro(email, "Digite um e-mail válido (exemplo: email@email.com)");
            return false;
        }
        limparErro(email);
        return true;
    }

    // Função para validar outros campos
    function validarCampoVazio(input, mensagem) {
        if (input.value.trim() === "") {
            mostrarErro(input, mensagem);
            return false;
        }
        limparErro(input);
        return true;
    }

    // Botão salvar
    const botaoSalvar = document.getElementById("botaoSalvar");

    botaoSalvar.addEventListener("click", function () {
        const dadosSalvos = {
            nome: nome.value,
            dataNascimento: dataNascimento.value,
            cpf: cpf.value,
            email: email.value,
            telefone: telefone.value,
            cep: cep.value,
            rua: rua.value,
            numero: numero.value,
            cidade: cidade.value,
            estado: estado.value,
            termosAceitos: termos.checked
        };
    
        localStorage.setItem("rascunhoFormulario", JSON.stringify(dadosSalvos));
        alert("Informações salvas como rascunho!");
    });

    //Salva as informações preenchidas caso a página seja fechada

    const rascunho = JSON.parse(localStorage.getItem("rascunhoFormulario"));
        if (rascunho) {
            nome.value = rascunho.nome || "";
            dataNascimento.value = rascunho.dataNascimento || "";
            cpf.value = rascunho.cpf || "";
            email.value = rascunho.email || "";
            telefone.value = rascunho.telefone || "";
            cep.value = rascunho.cep || "";
            genero.value = rascunho.genero || "";
            rua.value = rascunho.rua || "";
            numero.value = rascunho.numero || "";
            cidade.value = rascunho.cidade || "";
            estado.value = rascunho.estado || "";
            termos.checked = rascunho.termosAceitos || false;
}

    



    // Adiciona evento de clique ao botão de inscrição
    botaoInscricao.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o envio automático do formulário

        let formularioValido = true; // Flag para saber se está tudo certo

        function verificarCampo(input, mensagem) {
            if (input.value.trim() === "") {
                mostrarErro(input, mensagem);
                formularioValido = false;
            } else {
                limparErro(input);
            }
        }

        // Valida os campos do formulário
        verificarCampo(nome, "Nome é obrigatório.");
        verificarCampo(dataNascimento, "Data de nascimento é obrigatória.");
        verificarCampo(cpf, "CPF é obrigatório.");
        verificarCampo(email, "E-mail é obrigatório.");
        verificarCampo(telefone, "Telefone é obrigatório.");
        verificarCampo(cep, "CEP é obrigatório.");
        verificarCampo(rua, "Rua é obrigatória.");
        verificarCampo(numero, "Número é obrigatório.");
        verificarCampo(cidade, "Cidade é obrigatória.");
        verificarCampo(estado, "Estado é obrigatório.");

        // Valida o campo genero
        if (!genero.value) {
            mostrarErro(genero, "Gênero é obrigatório.");
            formularioValido = false;
        } else {
            limparErro(genero);
        }
        
      
        // Valida os campos de envio dos documentos 
        if (!documentoIdentidade.files.length) {
            mostrarErro(documentoIdentidade, "Documento obrigatório.");
            formularioValido = false;
        } else {
            limparErro(documentoIdentidade);
        }
        
        if (!comprovanteResidencia.files.length) {
            mostrarErro(comprovanteResidencia, "Comprovante obrigatório.");
            formularioValido = false;
        } else {
            limparErro(comprovanteResidencia);
        }
        
        // Validação do e-mail
        if (!validarEmail()) {
            formularioValido = false;
        }
        // Validação do CPF
        if (!validarCPF()) {
            formularioValido = false;
        }        

        // Validação do checkbox de termos
        if (!termos.checked) {
            mostrarErro(termos, "Você deve aceitar os termos.");
            formularioValido = false;
        } else {
            limparErro(termos);
        }

        // Se todas as validações forem bem-sucedidas, exibir um resumo dos dados
        if (formularioValido) {
            inscrever(); // Chama a função para salvar os dados no localStorage
            const resumo = `Confirme os dados antes de enviar:\n\nNome: ${nome.value}\nData de Nascimento: ${dataNascimento.value}\nCPF: ${cpf.value}\nE-mail: ${email.value} \nIdentidade: ${documentoIdentidade.value}
            \nComprovante: ${comprovanteResidencia.value}\nTelefone: ${telefone.value}\nCEP: ${cep.value}\nRua: ${rua.value}\nNúmero: ${numero.value}\nCidade: ${cidade.value}\nEstado: ${estado.value}\n\nClique em OK para confirmar.`;
            
            if (confirm(resumo)) {
                alert("Formulário enviado com sucesso!");
                form.submit();
            }
        }
    });

    // Adiciona um evento para limpar mensagens de erro enquanto o usuário digita
    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", function () {
            limparErro(input);
        });
    });

    // Para checkbox, escutamos mudanças
    termos.addEventListener("change", function () {
        limparErro(termos);
    });
});
