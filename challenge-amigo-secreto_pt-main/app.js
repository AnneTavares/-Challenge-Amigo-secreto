const amigos = [];

// Adiciona amigo
function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim(); // remove espaços
  const msgErro = document.getElementById('msgErro');

  // Verifica se o nome é vazio
  if (nome === '') {
    msgErro.textContent = 'Por favor, insira um nome válido.';
    input.focus();
    return;
  }

  // Verifica duplicado
  if (amigos.includes(nome)) {
    msgErro.textContent = 'Esse nome já foi adicionado.';
    input.value = '';
    input.focus();
    return;
  }

  // Adiciona amigo
  amigos.push(nome);
  input.value = '';
  input.focus();
  msgErro.textContent = ''; // limpa mensagem de erro
  atualizarLista();
}

// Atualiza lista na tela
function atualizarLista() {
  const lista = document.getElementById('listaAmigos');
  lista.innerHTML = '';
  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = amigo + ' ';

    // Botão coração/X
    const heartBtn = document.createElement('button');
    heartBtn.classList.add('delete-btn');
    heartBtn.onclick = () => {
      amigos.splice(index, 1);
      atualizarLista();
    };

    li.appendChild(heartBtn);
    lista.appendChild(li);
  });
}

// Sorteia amigo
function sortearAmigo() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';
  const msgErro = document.getElementById('msgErro');

  if (amigos.length === 0) {
    msgErro.textContent = 'Nenhum amigo para sortear.';
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  const li = document.createElement('li');
  li.textContent = amigoSorteado;
  li.classList.add('fade-in');
  resultado.appendChild(li);
}

// Liga os botões e Enter
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.querySelector('.button-add');
  const btnDraw = document.querySelector('.button-draw');

  if (btnAdd) btnAdd.addEventListener('click', adicionarAmigo);
  if (btnDraw) btnDraw.addEventListener('click', sortearAmigo);

  const input = document.getElementById('amigo');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        adicionarAmigo();
      }
    });
  }
});
