import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { FaFilm, FaStar, FaHeart, FaSearch, FaUsers, FaBell, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { movieService } from '../api/movieService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: #f8fafc;
`;

const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const MoviesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const MoviesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const MoviesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const MoviesTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f8fafc;
  border-radius: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
  }

  p {
    color: #64748b;
    margin-bottom: 2rem;
  }
`;

const StatsSection = styled.section`
  padding: 4rem 0;
  background: #f8fafc;
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    font-weight: 500;
  }
`;

const Home = () => {
  const { user } = useAuth();

  // Fetch recent movies for the home page
  const { data: recentMovies, isLoading: moviesLoading } = useQuery(
    'recentMovies',
    () => movieService.getMovies({ limit: 6 }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const displayedMovies = recentMovies?.data || recentMovies || [];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Discover Your Perfect Movie
          </HeroTitle>
          <HeroSubtitle>
            My Movie List (MML) is your personal movie discovery platform.
            Find, rate, and organize your favorite films with intelligent recommendations.
          </HeroSubtitle>
          <CTAButton to={user ? '/movies' : '/register'}>
            <FaFilm />
            {user ? 'Browse Movies' : 'Get Started'}
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContent>
          <SectionTitle>Why Choose MML?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FaSearch />
              </FeatureIcon>
              <FeatureTitle>Smart Discovery</FeatureTitle>
              <FeatureDescription>
                Get personalized movie recommendations based on your preferences,
                watch history, and favorite genres.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaStar />
              </FeatureIcon>
              <FeatureTitle>Rate & Review</FeatureTitle>
              <FeatureDescription>
                Share your thoughts on movies with detailed reviews and ratings.
                Help others discover great films.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaHeart />
              </FeatureIcon>
              <FeatureTitle>Personal Wishlist</FeatureTitle>
              <FeatureDescription>
                Create and manage your personal movie wishlist.
                Never forget a movie you want to watch.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaBell />
              </FeatureIcon>
              <FeatureTitle>Stay Updated</FeatureTitle>
              <FeatureDescription>
                Get notified about new releases, upcoming movies,
                and recommendations tailored to your taste.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaUsers />
              </FeatureIcon>
              <FeatureTitle>Community</FeatureTitle>
              <FeatureDescription>
                Join discussions with other movie enthusiasts.
                Share recommendations and discover hidden gems.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaFilm />
              </FeatureIcon>
              <FeatureTitle>Comprehensive Database</FeatureTitle>
              <FeatureDescription>
                Access a vast collection of movies with detailed information,
                cast, reviews, and more.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContent>
      </FeaturesSection>

      <MoviesSection>
        <MoviesContent>
          <MoviesHeader>
            <MoviesTitle>Recent Movies</MoviesTitle>
            <ViewAllButton to="/movies">
              View All Movies
              <FaArrowRight />
            </ViewAllButton>
          </MoviesHeader>

          {moviesLoading ? (
            <LoadingSpinner text="Loading recent movies..." />
          ) : displayedMovies.length > 0 ? (
            <MoviesGrid>
              {displayedMovies.slice(0, 6).map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </MoviesGrid>
          ) : (
            <EmptyState>
              <h3>No Movies Available</h3>
              <p>Check back soon for new movie additions!</p>
            </EmptyState>
          )}
        </MoviesContent>
      </MoviesSection>

      <StatsSection>
        <StatsContent>
          <SectionTitle>MML by the Numbers</SectionTitle>
          <StatsGrid>
            <StatCard>
              <h3>10K+</h3>
              <p>Movies</p>
            </StatCard>
            <StatCard>
              <h3>50K+</h3>
              <p>Reviews</p>
            </StatCard>
            <StatCard>
              <h3>25K+</h3>
              <p>Users</p>
            </StatCard>
            <StatCard>
              <h3>100K+</h3>
              <p>Recommendations</p>
            </StatCard>
          </StatsGrid>
        </StatsContent>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home; 