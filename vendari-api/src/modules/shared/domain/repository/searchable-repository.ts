import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export interface ISearchableRepository<
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult,
> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
