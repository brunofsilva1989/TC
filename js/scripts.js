/*!
 * Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project
// Função para aceitar cookies



//enviar curriculo por email

// Inicialize o EmailJS com sua User ID
(function () {
  emailjs.init("seu_user_id"); // Substitua com o seu User ID
})();

// Função para enviar o formulário
function enviarFormulario(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const form = document.getElementById("trabalheConoscoForm");

  // Crie um objeto com os dados do formulário
  const formData = new FormData(form);
  const data = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    area_interesse: formData.get("area_interesse"),
  };

  // Enviar dados para o EmailJS
  emailjs
    .send("seu_service_id", "seu_template_id", data)
    .then((response) => {
      alert("Currículo enviado com sucesso! Obrigado por entrar em contato.");
      form.reset(); // Limpa o formulário
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
      console.error("Erro:", error);
    });
}
