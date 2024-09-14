import { CSSProperties } from 'react';
import { isMobile } from 'react-device-detect';

export const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#343a40',
  padding: isMobile ? '1rem' : '2rem',
  boxSizing: 'border-box'
};

export const headerStyle: CSSProperties = {
  fontSize: isMobile ? '1.5rem' : '3.5rem',
  color: '#fff',
  marginBottom: '1rem',
  textAlign: 'center'
};

export const textStyle: CSSProperties = {
  fontSize: isMobile ? '1rem' : '1.5rem',
  color: '#fff',
  textAlign: 'center'
};

export const characterContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.5rem',
  direction: 'rtl'
};

export const characterStyle: CSSProperties = {
  fontSize: isMobile ? '1.5rem' : '2.5rem',
  margin: '0.5rem',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
  boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.3s',
  flex: `1 1 ${isMobile ? '10%' : '10%'}`,
  textAlign: 'center'
};

export const selectedStyle: CSSProperties = {
  ...characterStyle,
  backgroundColor: '#007bff',
  color: '#fff'
};

export const selectedCharacterStyle: CSSProperties = {
  fontWeight: 'bold',
  fontSize: '5rem',
  color: 'orange'
};

export const photoCharacter: CSSProperties = {
  width: isMobile ? '3rem' : '6.5rem',
  height: isMobile ? '3rem' : '6.5rem',
  marginLeft: "0.2rem"
}

export const buttonStyle: CSSProperties = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  textAlign: 'center',
  fontSize: '1rem'
};

export const imageStyle: CSSProperties = {
  maxWidth: '100%',
  maxHeight: '300px',
  margin: '1rem 0',
  borderRadius: '0.375rem',
  boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)'
};
