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
    minHeight: '100vh',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
        padding: '8px 0',
        color: '#FAFAFA',
      },
      header: {
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: '16px',
        alignItems: 'center',
        width: '100%',
      },
      meta: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
      },
      nameRow: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
      },
      name: {
        fontSize: '22px',
        fontWeight: 700 as const,
      },
      id: {
        fontSize: '14px',
        opacity: 0.7,
      },
      line: {
        opacity: 0.85,
      },
      types: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap' as const,
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
      stats: {
        section: {
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '8px',
          width: '100%',
        },
        title: {
          fontWeight: 700 as const,
          fontSize: '14px',
        },
        list: {
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap' as const,
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },
        item: {
          padding: '6px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600 as const,
        },
      },
    },
  };

  return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
    display: theme.display,
    flexDirection: theme.flexDirection,
    gap: theme.gap,
    minHeight: theme.minHeight,
  },
  loading: {
    justifyContent: theme.loading.justifyContent,
    alignItems: theme.loading.alignItems,
    height: theme.loading.height,
  },
  loadingImage: {
    width: theme.loading.image.width,
    height: theme.loading.image.height,
    animation: theme.loading.image.animation,
  },
  search: {
    display: theme.search.display,
    flexDirection: theme.search.flexDirection,
    gap: theme.search.gap,
    maxWidth: theme.search.maxWidth,
    paddingLeft: theme.search.paddingLeft,
  },
  listRoot: {
    display: theme.listRoot.display,
    flexDirection: theme.listRoot.flexDirection,
    gap: theme.listRoot.gap,
  },
  cardBody: {
    display: theme.card.body.display,
    border: theme.card.body.border,
    borderRadius: theme.card.body.borderRadius,
    padding: theme.card.body.padding,
    backgroundColor: theme.card.body.backgroundColor,
    gap: theme.card.body.gap,
    flexDirection: theme.card.body.flexDirection,
    '&:hover': {
      backgroundColor: theme.card.hover.backgroundColor,
      transition: theme.card.hover.transition,
      cursor: theme.card.hover.cursor,
    },
  },
  name: {
    fontSize: theme.card.name.fontSize,
    fontWeight: theme.card.name.fontWeight,
  },
  modal: {
    '& .ant-modal-content': {
      backgroundColor: theme.color.surface,
      color: theme.color.text.primary,
    },
    '& .ant-modal-header': {
      backgroundColor: theme.color.surface,
    },
    '& .ant-modal-title': {
      color: theme.color.text.primary,
    },
    '& .ant-modal-close-x': {
      color: theme.color.text.primary,
    },
  },
  header: {
    display: theme.card.header.display,
    alignItems: theme.card.header.alignItems,
    gap: theme.card.header.gap,
  },
  sprite: {
    width: theme.card.sprite.width,
    height: theme.card.sprite.height,
    backgroundColor: theme.card.sprite.backgroundColor,
    borderRadius: theme.card.sprite.borderRadius,
    display: theme.card.sprite.display,
    alignItems: theme.card.sprite.alignItems,
    justifyContent: theme.card.sprite.justifyContent,
  },
  info: {
    display: theme.card.info.display,
    flexDirection: theme.card.info.flexDirection,
    gap: theme.card.info.gap,
  },
  pokeTypes: {
    display: theme.card.type.display,
    flexDirection: theme.card.type.flexDirection,
    gap: theme.card.type.gap,
  },
  pokeTypesList: {
    display: theme.card.typeList.display,
    gap: theme.card.typeList.gap,
    flexWrap: theme.card.typeList.flexWrap,
  },
  typeTag: {
    backgroundColor: theme.card.typeTag.backgroundColor,
    color: theme.card.typeTag.color,
    padding: theme.card.typeTag.padding,
    borderRadius: theme.card.typeTag.borderRadius,
    fontSize: theme.card.typeTag.fontSize,
    fontWeight: theme.card.typeTag.fontWeight,
  },
  detailBody: {
    display: theme.detail.body.display,
    gap: theme.detail.body.gap,
    alignItems: theme.detail.body.alignItems,
    backgroundColor: theme.color.surface,
    color: theme.color.text.primary,
  },
  detailHeader: {
    display: theme.detail.header.display,
    gridTemplateColumns: theme.detail.header.gridTemplateColumns,
    gap: theme.detail.header.gap,
    alignItems: theme.detail.header.alignItems,
  },
  detailMeta: {
    display: theme.detail.meta.display,
    flexDirection: theme.detail.meta.flexDirection,
    gap: theme.detail.meta.gap,
  },
  detailNameRow: {
    display: theme.detail.nameRow.display,
    alignItems: theme.detail.nameRow.alignItems,
    gap: theme.detail.nameRow.gap,
  },
  detailName: {
    fontSize: theme.detail.name.fontSize,
    fontWeight: theme.detail.name.fontWeight,
  },
  detailId: {
    fontSize: theme.detail.id.fontSize,
    opacity: theme.detail.id.opacity,
  },
  detailLine: {
    color: theme.color.text.primary,
    opacity: theme.detail.line.opacity,
  },
  detailTypes: {
    display: theme.detail.types.display,
    gap: theme.detail.types.gap,
    flexWrap: theme.detail.types.flexWrap,
  },
  detailSprite: {
    width: theme.detail.sprite.width,
    height: theme.detail.sprite.height,
    backgroundColor: theme.detail.sprite.backgroundColor,
    borderRadius: theme.detail.sprite.borderRadius,
    display: theme.detail.sprite.display,
    alignItems: theme.detail.sprite.alignItems,
    justifyContent: theme.detail.sprite.justifyContent,
  },
  detailStats: {
    display: theme.detail.stats.section.display,
    flexDirection: theme.detail.stats.section.flexDirection,
    gap: theme.detail.stats.section.gap,
  },
  statTitle: {
    fontWeight: theme.detail.stats.title.fontWeight,
    fontSize: theme.detail.stats.title.fontSize,
  },
  statList: {
    display: theme.detail.stats.list.display,
    gap: theme.detail.stats.list.gap,
    flexWrap: theme.detail.stats.list.flexWrap,
    listStyle: theme.detail.stats.list.listStyle,
    padding: theme.detail.stats.list.padding,
    margin: theme.detail.stats.list.margin,
  },
  statItem: {
    backgroundColor: theme.card.typeTag.backgroundColor,
    color: theme.card.typeTag.color,
    padding: theme.detail.stats.item.padding,
    borderRadius: theme.detail.stats.item.borderRadius,
    fontSize: theme.detail.stats.item.fontSize,
    fontWeight: theme.detail.stats.item.fontWeight,
  },
}));
