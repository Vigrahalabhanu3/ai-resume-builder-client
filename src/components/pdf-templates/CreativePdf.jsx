// ============================================
// CreativePdf.jsx - Creative Bold Template for PDF Export
// ============================================
// React-PDF version of CreativeTemplate.
// Timeline experience, gradient pills, card projects.
// ============================================

import { View, Text, Link, StyleSheet } from '@react-pdf/renderer';

function CreativePdf({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', color: colors.text, fontSize: 10 },
    // Header
    name: { fontSize: 22, fontFamily: 'Helvetica-Bold', letterSpacing: -0.5 },
    gradientBar: { width: 80, height: 4, borderRadius: 2, backgroundColor: colors.accent, marginTop: 4 },
    contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
    contactItem: { fontSize: 8, color: '#64748b' },
    contactLink: { fontSize: 8, color: colors.accent, textDecoration: 'underline' },
    // Summary card
    summaryCard: { backgroundColor: colors.light, borderRadius: 6, padding: 12, marginTop: 12 },
    summaryText: { fontSize: 10, lineHeight: 1.5 },
    // Section title with left border
    sectionTitle: {
      fontSize: 9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2,
      color: colors.primary, paddingLeft: 8, borderLeft: `4px solid ${colors.accent}`, marginBottom: 8,
    },
    section: { marginTop: 14 },
    // Timeline
    timelineItem: { flexDirection: 'row', marginBottom: 6 },
    timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginRight: 8, marginTop: 2 },
    timelineContent: { flex: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    bold: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
    light: { fontSize: 8, color: '#94a3b8' },
    small: { fontSize: 8, color: '#64748b' },
    text: { fontSize: 10, lineHeight: 1.5, color: '#475569' },
    bulletItem: { flexDirection: 'row', marginLeft: 4, marginTop: 2 },
    bulletDot: { width: 8, fontSize: 10 },
    bulletText: { flex: 1, fontSize: 10, lineHeight: 1.5, color: '#475569' },
    // Skills
    pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    skillPill: { fontSize: 7, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: colors.primary, color: '#ffffff' },
    skillOutline: { fontSize: 7, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: colors.accent, color: colors.accent },
    // Project card
    projectCard: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, padding: 8, marginBottom: 6 },
    techPill: { fontSize: 6, paddingHorizontal: 4, paddingVertical: 1, borderRadius: 6, backgroundColor: colors.light, color: colors.primary, marginRight: 3, marginBottom: 3 },
    // Education badge
    eduRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, gap: 8 },
    badge: {
      width: 28, height: 28, borderRadius: 6, backgroundColor: colors.primary,
      justifyContent: 'center', alignItems: 'center',
    },
    badgeText: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  });

  return (
    <View style={styles.page}>
      {/* Header */}
      <View>
        <Text style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</Text>
        <View style={styles.gradientBar} />
        <View style={styles.contactRow}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          {personalInfo.linkedIn && <Link src={personalInfo.linkedIn} style={styles.contactLink}>LinkedIn</Link>}
          {personalInfo.portfolio && <Link src={personalInfo.portfolio} style={styles.contactLink}>Portfolio</Link>}
        </View>
      </View>

      {/* Summary */}
      {summary ? (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      ) : null}

      {/* Experience - Timeline */}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.bold, { color: colors.primary }]}>{exp.role}</Text>
                    {exp.company && <Text style={styles.small}>at {exp.company}</Text>}
                  </View>
                  <Text style={styles.light}>
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}
                    {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                {exp.bullets && exp.bullets.map((bullet, j) => (
                  <View key={j} style={styles.bulletItem}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.pillsRow}>
            {skills.technical.map((skill, i) => (
              <Text key={i} style={styles.skillPill}>{skill}</Text>
            ))}
            {skills.soft.map((skill, i) => (
              <Text key={`s-${i}`} style={styles.skillOutline}>{skill}</Text>
            ))}
          </View>
          {skills.languages.length > 0 && (
            <Text style={[styles.small, { marginTop: 4 }]}>
              Languages: {skills.languages.join(', ')}
            </Text>
          )}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((proj, i) => (
            <View key={i} style={styles.projectCard}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                <Text style={[styles.bold, { color: colors.primary }]}>{proj.name}</Text>
                {proj.link && <Link src={proj.link} style={[styles.contactLink, { fontSize: 8 }]}>Link</Link>}
              </View>
              {proj.description && <Text style={[styles.small, { marginTop: 2 }]}>{proj.description}</Text>}
              {proj.technologies && proj.technologies.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {proj.technologies.map((tech, j) => (
                    <Text key={j} style={styles.techPill}>{tech}</Text>
                  ))}
                </View>
              )}
              {proj.bullets && proj.bullets.map((bullet, j) => (
                <View key={j} style={styles.bulletItem}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={styles.eduRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{edu.degree ? edu.degree.charAt(0).toUpperCase() : 'D'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.row}>
                  <Text style={[styles.bold, { color: colors.primary }]}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </Text>
                  <Text style={styles.light}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                  </Text>
                </View>
                <Text style={styles.small}>
                  {edu.institution}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((cert, i) => (
            <View key={i} style={[styles.row, { marginBottom: 3 }]}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10 }}>{cert.name}</Text>
                {cert.issuer && <Text style={{ fontSize: 10 }}> — {cert.issuer}</Text>}
                {cert.link && <Link src={cert.link} style={[styles.contactLink, { marginLeft: 4 }]}>View</Link>}
              </View>
              {cert.date && <Text style={styles.light}>{cert.date}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default CreativePdf;
