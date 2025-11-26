import React, { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import { tss } from '../tss';
import { Pokemon, useGetPokemonDetails, useGetPokemons } from 'src/hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Modal, Spin } from 'antd';
import { Loader2 } from 'lucide-react';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading } = useGetPokemons();
  const navigate = useNavigate();
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchBar, setSearchBar] = useState<string>('');
  const { id: detailId } = useParams();
  const detailOpen = Boolean(detailId);
  const {
    data: details,
    loading: detailLoading,
    error: detailError,
  } = useGetPokemonDetails(detailId);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setFilteredPokemon(data);
  }, [data]);

  const openDetails = useCallback((id: string) => navigate(`/pokemon/${id}`), [navigate]);
  const closeDetails = useCallback(() => navigate('/list', { replace: true }), [navigate]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const li = target.closest('li');
      if (li) {
        const currentId = li.dataset.id;
        if (currentId) openDetails(currentId);
      }
    };
    const ul = ulRef.current;
    ul?.addEventListener('click', handleClick as EventListener);

    return () => {
      ul?.removeEventListener('click', handleClick as EventListener);
    };
  }, [openDetails]);

  if (loading)
    return (
      <div className={`${classes.root} ${classes.loading}`}>
        <h1>Loading</h1>
        <Loader2 className={classes.loadingImage} />
      </div>
    );

  const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setSearchBar(target);
    setFilteredPokemon(data.filter((d) => d.name.toLowerCase().includes(target.toLowerCase())));
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        Search for Pokemons
        <input
          type="text"
          id="search"
          onChange={handleSearchEvent}
          value={searchBar}
          data-testid="search-input-box"
        />
      </div>
      <ul className={classes.listRoot} ref={ulRef}>
        {filteredPokemon?.map((d) => (
          <li key={d.id} className={classes.cardBody} data-id={d.id}>
            <div className={classes.header}>
              <img src={d.sprite} alt={d.name} className={classes.sprite} />
              <div className={classes.info}>
                <div className={classes.name}>{d.name}</div>
                <div>#{String(d.id).padStart(3, '0')}</div>
              </div>
            </div>
            <div className={classes.pokeTypes}>
              <h3>Type(s)</h3>
              <div className={classes.pokeTypesList}>
                {d.types?.map((type) => (
                  <span key={type} className={classes.typeTag}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {filteredPokemon.length === 0 && <h1>No matching pokemon for &apos;{searchBar}&apos;</h1>}
      <Modal
        open={detailOpen}
        onCancel={() => closeDetails()}
        footer={null}
        title={details?.name}
        className={classes.modal}
        centered
      >
        {detailLoading && <Spin />}
        {detailError && <Alert type="error" message="Failed to load Pokémon details" />}
        {!detailLoading && !detailError && details && (
          <div className={classes.detailBody}>
            <div className={classes.detailHeader}>
              <img className={classes.detailSprite} src={details.sprite} alt={details.name} />
              <div className={classes.detailMeta}>
                <div className={classes.detailNameRow}>
                  <span className={classes.detailName}>{details.name}</span>
                  <span className={classes.detailId}>#{String(details.id).padStart(3, '0')}</span>
                </div>
                <div className={classes.detailLine}>Capture Rate: {details.captureRate ?? '—'}</div>
                <div className={classes.detailLine}>
                  Height: {Number(details?.height ?? 0) / 10} m | Weight:{' '}
                  {Number(details?.weight ?? 0) / 10} kg
                </div>
                <div className={classes.detailTypes}>
                  {details.types?.map((type) => (
                    <span key={type} className={classes.typeTag}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={classes.detailStats}>
              <div className={classes.statTitle}>Base Stats</div>
              <ul className={classes.statList}>
                {details.stats?.map((s) => (
                  <li key={s.name} className={classes.statItem}>
                    {s.name}: {s.baseStat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
    display: theme.display,
    flexDirection: theme.flexDirection,
    gap: theme.gap,
    minHeight: '100vh',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: theme.color.surface,
    color: theme.color.text.primary,
  },
  detailHeader: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '16px',
    alignItems: 'center',
  },
  detailMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detailNameRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  detailName: {
    fontSize: '22px',
    fontWeight: 700,
  },
  detailId: {
    fontSize: '14px',
    opacity: 0.7,
  },
  detailLine: {
    color: theme.color.text.primary,
    opacity: 0.85,
  },
  detailTypes: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statTitle: {
    fontWeight: 700,
    fontSize: '14px',
  },
  statList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  statItem: {
    backgroundColor: theme.card.typeTag.backgroundColor,
    color: theme.card.typeTag.color,
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
  },
}));
