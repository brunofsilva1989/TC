
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

//LISTER DOS ENVIOS DE FORMULARIO