// ============================================================
// src/config/api.js: Centralized API Configuration & Fetch Client
// ============================================================
// This single configuration file connects our React frontend
// to the Express.js backend running on port 5000.

export const API_BASE_URL = 'http://localhost:5000/api';

// 1. Health Check: Verifies if backend and MySQL are online
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Backend responded with error');
    return await response.json();
  } catch (error) {
    return {
      status: 'offline',
      message: 'Backend server is offline or unreachable',
      database: { connected: false }
    };
  }
}

// 2. Fetch all academic subjects from MySQL
export async function fetchSubjects() {
  const response = await fetch(`${API_BASE_URL}/subjects`);
  if (!response.ok) throw new Error('Failed to load subjects from backend');
  return await response.json();
}

// 3. Fetch all levels for a chosen subject
export async function fetchSubjectLevels(subjectId) {
  const response = await fetch(`${API_BASE_URL}/subjects/${subjectId}/levels`);
  if (!response.ok) throw new Error(`Failed to load levels for subject ${subjectId}`);
  return await response.json();
}

// 4. Fetch details for a specific level
export async function fetchLevelDetails(levelId) {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}`);
  if (!response.ok) throw new Error(`Failed to load level ${levelId}`);
  return await response.json();
}

// 5. Fetch room objects with 2D coordinates for a level
export async function fetchLevelObjects(levelId) {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}/objects`);
  if (!response.ok) throw new Error(`Failed to load room objects for level ${levelId}`);
  return await response.json();
}

// 6. Fetch questions for a level (correct answers stay secret on backend!)
export async function fetchLevelQuestions(levelId) {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}/questions`);
  if (!response.ok) throw new Error(`Failed to load questions for level ${levelId}`);
  return await response.json();
}

// 7. Fetch exit requirements for a level
export async function fetchLevelRequirements(levelId) {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}/requirements`);
  if (!response.ok) throw new Error(`Failed to load requirements for level ${levelId}`);
  return await response.json();
}

// 8. Interact with a room object (e.g. lift rug, open chest)
export async function interactWithObject(levelId, objectId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}/objects/${objectId}/interact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId })
  });
  return await response.json();
}

// 9. Submit an answer to a question for server-side verification
export async function submitQuestionAnswer(questionId, answer, playerId = 'demo-player', levelId = 1) {
  const response = await fetch(`${API_BASE_URL}/questions/${questionId}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer, playerId, levelId })
  });
  return await response.json();
}

// 10. Fetch authoritative question session (timing, extensions, door visibility)
export async function fetchQuestionSession(levelId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/levels/${levelId}/question-session?playerId=${encodeURIComponent(playerId)}`);
  if (!response.ok) throw new Error(`Failed to load question session for level ${levelId}`);
  return await response.json();
}

// 11. Request +10s time extension for the current question (Max 3 per question)
export async function extendQuestionTimer(questionId, levelId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/questions/${questionId}/extend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId, levelId })
  });
  return await response.json();
}

// 12. Fetch collected items in player's inventory (optionally scoped to levelId)
export async function fetchPlayerInventory(playerId = 'demo-player', levelId = null) {
  const url = levelId
    ? `${API_BASE_URL}/players/${playerId}/inventory?levelId=${levelId}`
    : `${API_BASE_URL}/players/${playerId}/inventory`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to load player inventory');
  return await response.json();
}

// 13. Fetch player progress across all levels
export async function fetchPlayerProgress(playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}/progress`);
  if (!response.ok) throw new Error('Failed to load player progress');
  return await response.json();
}

// 14. Record that the player has started a level
export async function startLevel(levelId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}/levels/${levelId}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return await response.json();
}

// 15. Restart level attempt cleanly (resets active question timers & elimination)
export async function restartLevel(levelId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}/levels/${levelId}/restart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return await response.json();
}

// 16. Verify all requirements on backend and complete level
export async function completeLevel(levelId, playerId = 'demo-player') {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}/levels/${levelId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return await response.json();
}

