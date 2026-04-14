// ============================================
// ExecutiveTemplate.jsx - Executive Resume
// ============================================
// Premium executive template with dark header
// banner and structured professional layout.
// ============================================

function ExecutiveTemplate({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const styles = {
    page: {
      fontFamily: "'Inter', sans-serif",
      color: colors.text,
    },
    banner: {
      backgroundColor: '#1e1b4b',
      padding: '32px 48px',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    name: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '26px',
      fontWeight: 700,
      color: '#ffffff',
      margin: 0,
      letterSpacing: '0.5px',
    },
    bannerContact: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 16px',
      marginTop: '10px',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    bannerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'underline',
      fontSize: '12px',
    },
    body: {
      padding: '36px 48px',
      backgroundColor: '#ffffff',
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '14px',
      fontWeight: 700,
      color: '#1e1b4b',
      margin: '0 0 8px 0',
      paddingBottom: '6px',
      borderBottom: '2px solid #4f46e5',
    },
    sectionGap: {
      marginBottom: '22px',
    },
    bodyText: {
      fontSize: '13px',
      color: '#4b5563',
      lineHeight: 1.7,
      margin: 0,
    },
    entryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    role: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#1e293b',
    },
    company: {
      fontSize: '13px',
      color: '#4f46e5',
    },
    dates: {
      fontSize: '12px',
      color: '#9ca3af',
      flexShrink: 0,
      marginLeft: '12px',
    },
    bulletList: {
      margin: '4px 0 0 20px',
      padding: 0,
      listStyleType: 'disc',
    },
    bulletItem: {
      fontSize: '13px',
      color: '#4b5563',
      lineHeight: 1.6,
      marginBottom: '2px',
    },
    twoCol: {
      display: 'flex',
      gap: '32px',
    },
    colHalf: {
      flex: 1,
    },
    link: {
      color: '#4f46e5',
      textDecoration: 'underline',
      fontSize: '12px',
    },
    skillLine: {
      fontSize: '13px',
      color: '#4b5563',
      marginBottom: '4px',
    },
    skillLabel: {
      fontWeight: 700,
      color: '#1e293b',
    },
  };

  return (
    <div style={styles.page}>
      {/* Dark Banner Header */}
      <div style={styles.banner}>
        <h1 style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</h1>
        <div style={styles.bannerContact}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} style={styles.bannerLink}>LinkedIn</a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} style={styles.bannerLink}>Portfolio</a>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Summary */}
        {summary && (
          <div style={styles.sectionGap}>
            <h2 style={styles.sectionTitle}>Executive Summary</h2>
            <p style={styles.bodyText}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={styles.sectionGap}>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
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

        {/* Skills & Education side by side */}
        {((skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) || education.length > 0) && (
          <div style={{ ...styles.sectionGap, ...styles.twoCol }}>
            {/* Skills Column */}
            {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
              <div style={styles.colHalf}>
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

            {/* Education Column */}
            {education.length > 0 && (
              <div style={styles.colHalf}>
                <h2 style={styles.sectionTitle}>Education</h2>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{edu.degree}</div>
                    {edu.field && <div style={{ fontSize: '13px', color: '#4b5563' }}>{edu.field}</div>}
                    {edu.institution && <div style={{ fontSize: '13px', color: '#4f46e5' }}>{edu.institution}</div>}
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
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
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{proj.name}</span>
                  {proj.link && <a href={proj.link} style={styles.link}>Link</a>}
                </div>
                {proj.description && <p style={{ ...styles.bodyText, margin: '2px 0' }}>{proj.description}</p>}
                {proj.technologies?.length > 0 && (
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0' }}>Technologies: {proj.technologies.join(', ')}</p>
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
                  {cert.issuer && <span style={{ color: '#4f46e5' }}> — {cert.issuer}</span>}
                  {cert.link && <a href={cert.link} style={{ ...styles.link, marginLeft: '8px' }}>View</a>}
                </div>
                {cert.date && <span style={styles.dates}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExecutiveTemplate;
