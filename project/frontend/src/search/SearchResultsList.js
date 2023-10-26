import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list" >
      {results.map((result, id) => {

        return <SearchResult result={result.FirstName +" "+result.LastName} ID={result.ID} key={id} />;
      })}
    </div>
  );
};