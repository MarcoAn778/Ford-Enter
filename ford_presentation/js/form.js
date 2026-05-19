
//class contato

class contato {
    constructor(nome, sobrenome, email, cpf, telefone, tipo_contato, mensagem) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipo_contato = tipo_contato;
        this.mensagem = mensagem;
    }
}

function Post(form) {

    let data = new contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value,
        form.elements.namedItem("email").value,
        form.elements.namedItem("cpf").value,
        form.elements.namedItem("telefone").value,  
        form.elements.namedItem("tipo_contato").value,
        form.elements.namedItem("mensagem").value);
  
    console.log("Dados do contato:", data);

    Enviar(data.nome);
}

function Enviar(nomeUser) {

    if (nomeUser && nomeUser.trim() !== "") {
        alert('Obrigado sr(a) ' + nomeUser + ' os seus dados foram encaminhados com sucesso');
    }

}