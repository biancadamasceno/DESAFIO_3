document.addEventListener("DOMContentLoaded", function () { 
    let form = document.getElementById("formulario");
    let nome = document.getElementById("nome");
    let dataNascimento = document.getElementById("data");
    let cpf = document.getElementById("numCpf");
    let email = document.getElementById("email");
    let telefone = document.getElementById("telefone");
    let cep = document.getElementById("cep");
    let genero = document.getElementById("genero");
    let rua = document.getElementById("rua");
    let numero = document.getElementById("numero");
    let cidade = document.getElementById("cidade");
    let estado = document.getElementById("estado");
    let termos = document.querySelector("input[type=checkbox]");
    let documentoIdentidade = document.getElementById("documentoIdentidade");
    let comprovanteResidencia = document.getElementById("comprovanteResidencia");
    let botaoInscricao = document.querySelector(".botao2");
    
function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

window.inscrever = async function () {
    try {
        let identidadeBase64 = documentoIdentidade.files.length > 0 
            ? await converterParaBase64(documentoIdentidade.files[0]) 
            : null;

        let comprovanteBase64 = comprovanteResidencia.files.length > 0 
            ? await converterParaBase64(comprovanteResidencia.files[0]) 
            : null;

        let dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario') || '[]');
        
        if (dadosUsuario.length > 0 && dadosUsuario[0].comprovante) {
    
        }
      
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
            identidade: identidadeBase64,  
            comprovante: comprovanteBase64, 
            termosAceitos: termos.checked
        });

        localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
    } catch (error) {
        console.error("Erro ao salvar os arquivos:", error);
        alert("Ocorreu um erro ao processar os documentos. Tente novamente.");
    }
}

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

    function limparErro(input) {
        let erroSpan = input.nextElementSibling;
        if (erroSpan && erroSpan.classList.contains("erro")) {
            erroSpan.textContent = "";
        }
    }

    function validarCPF() {
        let cpfLimpo = cpf.value.replace(/\D/g, ""); 
        if (cpfLimpo.length !== 11) {
            mostrarErro(cpf, "CPF deve conter exatamente 11 dígitos.");
            return false;
        }
        limparErro(cpf);
        return true;
    }

    function validarEmail() {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            mostrarErro(email, "Digite um e-mail válido (exemplo: email@email.com)");
            return false;
        }
        limparErro(email);
        return true;
    }

    let botaoSalvar = document.getElementById("botaoSalvar");

    botaoSalvar.addEventListener("click", function () {
        let dadosSalvos = {
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

    let rascunho = JSON.parse(localStorage.getItem("rascunhoFormulario"));
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

    botaoInscricao.addEventListener("click", function (event) {
        event.preventDefault(); 

        let formularioValido = true; 

        function verificarCampo(input, mensagem) {
            if (input.value.trim() === "") {
                mostrarErro(input, mensagem);
                formularioValido = false;
            } else {
                limparErro(input);
            }
        }

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

        if (!genero.value) {
            mostrarErro(genero, "Gênero é obrigatório.");
            formularioValido = false;
        } else {
            limparErro(genero);
        }
        
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
        
        if (!validarEmail()) {
            formularioValido = false;
        }
  
        if (!validarCPF()) {
            formularioValido = false;
        }        

        if (!termos.checked) {
            mostrarErro(termos, "Você deve aceitar os termos.");
            formularioValido = false;
        } else {
            limparErro(termos);
        }

        if (formularioValido) {
            let resumo = `Confirme os dados antes de enviar:\n\nNome: ${nome.value}\nData de Nascimento: ${dataNascimento.value}\nCPF: ${cpf.value}\nE-mail: ${email.value} \nIdentidade: ${documentoIdentidade.value}
            \nComprovante: ${comprovanteResidencia.value}\nTelefone: ${telefone.value}\nCEP: ${cep.value}\nRua: ${rua.value}\nNúmero: ${numero.value}\nCidade: ${cidade.value}\nEstado: ${estado.value}\n\nClique em OK para confirmar.`;
            
            if (confirm(resumo)) {
                inscrever(); 
                alert("Formulário enviado com sucesso!");
                form.submit();
            }
        }
    });

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", function () {
            limparErro(input);
        });
    });

    termos.addEventListener("change", function () {
        limparErro(termos);
    });
});
