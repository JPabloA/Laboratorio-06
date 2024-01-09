import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];
  public offset: number = 0;
  public totalResults: number = 0;
  public limit: number = 10; // 10 is default value

  private _tagsHistory: string[] =[];
  private apiKey: string = '0eAQ72dgecJNoqXayWnwHL22iAXMNiiz';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private safeLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')){
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();

    // caso: Ya esta el tag
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    // Inserta el tag al inicio de la lista
    this._tagsHistory.unshift(tag);
    // Corta la lista al llegar a un limite de tags
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.safeLocalStorage();
  }

  searchTag(tag: string): void{
    if(tag.trim().length === 0) {
      return
    }
    this.handleNewOffsetNumber(tag);
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', this.limit.toString())
    .set('offset', this.offset.toString())

    this.http.get<SearchResponse>(`${this.serviceURL}/search`, { params })
    // Se crea la promesa
    .subscribe( resp => {
        this.gifList = resp.data;
        this.totalResults = resp.pagination.total_count;
      })
  }

  private handleNewOffsetNumber(tag : string) : void{
    tag = tag.toLowerCase();
    if (this._tagsHistory[0].toLowerCase() === tag){
      return
    };
    this.offset = 0;
    this.totalResults = 0;
  }

  public changeGifsPerPage(cuantity: number){
    this.limit = cuantity;
    this.loadLocalStorage();
  }

  public previousPage() : void {
    if (this.offset - this.limit < 0){
      this.offset = 0;
      return;
    }
    this.offset -= this.limit;
    this.loadLocalStorage();
  }

  public nextPage() : void {
    if (this.offset + this.limit >= this.totalResults)
    {
      return;
    }
    this.offset += this.limit;
    this.loadLocalStorage();
  }

  get endOffset():number{
    return this.offset + this.limit;
  }

  get tagsHistory(): string[]{
    return [...this._tagsHistory];
  }
}
