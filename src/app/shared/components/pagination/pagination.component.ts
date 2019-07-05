import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageMeta} from '../../dtos/responses/base.dto';
import {PaginatedRequestDto} from '../../dtos/requests/base.dto';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageMeta: PageMeta;
  @Output() loadMore: EventEmitter<PaginatedRequestDto> = new EventEmitter();

  public totalItemsCount: number;
  public lastRecord: number;
  public firstRecord: number;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMeta) {
      this.lastRecord = this.pageMeta.current_items_count + this.pageMeta.offset;
      this.firstRecord = this.pageMeta.offset + 1;
      this.totalItemsCount = this.pageMeta.total_items_count;
    }
  }

  fetchMore(page: number, pageSize: number) {
    this.loadMore.emit({page, pageSize});
  }
}
