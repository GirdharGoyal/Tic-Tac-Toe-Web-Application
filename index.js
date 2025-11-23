    let board = ["","","","","","","","",""];
    let current = "X";
    let running = true;
    let aiMode = false; // false = 2 players, true = vs AI

    const boardEl = document.getElementById("board");
    const statusEl = document.getElementById("status");
    const modeEl = document.getElementById("mode");

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function init() {
        boardEl.innerHTML = "";
        board = ["","","","","","","","",""];
        running = true;
        current = "X";
        statusEl.textContent = "Player X's Turn";

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.index = i;
            cell.onclick = () => playerMove(i);
            boardEl.appendChild(cell);
        }
    }

    function playerMove(i) {
        if (!running || board[i] !== "") return;

        board[i] = current;
        refresh();

        if (checkWin(current)) return end(`Player ${current} Wins!`);
        if (isDraw()) return end("Draw!");

        if (aiMode && current === "X") {
            current = "O";
            statusEl.textContent = "AI Thinking...";
            setTimeout(aiMove, 300);
        } else {
            current = current === "X" ? "O" : "X";
            statusEl.textContent = `Player ${current}'s Turn`;
        }
    }

    function aiMove() {
        let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
        let choice = empty[Math.floor(Math.random()*empty.length)];

        board[choice] = "O";
        refresh();

        if (checkWin("O")) return end("AI Wins!");
        if (isDraw()) return end("Draw!");

        current = "X";
        statusEl.textContent = "Player X's Turn";
    }

    function refresh() {
        [...boardEl.children].forEach((cell, i) => {
            cell.textContent = board[i];
        });
    }

    function checkWin(player) {
        return wins.some(([a, b, c]) =>
            board[a] === player && board[b] === player && board[c] === player
        );
    }

    function isDraw() {
        return board.every(v => v !== "");
    }

    function end(msg) {
        running = false;
        statusEl.textContent = msg;
    }

    function restart() {
        init();
    }

    function toggleMode() {
        aiMode = !aiMode;
        modeEl.textContent = aiMode ? "Vs AI" : "2 Players";
        restart();
    }

    // init();