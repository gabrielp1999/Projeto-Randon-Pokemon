function gerarNumero() {
  return  Math.floor(Math.random() * 150);
}

async function buscarPokemon(numeroPokemon) {
    const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);

    return pokemon.data;
}

async function preencherTabela() {
    let conteudoTabela = `
    <tr>
        <td>Nome</td>
        <td>Imagem</td>
        <td></td>
    </tr>`;
    const tabela = document.getElementById('pokemon-table');

    for(let i = 0; i < 8; i++) {
        const numero = gerarNumero();
        const pokemon = await buscarPokemon(numero);

        conteudoTabela += `
        <tr>
            <td>${pokemon.name}</td>
            <td><img src="${pokemon.sprites.other.home.front_default}" /></td>
            <td><button onclick="selecionarPokemon(${pokemon.id})">Selecionar</button></td>
        </tr>`;
    }

    tabela.innerHTML = conteudoTabela;
}

async function selecionarPokemon(idPokemon) {
    const pokemon = await buscarPokemon(idPokemon);

    const nomePokemon = document.getElementById('nomePokemon');
    nomePokemon.innerHTML = pokemon.name;

    const codigoPokemon = document.getElementById('codigo');
    codigoPokemon.innerHTML = pokemon.order;

    const alturaPokemo = document.getElementById('alturaPokemo')
    alturaPokemo.innerHTML = pokemon.height;

    const habilidades = document.getElementById('abilidades');
    const abilites = pokemon.abilities.map(item => {
        return item.ability.name;
    })
    habilidades.innerHTML = abilites.toString();

    const peso = document.getElementById('peso');
    peso.innerHTML = pokemon.weight;

    const tipo = document.getElementById('tipo');
    const types = pokemon.types.map(item => {
        return item.type.name;
    });
    tipo.innerHTML = types.toString();
    
    const imagemGrande = document.getElementById('imagem-grande');
    imagemGrande.src = pokemon.sprites.other.home.front_default;
    

}


preencherTabela()