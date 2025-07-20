import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaEye, FaCalendar, FaClock, FaGlobe } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

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

const MovieStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #64748b;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: #667eea;
  }
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  margin-top: 0.75rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const MovieCard = ({ movie }) => {
  const {
    _id,
    title,
    genre = [],
    director,
    releaseDate,
    runtime,
    synopsis,
    averageRating = 0,
    movieCover,
    countryOfOrigin,
    language,
    popularity = 0,
    viewCount = 0
  } = movie;

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

  // Helper function to safely format numbers
  const formatNumber = (num) => {
    if (num === null || num === undefined || num === '') {
      return 0;
    }
    const parsed = parseFloat(num);
    return isNaN(parsed) ? 0 : parsed;
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

  return (
    <Card>
      <MovieImage imageUrl={movieCover}>
        {!movieCover && <span>🎬</span>}
        <RatingBadge>
          <FaStar />
          {formatRating(averageRating)}
        </RatingBadge>
        <MovieTitle>{title}</MovieTitle>
      </MovieImage>

      <CardContent>
        <MovieInfo>
          <FaCalendar />
          <span>{formatDate(releaseDate)}</span>
          {runtime && (
            <>
              <span>•</span>
              <FaClock />
              <span>{formatRuntime(runtime)}</span>
            </>
          )}
        </MovieInfo>

        {director && (
          <MovieInfo>
            <span>Director: {director}</span>
          </MovieInfo>
        )}

        {genre.length > 0 && (
          <GenreTags>
            {genre.slice(0, 3).map((g, index) => (
              <GenreTag key={index}>{g}</GenreTag>
            ))}
            {genre.length > 3 && <GenreTag>+{genre.length - 3}</GenreTag>}
          </GenreTags>
        )}

        <Synopsis>{truncateText(synopsis)}</Synopsis>

        <MovieStats>
          <Stat>
            <FaEye />
            <span>{formatNumber(viewCount)} views</span>
          </Stat>
          <Stat>
            <FaStar />
            <span>{formatNumber(popularity)} popularity</span>
          </Stat>
          {countryOfOrigin && (
            <Stat>
              <FaGlobe />
              <span>{countryOfOrigin}</span>
            </Stat>
          )}
        </MovieStats>

        <ViewButton to={`/movies/${_id}`}>
          View Details
        </ViewButton>
      </CardContent>
    </Card>
  );
};

export default MovieCard; 