// ============================================
// ClassicTemplate.jsx - Classic Professional Resume
// ============================================

function ClassicTemplate({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const styles = {
    page: { fontFamily: 'Georgia, serif', color: colors.text, padding: '40px 48px', lineHeight: 1.5 },
    name: { fontSize: '28px', fontWeight: 700, color: colors.primary, textAlign: 'center', letterSpacing: '1px', margin: 0 },
    contactRow: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 16px', marginTop: '8px', fontSize: '12px', color: '#555' },
    separator: { color: '#ccc' },
    hr: { border: 'none', borderTop: `2px solid ${colors.primary}`, margin: '14px 0' },
    sectionTitle: { fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '4px', marginBottom: '10px', marginTop: '0' },
    entryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    role: { fontSize: '14px', fontWeight: 700, color: '#222' },
    company: { fontSize: '14px', color: '#444' },
    dates: { fontSize: '12px', color: '#888', flexShrink: 0, marginLeft: '12px' },
    bulletList: { margin: '4px 0 0 20px', padding: 0, listStyleType: 'disc' },
    bulletItem: { fontSize: '13px', color: '#444', lineHeight: 1.6, marginBottom: '2px' },
    skillLine: { fontSize: '13px', color: '#444', marginBottom: '4px' },
    skillLabel: { fontWeight: 700, color: '#333' },
    sectionGap: { marginBottom: '18px' },
    link: { color: colors.accent, textDecoration: 'underline', fontSize: '12px' },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div>
        <h1 style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</h1>
        <div style={styles.contactRow}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span style={styles.separator}>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span style={styles.separator}>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <>
              <span style={styles.separator}>|</span>
              <a href={personalInfo.linkedIn} style={styles.link}>LinkedIn</a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span style={styles.separator}>|</span>
              <a href={personalInfo.portfolio} style={styles.link}>Portfolio</a>
            </>
          )}
        </div>
      </div>

      <hr style={styles.hr} />

      {/* Summary */}
      {summary && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.7, margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < experience.length - 1 ? '14px' : 0 }}>
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
                    <li key={j} style={styles.bulletItem}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ ...styles.entryRow, marginBottom: '6px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>{edu.degree}</span>
                {edu.field && <span style={{ fontSize: '14px', color: '#444' }}> in {edu.field}</span>}
                {edu.institution && <span style={{ fontSize: '14px', color: '#555' }}> — {edu.institution}</span>}
                {edu.gpa && <span style={{ fontSize: '12px', color: '#888' }}> (GPA: {edu.gpa})</span>}
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
            <p style={styles.skillLine}><span style={styles.skillLabel}>Technical: </span>{skills.technical.join(', ')}</p>
          )}
          {skills.soft.length > 0 && (
            <p style={styles.skillLine}><span style={styles.skillLabel}>Soft Skills: </span>{skills.soft.join(', ')}</p>
          )}
          {skills.languages.length > 0 && (
            <p style={styles.skillLine}><span style={styles.skillLabel}>Languages: </span>{skills.languages.join(', ')}</p>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>{proj.name}</span>
                {proj.link && <a href={proj.link} style={styles.link}>Link</a>}
              </div>
              {proj.description && <p style={{ fontSize: '13px', color: '#555', margin: '2px 0' }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: '12px', color: '#888', margin: '2px 0' }}>Technologies: {proj.technologies.join(', ')}</p>
              )}
              {proj.bullets?.length > 0 && (
                <ul style={styles.bulletList}>
                  {proj.bullets.map((bullet, j) => (
                    <li key={j} style={styles.bulletItem}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={styles.sectionGap}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} style={{ ...styles.entryRow, marginBottom: '4px' }}>
              <div style={{ fontSize: '13px' }}>
                <span style={{ fontWeight: 700 }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#555' }}> — {cert.issuer}</span>}
                {cert.link && <a href={cert.link} style={{ ...styles.link, marginLeft: '8px' }}>View</a>}
              </div>
              {cert.date && <span style={styles.dates}>{cert.date}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassicTemplate;
