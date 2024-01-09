import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-pagination',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input()
  public offset: number = 0;
  @Input()
  public endOffset: number = 10;

  public elementsPerPage: string = '10';

  public selectOptions: string[] = ['10', '20', '30', '40', '50'];

  constructor(private gifsService: GifsService){}

  public onSelectChange(): void{
    this.gifsService.changeGifsPerPage(parseInt(this.elementsPerPage))
  }

  public handlePaginationNext(): void{
    this.gifsService.nextPage();
  }

  public handlePaginationPrevious(): void{
    this.gifsService.previousPage();
  }

  get resultsNumber() : number {
    return this.gifsService.totalResults;
  }


}
