// Supabase 클라이언트 & Google OAuth 인증
let _client = null;
let currentUser = null;

async function initSupabase() {
  try {
    const { supabaseUrl, supabaseAnonKey } = await fetch('/api/config').then(r => r.json());
    if (!supabaseUrl || !supabaseAnonKey) return;

    _client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

    _client.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user ?? null;
      renderAuthUI();
      if (typeof updateUsageDisplay === 'function') updateUsageDisplay();
    });

    const { data: { session } } = await _client.auth.getSession();
    currentUser = session?.user ?? null;
    renderAuthUI();
    if (typeof updateUsageDisplay === 'function') updateUsageDisplay();
  } catch (e) {
    console.error('Supabase init failed:', e);
  }
}

async function signInWithGoogle() {
  if (!_client) return;
  await _client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
}

async function signOut() {
  if (!_client) return;
  await _client.auth.signOut();
  currentUser = null;
  renderAuthUI();
  if (typeof updateUsageDisplay === 'function') updateUsageDisplay();
}

async function getAuthToken() {
  if (!_client) return null;
  const { data: { session } } = await _client.auth.getSession();
  return session?.access_token ?? null;
}

function renderAuthUI() {
  const loginBtn = document.getElementById('loginBtn');
  const userInfo = document.getElementById('userInfo');
  const userAvatar = document.getElementById('userAvatar');
  const userNameEl = document.getElementById('userName');
  if (!loginBtn || !userInfo) return;

  if (currentUser) {
    loginBtn.style.display = 'none';
    userInfo.style.display = 'flex';
    const avatarUrl = currentUser.user_metadata?.avatar_url;
    if (userAvatar) {
      userAvatar.src = avatarUrl || '';
      userAvatar.style.display = avatarUrl ? 'block' : 'none';
    }
    if (userNameEl) {
      userNameEl.textContent = currentUser.user_metadata?.full_name || currentUser.email;
    }
  } else {
    loginBtn.style.display = 'flex';
    userInfo.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', initSupabase);
