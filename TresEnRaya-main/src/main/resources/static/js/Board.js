class Board {

    constructor(scoreBoard) {

        this.scoreBoard = scoreBoard;

        this.cells = [];
        this.players = [];
        this.ready = false;
        this.score = 0;
        this.score2 = 0;
        this.createTable();
    }

    createTable() {

        this.table = document.createElement('table');
        this.table.addEventListener('click', event => this.markEvent(event));
        this.table.classList.add('gameBoard');

        let rowCol = document.createElement('td');
        rowCol.classList.add('boardRow');
        rowCol.classList.add('bgWhite');
        rowCol.setAttribute('colspan', 5);

        let row = document.createElement('tr');
        row.appendChild(rowCol);

        let col = document.createElement('td');
        col.classList.add('boardCol');
        col.classList.add('bgWhite');

        let cell = document.createElement('td');
        cell.classList.add('gameCell');
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'false');
        cell.setAttribute('data-intent', 'gameCell');

        for (let i = 0; i < 9; i++) {
            let newCell = cell.cloneNode(true);
            newCell.setAttribute('id', 'cell-' + i);
            this.cells.push(newCell);
        }

        for (let r, i = 0; i < 9; i += 3) {

            r = row.cloneNode(false);
            r.appendChild(this.cells[i]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 1]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 2]);

            this.table.appendChild(r);

            if (i < 6) {
                this.table.appendChild(row.cloneNode(true));
            }
        }
    }

    addTable(container) {
        container.appendChild(this.table);
    }

    disableAll() {
        for (let cell of this.cells) {
            cell.classList.add('notActive');
            cell.setAttribute('active', 'false');
        }
    }

    enableAll() {
        for (let cell of this.cells) {
            cell.classList.remove('notActive');
            cell.setAttribute('marked', 'false');
        }
    }

    enableTurn() {
        for (let cell of this.cells) {
            if (cell.getAttribute('marked') === 'false') {
                cell.classList.remove('notActive');
                cell.setAttribute('active', 'true');
            }
        }
    }

    highlightCells(positions) {

        for (let i of positions) {
            this.cells[i].classList.add('colorRed');
        }

        for (let cell of this.cells) {
            cell.setAttribute('marked', 'true');
        }
    }

    lowlightCells() {
        for (let cell of this.cells) {
            cell.classList.add('colorWhite');
        }
    }

    onMark(cellId) { }

    markEvent(event) {
        let target = event.target;

        if (this.ready && target.getAttribute('data-intent') === 'gameCell' &&
            target.getAttribute('active') === 'true') {
            this.onMark(this.cells.indexOf(target));
            this.disableAll();
        }
    }

    doMark(cellId, label) {
        let cell = this.cells[cellId];
        cell.textContent = label;
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'true');
    }

    doWinner(winner, pos) {

        let looser;
        if (winner === this.players[0].name) {
            looser = this.players[1].name;
            this.score++;
        } else {
            looser = this.players[0].name;
            this.score2++;
        }

        console.log(`score del jugador 1: ${this.score}`)
        console.log(`score del jugador 2: ${this.score2}`)
        const score1 = document.getElementById('score1');
        score1.innerHTML = this.score;

        const score2 = document.getElementById('score2')
        score2.innerHTML = this.score2;

        const reloadButton = document.createElement('button');
        reloadButton.innerText = 'Reiniciar';
        reloadButton.addEventListener('click', () => {
            if (confirm('¿Deseas reiniciar el juego?')) {
                this.removePopup(popup);
                location.reload();
            }
        });

        const message = document.createElement('div');
        message.innerHTML = `
            <h2>${winner} ha ganado!</h2>
            <p>${looser} ha perdido.</p>
        `;
        message.appendChild(reloadButton);

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.appendChild(message);
        document.body.appendChild(popup);

        this.disableAll();
        this.highlightCells(pos);
    }

    doDraw() {
        const reloadButton = document.createElement('button');
        reloadButton.innerText = 'Reiniciar';
        reloadButton.addEventListener('click', () => {
            if (confirm('¿Deseas reiniciar el juego?')) {
                this.removePopup(popup);
                location.reload();
            }
        });

        const message = document.createElement('div');
        message.innerHTML = `
            <h2>Nadie ha ganado... Empate!</h2>
        `;
        message.appendChild(reloadButton);

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.appendChild(message);
        document.body.appendChild(popup);

        this.lowlightCells();
    }

    removePopup(popup) {
        popup.parentNode.removeChild(popup);
    }

    highlightScoreboard(playerId) {

        for (let board of this.scoreBoard) {
            board.classList.remove('active');

            if (board.getAttribute('playerId') == playerId) {
                board.classList.add('active');
            }
        }
    }

    addPlayer(player) {

        if (this.players.length < 2) {

            if (this.players.length === 0 || this.players[0].id != player.id) {

                this.players.push(player);

                let score = this.scoreBoard[this.players.length - 1];

                if (this.players.length === 1) {
                    score.textContent = player.label + ' ' + player.name;
                } else {
                    score.textContent = player.name + ' ' + player.label;
                }

                score.setAttribute('playerId', player.id);
            }
        }
    }

    restart() {

        for (let cell of this.cells) {

            cell.classList.remove('colorRed');
            cell.classList.add('notActive');

            cell.classList.remove('colorWhite');
            cell.classList.remove('colorRed');

            cell.setAttribute('marked', 'false');
            cell.setAttribute('active', 'false');

            cell.textContent = '';
        }
    }
}
