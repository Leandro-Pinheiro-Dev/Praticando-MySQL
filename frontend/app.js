document.getElementById('formUsuario').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    const formData = new FormData(this);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),  // Agora captura o campo 'senha'
        tipo: formData.get('tipo'),
        endereco: formData.get('endereco'),
        cidade: formData.get('cidade'),
        estado: formData.get('estado'),
        cep: formData.get('cep'),
        telefone: formData.get('telefone'),
        justificativa: formData.get('justificativa') || ""  // Se não preencher, atribui uma string vazia
    };

    console.log('Dados a serem enviados:', data);  // Exibe os dados para conferirmos

    fetch('http://localhost:3000/cadastrarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('Resposta recebida:', response);  // Log da resposta
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();  // Se a resposta for ok, converte para JSON
    })
    .then(result => {
        console.log('Resultado da requisição:', result);  // Log do resultado
        if (result.mensagem) {
            alert(result.mensagem);  // Mensagem de sucesso da API
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados.');
    });
});
