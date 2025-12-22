document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-vote]');
  if (!btn) return;

  e.preventDefault();

  const url = btn.dataset.url;
  const counterSelector = btn.dataset.counter;

  try {
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();

    const counter = document.querySelector(counterSelector);
    counter.textContent = data.votes;

  } catch (err) {
    console.error(err);
    alert('Error al votar');
  }
});
