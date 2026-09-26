import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FolderSection from './components/FolderSection';
import NoteSection from './components/NoteSection';
import NoteForm from './components/NoteForm';
import TrashSection from './components/TrashSection';
import FolderForm from './components/FolderForm';

const noteColors = [
	'bg-[#f0ec83]',
	'bg-[#eea4aa]',
	'bg-[#67adda]',
	'bg-[#79d6c5]',
	'bg-[#c8a7ed]',
	'bg-[#ffc27d]',
	'bg-[#a9d98b]',
];

function formatNote(note, index) {
	const createdDate = note.createdAt ? new Date(note.createdAt) : null;

	return {
		...note,
		color: note.color || noteColors[index % noteColors.length],
		date: note.date || createdDate?.toLocaleDateString() || 'New note',
		time: note.time || createdDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '',
	};
}

function App() {
	const [notes, setNotes] = useState([]);
	const [folders, setFolders] = useState([]);
	const [showNoteForm, setShowNoteForm] = useState(false);
	const [showFolderForm, setShowFolderForm] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const [showTrash, setShowTrash] = useState(false);
	const [trashNotes, setTrashNotes] = useState([]);
	const [trashFolders, setTrashFolders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!showTrash) return undefined;

		Promise.all([
			fetch('http://localhost:3000/api/trash/notes').then((response) => response.json()),
			fetch('http://localhost:3000/api/trash/folders').then((response) => response.json()),
		]).then(([deletedNotes, deletedFolders]) => {
			setTrashNotes(deletedNotes);
			setTrashFolders(deletedFolders);
		});
	}, [showTrash]);

	useEffect(() => {
		fetch('http://localhost:3000/api/notes')
			.then((response) => {
				if (!response.ok) throw new Error('Could not load notes');
				return response.json();
			})
			.then((savedNotes) => setNotes(savedNotes.filter((note) => note.title && note.content).map(formatNote)))
			.catch(() => setError('Start the Express server to load your notes.'))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		fetch('http://localhost:3000/api/folders')
			.then((response) => {
				if (!response.ok) throw new Error('Could not load folders');
				return response.json();
			})
			.then(setFolders)
			.catch(() => setError('Start the Express server to load your folders.'));
	}, []);

	async function createNote(noteData) {
		try {
			const response = await fetch('http://localhost:3000/api/notes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(noteData),
			});
			if (!response.ok) throw new Error('Could not save note');
			const savedNote = await response.json();
			setNotes((currentNotes) => [formatNote(savedNote, currentNotes.length), ...currentNotes]);
			setShowNoteForm(false);
		} catch {
			setError('The note could not be saved. Check the Express server.');
		}
	}

	async function createFolder(folderData) {
		try {
			const response = await fetch('http://localhost:3000/api/folders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(folderData),
			});
			if (!response.ok) throw new Error('Could not save folder');
			const savedFolder = await response.json();
			setFolders((currentFolders) => [...currentFolders, savedFolder]);
			setShowFolderForm(false);
		} catch {
			setError('The folder could not be saved. Check the Express server.');
		}
	}

	async function deleteNote(noteId) {
		if (!noteId) return;

		try {
			const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Could not delete note');
			setNotes((currentNotes) => currentNotes.filter((note) => note._id !== noteId));
		} catch {
			setError('The note could not be deleted. Check the Express server.');
		}
	}

	async function deleteFolder(folderId) {
		try {
			const response = await fetch(`http://localhost:3000/api/folders/${folderId}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Could not delete folder');
			setFolders((currentFolders) => currentFolders.filter((folder) => folder._id !== folderId));
		} catch {
			setError('The folder could not be deleted. Check the Express server.');
		}
	}

	async function restoreNote(noteId) {
		const response = await fetch(`http://localhost:3000/api/trash/notes/${noteId}/restore`, { method: 'PATCH' });
		const restoredNote = await response.json();
		setNotes((currentNotes) => [formatNote(restoredNote, currentNotes.length), ...currentNotes]);
		setTrashNotes((currentNotes) => currentNotes.filter((note) => note._id !== noteId));
	}

	async function restoreFolder(folderId) {
		const response = await fetch(`http://localhost:3000/api/trash/folders/${folderId}/restore`, { method: 'PATCH' });
		const restoredFolder = await response.json();
		setFolders((currentFolders) => [...currentFolders, restoredFolder]);
		setTrashFolders((currentFolders) => currentFolders.filter((folder) => folder._id !== folderId));
	}

	return (
		<>
			<div className={`${darkMode ? 'dark' : ''} relative z-10 mx-auto my-4 flex min-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-[1200px] flex-col bg-white text-[#20202a] shadow-[0_18px_45px_rgba(37,39,56,0.08)] dark:bg-[#17151c] dark:text-[#f8f4f8] lg:my-16 lg:min-h-[620px] lg:w-[calc(100%-80px)] lg:flex-row`}>
			<Sidebar onHome={() => setShowTrash(false)} onTrash={() => setShowTrash(true)} />

			<div className="flex-1">
				<Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((currentMode) => !currentMode)} />

				<main className="relative min-h-[552px] overflow-hidden bg-[#f6f7fa] px-4 py-5 dark:bg-[#24212c] sm:px-[30px] sm:py-7">
					{showTrash ? (
						<TrashSection notes={trashNotes} folders={trashFolders} onRestoreNote={restoreNote} onRestoreFolder={restoreFolder} />
					) : (
						<>
							<FolderSection folders={folders} onDelete={deleteFolder} onNewFolder={() => setShowFolderForm(true)} />
							{showFolderForm && <FolderForm onSave={createFolder} onCancel={() => setShowFolderForm(false)} />}
							{isLoading && <p className="relative z-20 mb-4 text-sm font-semibold">Loading notes from MongoDB...</p>}
							{showNoteForm && <NoteForm onSave={createNote} onCancel={() => setShowNoteForm(false)} />}
							<NoteSection notes={notes} onNewNote={() => setShowNoteForm(true)} onDelete={deleteNote} />
						</>
					)}
					{error && <p className="relative z-20 mt-4 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
				</main>
			</div>
			</div>
		</>
	);
}

export default App;
