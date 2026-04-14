// ============================================
// ModernTemplate.jsx - Modern Tech Resume
// ============================================

import { HiEnvelope, HiPhone, HiMapPin, HiLink, HiGlobeAlt } from 'react-icons/hi2';

function ModernTemplate({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const s = {
    page: { fontFamily: "'Inter', sans-serif", color: colors.text, display: 'flex', minHeight: '100%' },
    sidebar: { width: '35%', padding: '32px 24px', color: '#ffffff', backgroundColor: colors.primary },
    main: { width: '65%', padding: '32px 28px', backgroundColor: '#ffffff' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, backgroundColor: colors.accent, border: '3px solid rgba(255,255,255,0.3)', margin: '0 auto 20px' },
    sidebarHeading: { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, marginBottom: '10px' },
    contactItem: { display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' },
    contactIcon: { fontSize: '14px', marginTop: '2px', flexShrink: 0, opacity: 0.7 },
    contactText: { fontSize: '12px', wordBreak: 'break-all' },
    skillPill: { fontSize: '11px', padding: '3px 10px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'inline-block', margin: '2px' },
    skillPillOutline: { fontSize: '11px', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', display: 'inline-block', margin: '2px' },
    mainName: { fontSize: '24px', fontWeight: 700, color: colors.primary, margin: 0 },
    mainRole: { fontSize: '13px', color: colors.accent, marginTop: '4px' },
    mainSectionTitle: { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: colors.accent, marginBottom: '10px' },
    entryRole: { fontSize: '14px', fontWeight: 600, color: colors.primary },
    entryCompany: { fontSize: '12px', color: '#888' },
    entryDates: { fontSize: '11px', color: '#aaa', flexShrink: 0, marginLeft: '8px' },
    bullet: { fontSize: '13px', color: '#555', lineHeight: 1.6, marginBottom: '2px' },
    sectionGap: { marginBottom: '18px' },
    sidebarSection: { marginBottom: '20px' },
  };

  return (
    <div style={s.page}>
      {/* Left Sidebar */}
      <div style={s.sidebar}>
        <div style={s.avatar}>{getInitials(personalInfo.fullName)}</div>

        <div style={s.sidebarSection}>
          <h3 style={s.sidebarHeading}>Contact</h3>
          {personalInfo.email && (
            <div style={s.contactItem}>
              <HiEnvelope style={s.contactIcon} />
              <span style={s.contactText}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={s.contactItem}>
              <HiPhone style={s.contactIcon} />
              <span style={s.contactText}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={s.contactItem}>
              <HiMapPin style={s.contactIcon} />
              <span style={s.contactText}>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div style={s.contactItem}>
              <HiLink style={s.contactIcon} />
              <a href={personalInfo.linkedIn} style={{ ...s.contactText, textDecoration: 'underline', color: '#fff' }}>LinkedIn</a>
            </div>
          )}
          {personalInfo.portfolio && (
            <div style={s.contactItem}>
              <HiGlobeAlt style={s.contactIcon} />
              <a href={personalInfo.portfolio} style={{ ...s.contactText, textDecoration: 'underline', color: '#fff' }}>Portfolio</a>
            </div>
          )}
        </div>

        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div style={s.sidebarSection}>
            <h3 style={s.sidebarHeading}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.technical.map((skill, i) => (
                <span key={i} style={s.skillPill}>{skill}</span>
              ))}
              {skills.soft.map((skill, i) => (
                <span key={`s-${i}`} style={s.skillPillOutline}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {skills.languages.length > 0 && (
          <div style={s.sidebarSection}>
            <h3 style={s.sidebarHeading}>Languages</h3>
            {skills.languages.map((lang, i) => (
              <p key={i} style={{ fontSize: '12px', marginBottom: '4px' }}>{lang}</p>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div style={s.sidebarSection}>
            <h3 style={s.sidebarHeading}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600 }}>{cert.name}</p>
                {cert.issuer && <p style={{ fontSize: '11px', opacity: 0.7 }}>{cert.issuer}</p>}
                {cert.date && <p style={{ fontSize: '11px', opacity: 0.5 }}>{cert.date}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={s.main}>
        <div style={s.sectionGap}>
          <h1 style={s.mainName}>{personalInfo.fullName || 'Your Full Name'}</h1>
          <p style={s.mainRole}>Professional Title</p>
        </div>

        {summary && (
          <div style={s.sectionGap}>
            <h2 style={s.mainSectionTitle}>About</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#555' }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={s.sectionGap}>
            <h2 style={s.mainSectionTitle}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={s.entryRole}>{exp.role}</span>
                  <span style={s.entryDates}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' – '}
                    {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.company && <p style={s.entryCompany}>{exp.company}</p>}
                {exp.bullets?.length > 0 && (
                  <ul style={{ margin: '4px 0 0 20px', padding: 0, listStyleType: 'disc' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} style={s.bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={s.sectionGap}>
            <h2 style={s.mainSectionTitle}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: colors.primary, margin: 0 }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                  <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>
                    {edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span style={s.entryDates}>
                  {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                </span>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={s.sectionGap}>
            <h2 style={s.mainSectionTitle}>Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: colors.primary }}>{proj.name}</span>
                  {proj.link && <a href={proj.link} style={{ fontSize: '11px', color: colors.accent, textDecoration: 'underline' }}>Link</a>}
                </div>
                {proj.description && <p style={{ fontSize: '12px', color: '#888', margin: '2px 0' }}>{proj.description}</p>}
                {proj.technologies?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {proj.technologies.map((tech, j) => (
                      <span key={j} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '12px', backgroundColor: colors.light, color: colors.accent }}>{tech}</span>
                    ))}
                  </div>
                )}
                {proj.bullets?.length > 0 && (
                  <ul style={{ margin: '4px 0 0 20px', padding: 0, listStyleType: 'disc' }}>
                    {proj.bullets.map((bullet, j) => (
                      <li key={j} style={s.bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModernTemplate;
