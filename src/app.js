function ola (nome) {
    const texto = `Olá ${nome || 'web developer'}!`;
	console.log(texto);
}

module.exports = ola