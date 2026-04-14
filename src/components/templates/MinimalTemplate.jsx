// ============================================
// MinimalTemplate.jsx - Minimal Clean Resume
// ============================================
// Apple-style minimal design with generous
// whitespace, thin separators, and understated elegance.
// ============================================

function MinimalTemplate({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const styles = {
    page: {
      fontFamily: "'Inter', sans-serif",
      color: '#4b5563',
      padding: '44px 48px',
      lineHeight: 1.8,
    },
    name: {
      fontSize: '24px',
      fontWeight: 400,
      color: '#374151',
      margin: 0,
      letterSpacing: '0.5px',
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 14px',
      marginTop: '8px',
      fontSize: '12px',
      color: '#9ca3af',
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #e5e7eb',
      margin: '20px 0',
    },
    sectionTitle: {
      fontSize: '11px',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '3px',
      color: '#9ca3af',
      margin: '0 0 12px 0',
      border: 'none',
    },
    bodyText: {
      fontSize: '13px',
      color: '#4b5563',
      lineHeight: 1.8,
      margin: 0,
    },
    entryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    role: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
    },
    company: {
      fontSize: '13px',
      color: '#6b7280',
    },
    dates: {
      fontSize: '12px',
      color: '#9ca3af',
      flexShrink: 0,
      marginLeft: '12px',
    },
    bulletList: {
      margin: '4px 0 0 0',
      padding: 0,
      listStyleType: 'none',
    },
    bulletItem: {
      fontSize: '13px',
      color: '#4b5563',
      lineHeight: 1.8,
      marginBottom: '2px',
      paddingLeft: '16px',
    },
    sectionGap: {
      marginBottom: '24px',
    },
    link: {
      color: '#6b7280',
      textDecoration: 'underline',
      fontSize: '12px',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div>
        <h1 style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</h1>
        <div style={styles.contactRow}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} style={styles.link}>LinkedIn</a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} style={styles.link}>Portfolio</a>
          )}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Summary */}
      {summary && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <p style={styles.bodyText}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < experience.length - 1 ? '16px' : 0 }}>
              <div style={styles.entryRow}>
                <div>
                  <span style={styles.role}>{exp.role}</span>
                  {exp.company && <span style={styles.company}> — {exp.company}</span>}
                </div>
                <span style={styles.dates}>
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' – '}
                  {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={styles.bulletList}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={styles.bulletItem}>– {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (education.length > 0 || skills.technical.length > 0) && (
        <hr style={styles.divider} />
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ ...styles.entryRow, marginBottom: '6px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{edu.degree}</span>
                {edu.field && <span style={{ fontSize: '13px', color: '#6b7280' }}> in {edu.field}</span>}
                {edu.institution && <span style={{ fontSize: '13px', color: '#9ca3af' }}> — {edu.institution}</span>}
                {edu.gpa && <span style={{ fontSize: '12px', color: '#9ca3af' }}> (GPA: {edu.gpa})</span>}
              </div>
              <span style={styles.dates}>
                {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          {skills.technical.length > 0 && (
            <p style={{ ...styles.bodyText, marginBottom: '4px' }}>{skills.technical.join(', ')}</p>
          )}
          {skills.soft.length > 0 && (
            <p style={{ ...styles.bodyText, marginBottom: '4px' }}>{skills.soft.join(', ')}</p>
          )}
          {skills.languages.length > 0 && (
            <p style={{ ...styles.bodyText, marginBottom: '4px' }}>{skills.languages.join(', ')}</p>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <hr style={styles.divider} />
          <div style={styles.sectionGap}>
            <h2 style={styles.sectionTitle}>Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{proj.name}</span>
                  {proj.link && <a href={proj.link} style={styles.link}>Link</a>}
                </div>
                {proj.description && <p style={{ ...styles.bodyText, margin: '2px 0' }}>{proj.description}</p>}
                {proj.technologies?.length > 0 && (
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0' }}>{proj.technologies.join(', ')}</p>
                )}
                {proj.bullets?.length > 0 && (
                  <ul style={styles.bulletList}>
                    {proj.bullets.map((bullet, j) => (
                      <li key={j} style={styles.bulletItem}>– {bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <hr style={styles.divider} />
          <div style={styles.sectionGap}>
            <h2 style={styles.sectionTitle}>Certifications</h2>
            {certifications.map((cert, i) => (
              <div key={i} style={{ ...styles.entryRow, marginBottom: '4px' }}>
                <div style={{ fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: '#374151' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#9ca3af' }}> — {cert.issuer}</span>}
                  {cert.link && <a href={cert.link} style={{ ...styles.link, marginLeft: '8px' }}>View</a>}
                </div>
                {cert.date && <span style={styles.dates}>{cert.date}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MinimalTemplate;
