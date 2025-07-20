import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaStar, FaEye, FaCalendar } from 'react-icons/fa';
import { movieService } from '../api/movieService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';

const MoviesContainer = styled.div`
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
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const SearchAndFilterSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const FilterPanel = styled.div`
  display: ${props => props.isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const FilterGroup = styled.div`
  label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  select, input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.apply {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }

  &.clear {
    background: #f1f5f9;
    color: #475569;

    &:hover {
      background: #e2e8f0;
    }
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
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

const Movies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        genre: '',
        minRating: '',
        maxRating: '',
        sortBy: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({});

    // Fetch all movies
    const { data: movies, isLoading, error } = useQuery(
        ['movies', searchQuery, appliedFilters],
        () => {
            if (searchQuery) {
                return movieService.searchMovies(searchQuery);
            }
            if (Object.keys(appliedFilters).length > 0) {
                return movieService.searchAndFilterMovies(appliedFilters);
            }
            return movieService.getMovies();
        },
        {
            keepPreviousData: true,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    // Helper function to safely parse rating
    const parseRating = (rating) => {
        if (rating === null || rating === undefined || rating === '') {
            return 0;
        }
        const parsed = parseFloat(rating);
        return isNaN(parsed) ? 0 : parsed;
    };

    // Helper function to calculate average rating
    const calculateAverageRating = (moviesList) => {
        if (!moviesList || moviesList.length === 0) return 'N/A';

        const validRatings = moviesList
            .map(movie => parseRating(movie.averageRating))
            .filter(rating => rating > 0);

        if (validRatings.length === 0) return 'N/A';

        const average = validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length;
        return average.toFixed(1);
    };

    // Helper function to get latest year
    const getLatestYear = (moviesList) => {
        if (!moviesList || moviesList.length === 0) return 'N/A';

        const years = moviesList
            .map(movie => {
                if (!movie.releaseDate) return null;
                const year = new Date(movie.releaseDate).getFullYear();
                return isNaN(year) ? null : year;
            })
            .filter(year => year !== null);

        if (years.length === 0) return 'N/A';

        return Math.max(...years);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        const filterParams = {};

        if (filters.genre) filterParams.genre = filters.genre;
        if (filters.minRating) filterParams.minRating = filters.minRating;
        if (filters.maxRating) filterParams.maxRating = filters.maxRating;
        if (filters.sortBy) filterParams.sortBy = filters.sortBy;

        setAppliedFilters(filterParams);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({
            genre: '',
            minRating: '',
            maxRating: '',
            sortBy: ''
        });
        setAppliedFilters({});
        setSearchQuery('');
        setShowFilters(false);
    };

    if (isLoading) {
        return (
            <MoviesContainer>
                <Content>
                    <LoadingSpinner fullScreen={true} text="Loading movies..." />
                </Content>
            </MoviesContainer>
        );
    }

    if (error) {
        return (
            <MoviesContainer>
                <Content>
                    <EmptyState>
                        <h3>Error Loading Movies</h3>
                        <p>There was an error loading the movies. Please try again later.</p>
                    </EmptyState>
                </Content>
            </MoviesContainer>
        );
    }

    const displayedMovies = movies?.data || movies || [];

    return (
        <MoviesContainer>
            <Content>
                <Header>
                    <Title>Browse Movies</Title>
                    <Subtitle>Discover amazing films from around the world</Subtitle>
                </Header>

                <SearchAndFilterSection>
                    <SearchBar>
                        <SearchInput>
                            <SearchIcon>
                                <FaSearch />
                            </SearchIcon>
                            <Input
                                type="text"
                                placeholder="Search movies by title..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </SearchInput>
                        <FilterButton onClick={toggleFilters}>
                            <FaFilter />
                            Filters
                        </FilterButton>
                    </SearchBar>

                    <FilterPanel isOpen={showFilters}>
                        <FilterGroup>
                            <label>Genre</label>
                            <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                                <option value="">All Genres</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Documentary">Documentary</option>
                            </select>
                        </FilterGroup>

                        <FilterGroup>
                            <label>Min Rating</label>
                            <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
                                <option value="">Any Rating</option>
                                <option value="1">1+ Stars</option>
                                <option value="2">2+ Stars</option>
                                <option value="3">3+ Stars</option>
                                <option value="4">4+ Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </FilterGroup>

                        <FilterGroup>
                            <label>Max Rating</label>
                            <select name="maxRating" value={filters.maxRating} onChange={handleFilterChange}>
                                <option value="">Any Rating</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </FilterGroup>

                        <FilterGroup>
                            <label>Sort By</label>
                            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                                <option value="">Default</option>
                                <option value="rating">Rating (High to Low)</option>
                                <option value="popularity">Popularity</option>
                                <option value="releaseYear">Release Date</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                        </FilterGroup>

                        <FilterActions>
                            <ActionButton className="apply" onClick={applyFilters}>
                                Apply Filters
                            </ActionButton>
                            <ActionButton className="clear" onClick={clearFilters}>
                                Clear All
                            </ActionButton>
                        </FilterActions>
                    </FilterPanel>
                </SearchAndFilterSection>

                <StatsBar>
                    <Stat>
                        <FaEye />
                        <span>{displayedMovies.length} movies found</span>
                    </Stat>
                    <Stat>
                        <FaStar />
                        <span>Average Rating: {calculateAverageRating(displayedMovies)}</span>
                    </Stat>
                    <Stat>
                        <FaCalendar />
                        <span>Latest: {getLatestYear(displayedMovies)}</span>
                    </Stat>
                </StatsBar>

                {displayedMovies.length === 0 ? (
                    <EmptyState>
                        <h3>No Movies Found</h3>
                        <p>Try adjusting your search or filters to find more movies.</p>
                    </EmptyState>
                ) : (
                    <MoviesGrid>
                        {displayedMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </MoviesGrid>
                )}
            </Content>
        </MoviesContainer>
    );
};

export default Movies; 