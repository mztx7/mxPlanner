import { useState } from 'react'

const initialLogin = {
  name: '',
  email: '',
  password: ''
}

export default function AuthPanel({ authMode, onModeChange, onSubmit }) {
  const [formData, setFormData] = useState(initialLogin)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) return

    onSubmit(formData)
  }

  return (
    <section className="auth-card">
      <div className="mode-switch">
        <button
          type="button"
          className={authMode === 'login' ? 'active-mode' : ''}
          onClick={() => onModeChange('login')}
        >
          Logowanie
        </button>
        <button
          type="button"
          className={authMode === 'register' ? 'active-mode' : ''}
          onClick={() => onModeChange('register')}
        >
          Rejestracja
        </button>
      </div>

      <p className="section-kicker">Autoryzacja</p>
      <h2>{authMode === 'login' ? 'KONTO DEMO -- [a@a.co:123]' : 'Stwórz konto i zacznij planować'}</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        {authMode === 'register' ? (
          <label className="field field-wide">
            <span>Imię</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Np. Mateusz"
            />
          </label>
        ) : null}

        <label className="field field-wide">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tester@wsb.pl"
          />
        </label>

        <label className="field field-wide">
          <span>Hasło</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="wpisz cokolwiek"
          />
        </label>

        <div className="action-row field-wide">
          <button type="submit" className="primary-button">
            {authMode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
          </button>
        </div>
      </form>
    </section>
  )
}
