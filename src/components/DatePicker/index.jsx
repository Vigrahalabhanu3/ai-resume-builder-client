// ============================================
// DatePicker.jsx - Month/Year Selector
// ============================================
// Two dropdowns for month and year selection.
// Value format: "YYYY-MM" (e.g., "2024-03")
// ============================================

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);

function DatePicker({ value, onChange, disabled = false }) {
  const [year, month] = (value || '').split('-');

  const handleMonthChange = (e) => {
    const m = e.target.value;
    onChange(year && m ? `${year}-${m}` : m ? `${currentYear}-${m}` : '');
  };

  const handleYearChange = (e) => {
    const y = e.target.value;
    onChange(y && month ? `${y}-${month}` : y ? `${y}-01` : '');
  };

  return (
    <div className="date-picker">
      <select
        value={month || ''}
        onChange={handleMonthChange}
        disabled={disabled}
        className={`input-field date-select ${disabled ? 'btn-disabled' : ''}`}
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <select
        value={year || ''}
        onChange={handleYearChange}
        disabled={disabled}
        className={`input-field date-select ${disabled ? 'btn-disabled' : ''}`}
      >
        <option value="">Year</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default DatePicker;
