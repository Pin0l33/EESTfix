// Cliente Supabase para GitHub Pages (sin PHP).
const API = {
  client: null, user: null, profile: null,
  async init() {
    if (!window.supabase || !window.EESTFIX_SUPABASE_URL ||
        window.EESTFIX_SUPABASE_URL.includes('PEGAR_') ||
        !window.EESTFIX_SUPABASE_ANON_KEY ||
        window.EESTFIX_SUPABASE_ANON_KEY.includes('PEGAR_')) {
      throw new Error('Falta configurar Supabase. Revisá js/supabase-config.js.');
    }
    this.client = window.supabase.createClient(
      window.EESTFIX_SUPABASE_URL, window.EESTFIX_SUPABASE_ANON_KEY
    );
    const { data: { session }, error } = await this.client.auth.getSession();
    if (error) throw error;
    this.user = session?.user || null;
    if (this.user) {
      const { data, error: profileError } = await this.client
        .from('perfiles').select('*').eq('id', this.user.id).maybeSingle();
      if (profileError) throw profileError;
      this.profile = data;
    } else this.profile = null;
    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = this.profile ? `${this.profile.nombre} ${this.profile.apellido}` : 'Invitado';
    });
    return this;
  },
  requireUser() {
    if (!this.user) { location.href = 'login.html'; return false; }
    return true;
  },
  escape(value='') {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  },
  message(el, text, error=false) {
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message ' + (error ? 'error' : 'success');
  }
};
document.addEventListener('DOMContentLoaded', () => {
  API.init().catch(err => console.error('EESTfix:', err.message));
});
