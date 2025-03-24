function enviarFormulario(event, formId) {
    event.preventDefault();

    // Obtém o formulário pelo ID
    const form = document.getElementById(formId);
    const submitButton = form.querySelector("button[type='submit']");

    if (!form) {
        console.error('Formulário não encontrado com o ID:', formId);
        alert('Erro interno: Formulário não encontrado.');
        return;
    }

    // Desativa o botão de envio
    submitButton.disabled = true;

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);

    // Valida se todos os campos obrigatórios estão preenchidos
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
        let fieldValue = formData.get(field.name); // Obtém o valor do campo

        if (field.tagName === 'SELECT') {
            // Valida campos de seleção (select)
            if (!fieldValue || fieldValue === '' || fieldValue === null) {
                valid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        } else if (field.type === 'file') {
            // Valida campos de arquivo
            if (field.files.length === 0) {
                valid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        } else {
            // Valida outros campos (text, email, tel, etc.)
            if (!fieldValue || fieldValue.trim() === '') {
                valid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        }
    });

    //criar um log no console para ver oqeu esta sendo enviado no formulario trabalhe conosco
    console.log(formData);
    
    if (!valid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        submitButton.disabled = false; // Reativa o botão se a validação falhar
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
                alert(data.message || 'Formulário enviado com sucesso!');
                form.reset(); // Limpa o formulário após o envio
            } else {
                alert(data.message || 'Erro ao enviar o formulário.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            alert('Erro no servidor: ' + error.message);
        })
        .finally(() => {
            // Reativa o botão de envio após o término do processo
            submitButton.disabled = false;
        });
}
