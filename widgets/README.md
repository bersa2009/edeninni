AI-UX Widgets
==============

Drop-in, framework-agnostic widgets to add:

- Feedback button: "Bu işe yaradı mı?"
- Advisory note: "Teşhis değil, doktora danışın"
- Subtle button animations
- Loading spinner utility

Quick start
-----------

1) Copy the `widgets` folder to your web root or static assets folder.
2) Include the script near the end of your HTML body:

```html
<script src="/widgets/ai-ux.js" defer></script>
```

This will automatically:
- Inject `ai-ux.css`
- Enable subtle button hover/press animations site-wide
- Mount the feedback button (bottom-right)
- Mount the advisory note (bottom-left)
- Provide a global loading spinner portal

Usage
-----

- Toggle loading spinner from your code:

```js
window.aiuxSetLoading(true, 'Yükleniyor…');
// ... do async work ...
window.aiuxSetLoading(false);
```

- Capture feedback events (for analytics/AI learning):

```js
window.addEventListener('aiux:feedback', (e) => {
  // send to your analytics backend
  // payload: e.detail = { value: 'yes'|'no', path, title, ts }
});

// Or override with a custom handler
window.aiuxOnFeedback = (detail) => {
  // post to your API
  // fetch('/api/feedback', { method: 'POST', body: JSON.stringify(detail) })
};
```

Styling
-------

- Edit CSS variables in `ai-ux.css` to customize colors, spacing, and z-index.
- To disable global button animation, remove the `aiux-animate-buttons` class from `html`:

```js
document.documentElement.classList.remove('aiux-animate-buttons');
```

Accessibility
-------------

- Feedback options group uses `aria-expanded` and `aria-controls`.
- Spinner portal is toggled with `aria-hidden`.

Internationalization
--------------------

- Update strings in `ai-ux.js` if you need a different language.

