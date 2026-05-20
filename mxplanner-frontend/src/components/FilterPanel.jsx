export default function FilterPanel({ filters, categories, onChange, onReset }) {
  const updateFilter = (key, value) => {
    onChange(current => ({ ...current, [key]: value }))
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Filtry</p>
          <h2>Sortowanie i wyszukiwanie</h2>
        </div>
      </div>

      <div className="form-grid">
        <label className="field field-wide">
          <span>Szukaj</span>
          <input
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Szukaj po tytule, opisie lub kategorii"
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(event) => updateFilter('status', event.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="todo">Do zrobienia</option>
            <option value="progress">W trakcie</option>
            <option value="done">Wykonane</option>
          </select>
        </label>

        <label className="field">
          <span>Priorytet</span>
          <select
            value={filters.priority}
            onChange={(event) => updateFilter('priority', event.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="high">Wysoki</option>
            <option value="medium">Sredni</option>
            <option value="low">Niski</option>
          </select>
        </label>

        <label className="field">
          <span>Kategoria</span>
          <select
            value={filters.category}
            onChange={(event) => updateFilter('category', event.target.value)}
          >
            <option value="all">Wszystkie</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Sortuj</span>
          <select
            value={filters.sortBy}
            onChange={(event) => updateFilter('sortBy', event.target.value)}
          >
            <option value="deadline-asc">Deadline rosnąco</option>
            <option value="deadline-desc">Deadline malejąco</option>
            <option value="priority-desc">Priorytet malejąco</option>
            <option value="title-asc">Tytul A-Z</option>
          </select>
        </label>

        <div className="action-row field-wide">
          <button type="button" className="ghost-button" onClick={onReset}>
            Wyczyść filtry
          </button>
        </div>
      </div>
    </section>
  )
}
