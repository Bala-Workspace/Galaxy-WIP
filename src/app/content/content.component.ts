import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { HttpService } from '../http.service';
import { SearchCountryPipe } from '../search-country.pipe';
import { SortTableColumnPipe } from '../sort-table-column.pipe';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [SearchCountryPipe, SortTableColumnPipe]
})
export class ContentComponent implements OnInit {

  public genders = ["Male", "Female"];
  query;
  public userModel = new User("", "", "", null);

  countryList;
  countryListres;
  sliceCountry;

  tableHeadig = [
    {
      name: 'name',
      heading: 'Name',
      asc: null,
      sortby: 'name'
    },
    {
      name: 'alpha2Code',
      heading: 'Short Code',
      asc: null,
      sortby: 'name'

    },
    {
      name: 'population',
      heading: 'Population',
      asc: null,
      sortby: 'number'
    },
    {
      name: 'symbol',
      heading: 'Symbol',
      asc: null,
      sortby: 'name'
    },
  ]

  // pagination

  totalItems: number;
  currentPage: number;
  pageSize: number;
  maxPages: number;

  pageObj;

  // sorting
  asc = true;

  constructor(private http: HttpService, private search: SearchCountryPipe, private sort: SortTableColumnPipe) { }

  ngOnInit() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.maxPages = 5;
    this.getCountry();

  }

  onSubmit() {
    console.log(this.userModel);
  }

  searchFilter() {
    console.log(this.query);
    this.countryList = this.search.transform(this.countryListres, this.query);
    this.processPageination();
  }
  sortTableColumn(columnName, asc, sortby) {
    this.countryList = this.sort.transform(this.countryList, columnName, asc, sortby);
    this.processPageination();
    this.asc = !this.asc;
    this.tableHeadig.map((array, index) => {
      if (array.name != columnName) {
        array.asc = null;
      }
    })
  }
  getCountry() {
    this.http.getCountries().subscribe(res => {
      this.countryListres = res;
      this.countryList = this.countryListres;
      this.processPageination();
    })
  }

  processPageination() {
    this.totalItems = this.countryList.length;
    this.pageObj = this.paginate(this.totalItems, this.currentPage, this.pageSize, this.maxPages);
    this.sliceCountry = this.countryList.slice(this.pageObj.startIndex, this.pageObj.endIndex+1);
  }

  navigate(page) {
    this.currentPage = page;
    this.pageObj = this.paginate(this.totalItems, page, this.pageSize, this.maxPages);
    this.sliceCountry = this.countryList.slice(this.pageObj.startIndex, this.pageObj.endIndex);
  }


  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


}
