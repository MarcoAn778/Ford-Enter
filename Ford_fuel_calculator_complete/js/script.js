function pedirDado(titulo, mensagem) {
    return new Promise((resolve) => {
        const modal = document.getElementById('custom-modal');
        const input = document.getElementById('modal-input');
        const confirmBtn = document.getElementById('modal-confirm');
        
        document.getElementById('modal-title').innerText = titulo;
        document.getElementById('modal-msg').innerText = mensagem;
        input.value = "";
        modal.classList.remove('hidden');

        confirmBtn.onclick = () => {
            let valor = parseFloat(input.value);
            if (isNaN(valor) || valor <= 0) {
                alert("Por favor, insira um valor válido!");
            } else {
                modal.classList.add('hidden');
                resolve(valor);
            }
        };
    });
}

async function iniciarPesquisa() {

    let distancia = parseFloat(document.getElementById('distance').value);
    let consumoMedio = parseFloat(document.getElementById('fuel-consumption').value);
    let qtd_postos = parseInt(document.getElementById('num-stations').value);


    if (!distancia || !consumoMedio || !qtd_postos || distancia <= 0 || consumoMedio <= 0 || qtd_postos <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let consumoNecessarioLitros = distancia / consumoMedio;
    let menorPreco = Infinity;
    let somaTotal = 0;

    for (let i = 1; i <= qtd_postos; i++) {
        let preco = await pedirDado(`Posto ${i}`, `Qual o valor do combustível no posto ${i}?`);
        somaTotal += preco;
        if (preco < menorPreco) menorPreco = preco;
    }

    exibirResultados(consumoNecessarioLitros, menorPreco, somaTotal / qtd_postos);
}

function exibirResultados(litros, menor, media) {
    const resDiv = document.getElementById('results');
    const gastoDiario = 2 * (litros * menor);

    resDiv.classList.remove('hidden');
    document.getElementById('setup-form').classList.add('hidden');

    resDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p>Consumo necessário: <strong>${litros.toFixed(2)} L</strong></p>
        <p>Menor preço: <strong>R$ ${menor.toFixed(2)}</strong></p>
        <p>Média de preços: <strong>R$ ${media.toFixed(2)}</strong></p>
        <hr>
        <p style="color: green">Gasto Diário (Ida/Volta):<br>
        <span style="font-size: 1.5rem">R$ ${gastoDiario.toFixed(2)}</span></p>
        <button onclick="location.reload()">Refazer</button>
    `;
}