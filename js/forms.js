function enviarFormulario(event, formId) {
    event.preventDefault();

    // Obtém o formulário pelo ID
    const form = document.getElementById(formId);
    if (!form) {
        console.error('Formulário não encontrado com o ID:', formId);
        alert('Erro interno: Formulário não encontrado.');
        return;
    }

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);

    // Valida se todos os campos obrigatórios estão preenchidos
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const emptyFields = requiredFields.filter(field => !formData.get(field.name));

    if (emptyFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        emptyFields.forEach(field => console.warn(`Campo vazio: ${field.name}`));
        return;
    }

    // Envia os dados via fetch
    fetch('enviar_email.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta do servidor: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                form.reset(); // Limpa o formulário após o envio
            } else {
                alert(data.message || 'Erro ao enviar o formulário.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
        });
}
