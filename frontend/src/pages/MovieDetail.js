import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { FaStar, FaCalendar, FaClock, FaGlobe, FaUser, FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { movieService } from '../api/movieService';
import { wishlistService } from '../api/wishlistService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const MovieDetailContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  background: #f8fafc;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MovieCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MovieHeader = styled.div`
  position: relative;
  height: 400px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const MovieInfo = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  width: 100%;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
`;

const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
`;

const MovieContent = styled.div`
  padding: 2rem;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Synopsis = styled.p`
  color: #64748b;
  line-height: 1.7;
  font-size: 1.125rem;
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GenreTag = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CastMember = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    &.wishlist {
      background: ${props => props.isInWishlist ? '#e53e3e' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #475569;

    &:hover {
      background: #e2e8f0;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

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

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { data: movie, isLoading, error } = useQuery(
    ['movie', id],
    () => movieService.getMovieById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Check if movie is in wishlist when component mounts
  const { data: wishlistStatus } = useQuery(
    ['wishlistStatus', id],
    () => wishlistService.checkWishlistStatus(id),
    {
      enabled: !!user && !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onSuccess: (data) => {
        setIsInWishlist(data.isInWishlist);
      }
    }
  );

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation(
    () => wishlistService.addToWishlist(id),
    {
      onSuccess: () => {
        setIsInWishlist(true);
        toast.success('Added to wishlist!');
        queryClient.invalidateQueries(['wishlist']);
        queryClient.invalidateQueries(['wishlistStatus', id]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to add to wishlist');
      }
    }
  );

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation(
    () => wishlistService.removeFromWishlist(id),
    {
      onSuccess: () => {
        setIsInWishlist(false);
        toast.success('Removed from wishlist!');
        queryClient.invalidateQueries(['wishlist']);
        queryClient.invalidateQueries(['wishlistStatus', id]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
      }
    }
  );

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error('Please login to manage your wishlist');
      return;
    }

    if (isInWishlist) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  // Helper function to safely format rating
  const formatRating = (rating) => {
    if (rating === null || rating === undefined || rating === '') {
      return 'N/A';
    }
    const numRating = parseFloat(rating);
    if (isNaN(numRating)) {
      return 'N/A';
    }
    return numRating.toFixed(1);
  };

  if (isLoading) {
    return (
      <MovieDetailContainer>
        <Content>
          <LoadingSpinner fullScreen={true} text="Loading movie details..." />
        </Content>
      </MovieDetailContainer>
    );
  }

  if (error) {
    return (
      <MovieDetailContainer>
        <Content>
          <BackButton to="/movies">
            <FaArrowLeft />
            Back to Movies
          </BackButton>
          <EmptyState>
            <h3>Movie Not Found</h3>
            <p>The movie you're looking for doesn't exist or has been removed.</p>
          </EmptyState>
        </Content>
      </MovieDetailContainer>
    );
  }

  if (!movie) {
    return (
      <MovieDetailContainer>
        <Content>
          <BackButton to="/movies">
            <FaArrowLeft />
            Back to Movies
          </BackButton>
          <EmptyState>
            <h3>No Movie Data</h3>
            <p>Unable to load movie information.</p>
          </EmptyState>
        </Content>
      </MovieDetailContainer>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const numMinutes = parseInt(minutes);
    if (isNaN(numMinutes)) return 'N/A';
    const hours = Math.floor(numMinutes / 60);
    const mins = numMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <MovieDetailContainer>
      <Content>
        <BackButton to="/movies">
          <FaArrowLeft />
          Back to Movies
        </BackButton>

        <MovieCard>
          <MovieHeader imageUrl={movie.movieCover}>
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieMeta>
                <RatingBadge>
                  <FaStar />
                  {formatRating(movie.averageRating)}
                </RatingBadge>
                <MetaItem>
                  <FaCalendar />
                  {formatDate(movie.releaseDate)}
                </MetaItem>
                {movie.runtime && (
                  <MetaItem>
                    <FaClock />
                    {formatRuntime(movie.runtime)}
                  </MetaItem>
                )}
                {movie.countryOfOrigin && (
                  <MetaItem>
                    <FaGlobe />
                    {movie.countryOfOrigin}
                  </MetaItem>
                )}
              </MovieMeta>
            </MovieInfo>
          </MovieHeader>

          <MovieContent>
            <MovieGrid>
              <MainContent>
                <Section>
                  <SectionTitle>Synopsis</SectionTitle>
                  <Synopsis>
                    {movie.synopsis || 'No synopsis available for this movie.'}
                  </Synopsis>
                </Section>

                {movie.genre && movie.genre.length > 0 && (
                  <Section>
                    <SectionTitle>Genres</SectionTitle>
                    <GenreTags>
                      {movie.genre.map((genre, index) => (
                        <GenreTag key={index}>{genre}</GenreTag>
                      ))}
                    </GenreTags>
                  </Section>
                )}

                {movie.cast && movie.cast.length > 0 && (
                  <Section>
                    <SectionTitle>Cast</SectionTitle>
                    <CastList>
                      {movie.cast.map((actor, index) => (
                        <CastMember key={index}>{actor}</CastMember>
                      ))}
                    </CastList>
                  </Section>
                )}
              </MainContent>

              <Sidebar>
                <Section>
                  <SectionTitle>
                    <FaUser />
                    Director
                  </SectionTitle>
                  <p>{movie.director || 'N/A'}</p>
                </Section>

                {movie.language && (
                  <Section>
                    <SectionTitle>Language</SectionTitle>
                    <p>{movie.language}</p>
                  </Section>
                )}

                {movie.ageRating && (
                  <Section>
                    <SectionTitle>Age Rating</SectionTitle>
                    <p>{movie.ageRating}</p>
                  </Section>
                )}

                <ActionButtons>
                  <ActionButton
                    className={`primary wishlist ${isInWishlist ? 'in-wishlist' : ''}`}
                    onClick={handleWishlistToggle}
                    isInWishlist={isInWishlist}
                    disabled={addToWishlistMutation.isLoading || removeFromWishlistMutation.isLoading}
                  >
                    {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </ActionButton>
                  <ActionButton className="secondary">
                    <FaStar />
                    Rate Movie
                  </ActionButton>
                </ActionButtons>
              </Sidebar>
            </MovieGrid>
          </MovieContent>
        </MovieCard>
      </Content>
    </MovieDetailContainer>
  );
};

export default MovieDetail; 