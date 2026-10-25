/* Shared Bookare state and reactive UI manager */
(function () {
  const KEY = 'bookare_state_v2';
  const properties = [
    { id: 'p1', name: 'Loire View Studio', address: '18 rue de la Loire', city: 'Nantes', area: 'Ile de Nantes', type: 'studio', rent: 560, deposit: 560, surface: 23, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private', 'balcony'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80', description: 'Sunny furnished studio with a compact kitchen and balcony overlooking the Loire.', walk: 28, bike: 9, transit: 14, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: true },
    { id: 'p2', name: 'Saint-Felix Garden Studio', address: '14 rue Saint-Felix', city: 'Nantes', area: 'Saint-Felix', type: 'studio', rent: 690, deposit: 690, surface: 27, available: '2026-09-15', amenities: ['furnished', 'wi-fi', 'washing machine', 'private', 'balcony', 'bike storage'], image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80', description: 'Quiet, bright studio a short cycle from Audencia with a private bathroom.', walk: 12, bike: 4, transit: 8, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: true },
    { id: 'p3', name: 'Commerce Loft Studio', address: '7 passage du Commerce', city: 'Nantes', area: 'Centre-ville', type: 'studio', rent: 745, deposit: 745, surface: 31, available: '2026-10-01', amenities: ['furnished', 'wi-fi', 'private', 'balcony'], image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80', description: 'Renovated city-centre studio close to tram connections and independent cafes.', walk: 35, bike: 11, transit: 16, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: true },
    { id: 'p4', name: 'Michelet Student Residence', address: '32 boulevard Michelet', city: 'Nantes', area: 'Petit-Port', type: 'student-residence', rent: 495, deposit: 495, surface: 19, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private', 'bike storage'], image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=900&q=80', description: 'Secure student residence with laundry, study lounge and bike storage.', walk: 9, bike: 3, transit: 5, university: 'Universite de Nantes', campus: 'university tertre campus', verified: true },
    { id: 'p5', name: 'Dervallieres Residence', address: '5 rue des Dervallieres', city: 'Nantes', area: 'Dervallieres', type: 'student-residence', rent: 430, deposit: 430, surface: 18, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private'], image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80', description: 'Affordable furnished room in a calm residence with direct bus links.', walk: 27, bike: 8, transit: 12, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: true },
    { id: 'p6', name: 'Hauts-Paves Colocation', address: '41 rue des Hauts-Paves', city: 'Nantes', area: 'Hauts-Paves', type: 'shared-apartment', rent: 410, deposit: 410, surface: 14, available: '2026-09-10', amenities: ['furnished', 'wi-fi', 'washing machine', 'balcony', 'bike storage'], image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80', description: 'Friendly three-bedroom flat with a shared kitchen and leafy balcony.', walk: 24, bike: 7, transit: 13, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: true },
    { id: 'p7', name: 'Chantenay Riverside Flat', address: '9 quai de la Fosse', city: 'Nantes', area: 'Chantenay', type: 'shared-apartment', rent: 385, deposit: 385, surface: 12, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'bike storage'], image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80', description: 'Budget-friendly room in a welcoming flat near the river and tram 1.', walk: 39, bike: 12, transit: 19, university: 'Audencia Business School', campus: 'audencia atlantic campus', verified: false },
    { id: 'p8', name: 'Doulon Family Room', address: '22 rue de la Ville en Pierre', city: 'Nantes', area: 'Doulon', type: 'private-room', rent: 465, deposit: 465, surface: 16, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private', 'garden'], image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Private room in a welcoming family home with a garden and breakfast option.', walk: 42, bike: 13, transit: 21, university: 'Universite de Nantes', campus: 'university tertre campus', verified: true },
    { id: 'p9', name: 'Erdre House Homestay', address: '3 avenue de la Haute-Foret', city: 'Nantes', area: 'Erdre', type: 'homestay', rent: 520, deposit: 300, surface: 15, available: '2026-09-05', amenities: ['furnished', 'wi-fi', 'washing machine', 'private', 'garden', 'bike storage'], image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=900&q=80', description: 'Warm homestay with a French host family, private room and garden access.', walk: 32, bike: 10, transit: 15, university: 'Universite de Nantes', campus: 'university tertre campus', verified: true },
    { id: 'p10', name: 'Bordeaux Victoire Room', address: '26 rue des Augustins', city: 'Bordeaux', area: 'Victoire', type: 'private-room', rent: 520, deposit: 520, surface: 17, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private'], image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80', description: 'Bright private room in a renovated shared apartment near tram B.', walk: 18, bike: 6, transit: 9, university: 'Universite de Bordeaux', campus: 'city campus', verified: true },
    { id: 'p11', name: 'Lyon Berges Studio', address: '11 rue de Marseille', city: 'Lyon', area: 'Guillotiere', type: 'studio', rent: 720, deposit: 720, surface: 25, available: '2026-10-01', amenities: ['furnished', 'wi-fi', 'washing machine', 'private'], image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80', description: 'Modern studio close to university buildings, shops and the Rhone cycle path.', walk: 22, bike: 7, transit: 10, university: 'Universite Lyon 1', campus: 'city campus', verified: true },
    { id: 'p12', name: 'Paris Canal Homestay', address: '8 rue de lOurcq', city: 'Paris', area: 'La Villette', type: 'homestay', rent: 780, deposit: 500, surface: 14, available: '2026-09-01', amenities: ['furnished', 'wi-fi', 'private', 'bike storage'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', description: 'Private room with a local host near metro line 5 and student life in La Villette.', walk: 30, bike: 12, transit: 8, university: 'Sciences Po', campus: 'city campus', verified: true }
  ];
  const buddies = [
    { id: 'b1', name: 'Rahul Sharma', university: 'Audencia Business School', city: 'Nantes', languages: ['English', 'French', 'Hindi'], topics: ['Accommodation', 'CAF', 'Banking', 'Transport'], availability: ['Available now', 'This week'], degree: 'MSc Marketing', avatar: 'RS', rating: 4.9, reviews: 47, bio: 'Happy to help students arriving from any country.' },
    { id: 'b2', name: 'Yuki Chen', university: 'Audencia Business School', city: 'Nantes', languages: ['English', 'French', 'Mandarin', 'Japanese'], topics: ['SIM card', 'University', 'Food & shopping'], availability: ['This week'], degree: 'Exchange Finance', avatar: 'YC', rating: 5, reviews: 32, bio: 'Moved from Tokyo and happy to share everything I learned.' },
    { id: 'b3', name: 'Camille Martin', university: 'Universite Lyon 1', city: 'Lyon', languages: ['French', 'English'], topics: ['Accommodation', 'Transport', 'University'], availability: ['Available now'], degree: 'MSc Biology', avatar: 'CM', rating: 4.8, reviews: 26, bio: 'I know the Lyon campus and student routes around town.' },
    { id: 'b4', name: 'Sofia Almeida', university: 'Universite de Bordeaux', city: 'Bordeaux', languages: ['French', 'English', 'Spanish', 'Portuguese'], topics: ['CAF', 'Banking', 'Food & shopping'], availability: ['This week'], degree: 'MSc Sustainability', avatar: 'SA', rating: 4.9, reviews: 38, bio: 'I can help you settle in and find affordable places to shop.' },
    { id: 'b5', name: 'Amir Haddad', university: 'Sciences Po', city: 'Paris', languages: ['Arabic', 'English', 'French'], topics: ['Visa/SIM', 'Banking', 'University'], availability: ['Available now'], degree: 'Master Public Policy', avatar: 'AH', rating: 4.7, reviews: 21, bio: 'Ask me about paperwork, SIM cards and getting started in Paris.' },
    { id: 'b6', name: 'Ananya Patel', university: 'Audencia Business School', city: 'Nantes', languages: ['English', 'French', 'Hindi', 'Gujarati'], topics: ['University', 'Transport', 'Accommodation'], availability: ['This week'], degree: 'MSc Digital', avatar: 'AP', rating: 4.7, reviews: 19, bio: 'Just finished my first year. Ask me anything.' }
  ];
  const communities = [
    { id: 'c1', university: 'Audencia Business School', city: 'Nantes', students: 238 },
    { id: 'c2', university: 'Sciences Po', city: 'Paris', students: 441 },
    { id: 'c3', university: 'Universite Lyon 1', city: 'Lyon', students: 312 },
    { id: 'c4', university: 'Universite de Bordeaux', city: 'Bordeaux', students: 189 }
  ];
  const questions = [
    { topic: 'CAF', title: 'How does CAF work and how do I apply for housing benefit as a student?', body: 'Is CAF available to international students and how long does the application take?', city: 'All cities', votes: 31, answer: 'Apply on caf.fr once you have your lease and French bank details. International students with a valid visa can apply.' },
    { topic: 'Transport', title: 'How do I get my student transport card in Nantes?', body: 'What is the cheapest student pass and where do I get it?', city: 'Nantes', votes: 24, answer: 'The Naolib app offers the under-26 monthly pass. Bring proof of enrolment and identity to an agency.' },
    { topic: 'Accommodation', title: 'Which neighbourhoods in Nantes are best for students?', body: 'I want somewhere safe, affordable and connected to campus.', city: 'Nantes', votes: 18, answer: 'Saint-Felix and Hauts-Paves are popular near Audencia. Dervallieres and Chantenay can be more affordable.' },
    { topic: 'Banking', title: 'How can I open a bank account without a French address?', body: 'I need an account to receive CAF and pay rent when I arrive.', city: 'All cities', votes: 15, answer: 'Online banks often accept a passport, visa and proof of enrolment. Ask which temporary proof of address they accept.' },
    { topic: 'Shopping', title: 'Where can I buy affordable groceries in Nantes?', body: 'Which supermarkets and student markets are best on a budget?', city: 'Nantes', votes: 8, answer: 'Compare Lidl, Aldi and local markets such as Talensac. Shopping late at markets can reduce food costs.' },
    { topic: 'Food', title: 'Where can I find vegetarian student meals near campus?', body: 'I am looking for affordable lunch options during the week.', city: 'Nantes', votes: 11, answer: 'The university canteen is usually the lowest-cost weekday option. Look for CROUS menus and vegetarian plates.' },
    { topic: 'University', title: 'When should I register for orientation at Audencia?', body: 'Is registration online before arrival or on campus?', city: 'Nantes', votes: 13, answer: 'Complete the online registration checklist first, then choose an orientation slot in the student portal.' },
    { topic: 'Visa/SIM', title: 'Which SIM card works best for a new student in France?', body: 'I need reliable data as soon as I land.', city: 'All cities', votes: 9, answer: 'Free Mobile, Sosh and Lebara offer flexible plans. Buy an eSIM before arrival if your phone supports it.' }
  ];

  let state;
  try {
    state = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    state = {};
  }
  state.users = state.users || [];
  state.currentUserId = state.currentUserId || null;
  state.favorites = state.favorites || {};
  state.applications = state.applications || {};
  state.messages = state.messages || {};
  state.bookings = state.bookings || {};
  state.notifications = state.notifications || {};
  state.documents = state.documents || {};
  state.arrivalTasks = state.arrivalTasks || {};
  state.savedSearches = state.savedSearches || {};
  state.selectedCommunity = state.selectedCommunity || null;

  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const current = () => state.users.find(item => item.id === state.currentUserId) || { id: 'u-default', name: 'Kavin M D', email: 'kavin@example.com', city: 'Nantes', university: 'Audencia Business School' };
  const key = () => state.currentUserId || 'guest';
  const favorites = () => state.favorites[key()] || [];
  const findProperty = id => properties.find(item => item.id === String(id));
  const findBuddy = id => buddies.find(item => item.id === String(id));
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const toast = (msg, type) => typeof showToast === 'function' && showToast(msg, type || 'default');

  const iconMap = { '📍': 'map-pin', '📅': 'calendar-days', '👤': 'user', '📋': 'clipboard-list', '🏠': 'home', '🏡': 'house', '🏢': 'building-2', '🏛': 'landmark', '🏛️': 'landmark', '🛋': 'sofa', '🛋️': 'sofa', '🌿': 'leaf', '🌇': 'sunset', '🌸': 'flower-2', '🚪': 'door-open', '🌆': 'building-2', '🗼': 'landmark', '🏫': 'graduation-cap', '🏙': 'building-2', '🎓': 'graduation-cap', '💶': 'wallet', '💬': 'message-circle', '🤝': 'handshake', '📞': 'phone', '🌐': 'globe-2', '🚶': 'footprints', '🚲': 'bike', '🚌': 'bus', '🚇': 'train-front', '🗺': 'map', '🧭': 'compass', '🔒': 'lock-keyhole', '🔐': 'shield-check', '💳': 'credit-card', '📄': 'file-text', '📁': 'folder-open', '🛡️': 'shield-check', '📱': 'smartphone', '🏦': 'landmark', '🛒': 'shopping-cart', '🍽️': 'utensils', '🍳': 'cooking-pot', '🚿': 'shower-head', '🔥': 'flame', '🪟': 'panels-top-left', '🧺': 'washing-machine', '📦': 'package', '✕': 'x', '✓': 'check', '★': 'star', '♥': 'heart', '♡': 'heart', '📥': 'inbox', '🔑': 'key-round', '👋': 'hand', '🏅': 'award', '📉': 'trending-down', '🪪': 'contact', '📜': 'scroll', '🛏️': 'bed-double', '🖥️': 'monitor', '📶': 'wifi', '🛍️': 'shopping-bag', '🎉': 'party-popper', '🥖': 'croissant', '🚊': 'tram-front', '🎨': 'palette', '🐘': 'landmark', '🥐': 'croissant', '🌳': 'trees', '🍕': 'pizza', '💰': 'circle-dollar-sign' };
  function normalizeIcons(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement && node.parentElement.closest('script,style,svg')) return;
      let html = esc(node.nodeValue), changed = false;
      Object.entries(iconMap).forEach(([emoji, name]) => {
        if (html.includes(emoji)) {
          html = html.split(emoji).join(`<i data-lucide="${name}" aria-hidden="true"></i>`);
          changed = true;
        }
      });
      if (changed) {
        const holder = document.createElement('span');
        holder.innerHTML = html;
        node.replaceWith(...holder.childNodes);
      }
    });
  }

  function getMessageCount() {
    const convs = Object.values(state.messages[key()] || {});
    return convs.reduce((acc, c) => acc + (c.messages ? c.messages.filter(m => m.sender === 'them' && m.unread).length : 0), 0) || convs.length;
  }

  function addNotification(notif) {
    state.notifications[key()] = state.notifications[key()] || [];
    state.notifications[key()].unshift({
      id: 'notif-' + Date.now(),
      title: notif.title,
      body: notif.body,
      time: notif.time || 'Just now',
      icon: notif.icon || '🔔',
      unread: true
    });
    save();
    syncAll();
  }

  window.Bookare = {
    properties,
    buddies,
    communities,
    questions,
    state,
    current,
    findProperty,
    findBuddy,
    getFavorites: favorites,
    toggleFavorite(id) {
      const value = String(id);
      const list = favorites();
      const willBeActive = !list.includes(value);
      state.favorites[key()] = willBeActive ? list.concat(value) : list.filter(item => item !== value);
      const prop = findProperty(value);
      if (willBeActive && prop) {
        addNotification({
          title: 'Added to favorites',
          body: `Saved ${prop.name} (${prop.city}) to your shortlist.`,
          icon: '♡'
        });
      }
      save();
      syncAll();
      return willBeActive;
    },
    apply(id) {
      const prop = findProperty(id) || properties[0];
      state.applications[key()] = {
        id: 'BK-' + (prop ? prop.id.toUpperCase() : '2026'),
        propertyId: String(prop.id),
        submittedAt: new Date().toISOString(),
        status: 'Landlord reviewing',
        stage: 3
      };
      addNotification({
        title: 'Application submitted',
        body: `Your rental application for ${prop.name} was sent to the landlord.`,
        icon: '📋'
      });
      save();
      syncAll();
    },
    register(profile) {
      const id = 'u-' + Date.now();
      state.users.push({ id, ...profile });
      state.currentUserId = id;
      save();
      syncAll();
      return current();
    },
    sendMessage(convId, text) {
      state.messages[key()] = state.messages[key()] || {};
      const conv = state.messages[key()][convId];
      if (!conv) return;
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      conv.messages.push({ sender: 'me', text, time: timeStr });
      save();
      syncAll();
      setTimeout(() => {
        let reply = "Got it! Feel free to ask anything else about housing or moving to France.";
        if (conv.type === 'buddy') reply = `Thanks for reaching out! I'm happy to help you settle in. Let me know what questions you have.`;
        else if (conv.type === 'landlord') reply = "Thank you for your message. I have reviewed your file and will keep you updated.";
        else if (conv.type === 'support') reply = "A Bookare relocation advisor has received your request.";
        conv.messages.push({ sender: 'them', text: reply, time: timeStr, unread: true });
        addNotification({
          title: `New message from ${conv.name}`,
          body: reply,
          icon: '💬'
        });
        save();
        syncAll();
      }, 900);
    },
    initiateConversation(id, type = 'buddy') {
      state.messages[key()] = state.messages[key()] || {};
      if (state.messages[key()][id]) return state.messages[key()][id];
      let meta = {
        name: 'Contact',
        role: 'Student Buddy',
        status: 'Online',
        avatar: 'CB',
        avatarBg: 'linear-gradient(135deg, var(--blue-400), var(--blue-600))',
        type
      };
      if (type === 'buddy' || id.startsWith('b')) {
        const buddy = findBuddy(id) || buddies[0];
        meta = {
          name: buddy.name,
          role: `${buddy.university} Buddy`,
          status: `${buddy.degree} @ ${buddy.university} · Online`,
          avatar: buddy.avatar,
          avatarBg: 'linear-gradient(135deg, var(--blue-400), var(--blue-600))',
          type: 'buddy'
        };
      } else if (type === 'landlord' || id === 'pierre') {
        meta = {
          name: 'Pierre Dupont',
          role: 'Private Landlord (Verified)',
          status: 'Landlord of Loire View Studio · Typically replies in 2h',
          avatar: 'PD',
          avatarBg: 'linear-gradient(135deg, #10B981, #059669)',
          type: 'landlord'
        };
      } else {
        meta = {
          name: 'Bookare Support',
          role: 'Arrival & Relocation Advisor',
          status: 'Official Bookare Relocation Team Nantes · 24/7',
          avatar: 'BK',
          avatarBg: 'linear-gradient(135deg, #6366F1, #4F46E5)',
          type: 'support'
        };
      }
      state.messages[key()][id] = {
        id,
        ...meta,
        messages: []
      };
      save();
      syncAll();
      return state.messages[key()][id];
    },
    toggleArrivalTask(idx) {
      state.arrivalTasks[key()] = state.arrivalTasks[key()] || [];
      const list = state.arrivalTasks[key()];
      state.arrivalTasks[key()] = list.includes(idx) ? list.filter(i => i !== idx) : list.concat(idx);
      save();
      syncAll();
    },
    uploadDocument(name, category = 'Other') {
      state.documents[key()] = state.documents[key()] || [];
      const docItem = {
        id: 'doc-' + Date.now(),
        name: String(name || 'Rental Document').trim(),
        category: String(category || 'Other').trim(),
        date: new Date().toLocaleDateString(),
        size: '1.2 MB'
      };
      state.documents[key()].push(docItem);
      addNotification({
        title: 'Document uploaded',
        body: `${docItem.name} was uploaded and saved to your wallet.`,
        icon: '📄'
      });
      save();
      syncAll();
      return docItem;
    },
    removeDocument(id) {
      state.documents[key()] = (state.documents[key()] || []).filter(d => {
        if (typeof d === 'string') return d !== id;
        return d.id !== id && d.name !== id;
      });
      save();
      syncAll();
      toast('Document removed from wallet', 'default');
    },
    syncUI: () => syncAll()
  };

  window.openModal = id => { const el = document.getElementById(id); if (el) el.style.display = 'flex'; };
  window.closeModal = id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; };
  window.toggleShortlist = id => {
    const active = Bookare.toggleFavorite(id);
    toast(active ? 'Added to favorites' : 'Removed from favorites', active ? 'success' : 'default');
  };

  function icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } }); }
  function nav() {
    const navEl = document.querySelector('.nav');
    if (navEl) window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
    const hamburger = document.querySelector('.nav-hamburger'), mobile = document.querySelector('.nav-mobile');
    if (hamburger && mobile) hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobile.classList.toggle('open', open);
    });
  }

  function bindFavorites(root) {
    (root || document).querySelectorAll('[data-favorite]').forEach(btn => {
      btn.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        const active = Bookare.toggleFavorite(btn.dataset.favorite);
        toast(active ? 'Added to favorites' : 'Removed from favorites', active ? 'success' : 'default');
      };
    });
  }

  function propertyCard(item) {
    const fav = favorites().includes(item.id);
    const imgHtml = (item.image && item.image.startsWith('http')) ? `<img src="${item.image}" alt="${esc(item.name)}" loading="lazy">` : `<div class="property-card-img-placeholder">${item.image}</div>`;
    return `<div class="property-card"><div class="property-card-img">${imgHtml}<div class="property-badge-wrap"><span class="badge ${item.verified ? 'badge-green' : 'badge-yellow'}">${item.verified ? '✓ Verified' : 'New'}</span></div><button class="property-shortlist-btn${fav ? ' active' : ''}" data-favorite="${item.id}" aria-label="Save to shortlist"><span class="shortlist-icon">${fav ? '♥' : '♡'}</span></button></div><div class="property-card-body"><div class="property-price">€${item.rent} <span>/ month</span></div><div class="property-title">${esc(item.name)}</div><div class="property-location">📍 ${esc(item.area)}, ${item.city}</div><div class="property-uni">🏫 ${item.walk} min walk · ${item.transit} min by transport</div><div class="property-commute"><div class="commute-item">🚶 ${item.walk} min</div><div class="commute-item">🚲 ${item.bike} min</div><div class="commute-item">🚌 ${item.transit} min</div></div><div class="property-amenities">${item.amenities.map(a => `<span class="amenity-tag">${esc(a)}</span>`).join('')}</div></div><div class="property-card-footer"><a href="property.html?id=${item.id}" class="btn btn-primary btn-sm" style="flex:1">View details</a><button class="btn btn-secondary btn-sm" data-favorite="${item.id}">${fav ? '♥' : '♡'}</button></div></div>`;
  }

  /* Sync all counts, badges, and dynamic UI elements across entire application */
  function syncAll() {
    const favs = favorites();
    const favCount = favs.length;
    const msgCount = getMessageCount();
    const app = state.applications[key()];
    const docs = state.documents[key()] || [];
    const arrivalTasks = state.arrivalTasks[key()] || [];
    const notifs = state.notifications[key()] || [];
    const unreadNotifs = notifs.filter(n => n.unread).length;
    const bookings = state.bookings[key()] || [];

    // 1. Navigation badges
    document.querySelectorAll('a[href*="messages"]').forEach(link => {
      // Remove any hardcoded text count like "Messages (2)"
      if (link.childNodes.length) {
        link.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.includes('Messages (')) {
            child.textContent = child.textContent.replace(/Messages \(\d+\)/g, 'Messages');
          }
        });
      }
      let badge = link.querySelector('.notif-badge');
      if (msgCount > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'notif-badge';
          link.appendChild(badge);
        }
        badge.textContent = msgCount;
        badge.style.display = 'inline-flex';
      } else if (badge) {
        badge.style.display = 'none';
      }
    });

    // Shortlist nav badges / links
    document.querySelectorAll('a[href*="shortlist"]').forEach(link => {
      let badge = link.querySelector('.notif-badge');
      if (favCount > 0) {
        if (badge) {
          badge.textContent = favCount;
          badge.style.display = 'inline-flex';
        }
      } else if (badge) {
        badge.style.display = 'none';
      }
    });

    // 2. Favorite button active state sync across current page
    document.querySelectorAll('[data-favorite]').forEach(btn => {
      const active = favs.includes(btn.dataset.favorite);
      btn.classList.toggle('active', active);
      const icon = btn.querySelector('.shortlist-icon');
      if (icon) icon.textContent = active ? '♥' : '♡';
      else if (btn.tagName === 'BUTTON' && (btn.textContent === '♥' || btn.textContent === '♡')) {
        btn.textContent = active ? '♥' : '♡';
      }
    });

    // 3. Dashboard specific updates
    syncDashboard(favCount, app, docs, arrivalTasks, notifs, unreadNotifs, bookings);

    // 4. Shortlist specific updates
    syncShortlist(favs);

    // 5. Compare page updates
    syncCompare(favs);

    // 6. Messages page updates
    syncMessages();

    // 7. Landlord portal updates
    syncLandlord();

    // 8. Documents page updates
    syncDocuments(docs);

    // 9. Icons normalization
    normalizeIcons();
    icons();
  }

  function syncDashboard(favCount, app, docs, arrivalTasks, notifs, unreadNotifs, bookings) {
    // Quick stat numbers
    const statCards = document.querySelectorAll('.dashboard-layout .landlord-stat-card, .container .landlord-stat-card');
    if (statCards.length >= 4) {
      statCards[0].querySelector('.landlord-stat-value').textContent = favCount;
      statCards[1].querySelector('.landlord-stat-value').textContent = app ? '1' : '0';
      statCards[2].querySelector('.landlord-stat-value').textContent = `${docs.length}/7`;
      statCards[3].querySelector('.landlord-stat-value').textContent = `${arrivalTasks.length}/12`;
    }

    // Sidebar badges
    const shortlistSide = document.querySelector('.dashboard-nav a[href*="shortlist"] .notif-badge');
    if (shortlistSide) {
      shortlistSide.textContent = favCount;
      shortlistSide.style.display = favCount > 0 ? 'inline-flex' : 'none';
    }
    const messagesSide = document.querySelector('.dashboard-nav a[href*="messages"] .notif-badge');
    if (messagesSide) {
      const mc = getMessageCount();
      messagesSide.textContent = mc;
      messagesSide.style.display = mc > 0 ? 'inline-flex' : 'none';
    }

    // User greeting
    const welcome = document.querySelector('.dashboard-layout')?.previousElementSibling;
    const person = current();
    if (welcome) {
      const nameEl = welcome.querySelector('div[style*="font-size:var(--font-size-2xl)"]');
      const detailsEl = welcome.querySelector('div[style*="opacity:0.8"]');
      if (nameEl) nameEl.textContent = person ? person.name : 'Welcome to Bookare';
      if (detailsEl) detailsEl.textContent = person ? `🎓 ${person.university || 'Audencia Business School'} · ${person.city || 'Nantes'}` : 'Track your French student housing journey in real-time.';
    }
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = person ? person.name : 'Kavin M D';
    const profileUni = document.getElementById('profile-uni');
    if (profileUni) profileUni.textContent = person ? `${person.university || 'Audencia Business School'} · ${person.city || 'Nantes'}` : 'Audencia Business School · Nantes';

    // Active Application Card
    const appCard = document.getElementById('dashboard-application-card') || [...document.querySelectorAll('.card')].find(el => el.textContent.includes('Active application'));
    if (appCard) {
      appCard.id = 'dashboard-application-card';
      if (!app) {
        appCard.innerHTML = `<div class="card-body text-center py-8">
          <div style="font-size:2.5rem;margin-bottom:8px">📋</div>
          <h2 class="text-lg font-bold mb-2">No applications yet</h2>
          <p class="text-sm text-muted mb-4">You have not submitted an application yet. Choose a home and submit your rental dossier when you are ready.</p>
          <a href="search.html" class="btn btn-primary btn-sm">Find a Home</a>
        </div>`;
      } else {
        const prop = findProperty(app.propertyId) || properties[0];
        appCard.innerHTML = `<div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 style="font-size:var(--font-size-lg);font-weight:700">Active application</h2>
            <a href="application.html" class="btn btn-ghost btn-sm">View details →</a>
          </div>
          <div style="display:flex;gap:var(--space-4);align-items:center;margin-bottom:var(--space-4);padding:var(--space-4);background:var(--slate-50);border-radius:var(--radius-md)">
            <img src="${prop.image}" alt="${esc(prop.name)}" style="width:72px;height:56px;border-radius:var(--radius-md);object-fit:cover;flex-shrink:0" loading="lazy">
            <div style="flex:1">
              <div style="font-weight:700;font-size:var(--font-size-sm)">${esc(prop.name)}</div>
              <div style="font-size:var(--font-size-xs);color:var(--color-text-muted)">${esc(prop.area)}, ${prop.city} · €${prop.rent}/month</div>
            </div>
            <span class="badge badge-yellow">${app.status || 'Landlord reviewing'}</span>
          </div>
          <div style="display:flex;gap:0;overflow-x:auto">
            <div class="progress-step done"><div class="progress-step-dot">✓</div><div class="progress-step-label">Submitted</div></div>
            <div class="progress-line done"></div>
            <div class="progress-step done"><div class="progress-step-dot">✓</div><div class="progress-step-label">Docs verified</div></div>
            <div class="progress-line active"></div>
            <div class="progress-step active"><div class="progress-step-dot">3</div><div class="progress-step-label">Landlord review</div></div>
            <div class="progress-line"></div>
            <div class="progress-step"><div class="progress-step-dot">4</div><div class="progress-step-label">Approved</div></div>
            <div class="progress-line"></div>
            <div class="progress-step"><div class="progress-step-dot">5</div><div class="progress-step-label">Confirmed</div></div>
          </div>
        </div>`;
      }
    }

    // Bookings section in dashboard
    let bookingsCard = document.getElementById('dashboard-bookings-card');
    if (!bookingsCard && appCard && appCard.parentElement) {
      bookingsCard = document.createElement('div');
      bookingsCard.id = 'dashboard-bookings-card';
      bookingsCard.className = 'card mb-6';
      appCard.after(bookingsCard);
    }
    if (bookingsCard) {
      if (!bookings.length) {
        bookingsCard.innerHTML = `<div class="card-body text-center py-8">
          <div style="font-size:2.5rem;margin-bottom:8px">🔑</div>
          <h2 class="text-lg font-bold mb-2">No bookings yet</h2>
          <p class="text-sm text-muted mb-4">When your application is accepted and lease confirmed, your booking details and key handover schedule will appear here.</p>
          <a href="search.html" class="btn btn-secondary btn-sm">Explore accommodations</a>
        </div>`;
      } else {
        bookingsCard.innerHTML = `<div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 style="font-size:var(--font-size-lg);font-weight:700">My Bookings (${bookings.length})</h2>
          </div>
          <div>${bookings.map(b => `<div class="p-4 bg-slate-50 rounded-lg mb-2 flex justify-between items-center"><div><strong>${esc(b.name)}</strong><div class="text-xs text-muted">Move-in: ${esc(b.moveIn)}</div></div><span class="badge badge-green">Confirmed</span></div>`).join('')}</div>
        </div>`;
      }
    }

    // Shortlist preview card in dashboard
    const shortlistCard = document.getElementById('dashboard-shortlist-card') || [...document.querySelectorAll('.card')].find(el => el.textContent.includes('My shortlist') && el.textContent.includes('View all'));
    if (shortlistCard) {
      shortlistCard.id = 'dashboard-shortlist-card';
      const favList = properties.filter(item => favorites().includes(item.id));
      if (!favList.length) {
        shortlistCard.innerHTML = `<div class="card-body text-center py-8">
          <div style="font-size:2.5rem;margin-bottom:8px">♡</div>
          <h2 class="text-lg font-bold mb-2">No saved accommodations yet</h2>
          <p class="text-sm text-muted mb-4">Explore homes and save your favorites to compare and track them here.</p>
          <a href="search.html" class="btn btn-primary btn-sm">Browse accommodations</a>
        </div>`;
      } else {
        shortlistCard.innerHTML = `<div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 style="font-size:var(--font-size-lg);font-weight:700">My shortlist (${favList.length})</h2>
            <a href="shortlist.html" class="btn btn-ghost btn-sm">View all →</a>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-3)">
            ${favList.slice(0, 3).map(item => `
              <div style="display:flex;gap:var(--space-3);align-items:center">
                <img src="${item.image}" alt="${esc(item.name)}" style="width:52px;height:44px;border-radius:var(--radius-sm);object-fit:cover;flex-shrink:0" loading="lazy">
                <div style="flex:1"><div style="font-size:var(--font-size-sm);font-weight:600">${esc(item.name)}</div><div style="font-size:var(--font-size-xs);color:var(--color-text-muted)">€${item.rent}/month · ${item.walk} min walk</div></div>
                <span class="badge badge-gray">Saved</span>
              </div>
            `).join('')}
          </div>
          <a href="compare.html" class="btn btn-secondary btn-full mt-4 btn-sm">Compare (${favList.length}) →</a>
        </div>`;
      }
    }

    // Notifications card in dashboard
    const notifCard = document.getElementById('dashboard-notifications-card') || [...document.querySelectorAll('.card')].find(el => el.querySelector('h2') && el.querySelector('h2').textContent.trim() === 'Notifications');
    if (notifCard) {
      notifCard.id = 'dashboard-notifications-card';
      if (!notifs.length) {
        notifCard.innerHTML = `<div class="card-body text-center py-8">
          <div style="font-size:2.5rem;margin-bottom:8px">🔔</div>
          <h2 class="text-lg font-bold mb-2">No notifications yet</h2>
          <p class="text-sm text-muted">You will receive updates on your applications, messages, and document verifications here.</p>
        </div>`;
      } else {
        notifCard.innerHTML = `<div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 style="font-size:var(--font-size-lg);font-weight:700">Notifications</h2>
            ${unreadNotifs > 0 ? `<span class="notif-badge">${unreadNotifs}</span>` : ''}
          </div>
          <div style="display:flex;flex-direction:column">
            ${notifs.map(n => `
              <div class="notif-item ${n.unread ? 'unread' : ''}">
                <div class="notif-item-icon">${n.icon || '🔔'}</div>
                <div class="notif-item-body">
                  <div class="notif-item-text"><strong>${esc(n.title)}</strong>: ${esc(n.body)}</div>
                  <div class="notif-item-time">${esc(n.time)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>`;
      }
    }

    // Arrival progress card in dashboard
    const arrivalBar = document.getElementById('dash-arrival-bar');
    const arrivalText = document.getElementById('dash-arrival-text');
    const arrivalList = document.getElementById('dash-arrival-list');
    if (arrivalBar && arrivalText) {
      const pct = Math.round((arrivalTasks.length / 12) * 100);
      arrivalBar.style.width = `${pct}%`;
      arrivalText.textContent = `${arrivalTasks.length} of 12 tasks complete`;
      if (arrivalList) {
        const previewTasks = [
          'Accommodation confirmed',
          'Documents uploaded to Bookare',
          'Connected with Buddy (Rahul Sharma)',
          'Book flight to Nantes',
          'Get a SIM card (Free Mobile recommended)'
        ];
        arrivalList.innerHTML = previewTasks.map((t, idx) => {
          const isDone = arrivalTasks.includes(idx);
          return `<div class="checklist-item ${isDone ? 'done' : ''}" onclick="Bookare.toggleArrivalTask(${idx})">
            <div class="checklist-icon">${isDone ? '✓' : ''}</div>
            <span class="checklist-text">${esc(t)}</span>
          </div>`;
        }).join('');
      }
    }

    // Buddy card in dashboard
    const buddyCard = document.getElementById('dashboard-buddy-card');
    if (buddyCard) {
      const convs = Object.values(state.messages[key()] || {});
      const buddyConv = convs.find(c => c.type === 'buddy');
      if (!buddyConv) {
        buddyCard.innerHTML = `<div class="card-body text-center py-8">
          <div style="font-size:2.5rem;margin-bottom:8px">🤝</div>
          <h2 class="text-lg font-bold mb-2">No buddy connected yet</h2>
          <p class="text-sm text-muted mb-4">Connect with a senior student at your university for free tips on housing, CAF, and settling in.</p>
          <a href="buddies.html" class="btn btn-primary btn-sm">Find a student buddy</a>
        </div>`;
      } else {
        buddyCard.innerHTML = `<div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 style="font-size:var(--font-size-lg);font-weight:700">My buddy</h2>
            <a href="buddies.html" class="btn btn-ghost btn-sm">Change buddy →</a>
          </div>
          <div class="flex items-center gap-4">
            <div class="buddy-avatar" style="background:${buddyConv.avatarBg || 'linear-gradient(135deg,#3B82F6,#1D4ED8)'}">${esc(buddyConv.avatar || 'BK')}</div>
            <div style="flex:1">
              <div class="buddy-name">${esc(buddyConv.name)}</div>
              <div class="buddy-uni">🎓 ${esc(buddyConv.role || 'Audencia Senior Buddy')}</div>
              <div class="buddy-languages">🌐 Verified Student Buddy · France</div>
            </div>
            <div class="flex gap-2">
              <a href="messages.html" class="btn btn-primary btn-sm">Message</a>
              <button class="btn btn-secondary btn-sm" onclick="openModal('book-call-modal')">Book call</button>
            </div>
          </div>
        </div>`;
      }
    }
  }

  function syncShortlist(favs) {
    const grid = document.getElementById('shortlist-grid');
    const empty = document.getElementById('empty-state');
    const floatingBar = document.getElementById('floating-bar');
    if (!grid && !empty) return;

    const favList = properties.filter(item => favs.includes(item.id));

    // Update pill counts
    const countAll = document.getElementById('count-all');
    if (countAll) countAll.textContent = favList.length;
    const countAudencia = document.getElementById('count-audencia');
    if (countAudencia) countAudencia.textContent = favList.filter(p => (p.university || '').toLowerCase().includes('audencia') || (p.description || '').toLowerCase().includes('audencia')).length;
    const countUnder500 = document.getElementById('count-under500');
    if (countUnder500) countUnder500.textContent = favList.filter(p => p.rent <= 500).length;
    const countStudio = document.getElementById('count-studio');
    if (countStudio) countStudio.textContent = favList.filter(p => p.type === 'studio').length;
    const countShared = document.getElementById('count-shared');
    if (countShared) countShared.textContent = favList.filter(p => p.type === 'shared-apartment').length;

    // Filter pill labels that don't have span IDs yet
    document.querySelectorAll('.pill-filter-bar .pill-filter').forEach(btn => {
      const text = btn.textContent;
      if (text.includes('Near Audencia')) btn.innerHTML = `Near Audencia (<span id="count-audencia">${favList.filter(p => (p.university || '').toLowerCase().includes('audencia')).length}</span>)`;
      else if (text.includes('Under €500')) btn.innerHTML = `Under €500 (<span id="count-under500">${favList.filter(p => p.rent <= 500).length}</span>)`;
      else if (text.includes('Studios')) btn.innerHTML = `Studios (<span id="count-studio">${favList.filter(p => p.type === 'studio').length}</span>)`;
      else if (text.includes('Shared flats')) btn.innerHTML = `Shared flats (<span id="count-shared">${favList.filter(p => p.type === 'shared-apartment').length}</span>)`;
    });

    if (!favList.length) {
      if (grid) grid.style.display = 'none';
      if (empty) {
        empty.style.display = 'block';
        empty.innerHTML = `<div style="font-size:3.5rem;margin-bottom:var(--space-4);">♡</div>
          <h2 class="text-2xl font-bold mb-2">No saved accommodations yet</h2>
          <p class="text-sm text-muted max-w-md mx-auto mb-6">Explore verified student accommodations near your university in France and click the heart icon to save your favourites here.</p>
          <a href="search.html" class="btn btn-primary btn-lg">Browse student homes</a>`;
      }
      if (floatingBar) floatingBar.classList.remove('visible');
      const compareBtn = document.getElementById('btn-compare-all');
      if (compareBtn) {
        compareBtn.onclick = e => { e.preventDefault(); toast('No saved accommodations to compare yet', 'default'); };
      }
      return;
    }

    if (empty) empty.style.display = 'none';
    if (grid) {
      grid.style.display = 'grid';
      grid.innerHTML = favList.map(item => {
        const cat = `${(item.university || '').toLowerCase().includes('audencia') ? 'audencia' : ''} ${item.rent <= 500 ? 'under500' : ''} ${item.type === 'studio' ? 'studio' : item.type === 'shared-apartment' ? 'shared' : ''}`;
        return `<div class="shortlist-card" data-prop-id="${item.id}" data-cat="${cat}">
          <div class="shortlist-card-media">
            <img src="${item.image}" alt="${esc(item.name)}" loading="lazy">
            <div class="shortlist-badge-top">
              <span class="badge badge-blue">${item.verified ? '✓ Verified' : 'New'}</span>
            </div>
            <div class="shortlist-actions-top">
              <label class="compare-checkbox-pill" title="Select to compare">
                <input type="checkbox" class="compare-check" data-id="${item.id}" onchange="Bookare.updateCompareBar()" /> Compare
              </label>
              <button class="btn-icon-circle" onclick="Bookare.toggleFavorite('${item.id}')" title="Remove from shortlist">✕</button>
            </div>
          </div>
          <div class="shortlist-card-body">
            <div class="price-row">
              <div class="price-main">€${item.rent} <span>/ month</span></div>
              <div class="price-total-est">Deposit: €${item.deposit}</div>
            </div>
            <h3 class="shortlist-title">${esc(item.name)}</h3>
            <div class="shortlist-loc">📍 ${esc(item.area)}, ${item.city}</div>
            <div class="commute-strip">
              <div class="commute-item">🚶 <strong>${item.walk} min</strong> walk</div>
              <div class="commute-item">🚲 <strong>${item.bike} min</strong> bike</div>
              <div class="commute-item">🚌 <strong>${item.transit} min</strong> transit</div>
            </div>
            <div class="flex gap-2 mb-4 text-xs text-muted">
              <span>✓ ${item.surface} m²</span> • <span>${item.amenities.slice(0, 3).join(' • ')}</span>
            </div>
            <div class="shortlist-card-footer">
              <a href="property.html?id=${item.id}" class="btn btn-secondary btn-sm flex-1">View details</a>
              <a href="application.html?id=${item.id}" class="btn btn-primary btn-sm flex-1">Apply now</a>
            </div>
          </div>
        </div>`;
      }).join('');
    }

    const compareBtn = document.getElementById('btn-compare-all');
    if (compareBtn) {
      compareBtn.onclick = null;
      compareBtn.href = `compare.html?ids=${favList.map(p => p.id).join(',')}`;
    }
  }

  window.Bookare.updateCompareBar = function () {
    const checks = document.querySelectorAll('.compare-check:checked');
    const bar = document.getElementById('floating-bar');
    const counter = document.getElementById('compare-counter');
    const link = document.getElementById('floating-compare-link');
    if (!bar) return;
    if (checks.length > 0) {
      if (counter) counter.textContent = `${checks.length} selected`;
      bar.classList.add('visible');
      bar.style.display = 'flex';
      const selectedIds = [...checks].map(c => c.dataset.id).join(',');
      if (link) link.href = `compare.html?ids=${selectedIds}`;
    } else {
      bar.classList.remove('visible');
      bar.style.display = 'none';
    }
  };

  window.clearCompareSelection = function () {
    document.querySelectorAll('.compare-check').forEach(c => c.checked = false);
    if (window.Bookare && window.Bookare.updateCompareBar) window.Bookare.updateCompareBar();
  };

  window.filterShortlist = function (cat) {
    const cards = document.querySelectorAll('.shortlist-card');
    cards.forEach(card => {
      if (cat === 'all' || (card.dataset.cat && card.dataset.cat.includes(cat))) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    document.querySelectorAll('.pill-filter-bar .pill-filter').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${cat}'`));
    });
  };

  function syncCompare(favs) {
    if (!location.pathname.endsWith('compare.html')) return;
    const table = document.querySelector('.compare-table');
    if (!table) return;
    const urlParams = new URLSearchParams(location.search);
    const paramIds = urlParams.get('ids') ? urlParams.get('ids').split(',').map(s => s.trim()) : null;
    const idsToCompare = paramIds && paramIds.length ? paramIds : favs;
    const compareProps = properties.filter(p => idsToCompare.includes(p.id));

    const wrap = table.closest('div[style*="overflow-x:auto"]') || table.parentElement;
    let emptyEl = document.getElementById('compare-empty-state');
    if (!compareProps.length) {
      wrap.style.display = 'none';
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.id = 'compare-empty-state';
        wrap.parentElement.appendChild(emptyEl);
      }
      emptyEl.className = 'card p-12 text-center';
      emptyEl.style.maxWidth = '600px';
      emptyEl.style.margin = '2rem auto';
      emptyEl.innerHTML = `<div style="font-size:3rem;margin-bottom:12px">⚖️</div>
        <h2 class="text-2xl font-bold mb-2">No saved accommodations yet</h2>
        <p class="text-sm text-muted mb-6">You don't have any saved accommodations to compare. Add homes to your shortlist to compare them side by side.</p>
        <a href="search.html" class="btn btn-primary">Find a Home</a>`;
      emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    wrap.style.display = 'block';

    // Build dynamic table
    table.innerHTML = `
      <thead>
        <tr>
          <th class="col-label" style="width:200px;border-right:1px solid var(--color-border)">Property</th>
          ${compareProps.map(p => `
            <th>
              <div style="text-align:center;padding:var(--space-2) 0">
                <img src="${p.image}" alt="${esc(p.name)}" style="width:100%;height:80px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:var(--space-3)" loading="lazy">
                <div style="font-weight:700;font-size:var(--font-size-sm)">${esc(p.name)}</div>
                <div style="font-size:var(--font-size-xs);color:var(--color-text-muted)">${esc(p.area)}, ${p.city}</div>
                <div class="badge badge-green mt-2">${p.verified ? '✓ Verified' : 'New'}</div>
              </div>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr style="background:var(--slate-50)"><td class="col-label" colspan="${compareProps.length + 1}" style="font-size:var(--font-size-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted);border-right:1px solid var(--color-border)">💰 Pricing</td></tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Monthly rent</td>${compareProps.map(p => `<td style="text-align:center;font-size:var(--font-size-xl);font-weight:800;color:var(--color-primary)">€${p.rent}</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Deposit</td>${compareProps.map(p => `<td style="text-align:center">€${p.deposit}</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Bookare fee</td>${compareProps.map(() => `<td style="text-align:center">€100</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border);font-weight:700">Move-in total</td>${compareProps.map(p => `<td style="text-align:center;font-weight:700;color:var(--color-text)">€${p.rent + p.deposit + 100}</td>`).join('')}</tr>
        <tr style="background:var(--slate-50)"><td class="col-label" colspan="${compareProps.length + 1}" style="font-size:var(--font-size-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted);border-right:1px solid var(--color-border)">🏫 Distance & Commute</td></tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">🚶 Walk</td>${compareProps.map(p => `<td style="text-align:center">${p.walk} min</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">🚲 Cycle</td>${compareProps.map(p => `<td style="text-align:center">${p.bike} min</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">🚌 Public transit</td>${compareProps.map(p => `<td style="text-align:center">${p.transit} min</td>`).join('')}</tr>
        <tr style="background:var(--slate-50)"><td class="col-label" colspan="${compareProps.length + 1}" style="font-size:var(--font-size-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-muted);border-right:1px solid var(--color-border)">🏠 Details</td></tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Type</td>${compareProps.map(p => `<td style="text-align:center">${esc(p.type)}</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Surface</td>${compareProps.map(p => `<td style="text-align:center">${p.surface} m²</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Furnished</td>${compareProps.map(p => `<td style="text-align:center">${p.amenities.includes('furnished') ? '✓' : '✕'}</td>`).join('')}</tr>
        <tr><td class="col-label" style="border-right:1px solid var(--color-border)">Wi-Fi included</td>${compareProps.map(p => `<td style="text-align:center">${p.amenities.includes('wi-fi') ? '✓' : '✕'}</td>`).join('')}</tr>
        <tr style="background:var(--slate-50)"><td class="col-label" style="border-right:1px solid var(--color-border)"></td>${compareProps.map(p => `<td style="text-align:center;padding:var(--space-5)"><a href="property.html?id=${p.id}" class="btn btn-primary btn-sm btn-full mb-2">View & apply</a><button class="btn btn-ghost btn-sm" onclick="Bookare.toggleFavorite('${p.id}')">Remove</button></td>`).join('')}</tr>
      </tbody>
    `;
  }

  function syncMessages() {
    if (!location.pathname.endsWith('messages.html')) return;
    const urlParams = new URLSearchParams(location.search);
    const paramChat = urlParams.get('chat');
    if (paramChat) {
      if (!state.messages[key()] || !state.messages[key()][paramChat]) {
        Bookare.initiateConversation(paramChat, paramChat.startsWith('b') ? 'buddy' : paramChat === 'pierre' ? 'landlord' : 'support');
      }
      window.currentChatId = paramChat;
    }

    const convList = document.getElementById('conv-list');
    const stream = document.getElementById('messages-stream');
    const convs = Object.values(state.messages[key()] || {});

    // Update filter counts
    const countAll = document.getElementById('all-conv-count') || document.querySelector('[onclick*="filterConvType(\'all\')"]');
    if (countAll) {
      if (countAll.id === 'all-conv-count') countAll.textContent = convs.length;
      else countAll.textContent = `All (${convs.length})`;
    }

    if (!convs.length) {
      if (convList) {
        convList.innerHTML = `<div class="p-8 text-center text-sm text-muted">
          <div style="font-size:2.5rem;margin-bottom:8px">💬</div>
          <div class="font-bold mb-1">No messages yet</div>
          Your conversations with buddies and landlords will appear here.
        </div>`;
      }
      if (stream) {
        stream.innerHTML = `<div class="text-center text-sm text-muted p-12" style="margin:auto">
          <div style="font-size:3rem;margin-bottom:12px">✉️</div>
          <h3 class="text-lg font-bold mb-2">No messages yet</h3>
          <p class="text-xs text-muted mb-4">Connect with a student buddy or contact a landlord to start a conversation.</p>
          <a href="buddies.html" class="btn btn-primary btn-sm">Find a student buddy</a>
        </div>`;
      }
      const headerName = document.getElementById('chat-header-name');
      if (headerName) headerName.textContent = 'Messages';
      const headerStatus = document.getElementById('chat-header-status');
      if (headerStatus) headerStatus.textContent = 'Select or start a conversation';
      const input = document.getElementById('message-text');
      if (input) input.disabled = true;
      return;
    }

    const input = document.getElementById('message-text');
    if (input) input.disabled = false;

    // Render conversation list
    if (convList) {
      const activeId = window.currentChatId || convs[0].id;
      convList.innerHTML = convs.map(c => {
        const lastMsg = c.messages && c.messages.length ? c.messages[c.messages.length - 1] : { text: 'Conversation started', time: 'Just now' };
        return `<div class="conversation-item ${c.id === activeId ? 'active' : ''}" onclick="selectUserChat('${c.id}')" data-type="${c.type || 'buddy'}" id="item-${c.id}">
          <div class="conversation-avatar" style="background:${c.avatarBg || 'linear-gradient(135deg,var(--blue-400),var(--blue-600))'}">${c.avatar || 'BK'}</div>
          <div class="conversation-info">
            <div class="flex justify-between items-baseline mb-0.5">
              <span class="conversation-name">${esc(c.name)}</span>
              <span class="conversation-time">${esc(lastMsg.time)}</span>
            </div>
            <div class="text-[11px] text-blue-600 font-semibold mb-0.5">${esc(c.role || '')}</div>
            <div class="conversation-preview">${esc(lastMsg.text)}</div>
          </div>
        </div>`;
      }).join('');
      selectUserChat(activeId);
    }
  }

  window.selectUserChat = function (id) {
    window.currentChatId = id;
    const convs = state.messages[key()] || {};
    const data = convs[id];
    if (!data) return;

    // Mark messages read
    if (data.messages) data.messages.forEach(m => m.unread = false);
    save();

    document.querySelectorAll('.conversation-item').forEach(el => el.classList.remove('active'));
    const itemEl = document.getElementById('item-' + id);
    if (itemEl) itemEl.classList.add('active');

    const headerName = document.getElementById('chat-header-name');
    if (headerName) headerName.textContent = data.name;
    const headerStatus = document.getElementById('chat-header-status');
    if (headerStatus) headerStatus.textContent = data.status || '';
    const headerAvatar = document.getElementById('chat-header-avatar');
    if (headerAvatar) {
      headerAvatar.textContent = data.avatar || 'BK';
      if (data.avatarBg) headerAvatar.style.background = data.avatarBg;
    }

    const drawerName = document.getElementById('drawer-name');
    if (drawerName) drawerName.textContent = data.name;
    const drawerRole = document.getElementById('drawer-role');
    if (drawerRole) drawerRole.textContent = data.role || '';
    const drawerAvatar = document.getElementById('drawer-avatar');
    if (drawerAvatar) {
      drawerAvatar.textContent = data.avatar || 'BK';
      if (data.avatarBg) drawerAvatar.style.background = data.avatarBg;
    }

    const input = document.getElementById('message-text');
    if (input) {
      input.disabled = false;
      input.placeholder = `Type a message to ${data.name}...`;
    }

    const stream = document.getElementById('messages-stream');
    if (stream) {
      stream.innerHTML = (data.messages && data.messages.length) ? data.messages.map(m => `
        <div class="chat-bubble ${m.sender === 'me' ? 'outgoing' : 'incoming'}">
          ${esc(m.text)}
          <div class="bubble-time">${esc(m.time)} ${m.sender === 'me' ? '✓✓' : ''}</div>
        </div>
      `).join('') : `<div class="text-center text-sm text-muted p-8">No messages yet. Send a greeting to start chatting!</div>`;
      stream.scrollTop = stream.scrollHeight;
    }
  };

  function syncLandlord() {
    if (!location.pathname.endsWith('landlord.html')) return;
    const allApps = [];
    Object.entries(state.applications).forEach(([userKey, appData]) => {
      if (appData) allApps.push({ userKey, ...appData });
    });

    const navCount = document.getElementById('landlord-nav-app-count');
    if (navCount) navCount.textContent = allApps.length;
    const tabCount = document.getElementById('landlord-tab-app-count');
    if (tabCount) tabCount.textContent = allApps.length;
    const kpiCount = document.getElementById('landlord-kpi-app-count');
    if (kpiCount) kpiCount.textContent = allApps.length;
    const summary = document.getElementById('landlord-header-summary');
    if (summary) summary.textContent = `You have 3 active properties in Nantes and ${allApps.length} pending student applications to review.`;

    const tabApplicants = document.querySelector('[data-tab-content="tab-applicants"]');
    if (tabApplicants) {
      if (!allApps.length) {
        tabApplicants.innerHTML = `<div class="card p-8 text-center">
          <div style="font-size:2.5rem;margin-bottom:8px">📥</div>
          <h2 class="text-lg font-bold mb-2">No applications yet</h2>
          <p class="text-sm text-muted">No pending student applications to review at this time.</p>
        </div>`;
      } else {
        tabApplicants.innerHTML = allApps.map(a => {
          const prop = findProperty(a.propertyId) || properties[0];
          return `<div class="landlord-applicant-card">
            <div class="flex items-center gap-4">
              <div class="conversation-avatar" style="width:52px;height:52px;font-size:1.2rem;">KM</div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-bold text-base text-slate-900">Student Applicant</h4>
                  <span class="badge badge-success">Dossier Score: 100%</span>
                  <span class="badge badge-blue">✓ Visale Guaranteed</span>
                </div>
                <p class="text-xs text-slate-600 mb-1">Applied for: <strong>${esc(prop.name)} (€${prop.rent}/mo)</strong></p>
                <div class="text-xs text-muted flex gap-3 flex-wrap">
                  <span>📅 Submitted: ${new Date(a.submittedAt).toLocaleDateString()}</span>
                  <span>📍 ${prop.city}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <a href="messages.html" class="btn btn-ghost btn-sm">Chat</a>
              <span class="badge badge-yellow">${a.status || 'Under review'}</span>
            </div>
          </div>`;
        }).join('');
      }
    }
  }

  function syncDocuments(docs) {
    if (!location.pathname.endsWith('documents.html')) return;
    const docList = (docs || []).map(d => typeof d === 'string' ? { id: d, name: d, category: 'Other', date: 'Recently', size: '1.2 MB' } : d);
    const count = docList.length;
    const pct = Math.min(100, Math.round((count / 7) * 100));

    const healthText = document.getElementById('dossier-health-text');
    if (healthText) healthText.textContent = `${pct}% Complete`;
    const progressBar = document.getElementById('dossier-progress-bar');
    if (progressBar) progressBar.style.width = `${pct}%`;
    const badge = document.getElementById('dossier-badge');
    if (badge) {
      badge.textContent = count >= 7 ? 'Complete' : count > 0 ? 'In Progress' : 'Incomplete';
      badge.className = `badge ${count >= 7 ? 'badge-success' : count > 0 ? 'badge-blue' : 'badge-yellow'}`;
    }
    const verifiedCount = document.getElementById('dossier-verified-count');
    if (verifiedCount) verifiedCount.textContent = `${count} uploaded`;
    const requiredCount = document.getElementById('dossier-required-count');
    if (requiredCount) requiredCount.textContent = `${Math.max(0, 7 - count)} required`;

    const isCat1 = d => /passport|identity|visa|vls|id/i.test(`${d.name} ${d.category}`);
    const isCat2 = d => /admission|enrollment|student card|certificate|audencia|university/i.test(`${d.name} ${d.category}`);
    const isCat3 = d => /bank|statement|funds|visale|guarantor|guarantee|solvency|rib|iban/i.test(`${d.name} ${d.category}`);
    const isCat4 = d => !isCat1(d) && !isCat2(d) && !isCat3(d) || /insurance|assurance|habitation|lease|bail/i.test(`${d.name} ${d.category}`);

    const categories = [
      { id: 'identity', list: docList.filter(isCat1) },
      { id: 'enrollment', list: docList.filter(isCat2) },
      { id: 'finance', list: docList.filter(isCat3) },
      { id: 'housing', list: docList.filter(isCat4) }
    ];

    categories.forEach(cat => {
      const badgeEl = document.getElementById(`docs-cat-${cat.id}-badge`);
      if (badgeEl) {
        badgeEl.textContent = `${cat.list.length} Uploaded`;
        badgeEl.className = `badge ${cat.list.length > 0 ? 'badge-blue' : 'badge-gray'}`;
      }
      const bodyEl = document.getElementById(`docs-cat-${cat.id}-body`);
      if (bodyEl) {
        if (!cat.list.length) {
          bodyEl.innerHTML = `<div class="p-6 text-center text-xs text-muted">No documents uploaded yet in this category</div>`;
        } else {
          bodyEl.innerHTML = cat.list.map(doc => `
            <div class="doc-row">
              <div class="flex items-center gap-3">
                <div class="doc-icon-box">📄</div>
                <div>
                  <div class="font-semibold text-sm text-slate-900">${esc(doc.name)}</div>
                  <div class="text-xs text-muted">${esc(doc.size || '1.2 MB')} · Uploaded ${esc(doc.date || 'Recently')}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="badge badge-success">✓ Uploaded</span>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Opening ${esc(doc.name)} preview...','default')">View</button>
                <button class="btn btn-ghost btn-sm text-red-600" onclick="Bookare.removeDocument('${doc.id || doc.name}')">Remove</button>
              </div>
            </div>
          `).join('');
        }
      }
    });
  }

  function initSearch() {
    const list = document.getElementById('properties-list');
    if (!list) return;
    let showAll = false;
    const loadMore = document.getElementById('load-more-homes');
    const filter = () => {
      const uni = (document.getElementById('search-uni').value || '').toLowerCase();
      const campus = document.getElementById('search-campus').value;
      const date = document.getElementById('search-date').value;
      const range = document.getElementById('search-budget').value;
      const type = document.getElementById('search-type').value;
      const types = [...document.querySelectorAll('[data-filter-type]:checked')].map(input => input.dataset.filterType);
      const amenities = [...document.querySelectorAll('[data-filter-amenity]:checked')].map(input => input.dataset.filterAmenity);
      const commute = [...document.querySelectorAll('[data-commute-mode].active')];
      const max = range === '0-400' ? 400 : range === '400-650' ? 650 : range === '650-900' ? 900 : Number(document.getElementById('budget-range').value);
      const min = range === '400-650' ? 400 : range === '650-900' ? 650 : 0;
      const deposit = Number(document.getElementById('deposit-range').value);
      const matchesType = type ? item => item.type === type : item => !types.length || types.includes(item.type);
      const found = properties.filter(item => (!uni || `${item.city} ${item.area} ${item.university}`.toLowerCase().includes(uni)) && (!campus || item.campus === campus) && (!date || item.available.startsWith(date)) && matchesType(item) && item.rent >= min && item.rent <= max && item.deposit <= deposit && amenities.every(a => item.amenities.includes(a)) && commute.every(c => item[c.dataset.commuteMode] <= Number(c.dataset.commuteMax)));
      const visible = showAll ? found : found.slice(0, 6);
      list.innerHTML = visible.map(propertyCard).join('');
      bindFavorites(list);
      document.getElementById('search-empty-state').style.display = 'none';
      document.getElementById('search-results').style.display = '';
      document.getElementById('results-count-number').textContent = `${found.length} homes`;
      if (loadMore) {
        loadMore.style.display = found.length > visible.length ? 'inline-flex' : 'none';
        loadMore.textContent = `Load more homes (${found.length - visible.length} remaining)`;
      }
      let empty = document.getElementById('no-homes-state');
      if (empty) empty.remove();
      if (!found.length) {
        empty = document.createElement('div');
        empty.id = 'no-homes-state';
        empty.className = 'card p-8 text-center';
        empty.innerHTML = '<h2 class="text-xl font-bold mb-2">No homes found</h2><p class="text-sm text-muted mb-4">Try widening your filters.</p><button class="btn btn-primary" onclick="clearFilters()">Clear filters</button>';
        list.parentElement.appendChild(empty);
      }
    };
    if (loadMore) loadMore.addEventListener('click', () => { showAll = true; filter(); toast('All matching homes loaded', 'success'); });
    window.applySearch = filter;
    window.applyFilters = filter;
    window.clearFilters = () => {
      showAll = false;
      ['search-uni', 'search-campus', 'search-date', 'search-budget', 'search-type'].forEach(id => document.getElementById(id).selectedIndex = 0);
      document.querySelectorAll('[data-filter-type],[data-filter-amenity]').forEach(input => input.checked = false);
      document.querySelectorAll('[data-commute-mode].active').forEach(item => item.classList.remove('active'));
      document.getElementById('budget-range').value = 1500;
      document.getElementById('deposit-range').value = 3000;
      filter();
    };
    ['search-uni', 'search-campus', 'search-date', 'search-budget', 'search-type'].forEach(id => document.getElementById(id).addEventListener('change', () => { showAll = false; filter(); }));
    document.querySelectorAll('[data-filter-type],[data-filter-amenity]').forEach(input => input.addEventListener('change', () => { showAll = false; filter(); }));
    filter();
  }

  function initBuddies() {
    const grid = document.querySelector('.grid.grid-3'), uni = document.getElementById('buddy-uni');
    if (!grid || !uni) return;
    const selects = [...document.querySelectorAll('.form-group select')];
    const city = selects[1], language = selects[2], topic = selects[3], availability = selects[4];
    const only = document.querySelector('input[type="checkbox"]');
    const render = () => {
      const found = buddies.filter(item => (!uni.value || uni.value === 'All universities' || item.university === uni.value) && (!city.value || city.value === 'All cities' || item.city === city.value) && (!language.value || language.value === 'Any language' || item.languages.includes(language.value)) && (!topic.value || topic.value === 'Any topic' || item.topics.includes(topic.value)) && (!availability.value || availability.value === 'Any time' || item.availability.includes(availability.value)) && (!only.checked || item.university === uni.value));
      grid.innerHTML = found.length ? found.map(item => `
        <div class="buddy-card">
          <div class="flex items-center gap-3 mb-4">
            <div class="buddy-avatar">${item.avatar}</div>
            <div>
              <div class="buddy-name">${esc(item.name)}</div>
              <div class="buddy-uni">🎓 ${esc(item.university)} · ${esc(item.degree)}</div>
              <div class="buddy-rating">★ ${item.rating} (${item.reviews} reviews)</div>
            </div>
          </div>
          <div class="buddy-languages mb-2">📍 ${esc(item.city)}</div>
          <div class="buddy-languages mb-3">🌐 ${item.languages.join(' · ')}</div>
          <div class="buddy-tags">${item.topics.map(topicName => `<span class="buddy-tag">${topicName}</span>`).join('')}</div>
          <div class="mt-4 pt-4 border-t">
            <div class="text-xs text-muted mb-3">"${esc(item.bio)}"</div>
            <a href="messages.html?buddy=${item.id}" class="btn btn-primary btn-sm btn-full">💬 Message</a>
          </div>
        </div>
      `).join('') : '<div class="card p-8 text-center" style="grid-column:1/-1"><h2 class="text-xl font-bold mb-2">No buddies found</h2><p class="text-sm text-muted">Try another filter.</p></div>';
    };
    [uni, city, language, topic, availability, only].forEach(input => input && input.addEventListener('change', render));
    window.applyBuddyFilters = render;
    render();
  }

  function initCommunity() {
    const layout = document.querySelector('.community-layout');
    if (!layout) return;
    const feed = layout.querySelector(':scope > div'), search = feed.querySelector('input'), category = feed.querySelector('select');
    feed.querySelectorAll('.question-card').forEach(card => card.parentElement.style.display = 'none');
    const title = document.querySelector('.page-title'), subtitle = document.querySelector('.page-subtitle'), picker = document.createElement('select');
    picker.className = 'form-select mt-3';
    picker.innerHTML = '<option value="">Select a university community</option>' + communities.map(item => `<option value="${item.id}">${item.university} - ${item.city}</option>`).join('');
    title.parentElement.appendChild(picker);

    // Compute real topic question counts for Popular topics
    const topicContainer = document.querySelector('.card .card-body div[style*="flex-wrap:wrap"]');
    if (topicContainer) {
      const topicCounts = {};
      questions.forEach(q => {
        topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
      });
      topicContainer.innerHTML = Object.entries(topicCounts).map(([t, cnt]) => `
        <span class="badge badge-gray" style="cursor:pointer" onclick="filterByTopic('${t}')">${t} (${cnt})</span>
      `).join('');
      window.filterByTopic = t => {
        if (category) {
          category.value = t === 'CAF' ? 'Admin / CAF' : t === 'Shopping' ? 'Food & Shopping' : t;
          category.dispatchEvent(new Event('change'));
        }
      };
    }

    const render = () => {
      const chosen = communities.find(item => item.id === state.selectedCommunity);
      title.textContent = chosen ? `${chosen.university} Community` : 'Choose a university community';
      subtitle.textContent = chosen ? `${chosen.students} students · ${chosen.city}, France` : 'Select a university to view its student community';
      picker.value = state.selectedCommunity || '';
      const topic = category.value === 'Admin / CAF' ? 'CAF' : category.value === 'Food & Shopping' ? 'Shopping' : category.value;
      const term = search.value.toLowerCase();
      const found = questions.filter(item => (!topic || topic === 'All categories' || item.topic === topic) && (!chosen || item.city === 'All cities' || item.city === chosen.city) && `${item.title} ${item.body}`.toLowerCase().includes(term));
      let holder = feed.querySelector('[data-question-feed]');
      if (!holder) {
        holder = document.createElement('div');
        holder.dataset.questionFeed = 'true';
        feed.appendChild(holder);
      }
      holder.innerHTML = found.length ? found.map(item => `
        <div class="question-card">
          <div class="flex gap-4">
            <div class="question-votes"><div class="vote-count">${item.votes}</div><div class="vote-label">votes</div></div>
            <div style="flex:1">
              <div class="question-title"><a href="#">${esc(item.title)}</a></div>
              <p class="text-sm text-muted mt-2 mb-3">${esc(item.body)}</p>
              <div class="question-meta">
                <span class="badge badge-blue">${item.topic}</span>
                <span>${item.city}</span>
                <span>💬 1 answer</span>
                <span class="text-success font-semi">✓ Answered</span>
              </div>
            </div>
          </div>
          <div class="mt-4 p-4" style="background:var(--color-success-light);border-left:3px solid var(--color-success)">
            <div class="text-xs font-bold text-success mb-2">✓ Best answer</div>
            <p class="text-sm">${esc(item.answer)}</p>
          </div>
        </div>
      `).join('') : '<div class="card p-8 text-center"><h2 class="text-xl font-bold mb-2">No questions found</h2><p class="text-sm text-muted">Try another topic or search phrase.</p></div>';
    };
    picker.addEventListener('change', () => { state.selectedCommunity = picker.value || null; save(); render(); });
    search.addEventListener('input', render);
    category.addEventListener('change', render);
    render();
  }

  function initCommunityPills() {
    const layout = document.querySelector('.community-layout');
    if (!layout) return;
    const category = layout.querySelector('select');
    if (!category) return;
    const topicMap = { 'All topics': 'All categories', 'Accommodation': 'Accommodation', 'Transport': 'Transport', 'Banking': 'Banking', 'CAF': 'Admin / CAF', 'University': 'University', 'Shopping': 'Food & Shopping', 'Food': 'Food & Shopping' };
    layout.querySelectorAll('.pill-filter-bar .pill-filter').forEach(pill => pill.addEventListener('click', () => {
      const label = pill.textContent.replace(/[^A-Za-z /]/g, '').trim();
      const topic = topicMap[label] || 'All categories';
      category.value = topic;
      layout.querySelectorAll('.pill-filter-bar .pill-filter').forEach(item => item.classList.remove('active'));
      pill.classList.add('active');
      category.dispatchEvent(new Event('change'));
    }));
  }

  function initApplication() {
    if (!location.pathname.endsWith('application.html')) return;
    const main = document.querySelector('main.container.py-8');
    if (!main) return;
    const urlParams = new URLSearchParams(location.search);
    const reqId = urlParams.get('id');
    const app = state.applications[key()];

    if (!app && !reqId) {
      main.innerHTML = `<div class="card p-12 text-center" style="max-width:600px;margin:2rem auto">
        <div style="font-size:3.5rem;margin-bottom:16px">📋</div>
        <h2 class="text-2xl font-bold mb-2">No applications yet</h2>
        <p class="text-sm text-muted mb-6">You have not submitted an accommodation application yet. Browse verified student homes and submit your rental dossier.</p>
        <a href="search.html" class="btn btn-primary">Find a Home</a>
      </div>`;
      return;
    }

    const selectedProp = findProperty(reqId) || findProperty(app?.propertyId) || properties[0];

    if (app) {
      main.innerHTML = `
        <div class="application-header">
          <div class="application-property-img">
            <img src="${selectedProp.image}" alt="${esc(selectedProp.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg)">
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span class="badge badge-blue mb-1">${esc(selectedProp.type)} · Private</span>
                <h2 class="text-xl font-bold text-slate-900">${esc(selectedProp.name)}</h2>
                <p class="text-xs text-muted">📍 ${esc(selectedProp.address)}, ${selectedProp.city}</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black text-slate-900">€${selectedProp.rent} <span class="text-xs text-muted font-normal">/ mo</span></div>
                <div class="text-xs text-blue-700 font-semibold">Deposit: €${selectedProp.deposit}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-8 mb-8 bg-white">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-base text-slate-900">Application Pipeline</h3>
            <span class="badge badge-yellow font-semibold">${app.status || 'Landlord reviewing'}</span>
          </div>
          <div class="stepper-horizontal">
            <div class="stepper-progress-fill" style="width:50%"></div>
            <div class="step-node completed"><div class="step-circle">✓</div><div class="step-node-title">Application Submitted</div><div class="step-node-desc">${new Date(app.submittedAt).toLocaleDateString()}</div></div>
            <div class="step-node completed"><div class="step-circle">✓</div><div class="step-node-title">Dossier Verified</div><div class="step-node-desc">Visale & ID clear</div></div>
            <div class="step-node active"><div class="step-circle">3</div><div class="step-node-title text-blue-600">Landlord Reviewing</div><div class="step-node-desc font-semibold text-blue-600">In progress</div></div>
            <div class="step-node"><div class="step-circle">4</div><div class="step-node-title">Lease Offer & Sign</div><div class="step-node-desc">Digital French Bail</div></div>
            <div class="step-node"><div class="step-circle">5</div><div class="step-node-title">Booking Confirmed</div><div class="step-node-desc">Move-in Escrow</div></div>
          </div>
          <div class="p-5 bg-blue-50 rounded-xl border border-blue-200 mt-6">
            <div class="flex items-start gap-3">
              <div style="font-size:1.5rem">⏱️</div>
              <div>
                <h4 class="font-bold text-sm text-blue-900 mb-1">Landlord is reviewing your file</h4>
                <p class="text-xs text-blue-800 leading-relaxed">Your verified student application and Visale guarantee certificate have been submitted for ${esc(selectedProp.name)}. The landlord typically replies within 24–48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      main.innerHTML = `
        <div class="card p-8 text-center" style="max-width:640px;margin:2rem auto">
          <img src="${selectedProp.image}" alt="${esc(selectedProp.name)}" style="width:100%;height:180px;object-fit:cover;border-radius:var(--radius-lg);margin-bottom:var(--space-4)" loading="lazy">
          <h1 class="text-2xl font-bold mb-2">Submit application for ${esc(selectedProp.name)}</h1>
          <p class="text-sm text-muted mb-4">📍 ${esc(selectedProp.address)}, ${selectedProp.city} · €${selectedProp.rent}/month</p>
          <div class="p-4 bg-slate-50 rounded-lg text-xs text-muted mb-6">Your rental dossier and verified student profile will be sent to the landlord. Bookare ensures transparent pricing and no surprise fees.</div>
          <button class="btn btn-primary btn-lg" id="submit-application">Confirm & Submit Application</button>
        </div>
      `;
      document.getElementById('submit-application').onclick = () => {
        Bookare.apply(selectedProp.id);
        toast('Application submitted successfully!', 'success');
        initApplication();
      };
    }
  }

  function initMessagesPage() {
    if (!location.pathname.endsWith('messages.html')) return;
    const urlParams = new URLSearchParams(location.search);
    const buddyId = urlParams.get('buddy');
    const chatId = urlParams.get('chat');

    if (buddyId) {
      const conv = Bookare.initiateConversation(buddyId, 'buddy');
      window.selectUserChat(conv.id);
    } else if (chatId) {
      const conv = Bookare.initiateConversation(chatId, chatId === 'pierre' ? 'landlord' : chatId === 'support' ? 'support' : 'buddy');
      window.selectUserChat(conv.id);
    } else {
      const convs = Object.values(state.messages[key()] || {});
      if (convs.length) {
        window.selectUserChat(convs[0].id);
      }
    }
  }

  function initOnboarding() {
    if (location.pathname.endsWith('onboarding.html')) {
      location.replace('dashboard.html');
      return;
    }
  }

  function initArrival() {
    if (!location.pathname.endsWith('arrival.html')) return;
    const items = document.querySelectorAll('.checklist-item');
    const saved = state.arrivalTasks[key()] || [];
    items.forEach((item, idx) => {
      const isDone = saved.includes(idx);
      item.classList.toggle('done', isDone);
      const icon = item.querySelector('.checklist-icon');
      if (icon) icon.textContent = isDone ? '✓' : '';
      item.onclick = () => {
        Bookare.toggleArrivalTask(idx);
        const nowDone = (state.arrivalTasks[key()] || []).includes(idx);
        item.classList.toggle('done', nowDone);
        if (icon) icon.textContent = nowDone ? '✓' : '';
        updateArrivalProgress();
      };
    });
    function updateArrivalDocs() {
      const docsEl = document.getElementById('arrival-docs-list');
      if (!docsEl) return;
      const docs = state.documents[key()] || [];
      if (!docs.length) {
        docsEl.innerHTML = '<div class="text-xs text-muted py-2">No documents uploaded yet</div>';
      } else {
        docsEl.innerHTML = docs.map(d => {
          const name = typeof d === 'string' ? d : d.name;
          return `<div style="display:flex;justify-content:space-between;font-size:var(--font-size-xs)">
            <span>${esc(name)}</span><span class="badge badge-green">Uploaded</span>
          </div>`;
        }).join('');
      }
    }
    function updateArrivalProgress() {
      const total = items.length || 12;
      const done = (state.arrivalTasks[key()] || []).length;
      const pct = Math.round((done / total) * 100);
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = pct + '%';
      const countEl = document.getElementById('arrival-done-count');
      if (countEl) countEl.textContent = done;
      const subtitle = document.querySelector('.page-subtitle');
      if (subtitle) subtitle.innerHTML = `Your personalised checklist for moving to Nantes. <span id="arrival-done-count">${done}</span> of ${total} tasks complete.`;
    }
    updateArrivalProgress();
    updateArrivalDocs();
  }

  function initDocuments() {
    if (!location.pathname.endsWith('documents.html')) return;
    syncDocuments(state.documents[key()] || []);
  }

  function initPropertyPage() {
    if (!location.pathname.endsWith('property.html')) return;
    // Set reviews count accurately to 2
    const reviewTabs = document.querySelectorAll('[data-tab="reviews"]');
    reviewTabs.forEach(tab => tab.textContent = 'Reviews (2)');
    const countSpan = document.querySelector('.tab-content[data-tab-content="reviews"] span[style*="color:var(--color-text-muted)"]');
    if (countSpan) countSpan.textContent = '(2 reviews)';
  }

  function initSignIn() {
    // Direct access to profile / dashboard without login front end
    document.querySelectorAll('a[href*="onboarding.html"]').forEach(link => {
      link.href = 'dashboard.html';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    nav();
    initSearch();
    initBuddies();
    initCommunity();
    initCommunityPills();
    initOnboarding();
    initApplication();
    initMessagesPage();
    initArrival();
    initDocuments();
    initPropertyPage();
    initSignIn();
    syncAll();

    const buddyGrid = document.querySelector('.grid.grid-3');
    const buddySummary = document.querySelector('.section .container > div:first-child strong');
    if (buddyGrid && buddySummary) {
      const updateBuddySummary = () => {
        buddySummary.textContent = `${buddyGrid.querySelectorAll('.buddy-card').length} buddies`;
      };
      document.querySelectorAll('#buddy-uni,.form-group select,input[type="checkbox"]').forEach(control => control.addEventListener('change', updateBuddySummary));
      updateBuddySummary();
    }
  });
})();
