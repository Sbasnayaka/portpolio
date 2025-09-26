// Data: PS module schedule
const lec_data = [
  { week: 1, date: '03/06/2025', title: 'Introduction to Professional Skills (Johari Window)', status: 'missed' },
  { week: 3, date: '17/06/2025', title: 'CV Writing', status: 'attended' },
  { week: 4, date: '24/06/2025', title: 'Portfolio Management', status: 'attended' },
  { week: 5, date: '01/07/2025', title: 'Food Festival Discussion / Surviving Skills', status: 'attended' },
  { week: 6, date: '08/07/2025', title: 'ARCSCU (Keynote Speeches Assignment)', status: 'missed' },
  { week: 8, date: '22/07/2025', title: 'Research Writing', status: 'attended' },
  { week: 9, date: '29/07/2025', title: 'Food Festival', status: 'attended' },
  { week: 10, date: '05/08/2025', title: 'Interview Skills', status: 'attended' },
  { week: 11, date: '12/08/2025', title: 'Email Writing', status: 'attended' },
  { week: 12, date: '19/08/2025', title: 'Nepal Miss (Emotional Intelligence)', status: 'attended' },
  { week: 13, date: '26/08/2025', title: 'Professional, Telephone and Dining Etiquette', status: 'attended' },
  { week: 14, date: '02/09/2025', title: 'Negotiation Skills', status: 'attended' }
];

const week_01_button = null; // placeholder for requested naming style example

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const nav_toggle = document.getElementById('nav_toggle');
  const nav_list = document.getElementById('nav_list');
  if (nav_toggle && nav_list){
    nav_toggle.addEventListener('click', () => {
      const open = nav_list.classList.toggle('open');
      nav_toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Update counts
  const lec_attended = lec_data.filter(l => l.status === 'attended').length;
  const lec_missed = lec_data.filter(l => l.status === 'missed').length;
  const lec_total = lec_data.length;

  const el_attended = document.getElementById('lec_attended');
  const el_missed = document.getElementById('lec_missed');
  const el_total = document.getElementById('lec_total');
  if (el_attended) el_attended.textContent = String(lec_attended);
  if (el_missed) el_missed.textContent = String(lec_missed);
  if (el_total) el_total.textContent = String(lec_total);

  // Tabs and cards
  const btn_tab_attended = document.getElementById('btn_tab_attended');
  const btn_tab_missed = document.getElementById('btn_tab_missed');
  const lec_1_section = document.getElementById('lec_1_section');

  const renderCards = (mode) => {
    if (!lec_1_section) return;
    lec_1_section.innerHTML = '';
    const list = lec_data.filter(l => mode === 'attended' ? l.status === 'attended' : l.status !== 'attended');
    list.forEach(lec => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card_media"></div>
        <div class="card_body">
          <h3 class="card_title">Week ${lec.week}: ${lec.title}</h3>
          <div class="card_meta"><span>${lec.date}</span><span>${lec.status.toUpperCase()}</span></div>
        </div>
      `;

      const actions = document.createElement('div');
      actions.className = 'card_actions';

      const target = `lecture${lec.week}.html`;
      if (lec.status === 'attended' || lec.status !== 'attended'){
        const viewBtn = document.createElement('a');
        viewBtn.className = 'btn_card';
        viewBtn.href = target;
        viewBtn.textContent = 'Open Page';
        actions.appendChild(viewBtn);
      }

      card.appendChild(actions);
      lec_1_section.appendChild(card);
    });
  }

  if (btn_tab_attended && btn_tab_missed){
    btn_tab_attended.addEventListener('click', () => {
      btn_tab_attended.classList.add('active');
      btn_tab_missed.classList.remove('active');
      renderCards('attended');
    });
    btn_tab_missed.addEventListener('click', () => {
      btn_tab_missed.classList.add('active');
      btn_tab_attended.classList.remove('active');
      renderCards('other');
    });
  }

  // Initial view
  renderCards('attended');

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox_img');
  const lightboxClose = document.getElementById('lightbox_close');
  const lightboxOverlay = document.querySelector('.lightbox_overlay');
  const galleryImages = document.querySelectorAll('.gallery_img');

  // Open lightbox
  const openLightbox = (imgSrc, imgAlt) => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
      // Clear image src after animation
      setTimeout(() => {
        if (lightboxImg) lightboxImg.src = '';
      }, 300);
    }
  };

  // Add click listeners to gallery images
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Close lightbox when clicking close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close lightbox when clicking overlay
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});


