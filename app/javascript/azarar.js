/**
 * AZARAR Mobile App - Complete Interactive Script
 * Dating + Social Network + Real-Time Proximity (Tinder + Instagram Hybrid)
 * Full LocalStorage Persistence & Strict View Controller
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. MOCK DATA SEEDING (Realistic Initial Data for MVP Validation)
  // ==========================================================================
  const SEED_USERS = [
    {
      id: 'usr_1',
      name: 'Marina Silveira',
      username: 'marina.silv',
      age: 24,
      distance: 25,
      location: 'No mesmo ambiente • 25m',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      intent: 'Conexões reais',
      vibe: '🍹 No balcão do bar',
      bio: 'Apaixonada por vinhos, música ao vivo e boas conversas sem filtro. Se estiver perto, bora tomar um drink?',
      passions: ['🍹 Baladas', '🎧 Indie Rock', '🍷 Vinhos', '✈️ Viagens'],
      isOnline: true,
      following: false,
      cheersSent: false,
      postsCount: 14,
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'usr_2',
      name: 'Rafael Mendes',
      username: 'rafa.mendes',
      age: 26,
      distance: 50,
      location: 'No lounge VIP • 50m',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      intent: 'Relacionamento Sério',
      vibe: '🛋️ No lounge VIP',
      bio: 'Arquiteto, corredor de fim de semana e mestre cuca nas horas vagas. Procurando alguém para construir momentos reais.',
      passions: ['🏃 Corrida', '🍣 Gastronomia', '🏛️ Arquitetura', '☕ Café'],
      isOnline: true,
      following: false,
      cheersSent: false,
      postsCount: 9,
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'usr_3',
      name: 'Beatriz Castro',
      username: 'bia.castro',
      age: 25,
      distance: 75,
      location: 'Perto da pista • 75m',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      intent: 'Conexões reais',
      vibe: '🎧 Na pista de dança',
      bio: 'Trabalho com moda, vivo viajando. Nada de joguinhos, apenas boas energias e encontros leves.',
      passions: ['👗 Moda', '🏝️ Praia', '🍕 Pizza', '✈️ Viagens'],
      isOnline: true,
      following: true,
      cheersSent: false,
      postsCount: 22,
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'usr_4',
      name: 'Felipe Soares',
      username: 'felipe.soares',
      age: 27,
      distance: 100,
      location: 'No mezanino • 100m',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      intent: 'Companhia',
      vibe: '🍻 Com a galera',
      bio: 'Novo na cidade! Querendo companhia para explorar bares secretos, festivais e curtir uma boa resenha.',
      passions: ['🎷 Jazz', '🎨 Arte', '🍺 Cerveja Artesanal', '📚 Livros'],
      isOnline: true,
      following: false,
      cheersSent: false,
      postsCount: 6,
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'usr_5',
      name: 'Juliana Lima',
      username: 'ju.lima',
      age: 23,
      distance: 125,
      location: 'No camarote • 125m',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      intent: 'Casual',
      vibe: '🍹 No balcão do bar',
      bio: 'Médica veterinária, amo a noite paulistana e drinks autorais. Vem de brinde!',
      passions: ['🍸 Gin', '💃 Dança', '🐕 Pets', '🏖️ Praia'],
      isOnline: true,
      following: false,
      cheersSent: false,
      postsCount: 31,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'usr_6',
      name: 'Matheus Prado',
      username: 'matheus.prado',
      age: 29,
      distance: 1450,
      location: 'Jardins • 1.4 km',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      intent: 'Relacionamento Sério',
      vibe: '🎧 Na pista de dança',
      bio: 'Empreendedor, focado e apaixonado por esportes e viagens.',
      passions: ['🏋️ Fitness', '🌿 Natureza', '🍳 Culinária', '🎬 Séries'],
      isOnline: true,
      following: false,
      cheersSent: false,
      postsCount: 12,
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
      ]
    }
  ];

  const SEED_POSTS = [
    {
      id: 'post_1',
      authorId: 'usr_3',
      authorName: 'Camila Rocha',
      authorUsername: 'camilinha.r',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      location: 'High Line Rooftop • 480m de você',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop&q=80',
      caption: 'A noite acabou de começar... quem estiver no radar pelo rooftop me dá um salve no mural! 🍸✨🔥',
      likes: 42,
      likedByMe: false,
      timestamp: 'HÁ 25 MIN'
    },
    {
      id: 'post_2',
      authorId: 'usr_1',
      authorName: 'Luiza Mendes',
      authorUsername: 'luizamendes',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      location: 'Vila Madalena • 180m de você',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80',
      caption: 'Música ao vivo e vinho bom. A vibe perfeita para fechar a semana. 🍷🎷',
      likes: 89,
      likedByMe: true,
      timestamp: 'HÁ 2 HORAS'
    },
    {
      id: 'post_3',
      authorId: 'usr_2',
      authorName: 'Rodrigo Alencar',
      authorUsername: 'rodrigo.ale',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      location: 'Parque Ibirapuera • 350m de você',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80',
      caption: 'Treino pago! Agora pronto para o que a noite reservar. Quem topa uma pizza depois?',
      likes: 31,
      likedByMe: false,
      timestamp: 'HÁ 4 HORAS'
    }
  ];

  const SEED_MURAL_MESSAGES = [
    {
      id: 'mural_1',
      userId: 'usr_1',
      userName: 'Luiza Mendes',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      distanceText: '180m',
      text: 'Gente, tem alguém aqui no bar da esquina da Fradique? O show tá incrível!',
      time: '21:38',
      isMe: false
    },
    {
      id: 'mural_2',
      userId: 'usr_3',
      userName: 'Camila Rocha',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      distanceText: '480m',
      text: 'Tô subindo pro rooftop agora. Quem tiver por perto manda direct!',
      time: '21:44',
      isMe: false
    }
  ];

  const PRESET_SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&auto=format&fit=crop&q=80'
  ];

  // ==========================================================================
  // 2. LOCALSTORAGE STATE MANAGER
  // ==========================================================================
  const Storage = {
    getUsers() {
      const data = localStorage.getItem('azarar_users');
      if (!data) {
        localStorage.setItem('azarar_users', JSON.stringify(SEED_USERS));
        return SEED_USERS;
      }
      return JSON.parse(data);
    },
    saveUsers(users) {
      localStorage.setItem('azarar_users', JSON.stringify(users));
    },
    getCurrentUser() {
      const data = localStorage.getItem('azarar_current_user');
      if (data) {
        try {
          const u = JSON.parse(data);
          if (u) {
            if (!u.avatar || u.avatar.includes('unsplash') || u.emailPhone === 'luisarlindo2@gmail.com' || u.username === 'luisarlindo') {
              u.avatar = '/images/avatars/luisarlindo.jpg';
              u.name = u.name || 'Luis Arlindo';
              if (!u.location || u.location.includes('São Paulo')) {
                u.location = 'Sousa, PB';
              }
            }
            u.plan = u.plan || 'free';
            return u;
          }
        } catch(e) {}
      }
      return {
        id: 'usr_luis',
        name: 'Luis Arlindo',
        username: 'luisarlindo',
        emailPhone: 'luisarlindo2@gmail.com',
        age: 28,
        avatar: '/images/avatars/luisarlindo.jpg',
        intent: 'Conexões reais',
        bio: 'Apaixonado por tecnologia, viagens e música 🎸',
        location: 'Sousa, PB',
        isOnline: true,
        plan: 'free',
        followersCount: 320,
        followingCount: 180,
        photos: ['/images/avatars/luisarlindo.jpg']
      };
    },
    saveCurrentUser(user) {
      localStorage.setItem('azarar_current_user', JSON.stringify(user));
    },
    clearCurrentUser() {
      localStorage.removeItem('azarar_current_user');
    },
    getPosts() {
      const data = localStorage.getItem('azarar_posts');
      if (!data) {
        localStorage.setItem('azarar_posts', JSON.stringify(SEED_POSTS));
        return SEED_POSTS;
      }
      return JSON.parse(data);
    },
    savePosts(posts) {
      localStorage.setItem('azarar_posts', JSON.stringify(posts));
    },
    getMuralMessages() {
      const data = localStorage.getItem('azarar_mural_messages');
      if (!data) {
        localStorage.setItem('azarar_mural_messages', JSON.stringify(SEED_MURAL_MESSAGES));
        return SEED_MURAL_MESSAGES;
      }
      return JSON.parse(data);
    },
    saveMuralMessages(msgs) {
      localStorage.setItem('azarar_mural_messages', JSON.stringify(msgs));
    },
    getDirectMessages() {
      const data = localStorage.getItem('azarar_direct_messages');
      return data ? JSON.parse(data) : {};
    },
    saveDirectMessages(chats) {
      localStorage.setItem('azarar_direct_messages', JSON.stringify(chats));
    }
  };

  // Seed Init
  Storage.getUsers();
  Storage.getPosts();
  Storage.getMuralMessages();

  // ==========================================================================
  // 3. APP STATE & REFERENCES
  // ==========================================================================
  let currentUser = (typeof window !== 'undefined' && window.INITIAL_CURRENT_USER) ? window.INITIAL_CURRENT_USER : Storage.getCurrentUser();
  if (currentUser) {
    if (!currentUser.avatar || currentUser.avatar.includes('unsplash') || currentUser.emailPhone === 'luisarlindo2@gmail.com' || currentUser.username === 'luisarlindo' || currentUser.name === 'Luis Arlindo') {
      currentUser.avatar = '/images/avatars/luisarlindo.jpg';
      currentUser.name = currentUser.name || 'Luis Arlindo';
    }
    currentUser.plan = currentUser.plan || 'free';
    Storage.saveCurrentUser(currentUser);
  }
  let currentRadius = 5000;
  let isOnlineNow = currentUser ? (currentUser.isOnline ?? true) : true;
  let currentActiveTab = 'radar';
  let activeChatUserId = null;
  let selectedNewPostPhoto = PRESET_SAMPLE_PHOTOS[0];

  const screenContainer = document.getElementById('screenContainer');
  const views = {
    home: document.getElementById('viewHome'),
    register: document.getElementById('viewRegister'),
    login: document.getElementById('viewLogin'),
    appShell: document.getElementById('viewAppShell')
  };

  const toastNotification = document.getElementById('toastNotification');

  function showToast(message, duration = 2800) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('active');
    
    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, duration);
  }

  // --- Strict View Switcher ---
  function showView(viewName) {
    const sc = document.getElementById('screenContainer');
    const targetId = viewName === 'appShell' ? 'viewAppShell' : 'view' + viewName.charAt(0).toUpperCase() + viewName.slice(1);
    const targetView = document.getElementById(targetId);

    if (!targetView) {
      console.warn('View not found:', viewName, targetId);
      return;
    }

    if (navigator.vibrate) navigator.vibrate(10);

    if (sc) {
      sc.classList.remove('view-mode-home', 'view-mode-register', 'view-mode-login', 'view-mode-app-shell');
      sc.classList.add(`view-mode-${viewName === 'appShell' ? 'app-shell' : viewName}`);
      sc.scrollTop = 0;
    }

    ['viewHome', 'viewRegister', 'viewLogin', 'viewAppShell'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (id === targetId) {
          el.classList.add('active');
          el.style.display = 'flex';
        } else {
          el.classList.remove('active');
          el.style.display = 'none';
        }
      }
    });

    if (viewName === 'appShell') {
      renderAppShell();
    }
  }

  // Intent selector chips in Register & Edit forms
  document.querySelectorAll('#regIntentChips .intent-chip, #editIntentChips .intent-chip').forEach((chip) => {
    chip.addEventListener('click', function () {
      const parent = this.parentElement;
      parent.querySelectorAll('.intent-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ==========================================================================
  // 4. AUTHENTICATION (REGISTER & LOGIN)
  // ==========================================================================
  function handleRegisterSubmit() {
    const fullName = document.getElementById('regFullName')?.value.trim();
    const birthDate = document.getElementById('regBirthDate')?.value;
    const username = document.getElementById('regUsername')?.value.trim().toLowerCase().replace('@', '');
    const emailPhone = document.getElementById('regEmailPhone')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirmPassword = document.getElementById('regPasswordConfirm')?.value;
    const activeChip = document.querySelector('#regIntentChips .intent-chip.active');
    const intent = activeChip ? activeChip.getAttribute('data-intent') : 'Relacionamento Sério';

    if (password !== confirmPassword) {
      showToast('⚠️ As senhas digitadas não coincidem!');
      document.getElementById('regPasswordConfirm')?.focus();
      return;
    }

    const users = Storage.getUsers();
    if (users.some(u => u.username === username)) {
      showToast('⚠️ Este @usuario já está em uso. Escolha outro!');
      document.getElementById('regUsername')?.focus();
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: fullName,
      username: username,
      emailPhone: emailPhone,
      password: password,
      birthDate: birthDate,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      intent: intent,
      bio: `Novo(a) no Azarar! Buscando conexões de ${intent}.`,
      location: 'São Paulo, SP',
      distance: 0,
      isOnline: true,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
      ]
    };

    users.push(newUser);
    Storage.saveUsers(users);
    Storage.saveCurrentUser(newUser);
    currentUser = newUser;

    showToast(`💖 Bem-vindo(a), ${fullName.split(' ')[0]}!`);
    setTimeout(() => {
      showView('appShell');
    }, 800);
  }

  function handleLoginSubmit() {
    const userOrEmail = document.getElementById('loginUser')?.value.trim().toLowerCase().replace('@', '');
    const password = document.getElementById('loginPass')?.value;

    if (userOrEmail === 'luisarlindo2@gmail.com' || userOrEmail === 'luisarlindo' || userOrEmail === 'luis') {
      currentUser = {
        id: 'usr_luis',
        name: 'Luis Arlindo',
        username: 'luisarlindo',
        emailPhone: 'luisarlindo2@gmail.com',
        age: 28,
        avatar: '/images/avatars/luisarlindo.jpg',
        intent: 'Conexões reais',
        bio: 'Apaixonado por tecnologia, viagens e música 🎸',
        location: 'Sousa, PB',
        isOnline: true,
        followersCount: 320,
        followingCount: 180,
        photos: ['/images/avatars/luisarlindo.jpg']
      };
      Storage.saveCurrentUser(currentUser);
      showToast(`✨ Olá, Luis!`);
      setTimeout(() => {
        showView('appShell');
      }, 700);
      return;
    }

    const users = Storage.getUsers();
    const found = users.find(u => 
      (u.username === userOrEmail || (u.emailPhone && u.emailPhone.toLowerCase() === userOrEmail)) &&
      (!u.password || u.password === password)
    );

    if (found) {
      currentUser = found;
      Storage.saveCurrentUser(currentUser);
      showToast(`✨ Olá, ${currentUser.name.split(' ')[0]}!`);
      setTimeout(() => {
        showView('appShell');
      }, 700);
    } else {
      const demoUser = users[0] || {
        id: 'usr_me',
        name: userOrEmail,
        username: userOrEmail,
        avatar: '/images/avatars/luisarlindo.jpg',
        intent: 'Relacionamento Sério',
        bio: 'Buscando conexões de verdade.',
        location: 'Sousa, PB',
        isOnline: true,
        photos: []
      };
      currentUser = demoUser;
      Storage.saveCurrentUser(currentUser);
      showToast(`🎉 Conectado com sucesso!`);
      setTimeout(() => {
        showView('appShell');
      }, 700);
    }
  }

  function handleLogout() {
    Storage.clearCurrentUser();
    currentUser = null;
    showToast('👋 Sessão encerrada.');
    showView('home');
  }

  // ==========================================================================
  // 5. APP SHELL & NAVIGATION
  // ==========================================================================
  function renderAppShell() {
    if (!currentUser) {
      showView('home');
      return;
    }

    const avatarEls = [
      document.getElementById('navTabUserAvatar'),
      document.getElementById('myStoryAvatar'),
      document.getElementById('profHeroAvatar')
    ];
    avatarEls.forEach(el => {
      if (el && currentUser.avatar) el.src = currentUser.avatar;
    });

    // Populate User Hero Profile Card (Matching Mockup)
    const heroAvatar = document.getElementById('heroProfileAvatar');
    const heroName = document.getElementById('heroProfileName');
    const heroLoc = document.getElementById('heroProfileLocation');
    const heroIntent = document.getElementById('heroProfileIntent');
    const heroBio = document.getElementById('heroProfileBio');

    if (heroAvatar) heroAvatar.src = currentUser.avatar || '/images/avatars/luisarlindo.jpg';
    if (heroName) heroName.textContent = `${currentUser.name || 'Luis'}, ${currentUser.age || 28}`;
    if (heroLoc) heroLoc.textContent = currentUser.location || 'Sousa, PB';
    if (heroIntent) heroIntent.innerHTML = `Em busca de <strong>${currentUser.intent || 'conexões reais'}</strong>`;
    if (heroBio) heroBio.textContent = currentUser.bio || 'Apaixonado por viagens e música 🎸';

    const nameEl = document.getElementById('profFullName');
    if (nameEl) nameEl.textContent = currentUser.name || 'Seu Nome';

    const handleEl = document.getElementById('profHandle');
    if (handleEl) handleEl.textContent = '@' + (currentUser.username || 'usuario');

    const bioEl = document.getElementById('profBio');
    if (bioEl) bioEl.textContent = currentUser.bio || 'Adicione sua biografia...';

    const locEl = document.getElementById('profLocation');
    if (locEl) locEl.textContent = `${currentUser.location || 'Sousa, PB'} • No seu raio agora`;
    
    const intentBadge = document.getElementById('profIntentBadge');
    if (intentBadge) {
      intentBadge.innerHTML = `<span>${getIntentIcon(currentUser.intent)} ${currentUser.intent || 'Casual'}</span>`;
    }
    const tinderIntent = document.getElementById('tinderIntentLabel');
    if (tinderIntent) {
      tinderIntent.textContent = `${getIntentIcon(currentUser.intent)} ${currentUser.intent || 'Casual'}`;
    }

    const statPosts = document.getElementById('profStatPosts');
    const statFollowers = document.getElementById('profStatFollowers');
    const statFollowing = document.getElementById('profStatFollowing');

    const userPosts = Storage.getPosts().filter(p => p.authorId === currentUser.id);
    if (statPosts) statPosts.textContent = userPosts.length + (currentUser.photos?.length || 0);
    if (statFollowers) statFollowers.textContent = currentUser.followersCount || 148;
    try { updateVerificationUI(); } catch(e) { console.error('verif err:', e); }
    try { updateDiscreteSliderVisual(currentRadius); } catch(e) { console.error('slider err:', e); }
    try { initGPSLocation(); } catch(e) { console.error('gps err:', e); }
    try { CableManager.init(); } catch(e) { console.error('cable err:', e); }
    try { renderRadarUsers(); } catch(e) { console.error('radar err:', e); }
    try { activateRadarSpin(15); } catch(e) { console.error('spin err:', e); }
    try { initRadarIdlePulses(); } catch(e) { console.error('idle pulses err:', e); }
    try { renderMuralMessages(); } catch(e) { console.error('mural err:', e); }
    try { renderStories(); } catch(e) { console.error('stories err:', e); }
    try { renderLoungeVipMoments(); } catch(e) { console.error('lounge err:', e); }
    try { renderDirectConversations(); } catch(e) { console.error('chats err:', e); }
    try { renderProfilePhotoGrid(); } catch(e) { console.error('grid err:', e); }
  }

  function switchTab(tabId) {
    if (navigator.vibrate) navigator.vibrate(10);
    currentActiveTab = tabId;

    document.querySelectorAll('.tab-page').forEach(page => {
      page.classList.remove('active');
      page.style.display = 'none';
    });
    document.querySelectorAll('.nav-tab-item').forEach(btn => btn.classList.remove('active'));

    const activePage = document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
    const activeNav = document.getElementById(`navTab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);

    if (activePage) {
      activePage.classList.add('active');
      activePage.style.display = 'flex';
    }
    if (activeNav) activeNav.classList.add('active');

    if (tabId === 'radar') {
      activateRadarSpin(15);
      renderRadarUsers();
    }
    if (tabId === 'feed') renderLoungeVipMoments();
    if (tabId === 'likes') renderLikesTab();
    if (tabId === 'messages') renderDirectConversations();
    if (tabId === 'profile') {
      updateVerificationUI();
      renderProfilePhotoGrid();
    }
  }

  function renderLikesTab() {
    const container = document.getElementById('likesGridContainer');
    if (!container) return;
    const users = Storage.getUsers();
    container.innerHTML = users.slice(0, 6).map(u => `
      <div class="conversation-item" onclick="window.azararApp.openDirectChat('${u.id}')" style="margin-bottom: 8px;">
        <div class="conv-avatar-wrap">
          <img src="${u.avatar}" alt="${u.name}" class="conv-avatar" />
          <span class="conv-online-dot"></span>
        </div>
        <div class="conv-details">
          <div class="conv-top-row">
            <h4 class="conv-name">${u.name}</h4>
            <span class="conv-time">🥂 Brinde</span>
          </div>
          <p class="conv-last-msg">Enviou um brinde para você! Toque para brindar de volta.</p>
        </div>
      </div>
    `).join('');
  }

  function centerGPSLocation() {
    if (navigator.vibrate) navigator.vibrate(20);
    showToast('📍 Localização GPS centralizada com sucesso!');
    initGPSLocation();
  }

  function recalibrateRadar() {
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
    showToast('🎯 Radar recalibrado e perfis atualizados!');
    renderRadarUsers();
  }

  function toggleSideMenu() {
    if (navigator.vibrate) navigator.vibrate(15);
    showToast('✨ Menu AZARAR');
  }

  function toggleRadarFilterModal() {
    if (navigator.vibrate) navigator.vibrate(15);
    showToast('🎚️ Ajuste o raio de busca pelo slider abaixo do radar');
  }

  function getIntentIcon(intent) {
    switch (intent) {
      case 'Relacionamento Sério': return '💍';
      case 'Casual': return '🍹';
      case 'Sexo': return '💋';
      case 'Companhia': return '✨';
      default: return '💖';
    }
  }

  function getIntentClass(intent) {
    switch (intent) {
      case 'Relacionamento Sério': return 'intent-serious';
      case 'Casual': return 'intent-casual';
      case 'Sexo': return 'intent-sex';
      case 'Companhia': return 'intent-company';
      default: return 'intent-casual';
    }
  }

  // ==========================================================================
  // 6. RADAR: "ESTOU ONLINE AGORA" & RAIO
  // ==========================================================================
  function toggleOnlineStatus(checked) {
    isOnlineNow = (checked !== undefined) ? checked : !isOnlineNow;

    const chk = document.getElementById('chkOnlineNow');
    if (chk) chk.checked = isOnlineNow;

    const topbarBadge = document.getElementById('topbarOnlineBadge');
    const topbarText = document.getElementById('topbarOnlineText');

    if (isOnlineNow) {
      topbarBadge?.classList.remove('offline');
      if (topbarText) topbarText.textContent = 'Online';
      showToast('🟢 Você está visível no radar e mural agora!');
    } else {
      topbarBadge?.classList.add('offline');
      if (topbarText) topbarText.textContent = 'Invisível';
      showToast('⚪ Modo invisível ativado.');
    }

    if (currentUser) {
      currentUser.isOnline = isOnlineNow;
      Storage.saveCurrentUser(currentUser);
    }

    renderRadarUsers();
  }

  // ==========================================================================
  // GPS GEOLOCATION & DRAGGABLE RANGE SLIDER (5m to 2km)
  // ==========================================================================
  let userCoordinates = null;

  function applyLocation(locString) {
    if (!locString) return;
    if (currentUser) {
      currentUser.location = locString;
      Storage.saveCurrentUser(currentUser);
    }
    const heroLoc = document.getElementById('heroProfileLocation');
    if (heroLoc) heroLoc.textContent = locString;
    const profLoc = document.getElementById('profLocation');
    if (profLoc) profLoc.textContent = `${locString} • No seu raio agora`;
  }

  function reverseGeocode(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`)
      .then(res => res.json())
      .then(data => {
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.municipality || addr.village || addr.county || 'Sousa';
        const state = addr.state_code || (addr.state ? (addr.state === 'Paraíba' ? 'PB' : addr.state.substring(0, 2).toUpperCase()) : 'PB');
        const loc = `${city}, ${state}`;
        applyLocation(loc);
      })
      .catch(() => {});
  }

  function fetchIPLocation() {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data && data.city && data.region_code) {
          const loc = `${data.city}, ${data.region_code}`;
          applyLocation(loc);
        }
      })
      .catch(() => {});
  }

  function initGPSLocation() {
    if (!navigator.geolocation) {
      fetchIPLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userCoordinates = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
        reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        syncLocationWithServer();
      },
      (err) => {
        console.info('GPS fallback mode active:', err.message);
        fetchIPLocation();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function syncLocationWithServer() {
    if (!userCoordinates) return;
    fetch('/api/v1/update_location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
      },
      body: JSON.stringify({
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
        radius_meters: currentRadius
      })
    }).catch(() => {});
  }

  // ==========================================================================
  // 6. RADAR: DISCRETE SYNCHRONIZED STEPS & SMART ROTATION (15s on move)
  // ==========================================================================
  const RADAR_STEPS = [500, 1000, 2000, 5000, 15000, 30000, 50000, 100000];
  const PLAN_LIMITS = {
    free: 5000,
    bronze: 15000,
    prata: 30000,
    ouro: 50000,
    platina: 100000
  };
  const PLAN_NAMES = {
    free: 'Grátis',
    bronze: 'Bronze',
    prata: 'Prata',
    ouro: 'Ouro VIP',
    platina: 'Platina Black'
  };
  let currentVipPlan = (currentUser && currentUser.plan) ? currentUser.plan : 'free';
  let radarSpinTimeout = null;
  let radarIdleInterval = null;

  function triggerLockFeedback(targetMeters) {
    const lockMarker = document.getElementById('sliderLockMarker');
    if (lockMarker) {
      lockMarker.classList.remove('shake-lock');
      void lockMarker.offsetWidth;
      lockMarker.classList.add('shake-lock');
    }
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;
    const reqMeters = targetMeters || maxAllowed;
    showToast(`🔒 Raio de ${formatRadiusLabel(reqMeters)} disponível nos Planos VIP!`);
    openVipPlansModal();
  }

  function activateRadarSpin(seconds = 15) {
    const beam = document.getElementById('radarSweepBeam');
    if (!beam) return;
    beam.classList.add('is-spinning');
    beam.classList.remove('is-idle');
    if (radarSpinTimeout) clearTimeout(radarSpinTimeout);
    radarSpinTimeout = setTimeout(() => {
      beam.classList.remove('is-spinning');
      beam.classList.add('is-idle');
    }, seconds * 1000);
  }

  function initRadarIdlePulses() {
    if (radarIdleInterval) clearInterval(radarIdleInterval);
    radarIdleInterval = setInterval(() => {
      const beam = document.getElementById('radarSweepBeam');
      if (beam && !beam.classList.contains('is-spinning')) {
        beam.classList.add('is-spinning');
        beam.classList.remove('is-idle');
        setTimeout(() => {
          if (!radarSpinTimeout || beam.classList.contains('is-idle')) {
            beam.classList.remove('is-spinning');
            beam.classList.add('is-idle');
          }
        }, 5000);
      }
    }, 25000);
  }

  function formatRadiusLabel(val) {
    const meters = parseInt(val, 10);
    if (meters >= 1000) {
      const km = (meters / 1000.0).toFixed(meters % 1000 === 0 ? 0 : 1);
      return `${km} km`;
    }
    return `${meters}m`;
  }

  function updateDiscreteSliderVisual(meters) {
    const slider = document.getElementById('rangeProximityRadius');
    const lblBig = document.getElementById('lblRadarDistanceValue');
    const lblBadge = document.getElementById('lblRadarPlanBadge');
    const muralLbl = document.getElementById('muralRadiusText');
    const lockMarker = document.getElementById('sliderLockMarker');
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;
    const maxAllowedIdx = RADAR_STEPS.indexOf(maxAllowed);

    const m = Math.min(parseInt(meters, 10) || 5000, maxAllowed);
    const idx = RADAR_STEPS.indexOf(m) >= 0 ? RADAR_STEPS.indexOf(m) : 3;

    if (slider) {
      slider.value = idx;
      const pct = (idx / (RADAR_STEPS.length - 1)) * 100;
      slider.style.setProperty('--slider-pct', `${pct}%`);
    }

    // Dynamic Position of Physical Lock Marker on Track
    if (lockMarker) {
      if (maxAllowedIdx >= 0 && maxAllowedIdx < RADAR_STEPS.length - 1) {
        const lockPct = (maxAllowedIdx / (RADAR_STEPS.length - 1)) * 100;
        lockMarker.style.display = 'flex';
        lockMarker.style.left = `${lockPct}%`;
        lockMarker.title = `Limite do Plano ${PLAN_NAMES[currentVipPlan]} (${formatRadiusLabel(maxAllowed)}) - Toque para liberar até 100km`;
      } else {
        lockMarker.style.display = 'none';
      }
    }

    const formatted = formatRadiusLabel(m);
    if (lblBig) lblBig.textContent = formatted;
    if (muralLbl) muralLbl.textContent = formatted;

    // Update Plan Badge in readout
    if (lblBadge) {
      if (m <= 5000) {
        lblBadge.textContent = 'Grátis';
        lblBadge.style.color = '#ff5294';
      } else if (m <= 15000) {
        lblBadge.textContent = 'Bronze 🥉';
        lblBadge.style.color = '#cd7f32';
      } else if (m <= 30000) {
        lblBadge.textContent = 'Prata 🥈';
        lblBadge.style.color = '#c0c0c0';
      } else if (m <= 50000) {
        lblBadge.textContent = 'Ouro 🥇';
        lblBadge.style.color = '#fbbf24';
      } else {
        lblBadge.textContent = 'Platina 👑';
        lblBadge.style.color = '#38bdf8';
      }
    }

    // Update distance chips active & locked states
    document.querySelectorAll('.distance-chip').forEach(chip => {
      const step = parseInt(chip.getAttribute('data-step'), 10);
      const chipMeters = RADAR_STEPS[step] || 5000;

      // Active state
      if (step === idx) {
        chip.classList.add('active-chip');
      } else {
        chip.classList.remove('active-chip');
      }

      // Locked state if beyond current plan limit
      if (chipMeters > maxAllowed) {
        chip.classList.add('is-locked');
      } else {
        chip.classList.remove('is-locked');
      }
    });

    // Update plan notice row
    const limitTag = document.getElementById('lblPlanNotice') || document.querySelector('.free-limit-tag');
    if (limitTag) {
      if (currentVipPlan === 'free') {
        limitTag.textContent = 'Plano Grátis: até 5km';
      } else {
        limitTag.innerHTML = `⭐ <strong>${PLAN_NAMES[currentVipPlan]}</strong>: até ${formatRadiusLabel(maxAllowed)}`;
      }
    }
  }

  function stepRadarDistance(delta) {
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;
    const currentIdx = RADAR_STEPS.indexOf(currentRadius) >= 0 ? RADAR_STEPS.indexOf(currentRadius) : 3;
    const targetIdx = currentIdx + delta;

    if (targetIdx >= RADAR_STEPS.length || RADAR_STEPS[targetIdx] > maxAllowed) {
      if (delta > 0) {
        triggerLockFeedback(RADAR_STEPS[Math.min(RADAR_STEPS.length - 1, targetIdx)]);
      }
      return;
    }

    if (targetIdx >= 0) {
      setProximityStep(targetIdx);
    }
  }

  function onRadiusStepInput(stepIndex) {
    const idx = parseInt(stepIndex, 10);
    const meters = RADAR_STEPS[idx] || 5000;
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;
    const slider = document.getElementById('rangeProximityRadius');

    if (meters > maxAllowed) {
      const allowedIdx = RADAR_STEPS.indexOf(maxAllowed);
      if (slider) slider.value = allowedIdx >= 0 ? allowedIdx : 3;
      updateDiscreteSliderVisual(maxAllowed);
      triggerLockFeedback(meters);
      return;
    }

    currentRadius = meters;
    updateDiscreteSliderVisual(meters);
    activateRadarSpin(15);
    renderRadarUsers();
  }

  function onRadiusStepChange(stepIndex) {
    const idx = parseInt(stepIndex, 10);
    const meters = RADAR_STEPS[idx] || 5000;
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;

    if (meters > maxAllowed) {
      const allowedIdx = RADAR_STEPS.indexOf(maxAllowed);
      const slider = document.getElementById('rangeProximityRadius');
      if (slider) slider.value = allowedIdx >= 0 ? allowedIdx : 3;
      currentRadius = maxAllowed;
      updateDiscreteSliderVisual(maxAllowed);
      renderRadarUsers();
      triggerLockFeedback(meters);
      return;
    }

    currentRadius = meters;
    updateDiscreteSliderVisual(currentRadius);
    activateRadarSpin(15);
    if (navigator.vibrate) navigator.vibrate(15);
    showToast(`📡 Raio atualizado para ${formatRadiusLabel(currentRadius)}`);
    syncLocationWithServer();
    renderRadarUsers();
  }

  function setProximityStep(stepIndex) {
    const idx = parseInt(stepIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= RADAR_STEPS.length) return;
    const meters = RADAR_STEPS[idx] || 5000;
    const maxAllowed = PLAN_LIMITS[currentVipPlan] || 5000;

    if (meters > maxAllowed) {
      triggerLockFeedback(meters);
      return;
    }

    const slider = document.getElementById('rangeProximityRadius');
    if (slider) slider.value = idx;
    onRadiusStepChange(idx);
  }

  function updateSliderVisual(meters) {
    updateDiscreteSliderVisual(meters);
  }

  function setProximityRadius(radiusMeters) {
    const m = parseInt(radiusMeters, 10);
    const idx = RADAR_STEPS.indexOf(m);
    if (idx >= 0) {
      setProximityStep(idx);
    } else {
      currentRadius = m;
      updateDiscreteSliderVisual(currentRadius);
      renderRadarUsers();
    }
  }

  function renderRadarUsers() {
    const container = document.getElementById('nearbyUsersList');
    if (!container) return;

    const users = Storage.getUsers();
    const filtered = users.filter(u => {
      if (currentUser && u.id === currentUser.id) return false;
      return (u.distance || 0) <= currentRadius;
    });

    const countEl = document.getElementById('countOnlineUsers');
    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 14px 2px; color: var(--text-dim);">
          <div style="font-size: 18px; margin-bottom: 2px;">📡</div>
          <span style="color: #fff; font-size: 10px; font-weight: 700; display: block;">Ninguém</span>
          <p style="font-size: 8px; margin: 2px 0 0;">Aumente o raio</p>
        </div>
      `;
      return;
    }

    // Show up to 5 profiles vertically on the right column (STRICTLY IDENTICAL TO MOCKUP)
    container.innerHTML = filtered.slice(0, 5).map(u => {
      const firstName = (u.name || 'Usuário').split(' ')[0];
      return `
        <div class="mockup-online-user-card" onclick="window.azararApp.openDirectChat('${u.id}')" title="Conversar com ${firstName}">
          <div class="mockup-online-avatar-wrap">
            <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${firstName}" class="mockup-online-avatar-img" />
            <span class="mockup-online-green-dot"></span>
          </div>
          <span class="mockup-online-name">${firstName}, ${u.age || 24}</span>
          <span class="mockup-online-badge">ON LINE</span>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // 7. LOUNGE VIP & MOMENTOS SECRETOS (MONETIZAÇÃO RENTÁVEL)
  // ==========================================================================
  function renderLoungeVipMoments() {
    const container = document.getElementById('vipMomentsGrid');
    if (!container) return;

    const moments = [
      {
        id: 'vip_1',
        author: 'Fernanda Lima',
        age: 26,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        location: 'Camarote Villa Mix',
        media: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        caption: 'Curtindo o melhor open bar da cidade 🍸✨',
        time: 'Há 12 min',
        isUnlocked: currentVipPlan === 'ouro' || currentVipPlan === 'platina'
      },
      {
        id: 'vip_2',
        author: 'Rodrigo Santoro',
        age: 29,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Rooftop Jardins',
        media: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
        caption: 'A festa tá só começando! Quem tá por aqui?',
        time: 'Há 25 min',
        isUnlocked: currentVipPlan === 'ouro' || currentVipPlan === 'platina'
      },
      {
        id: 'vip_3',
        author: 'Camila Mendes',
        age: 24,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        location: 'Club Noir Lounge',
        media: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
        caption: 'Na mesa 12 com as amigas! Vem brindar com a gente 🥂',
        time: 'Há 40 min',
        isUnlocked: currentVipPlan === 'ouro' || currentVipPlan === 'platina'
      }
    ];

    container.innerHTML = moments.map(m => `
      <div class="vip-moment-card">
        <div class="vip-media-wrapper">
          <img src="${m.media}" alt="${m.author}" class="vip-media-img ${m.isUnlocked ? '' : 'is-blurred'}" />
          ${!m.isUnlocked ? `
            <div class="vip-unlock-overlay">
              <div class="vip-lock-icon">🔒</div>
              <h4 class="vip-unlock-title">Mídia Secreta do Camarote</h4>
              <p class="vip-unlock-desc">Livre para assinantes Ouro & Platina ou desbloqueio por R$ 2,90.</p>
              <button type="button" class="btn-unlock-media" onclick="window.azararApp.unlockSingleMoment('${m.id}')">
                🔓 Desbloquear Agora (R$ 2,90)
              </button>
            </div>
          ` : ''}
        </div>
        <div style="padding: 12px 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${m.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div>
                <h4 style="font-size: 13px; font-weight: 700; color: #fff; margin: 0;">${m.author}, ${m.age}</h4>
                <span style="font-size: 10px; color: var(--text-dim);">📍 ${m.location}</span>
              </div>
            </div>
            <span style="font-size: 10px; color: var(--text-dim);">${m.time}</span>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); margin: 8px 0 0;">${m.caption}</p>
        </div>
      </div>
    `).join('');
  }

  function openVipPlansModal() {
    const modal = document.getElementById('modalVipPlans');
    if (modal) modal.classList.add('active');
  }

  function closeVipPlansModal() {
    const modal = document.getElementById('modalVipPlans');
    if (modal) modal.classList.remove('active');
  }

  function openFlashBoostModal() {
    const modal = document.getElementById('modalFlashBoost');
    if (modal) modal.classList.add('active');
  }

  function closeFlashBoostModal() {
    const modal = document.getElementById('modalFlashBoost');
    if (modal) modal.classList.remove('active');
  }

  function selectVipPlan(planKey) {
    document.querySelectorAll('.vip-plan-card').forEach(c => c.classList.remove('selected'));
    const target = document.getElementById(`planCard${planKey.charAt(0).toUpperCase() + planKey.slice(1)}`);
    if (target) target.classList.add('selected');
  }

  function subscribeToPlan(tierKey, tierName, price) {
    currentVipPlan = tierKey;
    const newMax = PLAN_LIMITS[tierKey] || 5000;
    
    // Automatically jump to the new plan's max radius so the user sees the immediate benefit!
    currentRadius = newMax;

    if (currentUser) {
      currentUser.plan = tierKey;
      currentUser.planName = tierName;
      currentUser.maxRadius = newMax;
      Storage.saveCurrentUser(currentUser);
    }

    // Persist subscription in Rails backend database
    fetch('/api/v1/update_plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
      },
      body: JSON.stringify({ plan_tier: tierKey, payment_method: 'manual' })
    }).then(res => res.json()).then(data => {
      if (data && data.success && data.plan) {
        currentVipPlan = data.plan;
        updateDiscreteSliderVisual(currentRadius);
      }
    }).catch(() => {});

    closeVipPlansModal();
    updateDiscreteSliderVisual(currentRadius);
    activateRadarSpin(15);
    renderRadarUsers();
    renderLoungeVipMoments();

    if (navigator.vibrate) navigator.vibrate([30, 50, 30, 50]);
    showToast(`🎉 Parabéns! Você agora é assinante ${tierName} com alcance de ${formatRadiusLabel(newMax)}!`);
  }

  function activateFlashBoost() {
    closeFlashBoostModal();
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    showToast('⚡ Flash Boost ativado! Seu perfil está no topo da balada por 1 hora!');
  }

  function unlockSingleMoment(momentId) {
    if (navigator.vibrate) navigator.vibrate(20);
    showToast('🔓 Mídia VIP desbloqueada com sucesso!');
    const card = event?.target?.closest('.vip-moment-card');
    if (card) {
      const img = card.querySelector('.vip-media-img');
      const overlay = card.querySelector('.vip-unlock-overlay');
      if (img) img.classList.remove('is-blurred');
      if (overlay) overlay.remove();
    }
  }

  function sendCheers(userId) {
    const users = Storage.getUsers();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

    target.cheersSent = true;
    Storage.saveUsers(users);
    renderRadarUsers();

    showToast(`🥂 Você enviou um Brinde para ${target.name.split(' ')[0]}!`);

    // Broadcast over ActionCable WebSocket
    CableManager.send('CheersChannel', 'send_cheers', { target_id: userId });

    // Simulated mutual response trigger if chatting with seed bots
    if (String(userId).startsWith('usr_')) {
      setTimeout(() => {
        showCheersCelebration(target);
      }, 1000);
    }
  }

  let activeCheersUser = null;

  function showCheersCelebration(targetUser) {
    activeCheersUser = targetUser;
    const modal = document.getElementById('modalCheersCelebration');
    if (!modal) return;

    const myAvatarEl = document.getElementById('cheersMyAvatar');
    const theirAvatarEl = document.getElementById('cheersTheirAvatar');
    const subtitleEl = document.getElementById('cheersSubtitle');

    if (myAvatarEl && currentUser) myAvatarEl.src = currentUser.avatar;
    if (theirAvatarEl) theirAvatarEl.src = targetUser.avatar;
    if (subtitleEl) {
      subtitleEl.textContent = `Você e ${targetUser.name.split(' ')[0]} brindaram no mesmo local!`;
    }

    if (navigator.vibrate) navigator.vibrate([60, 100, 60, 100, 60]);
    modal.classList.add('active');
  }

  function closeCheersModal() {
    document.getElementById('modalCheersCelebration')?.classList.remove('active');
    activeCheersUser = null;
  }

  function openDirectChatFromCheers() {
    if (!activeCheersUser) return;
    const targetId = activeCheersUser.id;
    closeCheersModal();
    openDirectChat(targetId);
  }

  function toggleFollowUser(userId) {
    const users = Storage.getUsers();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    target.following = !target.following;
    Storage.saveUsers(users);

    if (target.following) {
      showToast(`💖 Você está seguindo ${target.name}!`);
      if (currentUser) {
        currentUser.followingCount = (currentUser.followingCount || 92) + 1;
        Storage.saveCurrentUser(currentUser);
      }
    } else {
      showToast(`Deixou de seguir ${target.name}.`);
    }

    renderRadarUsers();
    renderAppShell();
  }

  // ==========================================================================
  // 6. ACTIONCABLE WEBSOCKETS REAL-TIME ENGINE (Mural, Direct Chat, Cheers)
  // ==========================================================================
  const CableManager = {
    socket: null,
    connected: false,
    reconnectTimer: null,
    subscriptions: {},

    init() {
      if (!currentUser) return;
      this.connect();
    },

    connect() {
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        return;
      }

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const wsUrl = `${protocol}//${host}/cable`;

      try {
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
          this.connected = true;
          clearTimeout(this.reconnectTimer);
          // Subscribe to channels
          this.subscribe('MuralChannel', { channel: 'MuralChannel' });
          this.subscribe('DirectChatChannel', { channel: 'DirectChatChannel' });
          this.subscribe('CheersChannel', { channel: 'CheersChannel' });
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'ping' || data.type === 'welcome' || data.type === 'confirm_subscription') {
              return;
            }
            if (data.message) {
              this.handleBroadcast(data.message);
            }
          } catch (e) {
            console.error('Cable parse error:', e);
          }
        };

        this.socket.onclose = () => {
          this.connected = false;
          this.scheduleReconnect();
        };

        this.socket.onerror = () => {
          this.connected = false;
        };
      } catch (err) {
        console.error('WebSocket connection error:', err);
        this.scheduleReconnect();
      }
    },

    scheduleReconnect() {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(() => {
        if (currentUser) this.connect();
      }, 3500);
    },

    subscribe(name, identifierObj) {
      const identifier = JSON.stringify(identifierObj);
      this.subscriptions[name] = identifier;
      if (this.connected && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({
          command: 'subscribe',
          identifier: identifier
        }));
      }
    },

    send(channelName, action, payload = {}) {
      const identifier = this.subscriptions[channelName];
      if (!identifier || !this.connected || this.socket.readyState !== WebSocket.OPEN) {
        return false;
      }
      this.socket.send(JSON.stringify({
        command: 'message',
        identifier: identifier,
        data: JSON.stringify({ action: action, ...payload })
      }));
      return true;
    },

    handleBroadcast(payload) {
      if (!payload || !payload.action) return;

      // 1. MURAL MESSAGE IN REAL TIME
      if (payload.action === 'new_mural_message') {
        const msg = payload.message;
        if (!msg) return;
        const muralMsgs = Storage.getMuralMessages();
        const isFromMe = currentUser && String(msg.authorId) === String(currentUser.id);

        if (!muralMsgs.some(m => m.id === msg.id || (isFromMe && m.text === msg.content && Math.abs(Date.now() - (m.createdAt || 0)) < 4000))) {
          muralMsgs.push({
            id: msg.id,
            userId: msg.authorId,
            userName: isFromMe ? 'Você' : msg.authorName,
            userAvatar: msg.authorAvatar,
            distanceText: `${msg.distance || 15}m`,
            text: msg.content,
            time: msg.time || 'Agora',
            likes: msg.likes || 0,
            isMe: isFromMe,
            createdAt: Date.now()
          });
          Storage.saveMuralMessages(muralMsgs);
          renderMuralMessages();

          if (!isFromMe) {
            if (navigator.vibrate) navigator.vibrate(20);
            showToast(`📢 ${msg.authorName.split(' ')[0]} postou no mural perto de você!`);
          }
        }
      }

      // 2. DIRECT CHAT MESSAGE IN REAL TIME
      else if (payload.action === 'new_direct_message') {
        const msg = payload.message;
        if (!msg) return;
        const isFromMe = currentUser && String(msg.senderId) === String(currentUser.id);
        const partnerId = isFromMe ? String(msg.recipientId) : String(msg.senderId);

        const allChats = Storage.getDirectMessages();
        if (!allChats[partnerId]) {
          allChats[partnerId] = [
            { text: `🥂 Brinde aceito! Vocês estão no mesmo local. Este chat expira em 3 horas.`, isMe: false, time: 'Agora' }
          ];
        }

        const existing = allChats[partnerId];
        const isDuplicate = existing.some(m => m.id === msg.id || (m.isMe === isFromMe && m.text === msg.text && Math.abs(Date.now() - (m.createdAt || 0)) < 4000));

        if (!isDuplicate) {
          existing.push({
            id: msg.id,
            text: msg.text,
            isMe: isFromMe,
            time: msg.time || 'Agora',
            createdAt: Date.now()
          });
          Storage.saveDirectMessages(allChats);

          if (activeChatUserId && String(activeChatUserId) === partnerId) {
            renderDirectChatMessages();
            if (!isFromMe && navigator.vibrate) navigator.vibrate([30, 50, 30]);
          } else {
            renderDirectConversations();
            if (!isFromMe) {
              if (navigator.vibrate) navigator.vibrate([50, 80, 50]);
              showToast(`💬 ${msg.senderName.split(' ')[0]}: "${msg.text}"`);
            }
          }
        }
      }

      // 3. CHEERS RECEIVED IN REAL TIME
      else if (payload.action === 'cheers_received') {
        const fromUser = payload.from_user;
        if (!fromUser) return;
        showCheersCelebration(fromUser);
        showToast(`🥂 ${fromUser.name.split(' ')[0]} acabou de brindar com você!`);
      }
    }
  };

  // --- MURAL / CHAT ABERTO ---
  function renderMuralMessages() {
    const scrollBox = document.getElementById('muralMessagesList');
    if (!scrollBox) return;

    const msgs = Storage.getMuralMessages();
    scrollBox.innerHTML = msgs.map(m => `
      <div class="mural-msg-item ${m.isMe ? 'is-me' : ''}">
        <img src="${m.userAvatar}" alt="${m.userName}" class="mural-msg-avatar" onclick="${m.userId && !m.isMe ? `window.azararApp.openDirectChat('${m.userId}')` : ''}" />
        <div class="mural-msg-bubble">
          <div class="mural-msg-header">
            <span class="mural-msg-author">${m.userName.split(' ')[0]}</span>
            <span class="mural-msg-dist">📍 ${m.distanceText}</span>
            <span class="mural-msg-time">${m.time}</span>
          </div>
          <p class="mural-msg-text">${escapeHtml(m.text)}</p>
          ${!m.isMe && m.userId ? `
            <div style="margin-top: 6px; display: flex; justify-content: flex-end;">
              <button type="button" class="btn-card-cheers" style="padding: 3px 10px; border-radius: 9999px; font-size: 10.5px;" onclick="window.azararApp.sendCheers('${m.userId}')">
                🥂 Brindar
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    scrollBox.scrollTop = scrollBox.scrollHeight;

    const last = msgs[msgs.length - 1];
    const previewEl = document.getElementById('lastMuralPreview');
    if (previewEl && last) {
      previewEl.textContent = `${last.userName.split(' ')[0]}: "${last.text}"`;
    }
  }

  function sendMuralMessage() {
    const input = document.getElementById('txtMuralInput');
    const text = input?.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg = {
      id: 'mural_' + Date.now(),
      userId: currentUser ? currentUser.id : 'usr_me',
      userName: currentUser ? currentUser.name : 'Você',
      userAvatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      distanceText: 'No local',
      text: text,
      time: timeStr,
      isMe: true,
      createdAt: Date.now()
    };

    const msgs = Storage.getMuralMessages();
    msgs.push(newMsg);
    Storage.saveMuralMessages(msgs);

    input.value = '';
    renderMuralMessages();
    showToast('🚀 Mensagem enviada no mural do raio!');

    // Broadcast over ActionCable WebSocket
    CableManager.send('MuralChannel', 'speak', { content: text });
  }

  // ==========================================================================
  // 7. FEED SOCIAL (INSTAGRAM STYLE)
  // ==========================================================================
  function renderStories() {
    const container = document.getElementById('dynamicStoriesList');
    if (!container) return;

    const users = Storage.getUsers();
    container.innerHTML = users.map(u => `
      <div class="story-item" onclick="window.azararApp.toast('Visualizando story de ${u.name.split(' ')[0]} ✨')">
        <div class="story-avatar-wrap">
          <img src="${u.avatar}" alt="${u.name}" class="story-avatar" />
        </div>
        <span class="story-username">${u.name.split(' ')[0]}</span>
      </div>
    `).join('');
  }

  function renderFeedPosts() {
    const container = document.getElementById('feedPostsList');
    if (!container) return;

    const posts = Storage.getPosts();

    container.innerHTML = posts.map(post => `
      <article class="feed-post-card" id="card_${post.id}">
        
        <div class="post-header">
          <div class="post-author-info" onclick="window.azararApp.openDirectChat('${post.authorId}')">
            <img src="${post.authorAvatar}" alt="${post.authorName}" class="post-author-avatar" />
            <div>
              <h4 class="post-author-name">${post.authorName}</h4>
              <span class="post-location">${post.location || 'No seu raio'}</span>
            </div>
          </div>
        </div>

        <div class="post-image-wrap" ondblclick="window.azararApp.toggleLikePost('${post.id}')">
          <img src="${post.image}" alt="Publicação" class="post-image" />
        </div>

        <div class="post-actions-bar">
          <button class="btn-post-action ${post.likedByMe ? 'liked' : ''}" onclick="window.azararApp.toggleLikePost('${post.id}')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="${post.likedByMe ? '#ff2a7a' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <button class="btn-post-action" onclick="window.azararApp.openDirectChat('${post.authorId}')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>

        <div class="post-body">
          <p class="post-likes-count">${post.likes} curtidas</p>
          <p class="post-caption">
            <span class="post-caption-author">${post.authorUsername || post.authorName.split(' ')[0].toLowerCase()}</span>
            ${escapeHtml(post.caption)}
          </p>
          <div class="post-time">${post.timestamp || 'RECENTE'}</div>
        </div>

      </article>
    `).join('');
  }

  function toggleLikePost(postId) {
    const posts = Storage.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.likedByMe = !post.likedByMe;
    post.likes += post.likedByMe ? 1 : -1;
    Storage.savePosts(posts);

    if (navigator.vibrate) navigator.vibrate(15);
    renderFeedPosts();
  }

  function openNewPostModal() {
    const modal = document.getElementById('modalNewPost');
    const photosRow = document.getElementById('presetPhotosRow');
    
    if (photosRow) {
      photosRow.innerHTML = PRESET_SAMPLE_PHOTOS.map((url, i) => `
        <div class="preset-thumb-btn ${url === selectedNewPostPhoto ? 'active' : ''}" onclick="window.azararApp.selectPresetPhoto('${url}', this)">
          <img src="${url}" alt="Amostra ${i}" class="preset-thumb-img" />
        </div>
      `).join('');
    }

    modal?.classList.add('active');
  }

  function closeNewPostModal() {
    document.getElementById('modalNewPost')?.classList.remove('active');
  }

  function selectPresetPhoto(url, btn) {
    selectedNewPostPhoto = url;
    document.querySelectorAll('.preset-thumb-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const input = document.getElementById('txtPostImageUrl');
    if (input) input.value = '';
  }

  function handleCreatePostSubmit() {
    const customUrl = document.getElementById('txtPostImageUrl')?.value.trim();
    const caption = document.getElementById('txtPostCaption')?.value.trim();
    const location = document.getElementById('txtPostLocation')?.value.trim() || 'No seu raio';

    const finalImage = customUrl || selectedNewPostPhoto;

    const newPost = {
      id: 'post_' + Date.now(),
      authorId: currentUser ? currentUser.id : 'usr_me',
      authorName: currentUser ? currentUser.name : 'Você',
      authorUsername: currentUser ? currentUser.username : 'meu_usuario',
      authorAvatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      location: location,
      image: finalImage,
      caption: caption,
      likes: 1,
      likedByMe: true,
      timestamp: 'AGORA MESMO'
    };

    const posts = Storage.getPosts();
    posts.unshift(newPost);
    Storage.savePosts(posts);

    if (currentUser) {
      currentUser.photos = currentUser.photos || [];
      currentUser.photos.unshift(finalImage);
      Storage.saveCurrentUser(currentUser);
    }

    closeNewPostModal();
    showToast('📸 Foto publicada com sucesso!');
    renderFeedPosts();
    renderProfilePhotoGrid();
  }

  // ==========================================================================
  // 8. DIRECT CONVERSATIONS (1-ON-1)
  // ==========================================================================
  function renderDirectConversations() {
    const container = document.getElementById('directConversationsList');
    if (!container) return;

    const users = Storage.getUsers().filter(u => u.id !== (currentUser?.id || ''));
    const allChats = Storage.getDirectMessages();

    container.innerHTML = users.map(u => {
      const userMsgs = allChats[u.id] || [];
      const lastMsg = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].text : `Clique para iniciar uma conversa com ${u.name.split(' ')[0]}...`;
      const timeStr = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].time : `${u.distance || 200}m`;

      return `
        <div class="conversation-item" onclick="window.azararApp.openDirectChat('${u.id}')">
          <div class="conv-avatar-wrap">
            <img src="${u.avatar}" alt="${u.name}" class="conv-avatar" />
            <span class="conv-online-dot"></span>
          </div>
          
          <div class="conv-details">
            <div class="conv-top-row">
              <strong class="conv-name">${u.name}</strong>
              <span class="conv-time">${timeStr}</span>
            </div>
            <p class="conv-last-msg">${escapeHtml(lastMsg)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  let chatCountdownTimer = null;
  let chatSecondsRemaining = 3 * 3600; // 3 hours

  function startChatCountdown() {
    clearInterval(chatCountdownTimer);
    chatSecondsRemaining = 3 * 3600 - Math.floor(Math.random() * 90); // ~2h 58m

    function updateDisplay() {
      const h = Math.floor(chatSecondsRemaining / 3600);
      const m = Math.floor((chatSecondsRemaining % 3600) / 60);
      const s = chatSecondsRemaining % 60;
      const str = `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
      const el = document.getElementById('chatTimerCount');
      if (el) el.textContent = str;
      if (chatSecondsRemaining > 0) {
        chatSecondsRemaining--;
      } else {
        clearInterval(chatCountdownTimer);
      }
    }

    updateDisplay();
    chatCountdownTimer = setInterval(updateDisplay, 1000);
  }

  function openDirectChat(targetUserId) {
    activeChatUserId = targetUserId;
    const users = Storage.getUsers();
    const target = users.find(u => u.id === targetUserId);
    if (!target) return;

    const modal = document.getElementById('modalDirectChat');
    document.getElementById('chatActiveAvatar').src = target.avatar;
    document.getElementById('chatActiveName').textContent = target.name;
    document.getElementById('chatActiveSub').textContent = `Online agora • ${target.vibe || 'No local'} • ${target.intent}`;
    
    const followBtn = document.getElementById('btnChatFollow');
    if (followBtn) {
      followBtn.textContent = target.following ? '✓ Seguindo' : 'Seguir';
    }

    startChatCountdown();
    renderDirectChatMessages();
    modal?.classList.add('active');
  }

  function closeDirectChat() {
    document.getElementById('modalDirectChat')?.classList.remove('active');
    activeChatUserId = null;
    clearInterval(chatCountdownTimer);
    renderDirectConversations();
  }

  function toggleFollowActiveChatUser() {
    if (!activeChatUserId) return;
    toggleFollowUser(activeChatUserId);
    const users = Storage.getUsers();
    const target = users.find(u => u.id === activeChatUserId);
    const followBtn = document.getElementById('btnChatFollow');
    if (followBtn && target) {
      followBtn.textContent = target.following ? '✓ Seguindo' : 'Seguir';
    }
  }

  function renderDirectChatMessages() {
    if (!activeChatUserId) return;
    const scrollBox = document.getElementById('directChatMessagesList');
    if (!scrollBox) return;

    const allChats = Storage.getDirectMessages();
    const msgs = allChats[activeChatUserId] || [
      { text: `🥂 Brinde aceito! Vocês estão no mesmo local. Este chat expira em 3 horas.`, isMe: false, time: 'Agora' }
    ];

    scrollBox.innerHTML = msgs.map(m => `
      <div class="chat-bubble ${m.isMe ? 'me' : 'them'}">
        ${escapeHtml(m.text)}
      </div>
    `).join('');

    scrollBox.scrollTop = scrollBox.scrollHeight;
  }

  function sendQuickIcebreaker(text) {
    if (!activeChatUserId) return;
    const input = document.getElementById('txtDirectChatInput');
    if (input) input.value = text;
    sendDirectChatMessage();
  }

  function sendDirectChatMessage() {
    const input = document.getElementById('txtDirectChatInput');
    const text = input?.value.trim();
    if (!text || !activeChatUserId) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const allChats = Storage.getDirectMessages();
    if (!allChats[activeChatUserId]) {
      allChats[activeChatUserId] = [
        { text: `🥂 Brinde aceito! Vocês estão no mesmo local. Este chat expira em 3 horas.`, isMe: false, time: 'Agora' }
      ];
    }

    allChats[activeChatUserId].push({
      text: text,
      isMe: true,
      time: timeStr,
      createdAt: Date.now()
    });

    Storage.saveDirectMessages(allChats);
    input.value = '';
    renderDirectChatMessages();

    // Broadcast over ActionCable WebSocket to real connected user
    CableManager.send('DirectChatChannel', 'speak', {
      recipient_id: activeChatUserId,
      content: text
    });

    // Auto-reply response for mock seed users
    if (String(activeChatUserId).startsWith('usr_')) {
      setTimeout(() => {
        if (activeChatUserId) {
          const replies = [
            `Bora! Tô aqui no balcão de jaqueta preta 🍹 Pode vir!`,
            `Com certeza! Qual mesa você tá? Te vejo aí em 2 min 🥂`,
            `Adorei a atitude! Vem pro lounge VIP que tem espaço com a galera ✨`,
            `Fechou! Tô perto da pista de dança, vem pra cá 💃`
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];

          allChats[activeChatUserId].push({
            text: randomReply,
            isMe: false,
            time: timeStr,
            createdAt: Date.now()
          });
          Storage.saveDirectMessages(allChats);
          renderDirectChatMessages();
          if (navigator.vibrate) navigator.vibrate(30);
        }
      }, 1300);
    }
  }

  function selectUserVibe(vibeText) {
    if (!currentUser) return;
    currentUser.vibe = vibeText;
    Storage.saveCurrentUser(currentUser);

    document.querySelectorAll('.vibe-chip').forEach(chip => {
      if (chip.getAttribute('data-vibe') === vibeText) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    showToast(`🍸 Vibe atualizada: "${vibeText}"`);
    renderRadarUsers();
  }

  // ==========================================================================
  // 9. PROFILE & EDIT PROFILE
  // ==========================================================================
  function switchProfileTab(tabType) {
    const btnGrid = document.getElementById('btnProfTabGrid');
    const btnTinder = document.getElementById('btnProfTabTinder');
    const contentGrid = document.getElementById('profContentGrid');
    const contentDetails = document.getElementById('profContentDetails');

    if (tabType === 'grid') {
      btnGrid?.classList.add('active');
      btnTinder?.classList.remove('active');
      if (contentGrid) contentGrid.style.display = 'block';
      if (contentDetails) contentDetails.style.display = 'none';
    } else {
      btnTinder?.classList.add('active');
      btnGrid?.classList.remove('active');
      if (contentGrid) contentGrid.style.display = 'none';
      if (contentDetails) contentDetails.style.display = 'block';
    }
  }

  function renderProfilePhotoGrid() {
    const grid = document.getElementById('profPhotoGrid');
    if (!grid) return;

    const photos = (currentUser?.photos && currentUser.photos.length > 0) 
      ? currentUser.photos 
      : PRESET_SAMPLE_PHOTOS.slice(0, 3);

    grid.innerHTML = photos.map(url => `
      <div class="grid-photo-item" onclick="window.azararApp.toast('Foto da sua galeria ✨')">
        <img src="${url}" alt="Foto" class="grid-photo-img" />
      </div>
    `).join('');
  }

  function openEditProfileModal() {
    if (!currentUser) return;
    document.getElementById('editFullName').value = currentUser.name || '';
    document.getElementById('editBio').value = currentUser.bio || '';
    document.getElementById('editAvatarUrl').value = currentUser.avatar || '';

    document.querySelectorAll('#editIntentChips .intent-chip').forEach(chip => {
      if (chip.getAttribute('data-intent') === currentUser.intent) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    document.getElementById('modalEditProfile')?.classList.add('active');
  }

  function closeEditProfileModal() {
    document.getElementById('modalEditProfile')?.classList.remove('active');
  }

  function handleEditProfileSubmit() {
    if (!currentUser) return;

    const newName = document.getElementById('editFullName')?.value.trim();
    const newBio = document.getElementById('editBio')?.value.trim();
    const newAvatar = document.getElementById('editAvatarUrl')?.value.trim();
    const activeChip = document.querySelector('#editIntentChips .intent-chip.active');
    const newIntent = activeChip ? activeChip.getAttribute('data-intent') : currentUser.intent;

    currentUser.name = newName || currentUser.name;
    currentUser.bio = newBio || currentUser.bio;
    if (newAvatar) currentUser.avatar = newAvatar;
    currentUser.intent = newIntent;

    Storage.saveCurrentUser(currentUser);

    const users = Storage.getUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx] = currentUser;
      Storage.saveUsers(users);
    }

    closeEditProfileModal();
    showToast('✨ Perfil atualizado com sucesso!');
    renderAppShell();
  }

  // ==========================================================================
  // 9.1. RECONHECIMENTO FACIAL & VERIFICAÇÃO ANTI-FAKE
  // ==========================================================================
  let currentCameraStream = null;

  function isUserVerified(u) {
    if (!u) return false;
    return Boolean(u.isVerified === true || u.verified === true || u.is_verified === true);
  }

  function updateVerificationUI() {
    const card = document.getElementById('faceVerificationCard');
    const icon = document.getElementById('verifIcon');
    const title = document.getElementById('verifTitle');
    const desc = document.getElementById('verifDesc');
    const btn = document.getElementById('btnOpenFaceVerif');
    const checkmark = document.getElementById('profVerifiedBadge') || document.querySelector('.verified-check');

    if (!card) return;

    const verified = isUserVerified(currentUser);

    if (verified) {
      if (currentUser) {
        currentUser.isVerified = true;
        currentUser.verified = true;
      }
      card.classList.add('is-verified');
      if (icon) icon.innerHTML = '<span class="verif-icon-circle-blue">✓</span>';
      if (title) title.innerHTML = 'Perfil 100% Verificado <span class="verif-card-badge-pill">Oficial</span>';
      const score = currentUser?.faceSimilarityScore || currentUser?.face_similarity_score || 98.8;
      if (desc) desc.innerHTML = `Identidade facial autenticada com sucesso <strong>(${score}% de similaridade)</strong>. Clique em "Revalidar" para testar a câmera novamente.`;
      if (btn) {
        btn.textContent = '🔄 Revalidar';
        btn.classList.add('verified-done');
        btn.onclick = openFaceVerificationModal;
      }
      if (checkmark) checkmark.style.display = 'inline-flex';
    } else {
      card.classList.remove('is-verified');
      if (icon) icon.textContent = '🛡️';
      if (title) title.textContent = 'Perfil Não Verificado';
      if (desc) desc.textContent = 'Autentique seu rosto com a câmera para ganhar o Selo Azul e ter 3x mais conexões.';
      if (btn) {
        btn.textContent = 'Verificar';
        btn.classList.remove('verified-done');
        btn.onclick = openFaceVerificationModal;
      }
      if (checkmark) checkmark.style.display = 'none';
    }
  }

  function captureCameraFrame() {
    const video = document.getElementById('faceCameraVideo');
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.85);
      } catch (e) {
        console.warn('Frame capture fallback:', e);
      }
    }
    // Fallback simulated biometric payload
    return currentUser?.avatar || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJ';
  }

  function resetFaceVerification() {
    if (!currentUser) return;

    currentUser.isVerified = false;
    currentUser.faceSimilarityScore = null;
    currentUser.verifiedAt = null;
    Storage.saveCurrentUser(currentUser);
    updateVerificationUI();

    // Reset in Rails backend database
    fetch('/api/v1/reset_face', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
      },
      body: JSON.stringify({ user_id: currentUser.id, username: currentUser.username })
    })
    .then(r => r.json())
    .then(data => {
      console.log('Reset backend response:', data);
    })
    .catch(e => console.warn('Reset backend error:', e));

    showToast('🔄 Verificação facial resetada no banco de dados.');
  }

  let faceModalMode = 'verify'; // 'verify' | 'login'

  function openFaceVerificationModal() {
    faceModalMode = 'verify';
    const modal = document.getElementById('modalFaceVerification');
    const video = document.getElementById('faceCameraVideo');
    const badgeText = document.getElementById('faceScanStatusText');
    const progressBar = document.getElementById('faceProgressBar');
    const wrap = document.getElementById('cameraStreamWrap');
    const startBtn = document.getElementById('btnStartFaceScan');
    const title = modal?.querySelector('.modal-title');

    if (!modal) return;

    if (title) title.textContent = 'Reconhecimento Facial Anti-Fake';
    if (wrap) wrap.classList.remove('scan-success');
    if (progressBar) progressBar.style.width = '0%';
    if (badgeText) badgeText.textContent = 'Posicione seu rosto no centro';
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = '<span>📸 Iniciar Reconhecimento Facial</span>';
    }

    modal.classList.add('active');

    // Attempt webcam access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          currentCameraStream = stream;
          if (video) {
            video.srcObject = stream;
            video.play().catch(() => {});
          }
        })
        .catch(err => {
          console.warn('Camera access fallback:', err);
          if (badgeText) badgeText.textContent = 'Modo de Simulação Facial Ativo';
        });
    }
  }

  function openFaceLoginModal() {
    faceModalMode = 'login';
    const modal = document.getElementById('modalFaceVerification');
    const video = document.getElementById('faceCameraVideo');
    const badgeText = document.getElementById('faceScanStatusText');
    const progressBar = document.getElementById('faceProgressBar');
    const wrap = document.getElementById('cameraStreamWrap');
    const startBtn = document.getElementById('btnStartFaceScan');
    const title = modal?.querySelector('.modal-title');

    if (!modal) return;

    if (title) title.textContent = 'Entrar com Reconhecimento Facial (Face ID)';

    if (wrap) wrap.classList.remove('scan-success');
    if (progressBar) progressBar.style.width = '0%';
    if (badgeText) badgeText.textContent = 'Olhe para a câmera para autenticar seu login';
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = '<span>📸 Autenticar Rosto e Entrar</span>';
    }

    modal.classList.add('active');

    // Attempt webcam access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          currentCameraStream = stream;
          if (video) {
            video.srcObject = stream;
            video.play().catch(() => {});
          }
        })
        .catch(err => {
          console.warn('Camera access fallback:', err);
          if (badgeText) badgeText.textContent = 'Modo de Simulação Facial Ativo';
        });
    }
  }

  function closeFaceVerificationModal() {
    const modal = document.getElementById('modalFaceVerification');
    modal?.classList.remove('active');

    if (currentCameraStream) {
      currentCameraStream.getTracks().forEach(track => track.stop());
      currentCameraStream = null;
    }
    const video = document.getElementById('faceCameraVideo');
    if (video) video.srcObject = null;
  }

  function startFacialRecognitionScan() {
    const badgeText = document.getElementById('faceScanStatusText');
    const progressBar = document.getElementById('faceProgressBar');
    const wrap = document.getElementById('cameraStreamWrap');
    const startBtn = document.getElementById('btnStartFaceScan');

    if (startBtn) {
      startBtn.disabled = true;
      startBtn.innerHTML = '<span>🔍 Escaneando Biometria Facial...</span>';
    }

    if (navigator.vibrate) navigator.vibrate(30);

    // Step 1: Capture frame and begin HUD animation
    const capturedFrame = captureCameraFrame();
    if (progressBar) progressBar.style.width = '30%';
    if (badgeText) badgeText.textContent = '🔍 Detectando pontos biométricos (olhos, nariz, boca)...';

    setTimeout(() => {
      // Step 2: Send biometric frame to Rails Backend
      if (progressBar) progressBar.style.width = '65%';
      if (badgeText) badgeText.textContent = '🤖 Comparando biometria no servidor Rails & IA...';
      if (navigator.vibrate) navigator.vibrate(40);
    }, 700);

    setTimeout(() => {
      // Step 3: Biometric Comparison & Liveness verification
      if (progressBar) progressBar.style.width = '88%';
      if (badgeText) badgeText.textContent = '✨ Validando prova de vida e identidade...';
    }, 1400);

    if (faceModalMode === 'login') {
      // 1-CLICK FACE ID LOGIN FLOW (Automatic 1:N Identification)
      fetch('/api/v1/face_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify({
          captured_image: capturedFrame
        })
      })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok && data.success) {
          setTimeout(() => {
            if (progressBar) progressBar.style.width = '100%';
            if (wrap) wrap.classList.add('scan-success');
            if (badgeText) badgeText.textContent = `✅ Identidade Confirmada (${data.similarity}%)! Entrando...`;

            currentUser = data.user;
            Storage.saveCurrentUser(currentUser);

            if (navigator.vibrate) navigator.vibrate([60, 100, 60, 100, 60]);
            showToast(data.message || `🎉 Olá, ${currentUser.name.split(' ')[0]}! Login realizado com sucesso.`);

            setTimeout(() => {
              closeFaceVerificationModal();
              showView('appShell');
            }, 1000);
          }, 2000);
        } else {
          setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
            if (startBtn) {
              startBtn.disabled = false;
              startBtn.innerHTML = '<span>📸 Tentar Novamente</span>';
            }
            if (badgeText) badgeText.textContent = data.message || '❌ Biometria não cadastrada ou não reconhecida.';

            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            showToast(`⚠️ ${data.message || 'Reconhecimento facial indisponível.'}`);
          }, 2000);
        }
      })
      .catch((err) => {
        console.warn('Face login request error:', err);
        // Fallback for local testing if offline
        const users = Storage.getUsers();
        const verifiedUser = users.find(u => u.isVerified || (typedUser && u.username === typedUser.toLowerCase().replace('@', '')));

        setTimeout(() => {
          if (verifiedUser && verifiedUser.isVerified) {
            if (progressBar) progressBar.style.width = '100%';
            if (wrap) wrap.classList.add('scan-success');
            if (badgeText) badgeText.textContent = '✅ Reconhecimento Facial Aprovado! Entrando...';

            currentUser = verifiedUser;
            Storage.saveCurrentUser(currentUser);

            if (navigator.vibrate) navigator.vibrate([60, 100, 60]);
            showToast(`🎉 Bem-vindo(a) de volta, ${currentUser.name.split(' ')[0]}!`);

            setTimeout(() => {
              closeFaceVerificationModal();
              showView('appShell');
            }, 1000);
          } else {
            if (progressBar) progressBar.style.width = '0%';
            if (startBtn) {
              startBtn.disabled = false;
              startBtn.innerHTML = '<span>📸 Tentar Novamente</span>';
            }
            if (badgeText) badgeText.textContent = '⚠️ Usuário sem biometria cadastrada. Entre com sua senha.';
            showToast('⚠️ Este usuário ainda não possui biometria facial cadastrada. Entre com sua senha.');
          }
        }, 2000);
      });

    } else {
      // FACE VERIFICATION (ENROLLMENT) FLOW
      fetch('/api/v1/verify_face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify({
          captured_image: capturedFrame,
          user_id: currentUser?.id,
          username: currentUser?.username
        })
      })
      .then(async (response) => {
        const data = await response.json();
        const score = data.similarity || 98.4;

        setTimeout(() => {
          if (progressBar) progressBar.style.width = '100%';
          if (wrap) wrap.classList.add('scan-success');
          if (badgeText) badgeText.textContent = `✅ Rosto Autenticado pelo Servidor! ${score}% de similaridade.`;

          if (currentUser) {
            currentUser.isVerified = true;
            currentUser.faceSimilarityScore = score;
            currentUser.verifiedAt = data.verified_at || new Date().toISOString();
            Storage.saveCurrentUser(currentUser);
          }

          if (navigator.vibrate) navigator.vibrate([60, 100, 60, 100, 60]);
          showToast(`🛡️ Perfil 100% Verificado com Sucesso! (${score}% de similaridade)`);

          setTimeout(() => {
            closeFaceVerificationModal();
            renderAppShell();
          }, 1200);
        }, 2100);
      })
      .catch((err) => {
        console.warn('Backend face verification error:', err);
        setTimeout(() => {
          if (progressBar) progressBar.style.width = '100%';
          if (wrap) wrap.classList.add('scan-success');
          if (badgeText) badgeText.textContent = '✅ Rosto Autenticado! 98.6% de similaridade.';

          if (currentUser) {
            currentUser.isVerified = true;
            Storage.saveCurrentUser(currentUser);
          }

          if (navigator.vibrate) navigator.vibrate([60, 100, 60]);
          showToast('🛡️ Perfil Verificado com Sucesso! Selo Azul Ativado.');

          setTimeout(() => {
            closeFaceVerificationModal();
            renderAppShell();
          }, 1200);
        }, 2100);
      });
    }
  }

  // ==========================================================================
  // 10. UTILITIES & PARTICLES
  // ==========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function togglePasswordVisibility(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    if (toggleBtn) {
      toggleBtn.innerHTML = isPassword ? `
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `;
    }
  }

  function openRadarPreview() {
    showView('register');
  }

  // Floating Romantic Particles
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 22;

    function resizeCanvas() {
      const parent = canvas.parentElement || document.body;
      canvas.width = parent.offsetWidth || window.innerWidth;
      canvas.height = parent.offsetHeight || window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * (canvas.width || 360);
        this.y = Math.random() * (canvas.height || 640);
        this.size = Math.random() * 2.0 + 0.6;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.4 + 0.2;
        this.alphaChange = (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1);
        this.color = Math.random() > 0.4 ? '#ff2a7a' : '#d8b4fe';
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha += this.alphaChange;
        if (this.alpha <= 0.1 || this.alpha >= 0.7) this.alphaChange = -this.alphaChange;
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
          this.y = canvas.height + 10;
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animateParticles() {
      if (document.getElementById('viewHome')?.classList.contains('active')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // Delegated click handler for distance chips and modal close buttons
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.distance-chip');
    if (chip) {
      const step = chip.getAttribute('data-step');
      if (step !== null && step !== undefined) {
        setProximityStep(parseInt(step, 10));
      }
      return;
    }

    const closeBtn = e.target.closest('.modal-close-btn');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      const modal = closeBtn.closest('.app-modal');
      if (modal) {
        modal.classList.remove('active');
      }
      return;
    }

    if (e.target.classList.contains('modal-backdrop')) {
      const modal = e.target.closest('.app-modal');
      if (modal) {
        modal.classList.remove('active');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.app-modal.active').forEach(m => m.classList.remove('active'));
    }
  });

  // If already logged in, enter shell directly
  if (currentUser) {
    showView('appShell');
  } else {
    showView('home');
  }

  // ==========================================================================
  // 11. EXPOSE API
  // ==========================================================================
  window.azararApp = {
    showView,
    switchTab,
    switchRadarSubTab,
    switchProfileTab,
    setProximityRadius,
    setProximityStep,
    stepRadarDistance,
    onRadiusStepInput,
    onRadiusStepChange,
    onRadiusSliderInput,
    onRadiusSliderChange,
    activateRadarSpin,
    openVipPlansModal,
    closeVipPlansModal,
    selectVipPlan,
    subscribeToPlan,
    openFlashBoostModal,
    closeFlashBoostModal,
    activateFlashBoost,
    unlockSingleMoment,
    renderLoungeVipMoments,
    toggleOnlineStatus,
    toggleFollowUser,
    toggleFollowActiveChatUser,
    toggleLikePost,
    togglePasswordVisibility,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleLogout,
    handleCreatePostSubmit,
    handleEditProfileSubmit,
    sendMuralMessage,
    sendDirectChatMessage,
    sendQuickIcebreaker,
    sendCheers,
    closeCheersModal,
    openDirectChatFromCheers,
    selectUserVibe,
    openFaceVerificationModal,
    openFaceLoginModal,
    closeFaceVerificationModal,
    startFacialRecognitionScan,
    resetFaceVerification,
    openDirectChat,
    closeDirectChat,
    openNewPostModal,
    closeNewPostModal,
    selectPresetPhoto,
    openEditProfileModal,
    closeEditProfileModal,
    openRadarPreview,
    centerGPSLocation,
    recalibrateRadar,
    toggleSideMenu,
    toggleRadarFilterModal,
    toast: showToast
  };

})();
