import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Views } from 'src/app/models/views-enum.medel';
import { ViewService } from 'src/app/services/view-services/view.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  public readonly views = Views;
  public activeView$ = new Observable<Views>();

  constructor(private viewService: ViewService) {
    this.activeView$ = viewService.activeView$;
  }

  onChangeView(view: any) {
    this.viewService.changeView(view);
  }
}
