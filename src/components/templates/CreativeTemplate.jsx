// ============================================
// CreativeTemplate.jsx - Creative Bold Resume
// ============================================

import { HiEnvelope, HiPhone, HiMapPin, HiLink, HiGlobeAlt } from 'react-icons/hi2';

function CreativeTemplate({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const s = {
    page: { fontFamily: "'Inter', sans-serif", color: colors.text, padding: '40px 44px', lineHeight: 1.5 },
    name: { fontSize: '30px', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 },
    gradientBar: { height: '4px', width: '100px', borderRadius: '4px', marginTop: '6px', background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` },
    contactRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', marginTop: '12px' },
    contactItem: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#777' },
    contactIcon: { fontSize: '13px', color: colors.accent },
    sectionTitle: { fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: colors.primary, paddingLeft: '14px', borderLeft: `4px solid ${colors.accent}`, marginBottom: '12px', marginTop: 0 },
    summaryCard: { borderRadius: '10px', padding: '16px 18px', backgroundColor: colors.light, fontSize: '13px', lineHeight: 1.7, color: '#444' },
    timelineDot: { width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors.accent, flexShrink: 0, marginTop: '4px' },
    timelineLine: { width: '2px', backgroundColor: `${colors.accent}33`, position: 'absolute', left: '4px', top: '16px', bottom: '-8px' },
    entryRole: { fontSize: '14px', fontWeight: 700, color: colors.primary },
    entryCompany: { fontSize: '13px', color: '#666' },
    entryDates: { fontSize: '11px', color: '#aaa', flexShrink: 0, marginLeft: '8px' },
    bullet: { fontSize: '13px', color: '#555', lineHeight: 1.6, marginBottom: '2px' },
    skillPillFilled: { fontSize: '11px', padding: '4px 12px', borderRadius: '20px', color: '#ffffff', fontWeight: 500, display: 'inline-block', margin: '2px', background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` },
    skillPillOutline: { fontSize: '11px', padding: '4px 12px', borderRadius: '20px', fontWeight: 500, display: 'inline-block', margin: '2px', border: `1px solid ${colors.accent}`, color: colors.accent },
    projectCard: { borderRadius: '10px', border: '1px solid #e5e7eb', padding: '14px', marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
    techTag: { fontSize: '10px', padding: '2px 8px', borderRadius: '12px', backgroundColor: colors.light, color: colors.primary, display: 'inline-block', margin: '2px' },
    eduBadge: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` },
    sectionGap: { marginBottom: '20px' },
    link: { color: colors.accent, textDecoration: 'underline', fontSize: '11px' },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.sectionGap}>
        <h1 style={s.name}>{personalInfo.fullName || 'Your Full Name'}</h1>
        <div style={s.gradientBar} />
        <div style={s.contactRow}>
          {personalInfo.email && (
            <span style={s.contactItem}><HiEnvelope style={s.contactIcon} />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span style={s.contactItem}><HiPhone style={s.contactIcon} />{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span style={s.contactItem}><HiMapPin style={s.contactIcon} />{personalInfo.location}</span>
          )}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} style={{ ...s.contactItem, color: colors.accent, textDecoration: 'underline' }}>
              <HiLink style={s.contactIcon} />LinkedIn
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} style={{ ...s.contactItem, color: colors.accent, textDecoration: 'underline' }}>
              <HiGlobeAlt style={s.contactIcon} />Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={s.sectionGap}>
          <div style={s.summaryCard}>{summary}</div>
        </div>
      )}

      {/* Experience - Timeline */}
      {experience.length > 0 && (
        <div style={s.sectionGap}>
          <h2 style={s.sectionTitle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '16px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={s.timelineDot} />
                {i < experience.length - 1 && (
                  <div style={{ width: '2px', flex: 1, backgroundColor: `${colors.accent}33`, marginTop: '4px' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={s.entryRole}>{exp.role}</span>
                    {exp.company && <span style={s.entryCompany}> at {exp.company}</span>}
                  </div>
                  <span style={s.entryDates}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' – '}
                    {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul style={{ margin: '6px 0 0 20px', padding: 0, listStyleType: 'disc' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} style={s.bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <div style={s.sectionGap}>
          <h2 style={s.sectionTitle}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {skills.technical.map((skill, i) => (
              <span key={i} style={s.skillPillFilled}>{skill}</span>
            ))}
            {skills.soft.map((skill, i) => (
              <span key={`s-${i}`} style={s.skillPillOutline}>{skill}</span>
            ))}
          </div>
          {skills.languages.length > 0 && (
            <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
              <span style={{ fontWeight: 600 }}>Languages: </span>{skills.languages.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={s.sectionGap}>
          <h2 style={s.sectionTitle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} style={s.projectCard}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: colors.primary }}>{proj.name}</span>
                {proj.link && <a href={proj.link} style={s.link}>Link</a>}
              </div>
              {proj.description && <p style={{ fontSize: '12px', color: '#888', margin: '4px 0' }}>{proj.description}</p>}
              {proj.technologies?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                  {proj.technologies.map((tech, j) => (
                    <span key={j} style={s.techTag}>{tech}</span>
                  ))}
                </div>
              )}
              {proj.bullets?.length > 0 && (
                <ul style={{ margin: '6px 0 0 20px', padding: 0, listStyleType: 'disc' }}>
                  {proj.bullets.map((bullet, j) => (
                    <li key={j} style={s.bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={s.sectionGap}>
          <h2 style={s.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
              <div style={s.eduBadge}>
                {edu.degree ? edu.degree.charAt(0).toUpperCase() : 'D'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: colors.primary, margin: 0 }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                  <span style={s.entryDates}>
                    {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>
                  {edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={s.sectionGap}>
          <h2 style={s.sectionTitle}>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <div style={{ fontSize: '13px' }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#777' }}> — {cert.issuer}</span>}
                {cert.link && <a href={cert.link} style={{ ...s.link, marginLeft: '8px' }}>View</a>}
              </div>
              {cert.date && <span style={s.entryDates}>{cert.date}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreativeTemplate;
