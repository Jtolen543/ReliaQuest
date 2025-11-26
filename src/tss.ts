import { createTss, keyframes } from 'tss-react';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

function useContext() {
  const theme = {
    color: {
      surface: '#000E1C',
      text: {
        primary: '#FAFAFA',
      },
    },
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '12px',
    loading: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      image: {
        width: '100px',
        height: '100px',
        color: '#FAFAFA',
        animation: `${spin} 1.5s infinite`,
      },
    },
    listRoot: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '1em',
    },
    search: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '4px',
      maxWidth: '250px',
      paddingLeft: '3em',
    },
    card: {
      body: {
        padding: '16px',
        border: '2px solid #1E3A8A',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px',
        backgroundColor: '#0F172A',
      },
      hover: {
        backgroundColor: '#1d2944ff',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      },
      sprite: {
        width: '100px',
        height: '100px',
        backgroundColor: '#1E293B',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      info: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
      },
      name: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
      type: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
      },
      typeList: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap' as const,
      },
      typeTag: {
        backgroundColor: '#3B82F6',
        color: '#FAFAFA',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    detail: {
      body: {
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: '16px',
        alignItems: 'center',
        color: '#FAFAFA',
      },
      sprite: {
        width: '120px',
        height: '120px',
        backgroundColor: '#1E293B',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  };

  return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
