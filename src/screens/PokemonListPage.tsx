import React, { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import { useStyles } from '../tss';
import { Pokemon, useGetPokemonDetails, useGetPokemons } from 'src/hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Modal, Spin } from 'antd';
import { Loader2 } from 'lucide-react';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();
  const navigate = useNavigate();
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchBar, setSearchBar] = useState<string>('');
  const { id: detailId } = useParams();

  if (detailId && (!/^\d+$/.test(detailId) || Number(detailId) < 0 || Number(detailId) > 151))
    navigate('/list', { replace: true });

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
        if (currentId) {
          openDetails(currentId);
        }
      }
    };
    const ul = ulRef.current;
    ul?.addEventListener('click', handleClick as EventListener);

    return () => {
      ul?.removeEventListener('click', handleClick as EventListener);
    };
  }, [openDetails, data]);

  if (loading)
    return (
      <div className={`${classes.root} ${classes.loading}`}>
        <h1>Loading</h1>
        <Loader2 className={classes.loadingImage} />
      </div>
    );

  if (error)
    return (
      <div className={`${classes.root} ${classes.error}`}>
        <h1 className={classes.errorPrimary}>Failed to list pokemon</h1>
        <div className={classes.errorSecondary}>{error.message}</div>
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
