import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  gardener: {
    fontSize: 14,
    color: Colors.mutedText,
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  pending: {
    color: '#D69E2E',
  },
  approved: {
    color: '#38A169',
  },
  rejected: {
    color: '#E53E3E',
  },
  reason: {
    marginTop: 4,
    fontSize: 13,
    color: '#718096',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.mutedText,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
