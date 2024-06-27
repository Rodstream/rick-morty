document.getElementById('fetchAll').addEventListener('click', fetchAllCharacters);
document.getElementById('fetchFiltered').addEventListener('click', fetchFilteredCharacters);

async function fetchAllCharacters() {
    try {
        let characters = [];
        let url = 'https://rickandmortyapi.com/api/character';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            characters = characters.concat(data.results);
            url = data.info.next;
        }
        displayCharacters(characters);
    } catch (error) {
        displayError(error);
    }
}

async function fetchFilteredCharacters() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    const url = new URL('https://rickandmortyapi.com/api/character');
    const params = { name, status, species, type, gender };
    Object.keys(params).forEach(key => {
        if (params[key]) url.searchParams.append(key, params[key]);
    });

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        displayError(error);
    }
}

function displayCharacters(characters) {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = '';
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
        `;
        charactersDiv.appendChild(characterDiv);
    });
}

function displayError(error) {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
