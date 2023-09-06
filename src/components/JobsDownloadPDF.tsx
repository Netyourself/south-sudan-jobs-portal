import React from 'react';
import { ListItem, OrderedList } from '@chakra-ui/react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '@/utils/dateFormate';
import { Job } from '@/types/job';

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
  },
  table: {
    display: 'flex',
    width: '100%',
    border: '1pt solid black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
  },
  tableCell: {
    flex: 1, // Let each cell take an equal amount of space
    padding: 8, // Add padding for better appearance
    borderRight: '1pt solid black', // Add a border to the right side of the cells
  },
  separator: {
    borderLeft: '1pt solid black', // Add a vertical line separator
    marginRight: 8, // Add a little space between separator and content
    paddingRight: 8, // Add right padding for the separator
  },
  headert: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  watermark: {
    position: 'absolute',
    opacity: 0.2,
    fontSize: 72,
    transform: 'rotate(-45deg)',
    color: 'gray',
  },
});

interface JobDataPdf {
  job: Job;
  // other none jobs props
}
const JobDownloadPDF: React.FC<JobDataPdf> = ({ job }) => (
  <Document>
    <>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}>Scope of Work</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.separator} />
              <Text>Position Title:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{job.title}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.separator} />
              <Text>Work Location:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{job.location}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.separator} />
              <Text>Posting Date:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text> {formatDate(job.postingdate)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.separator} />
              <Text>Deadline:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{formatDate(job.deadline)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.separator} />
              <Text>Contract Type:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{job?.contracttype}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeader}>About Us</Text>
          <Text style={styles.content}>{job.organization}</Text>
        </View>
        <View style={styles.watermark}>
          <Text>SSD Jobs Portal Recruitment</Text>
        </View>
        <View>
          <Text style={styles.sectionHeader}>Job Description</Text>
          <Text style={styles.content}>{job.descriptions}</Text>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Requirements</Text>
          {job.requirements.map((requirement: string, index: number) => (
            <Text key={index} style={styles.content}>
              {requirement}
            </Text>
          ))}
        </View>

        <View>
          <Text style={styles.sectionHeader}>How to Apply</Text>
          <Text style={styles.content}>{job.howtoapply}</Text>
        </View>

        <Text style={styles.footer}>
          Visit our website for more job listings
        </Text>
      </Page>
    </>
  </Document>
);

export default JobDownloadPDF;
