import { Entity } from '../entity';
import { ValueObject } from '../value-object';

type SearchResultConstructorProps<E extends Entity> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
};

export class SearchResult<E extends Entity = Entity> extends ValueObject {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;

  constructor(props: SearchResultConstructorProps<E>) {
    super();
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
    };
  }
}
