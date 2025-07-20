import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { FaHeart, FaTrash, FaFilm, FaStar, FaCalendar, FaClock } from 'react-icons/fa';
import { wishlistService } from '../api/wishlistService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const WishlistContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  background: #f8fafc;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;

  svg {
    color: #667eea;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c53030;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MovieCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const MovieImage = styled.div`
  position: relative;
  height: 200px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const MovieTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(229, 62, 62, 0.9);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;

  &:hover {
    transform: scale(1.1);
    background: #e53e3e;
  }

  svg {
    font-size: 1rem;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  svg {
    color: #667eea;
  }
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const GenreTag = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Synopsis = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const Wishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user's wishlist
  const { data: wishlistData, isLoading, error } = useQuery(
    'wishlist',
    () => wishlistService.getWishlist(),
    {
      enabled: !!user,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Clear wishlist mutation
  const clearWishlistMutation = useMutation(
    () => wishlistService.clearWishlist(),
    {
      onSuccess: () => {
        toast.success('Wishlist cleared successfully!');
        queryClient.invalidateQueries(['wishlist']);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to clear wishlist');
      }
    }
  );

  // Remove movie from wishlist mutation
  const removeFromWishlistMutation = useMutation(
    (movieId) => wishlistService.removeFromWishlist(movieId),
    {
      onSuccess: () => {
        toast.success('Movie removed from wishlist!');
        queryClient.invalidateQueries(['wishlist']);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to remove movie');
      }
    }
  );

  const handleRemoveMovie = (movieId) => {
    removeFromWishlistMutation.mutate(movieId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlistMutation.mutate();
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

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).getFullYear();
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const numMinutes = parseInt(minutes);
    if (isNaN(numMinutes)) return 'N/A';
    const hours = Math.floor(numMinutes / 60);
    const mins = numMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No synopsis available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (!user) {
    return (
      <WishlistContainer>
        <Content>
          <EmptyState>
            <h3>Please Login</h3>
            <p>You need to be logged in to view your wishlist.</p>
          </EmptyState>
        </Content>
      </WishlistContainer>
    );
  }

  if (isLoading) {
    return (
      <WishlistContainer>
        <Content>
          <LoadingSpinner fullScreen={true} text="Loading your wishlist..." />
        </Content>
      </WishlistContainer>
    );
  }

  if (error) {
    return (
      <WishlistContainer>
        <Content>
          <EmptyState>
            <h3>Error Loading Wishlist</h3>
            <p>There was an error loading your wishlist. Please try again later.</p>
          </EmptyState>
        </Content>
      </WishlistContainer>
    );
  }

  const movies = wishlistData?.movies || [];

  return (
    <WishlistContainer>
      <Content>
        <Header>
          <Title>
            <FaHeart />
            My Wishlist
          </Title>
          <Subtitle>Your saved movies and favorites</Subtitle>
        </Header>

        <StatsBar>
          <Stat>
            <FaFilm />
            <span>{movies.length} movies in wishlist</span>
          </Stat>
          <Stat>
            <FaStar />
            <span>Average Rating: {movies.length > 0 ?
              (movies.reduce((acc, movie) => acc + (parseFloat(movie.averageRating) || 0), 0) / movies.length).toFixed(1) : 'N/A'
            }</span>
          </Stat>
          <Stat>
            <FaCalendar />
            <span>Latest: {movies.length > 0 ?
              Math.max(...movies.map(m => new Date(m.releaseDate || 0).getFullYear()).filter(y => !isNaN(y))) : 'N/A'
            }</span>
          </Stat>
          {movies.length > 0 && (
            <ClearButton
              onClick={handleClearWishlist}
              disabled={clearWishlistMutation.isLoading}
            >
              <FaTrash />
              Clear All
            </ClearButton>
          )}
        </StatsBar>

        {movies.length === 0 ? (
          <EmptyState>
            <h3>Your Wishlist is Empty</h3>
            <p>Start adding movies to your wishlist to see them here!</p>
          </EmptyState>
        ) : (
          <MoviesGrid>
            {movies.map((movie) => (
              <MovieCard key={movie._id}>
                <MovieImage imageUrl={movie.movieCover}>
                  {!movie.movieCover && <span>🎬</span>}
                  <RatingBadge>
                    <FaStar />
                    {formatRating(movie.averageRating)}
                  </RatingBadge>
                  <RemoveButton
                    onClick={() => handleRemoveMovie(movie._id)}
                    disabled={removeFromWishlistMutation.isLoading}
                  >
                    <FaTrash />
                  </RemoveButton>
                  <MovieTitle>{movie.title}</MovieTitle>
                </MovieImage>

                <CardContent>
                  <MovieInfo>
                    <FaCalendar />
                    <span>{formatDate(movie.releaseDate)}</span>
                    {movie.runtime && (
                      <>
                        <span>•</span>
                        <FaClock />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </>
                    )}
                  </MovieInfo>

                  {movie.director && (
                    <MovieInfo>
                      <span>Director: {movie.director}</span>
                    </MovieInfo>
                  )}

                  {movie.genre && movie.genre.length > 0 && (
                    <GenreTags>
                      {movie.genre.slice(0, 3).map((g, index) => (
                        <GenreTag key={index}>{g}</GenreTag>
                      ))}
                      {movie.genre.length > 3 && <GenreTag>+{movie.genre.length - 3}</GenreTag>}
                    </GenreTags>
                  )}

                  <Synopsis>{truncateText(movie.synopsis)}</Synopsis>
                </CardContent>
              </MovieCard>
            ))}
          </MoviesGrid>
        )}
      </Content>
    </WishlistContainer>
  );
};

export default Wishlist; 