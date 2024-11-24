import React, { useState, useEffect } from 'react';
import { Card, Alert, Modal, Button } from 'react-bootstrap';
import { Timer, User } from 'lucide-react';

const BOARD_SIZE = 10;
const TURN_TIME = 30; // seconds

const InternationalCheckersGame = () => {
	const [board, setBoard] = useState(initializeBoard());
	const [currentPlayer, setCurrentPlayer] = useState('white');
	const [selectedPiece, setSelectedPiece] = useState(null);
	const [possibleMoves, setPossibleMoves] = useState([]);
	const [turnTimer, setTurnTimer] = useState(TURN_TIME);
	const [gameTimer, setGameTimer] = useState(0);
	const [winner, setWinner] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [turnCount, setTurnCount] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setGameTimer(prevTimer => prevTimer + 1);
			setTurnTimer(prevTimer => {
				if (prevTimer > 0) return prevTimer - 1;
				endTurn(true);
				return TURN_TIME;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	function initializeBoard() {
		const board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null));

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < BOARD_SIZE; j++) {
				if ((i + j) % 2 !== 0) {
					board[i][j] = { color: 'black', isKing: false };
				}
			}
		}

		for (let i = BOARD_SIZE - 4; i < BOARD_SIZE; i++) {
			for (let j = 0; j < BOARD_SIZE; j++) {
				if ((i + j) % 2 !== 0) {
					board[i][j] = { color: 'white', isKing: false };
				}
			}
		}

		return board;
	}

	function handlePieceClick(row, col) {
		if (board[row][col] && board[row][col].color === currentPlayer) {
			setSelectedPiece({ row, col });
			setPossibleMoves(calculatePossibleMoves(row, col));
		} else if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
			movePiece(selectedPiece, { row, col });
		}
	}

	function calculatePossibleMoves(row, col) {
		const piece = board[row][col];
		const moves = [];

		const directions = piece.isKing ? [-1, 1] : piece.color === 'white' ? [-1] : [1];

		for (const rowDir of directions) {
			for (const colDir of [-1, 1]) {
				if (isValidMove(row, col, row + rowDir, col + colDir)) {
					moves.push({ row: row + rowDir, col: col + colDir, isCapture: false });
				}
				if (isValidCapture(row, col, row + rowDir, col + colDir, row + 2 * rowDir, col + 2 * colDir)) {
					moves.push({ row: row + 2 * rowDir, col: col + 2 * colDir, isCapture: true });
				}
			}
		}

		// Add backward capture moves for all pieces
		for (const rowDir of [-1, 1]) {
			for (const colDir of [-1, 1]) {
				if (isValidCapture(row, col, row + rowDir, col + colDir, row + 2 * rowDir, col + 2 * colDir)) {
					moves.push({ row: row + 2 * rowDir, col: col + 2 * colDir, isCapture: true });
				}
			}
		}

		return moves;
	}

	function isValidMove(fromRow, fromCol, toRow, toCol) {
		return toRow >= 0 && toRow < BOARD_SIZE && toCol >= 0 && toCol < BOARD_SIZE && !board[toRow][toCol];
	}

	function isValidCapture(fromRow, fromCol, overRow, overCol, toRow, toCol) {
		return isValidMove(fromRow, fromCol, toRow, toCol) &&
			board[overRow][overCol] &&
			board[overRow][overCol].color !== currentPlayer;
	}

	function movePiece(from, to) {
		const newBoard = board.map(row => [...row]);
		const piece = { ...newBoard[from.row][from.col] };

		newBoard[from.row][from.col] = null;
		newBoard[to.row][to.col] = piece;

		if (Math.abs(from.row - to.row) === 2) {
			const capturedRow = (from.row + to.row) / 2;
			const capturedCol = (from.col + to.col) / 2;
			newBoard[capturedRow][capturedCol] = null;
		}

		if ((piece.color === 'white' && to.row === 0) || (piece.color === 'black' && to.row === BOARD_SIZE - 1)) {
			piece.isKing = true;
		}

		setBoard(newBoard);
		setSelectedPiece(null);
		setPossibleMoves([]);
		endTurn();
	}

	function endTurn(timeout = false) {
		if (timeout) {
			setWinner(currentPlayer === 'white' ? 'black' : 'white');
			setGameOver(true);
		} else {
			setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
			setTurnTimer(TURN_TIME);
			setTurnCount(prevCount => prevCount + 1);
			checkGameOver();
		}
	}

	function checkGameOver() {
		const whitePieces = board.flat().filter(piece => piece && piece.color === 'white').length;
		const blackPieces = board.flat().filter(piece => piece && piece.color === 'black').length;

		if (whitePieces === 0) {
			setWinner('black');
			setGameOver(true);
		} else if (blackPieces === 0) {
			setWinner('white');
			setGameOver(true);
		}
	}

	function restartGame() {
		setBoard(initializeBoard());
		setCurrentPlayer('white');
		setSelectedPiece(null);
		setPossibleMoves([]);
		setTurnTimer(TURN_TIME);
		setGameTimer(0);
		setWinner(null);
		setGameOver(false);
		setTurnCount(0);
	}

	return (
		<div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
			<Card className="shadow-lg rounded w-100" style={{ maxWidth: '700px' }}>
				<Card.Body>
					<h1 className="text-center mb-4">Jeu de Dames Internationales</h1>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<div className="d-flex align-items-center">
							<User className={`me-2 ${currentPlayer === 'white' ? 'text-primary' : 'text-secondary'}`} />
							<span className={`fw-bold ${currentPlayer === 'white' ? 'text-primary' : 'text-secondary'}`}>
								Joueur Blanc
							</span>
						</div>
						<div className="d-flex align-items-center">
							<Timer className="text-secondary me-2" />
							<span className="fw-bold">{turnTimer}s</span>
						</div>
						<div className="d-flex align-items-center">
							<User className={`me-2 ${currentPlayer === 'black' ? 'text-danger' : 'text-secondary'}`} />
							<span className={`fw-bold ${currentPlayer === 'black' ? 'text-danger' : 'text-secondary'}`}>
								Joueur Noir
							</span>
						</div>
					</div>
					<div className="d-grid" style={{ gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
						{board.map((row, rowIndex) => (
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`aspect-ratio aspect-ratio-1x1 d-flex align-items-center justify-content-center cursor-pointer
                                        ${(rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-secondary'}
                                        ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'ring ring-warning' : ''}
                                        ${possibleMoves.some(move => move.row === rowIndex && move.col === colIndex) ? 'ring ring-success' : ''}`}
									onClick={() => handlePieceClick(rowIndex, colIndex)}
									style={{ aspectRatio: '1/1' }}
								>
									{cell && (
										<div className={`rounded-circle ${cell.color === 'white' ? 'bg-primary' : 'bg-danger'} 
                                            d-flex align-items-center justify-content-center`}
											style={{ width: '75%', height: '75%' }}
										>
											{cell.isKing && <span className="text-warning fw-bold">♔</span>}
										</div>
									)}
								</div>
							))
						))}
					</div>
					<div className="d-flex justify-content-between align-items-center mt-3">
						<span className="fw-bold">Tours: {turnCount}</span>
						<span className="fw-bold">Temps de jeu: {Math.floor(gameTimer / 60)}:{(gameTimer % 60).toString().padStart(2, '0')}</span>
					</div>
				</Card.Body>
			</Card>

			<Modal show={gameOver} onHide={restartGame} centered>
				<Modal.Header closeButton>
					<Modal.Title>Partie terminée</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{winner ? `Le joueur ${winner} a gagné !` : "Match nul !"}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={restartGame}>
						Nouvelle partie
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default InternationalCheckersGame;