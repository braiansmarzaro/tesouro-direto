document.getElementById('resgate-adiantado-checkbox').addEventListener('change', function() {
    const resgateAdiantadoCampos = document.getElementById('resgate-adiantado-campos');
    resgateAdiantadoCampos.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('reinvestir-checkbox').addEventListener('change', function() {
    const reinvestimentoCampos = document.getElementById('reinvestimento-campos');
    reinvestimentoCampos.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos inputs
    const finalDate = new Date(document.getElementById('final-date').value);
    const currentPrice = parseFloat(document.getElementById('current-price').value);
    const currentDate = new Date(document.getElementById('current-date').value);
    const taxaTesouro = parseFloat(document.getElementById('taxa-tesouro').value) / 100;
    const taxaSelic = parseFloat(document.getElementById('taxa-selic').value) / 100;
    const resgateAdiantado = document.getElementById('resgate-adiantado-checkbox').checked;
    const selic = resgateAdiantado ? parseFloat(document.getElementById('selic').value) / 100 : 0;
    const timeX = resgateAdiantado ? parseInt(document.getElementById('time-x').value) : 0;
    const reinvestir = document.getElementById('reinvestir-checkbox').checked;
    const newDy = reinvestir ? parseFloat(document.getElementById('new-dy').value) / 100 : 0;

    // Calcular o rendimento do Tesouro até a data final
    const daysUntilFinal = (finalDate - currentDate) / (1000 * 60 * 60 * 24);
    const rendimentoTesouro = currentPrice * Math.pow(1 + taxaTesouro, daysUntilFinal / 365);

    // Calcular o rendimento de atual até X (resgate antecipado)
    let rendimentoAteX = currentPrice;
    if (resgateAdiantado) {
        rendimentoAteX = currentPrice * Math.pow(1 + selic, timeX / 365);
    }

    // Calcular o rendimento total considerando reinvestimento em novo DY (se aplicável)
    let rendimentoTotal = rendimentoAteX;
    if (reinvestir) {
        rendimentoTotal = rendimentoAteX * Math.pow(1 + newDy, (daysUntilFinal - timeX) / 365);
    }

    // Exibir os resultados
    document.getElementById('rendimento-tesouro').textContent = rendimentoTesouro.toFixed(2);
    document.getElementById('rendimento-ate-x').textContent = rendimentoAteX.toFixed(2);
    document.getElementById('rendimento-total').textContent = rendimentoTotal.toFixed(2);
});