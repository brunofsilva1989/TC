// // Email handling implementation
// (function () {
//   // Inicializa o EmailJS - Coloque seu Public Key aqui
//   emailjs.init("7gkp7lpWVEOTmgHpP");

//   // Função principal para enviar emails
//   function sendEmail(formData, templateId) {
//     // Prepara os dados do template com valores do formulário
//     const templateParams = {
//       nome: formData.get("nome") || "",
//       email: formData.get("email") || "",
//       telefone: formData.get("telefone") || "",
//       area_interesse: formData.get("area_interesse") || "",
//       problema: formData.get("problema") || "",
//       detalhes: formData.get("detalhes") || "",
//       message: formData.get("message") || "",
//     };

//     // Configurações do serviço
//     const serviceID = "service_9xoacyd"; // Seu Service ID do EmailJS

//     // Envia o email
//     return emailjs
//       .send(serviceID, templateId, templateParams)
//       .then((response) => {
//         console.log("Email enviado com sucesso:", response);
//         return { success: true, message: "Mensagem enviada com sucesso!" };
//       })
//       .catch((error) => {
//         console.error("Erro ao enviar email:", error);
//         throw new Error(
//           "Falha ao enviar mensagem. Por favor, tente novamente."
//         );
//       });
//   }

//   // Handler para o formulário de Contato
//   function handleContactForm(event) {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);

//     // Template ID específico para o formulário de contato
//     const templateId = "template_utanb84";

//     sendEmail(formData, templateId)
//       .then((result) => {
//         alert(result.message);
//         form.reset();
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   }

//   // Handler para o formulário Trabalhe Conosco
//   function handleTrabalheConoscoForm(event) {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);

//     // Template ID específico para o formulário Trabalhe Conosco
//     const templateId = "template_ao2xuus";

//     sendEmail(formData, templateId)
//       .then((result) => {
//         alert("Currículo enviado com sucesso! Entraremos em contato.");
//         form.reset();
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   }

//   // Handler para o formulário SAC
//   function handleSacForm(event) {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);

//     // Template ID específico para o formulário SAC
//     const templateId = "template_utanb84"; // Substitua pelo ID correto do template SAC

//     sendEmail(formData, templateId)
//       .then((result) => {
//         alert(
//           "Sua solicitação foi enviada com sucesso! Entraremos em contato em breve."
//         );
//         form.reset();
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   }

//   // Adiciona event listeners quando o DOM estiver carregado
//   document.addEventListener("DOMContentLoaded", () => {
//     const contactForm = document.getElementById("contactForm");
//     const trabalheConoscoForm = document.getElementById("trabalheConoscoForm");
//     const sacForm = document.getElementById("sacForm");

//     if (contactForm) {
//       contactForm.addEventListener("submit", handleContactForm);

//       // Debug para verificar os valores dos campos
//       contactForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         console.log("Nome:", document.getElementById("name").value);
//         console.log("Email:", document.getElementById("email").value);
//         console.log("Telefone:", document.getElementById("phone").value);
//         console.log("Mensagem:", document.getElementById("message").value);
//       });
//     }

//     if (trabalheConoscoForm) {
//       trabalheConoscoForm.addEventListener("submit", handleTrabalheConosco);
      
//       // Debug para verificar os valores dos campos
//       trabalheConoscoForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         console.log("Nome:", document.getElementById("nome").value);
//         console.log("Email:", document.getElementById("email").value);
//         console.log("Telefone:", document.getElementById("telefone").value);
//         //console.log("Área de interesse:", document.getElementById("area_interesse").value);
//       });
//     }

//     if (sacForm) {
//       sacForm.addEventListener("submit", handleSacForm);


//       // Debug para verificar os valores dos campos
//       sacForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         console.log("Nome:", document.getElementById("name").value);
//         console.log("Email:", document.getElementById("email").value);        
//         console.log("Mensagem:", document.getElementById("message").value);
//       });
//     }
//   });
// })();


/*INTERAÇÂO DO MODAL*/

//criar um mecanismo para chamar os modais dinamicamente de produtos
// Seleciona todas as imagens que têm data-abrir-modal
document.querySelectorAll('[data-abrir-modal]').forEach(botao => {
  botao.addEventListener('click', () => {
    const titulo = botao.getAttribute('data-titulo') || '';
    const imagemNormal = botao.getAttribute('data-imagem-normal');
    const imagemPacote = botao.getAttribute('data-imagem-pacote');

    // Função para mostrar a imagem normal no modal
    const exibirImagemNormal = () => {
      document.getElementById('conteudoModal').innerHTML = `
        <img src="${imagemNormal}" class="img-fluid" alt="${titulo}">
        <div class="d-flex justify-content-center mt-3">
          <button id="btnVerTamanhoReal" class="btn btn-danger">VER PACOTE EM TAMANHO REAL</button>
        </div>
      `;

      // Configura o evento para o botão "VER PACOTE EM TAMANHO REAL"
      document
        .getElementById('btnVerTamanhoReal')
        .addEventListener('click', exibirImagemPacote);
    };

    // Função para mostrar a imagem grande no modal
    const exibirImagemPacote = () => {
      document.getElementById('conteudoModal').innerHTML = `
        <img src="${imagemPacote}" class="img-fluid" alt="${titulo}">
        <div class="d-flex justify-content-center mt-3">
        <button id="btnVoltar" class="btn btn-danger">VOLTAR</button>
        </div>
      `;

      // Configura o evento para o botão "VOLTAR"
      document
        .getElementById('btnVoltar')
        .addEventListener('click', exibirImagemNormal);
    };

    // Exibe a imagem normal ao iniciar o modal
    exibirImagemNormal();

    // Inicia o modal (Bootstrap 5)
    const modalBootstrap = new bootstrap.Modal(document.getElementById('modalUnico'));
    modalBootstrap.show();
  });
});

//LISTER DOS ENVIOS DE FORMULARIOS








// Seleciona todas as imagens que têm data-abrir-modal
// document.querySelectorAll('[data-abrir-modal]').forEach(botao => {
//   botao.addEventListener('click', () => {
//     const titulo = botao.getAttribute('data-titulo') || '';
//     const imagemNormal = botao.getAttribute('data-imagem-normal');
//     const imagemPacote = botao.getAttribute('data-imagem-pacote');

//     // Título no cabeçalho do modal
//     document.getElementById('modalUnicoLabel').innerText = titulo;

//     // Monta conteúdo HTML para imagem normal + botão
//     document.getElementById('conteudoModal').innerHTML = `
//       <img src="${imagemNormal}" class="img-fluid" alt="${titulo}">      
//       <button id="btnVerTamanhoReal" class="btn btn-danger me-2 mb-0">VER PACOTE EM TAMANHO REAL</button>      
//     `;

//     // Inicia o modal (Bootstrap 5)
//     const modalBootstrap = new bootstrap.Modal(document.getElementById('modalUnico'));
//     modalBootstrap.show();

//     // Quando clicar em "VER PACOTE EM TAMANHO REAL"
//     document
//       .getElementById('btnVerTamanhoReal')
//       .addEventListener('click', () => {
//         // Troca o conteúdo para a imagem grande
//         document.getElementById('conteudoModal').innerHTML = `
//           <img src="${imagemPacote}" class="img-fluid mb-3" alt="${titulo}">          
//           <button id="btnVoltar" class="btn btn-secondary">VOLTAR</button>          
//         `;

//         // Botão "Voltar" para recarregar a imagem normal
//         document
//           .getElementById('btnVoltar')
//           .addEventListener('click', () => {
//             document.getElementById('conteudoModal').innerHTML = `
//               <img src="${imagemNormal}" class="img-fluid mb-3" alt="${titulo}">
//               <div class="align-self-center me-2 mb-0">
//               <button id="btnVerTamanhoReal" class="btn btn-danger align-self-center me-2 mb-0">VER PACOTE EM TAMANHO REAL</button>
//               </div>
//             `;
//             // Aqui poderia repetir a lógica do clique em "VER PACOTE EM TAMANHO REAL"
//             // se quiser trocar novamente. Mas nesse caso, é só um exemplo simples.
//           });
//       });
//   });
// });





