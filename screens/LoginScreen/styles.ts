import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  error: {
    color: '#E53E3E',
    fontSize: 13,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },  
  input: {
    backgroundColor: '#F7FAFC',
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryAction: {
    marginTop: 24,
    alignItems: 'center',
  },
  secondaryText: {
    color: Colors.mutedText,
    fontSize: 14,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
