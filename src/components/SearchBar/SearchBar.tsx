import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import './search-bar.scss'

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const searchInput = {
      state_county_code: "00000",
      free_text: (document.getElementById("search-field") as HTMLInputElement).value
    }
    dispatch(setSearch(searchInput));
  }
    
    return (
        <>
<section className='text-search-box' aria-label="Search component">
<p>Enter Search Criteria</p>
  <form className="usa-search input-box" role="search">
    <input className="usa-input" id="search-field" type="search" name="search" placeholder='Search NRCS Website'/>
    <Link
          to={{
            pathname: '/search-results',
          }}
        ><button className="usa-button" type="submit" onClick={handleSearch}>
      <span className="usa-search__submit-text">Search </span>
    </button>
    </Link>
  </form>
</section>
</>
    )
}

export default SearchBar