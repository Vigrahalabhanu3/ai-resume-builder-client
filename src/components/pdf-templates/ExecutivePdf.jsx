// ============================================
// ExecutivePdf.jsx - Executive Template for PDF Export
// ============================================
// React-PDF version of ExecutiveTemplate.
// Uses @react-pdf/renderer primitives only.
// ============================================

import { View, Text, Link, StyleSheet } from '@react-pdf/renderer';

function ExecutivePdf({ sections, colors }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = sections;

  const styles = StyleSheet.create({
    banner: {
      backgroundColor: '#1e1b4b',
      padding: '28 40',
      minHeight: 90,
      justifyContent: 'center',
    },
    name: {
      fontSize: 20,
      fontFamily: 'Times-Bold',
      color: '#ffffff',
      letterSpacing: 0.5,
    },
    bannerContact: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 6,
      fontSize: 9,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    bannerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'underline',
      fontSize: 9,
    },
    body: {
      padding: '28 40',
      fontFamily: 'Helvetica',
      color: '#1e293b',
      fontSize: 10,
    },
    sectionTitle: {
      fontSize: 11,
      fontFamily: 'Times-Bold',
      color: '#1e1b4b',
      marginBottom: 4,
      paddingBottom: 3,
      borderBottom: '2px solid #4f46e5',
    },
    section: {
      marginBottom: 12,
    },
    bodyText: {
      fontSize: 10,
      color: '#4b5563',
      lineHeight: 1.6,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    role: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: '#1e293b',
    },
    company: {
      fontSize: 10,
      color: '#4f46e5',
    },
    dates: {
      fontSize: 9,
      color: '#9ca3af',
    },
    bulletItem: {
      flexDirection: 'row',
      marginLeft: 12,
      marginTop: 2,
    },
    bulletDot: {
      width: 8,
      fontSize: 10,
    },
    bulletText: {
      flex: 1,
      fontSize: 10,
      lineHeight: 1.5,
      color: '#4b5563',
    },
    twoCol: {
      flexDirection: 'row',
      gap: 24,
    },
    colHalf: {
      flex: 1,
    },
    bold: {
      fontFamily: 'Helvetica-Bold',
    },
    light: {
      fontSize: 9,
      color: '#9ca3af',
    },
    link: {
      color: '#4f46e5',
      textDecoration: 'underline',
      fontSize: 9,
    },
    skillLine: {
      fontSize: 10,
      color: '#4b5563',
      marginTop: 2,
    },
  });

  return (
    <View>
      {/* Dark Banner Header */}
      <View style={styles.banner}>
        <Text style={styles.name}>{personalInfo.fullName || 'Your Full Name'}</Text>
        <View style={styles.bannerContact}>
          {personalInfo.email && <Text>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text>{personalInfo.location}</Text>}
          {personalInfo.linkedIn && (
            <Link src={personalInfo.linkedIn} style={styles.bannerLink}>LinkedIn</Link>
          )}
          {personalInfo.portfolio && (
            <Link src={personalInfo.portfolio} style={styles.bannerLink}>Portfolio</Link>
          )}
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Summary */}
        {summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.bodyText}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.row}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.role}>{exp.role}</Text>
                    {exp.company && <Text style={styles.company}> — {exp.company}</Text>}
                  </View>
                  <Text style={styles.dates}>
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
            ))}
          </View>
        )}

        {/* Skills & Education side by side */}
        {((skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) || education.length > 0) && (
          <View style={[styles.section, styles.twoCol]}>
            {/* Skills Column */}
            {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
              <View style={styles.colHalf}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.technical.length > 0 && (
                  <Text style={styles.skillLine}>
                    <Text style={styles.bold}>Technical: </Text>
                    {skills.technical.join(', ')}
                  </Text>
                )}
                {skills.soft.length > 0 && (
                  <Text style={styles.skillLine}>
                    <Text style={styles.bold}>Soft Skills: </Text>
                    {skills.soft.join(', ')}
                  </Text>
                )}
                {skills.languages.length > 0 && (
                  <Text style={styles.skillLine}>
                    <Text style={styles.bold}>Languages: </Text>
                    {skills.languages.join(', ')}
                  </Text>
                )}
              </View>
            )}

            {/* Education Column */}
            {education.length > 0 && (
              <View style={styles.colHalf}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={styles.bold}>{edu.degree}</Text>
                    {edu.field && <Text style={{ fontSize: 10 }}>{edu.field}</Text>}
                    {edu.institution && <Text style={{ fontSize: 10, color: '#4f46e5' }}>{edu.institution}</Text>}
                    <Text style={styles.light}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                  <Text style={styles.bold}>{proj.name}</Text>
                  {proj.link && <Link src={proj.link} style={styles.link}>Link</Link>}
                </View>
                {proj.description && <Text style={{ fontSize: 10, marginTop: 1 }}>{proj.description}</Text>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <Text style={[styles.light, { marginTop: 1 }]}>
                    Technologies: {proj.technologies.join(', ')}
                  </Text>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={[styles.row, { marginBottom: 3 }]}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.bold}>{cert.name}</Text>
                  {cert.issuer && <Text style={{ color: '#4f46e5' }}> — {cert.issuer}</Text>}
                  {cert.link && <Link src={cert.link} style={[styles.link, { marginLeft: 4 }]}>View</Link>}
                </View>
                {cert.date && <Text style={styles.dates}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default ExecutivePdf;
