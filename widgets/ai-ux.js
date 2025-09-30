(function(){
  if (typeof window === 'undefined') return;
  if (window.__AI_UX_INIT__) return; // prevent multiple init
  window.__AI_UX_INIT__ = true;

  const WIDGET_ID = 'aiux-root';

  // Inject CSS once
  function ensureStylesheet(){
    const existing = document.querySelector('link[data-aiux="css"]');
    if (existing) return existing;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = (function(){
      // Try to resolve relatively if script is hosted together
      try {
        const currentScript = document.currentScript;
        if (currentScript && currentScript.src) {
          const url = new URL(currentScript.src, window.location.href);
          url.pathname = url.pathname.replace(/\/[^/]*$/, '/ai-ux.css');
          return url.toString();
        }
      } catch (_) {}
      return '/widgets/ai-ux.css';
    })();
    link.setAttribute('data-aiux','css');
    document.head.appendChild(link);
    return link;
  }

  function createSpinnerPortal(){
    const portal = document.createElement('div');
    portal.className = 'aiux-spinner-portal';
    portal.setAttribute('aria-hidden', 'true');
    portal.innerHTML = '<div class="aiux-spinner" aria-hidden="true"></div><span class="aiux-spinner-label">Yükleniyor…</span>';
    return portal;
  }

  function createFeedbackWidget(){
    const root = document.createElement('div');
    root.className = 'aiux-feedback';
    root.innerHTML = [
      '<div class="aiux-feedback-options" aria-expanded="false" role="group" aria-label="Geri Bildirim Seçenekleri">',
      '  <button class="aiux-chip" data-yes>Bu işe yaradı</button>',
      '  <button class="aiux-chip" data-no>Yaramadı</button>',
      '</div>',
      '<button class="aiux-feedback-main" type="button" aria-expanded="false" aria-controls="aiux-fb-opts">Bu işe yaradı mı?</button>'
    ].join('');
    const mainButton = root.querySelector('.aiux-feedback-main');
    const options = root.querySelector('.aiux-feedback-options');
    options.id = 'aiux-fb-opts';

    function toggleOptions(expanded){
      const isExpanded = expanded != null ? expanded : options.getAttribute('aria-expanded') !== 'true';
      options.setAttribute('aria-expanded', String(isExpanded));
      mainButton.setAttribute('aria-expanded', String(isExpanded));
    }

    mainButton.addEventListener('click', function(){ toggleOptions(); });

    root.querySelector('[data-yes]').addEventListener('click', function(){
      publishFeedback('yes');
      toast('Teşekkürler!');
      toggleOptions(false);
    });
    root.querySelector('[data-no]').addEventListener('click', function(){
      publishFeedback('no');
      toast('Geri bildiriminiz alındı');
      toggleOptions(false);
    });

    return root;
  }

  function createAdvisory(){
    const div = document.createElement('div');
    div.className = 'aiux-advisory';
    div.textContent = 'Teşhis değil; kişisel sağlık durumunuz için doktora danışın.';
    return div;
  }

  function toast(message){
    try {
      const t = document.createElement('div');
      t.style.position = 'fixed';
      t.style.bottom = '56px';
      t.style.right = '16px';
      t.style.zIndex = '2147483640';
      t.style.background = 'rgba(17,24,39,0.95)';
      t.style.color = '#f9fafb';
      t.style.padding = '8px 10px';
      t.style.borderRadius = '10px';
      t.style.boxShadow = '0 10px 25px rgba(0,0,0,0.35)';
      t.style.fontSize = '12px';
      t.textContent = message;
      document.body.appendChild(t);
      setTimeout(function(){
        t.style.transition = 'opacity 160ms ease, transform 160ms ease';
        t.style.opacity = '0';
        t.style.transform = 'translateY(6px)';
        setTimeout(function(){ t.remove(); }, 200);
      }, 1200);
    } catch (_) {}
  }

  function publishFeedback(value){
    // Hook for analytics/AI training. Default: console + dispatch event.
    try {
      const detail = {
        value,
        path: window.location.pathname + window.location.search + window.location.hash,
        title: document.title || undefined,
        ts: Date.now()
      };
      window.dispatchEvent(new CustomEvent('aiux:feedback', { detail }));
      if (window.aiuxOnFeedback && typeof window.aiuxOnFeedback === 'function') {
        window.aiuxOnFeedback(detail);
      } else if (window.console && console.debug) {
        console.debug('[AI-UX] feedback', detail);
      }
    } catch (_) {}
  }

  function mount(){
    ensureStylesheet();
    document.documentElement.classList.add('aiux-animate-buttons');

    let root = document.getElementById(WIDGET_ID);
    if (!root){
      root = document.createElement('div');
      root.id = WIDGET_ID;
      document.body.appendChild(root);
    }

    const frag = document.createDocumentFragment();
    const fb = createFeedbackWidget();
    const note = createAdvisory();
    const spinnerPortal = createSpinnerPortal();
    frag.appendChild(fb);
    frag.appendChild(note);
    frag.appendChild(spinnerPortal);
    root.replaceChildren(frag);

    // Expose spinner controls
    window.aiuxSetLoading = function(isLoading, label){
      try {
        const portal = document.querySelector('#'+WIDGET_ID+' .aiux-spinner-portal');
        if (!portal) return;
        portal.setAttribute('aria-hidden', isLoading ? 'false' : 'true');
        const text = portal.querySelector('.aiux-spinner-label');
        if (text && typeof label === 'string') text.textContent = label;
      } catch (_) {}
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();

