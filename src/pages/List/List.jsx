import { useContext } from 'react';

import Container from '../../components/Container/Container';
import Grid from '../../components/Grid/Grid';
import MediumMovieCard from '../../components/MediumMovieCard/MediumMovieCard';
import Title from '../../components/Title/Title';
import { UserContext } from '../../context/UserContext';
import Page from '../../layouts/Page/Page';

const List = () => {
  const { userMovies } = useContext(UserContext);

  return (
    <Page>
      <Container>
        <Title title="MY LIST" />
        <Grid>
          {userMovies?.length > 0 ? (
            userMovies.map((item) => (
              <MediumMovieCard key={item.title} movie={item.movie} type={item.type} />
            ))
          ) : (
            <p>Nothing to show yet.</p>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default List;
