import { Component, OnInit } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtworkService } from 'src/app/services/artwork.service';
import { Artwork, ArtworkObject, Paginator, StyleTitle, Sorting, SORTING_DATA, DataType, stringSorterFunction, numberSorterFunction } from '../../models/artwork.model';

@Component({
    selector: 'app-artwork-list',
    templateUrl: './artwork-list.component.html',
    styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
    // initialized artworkList;
    artworkList: Array<Artwork> = [];
    artworkFullList: Array<Artwork> = [];

    // initialized artworkObject
    artworkObject: ArtworkObject = {
        pagination: {

        }
        , data: []
    };
    // initialized paginator
    paginator: Paginator = {
        count: 0,
        page: 1,
        perPage: 20
    }
    // initialized style_titles
    style_titles: Array<StyleTitle> = [];

    isLoading: boolean = false;
    options: Sorting[] = SORTING_DATA;
    selectedSortColumn: Sorting = new Sorting();
    multiControl = new FormControl();

    protected _onDestroy = new Subject<void>();

    constructor(private _artworkService: ArtworkService) {

        this.multiControl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.artworkList = this._filter(this.multiControl.value);
            });
    }
    ngOnInit(): void {


        this.getArtworkList();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
    * getArtworkList: to fetch artworks
    */
    getArtworkList() {
        this.isLoading = true;
        this.style_titles = [];
        this.multiControl.setValue('');
        this._artworkService.getArtworkList(this.paginator.perPage, this.paginator.page).subscribe((res: ArtworkObject) => {
            this.artworkObject = res;

            this.setData(res);

        }, (err => {
            console.error(err)
        }),
            () => {
                this.isLoading = false;
            })
    }

    /**
     * @param res response from getArtworkList method
     * setData:to set artworkList and paginator
     */
    setData(res: ArtworkObject) {
        this.artworkList = res.data;
        this.artworkFullList = res.data;
        this.paginator = {
            page: res.pagination.current_page,
            perPage: 20,
            count: res.pagination.total,
        }
        if (this.artworkList && this.artworkList.length > 0) {
            let style_titles: Array<any> = [];
            this.artworkList = this.artworkList.map(artwork => {
                style_titles.push(...artwork.style_titles);
                if (!artwork.date_start || !artwork.date_end) {
                    artwork.location = 'Location';
                }
                else if (artwork.date_start === artwork.date_end) {
                    artwork.location = `Location (${artwork.date_start})`;
                }
                else {
                    artwork.location = `Location (${artwork.date_start} - ${artwork.date_end})`;
                }
                return artwork;
            })
            if (this.selectedSortColumn) {
                this.sortChange(this.selectedSortColumn);
            }
            style_titles.forEach((style) => {
                if (this.style_titles.length == 0 || !this.style_titles.find(st => st.name === style)) {
                    this.style_titles.push({
                        name: style,
                        title: `${style}(${style_titles.filter(st => st === style).length})`
                    })
                }

            })
        }
    }

    //-------paginator methods----------//
    prevPage() {
        this.paginator.page--;
        this.getArtworkList();
    }

    nextPage() {
        this.paginator.page++;
        this.getArtworkList();
    }

    goToPage(n: number) {
        this.paginator.page = n;
        this.getArtworkList();
    }
    //-------end ----------//

    onSelectionChange(option) {
        console.log('option', option)

    }

    private _filter(values: Array<string>): any[] {
        return values.length > 0 ? this.artworkFullList.filter(function (artwork) {
            return values.some(function (value) {
                return artwork.style_titles.includes(value)
            });
        }) : this.artworkFullList;
    }

    sortChange(column: Sorting) {
        column.isASC = !column.isASC;
        this.selectedSortColumn = column;
        switch (column.dataType) {
            case DataType.STRING:
                this.artworkList = [...this.artworkList.sort(stringSorterFunction(column.value, column.isASC ? "UP" : 'DOWN'))]
                break;

            case DataType.NUMBER:
                this.artworkList = [...this.artworkList.sort(numberSorterFunction(column.value, column.isASC ? "UP" : 'DOWN'))]
                break;

            default:
                this.artworkList = [...this.artworkList.sort(stringSorterFunction(column.value, column.isASC ? "UP" : 'DOWN'))]
                break;
        }



    }

}
