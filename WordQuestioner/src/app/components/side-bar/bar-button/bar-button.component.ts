import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Views } from 'src/app/models/views-enum.medel';

@Component({
  selector: 'bar-button',
  templateUrl: './bar-button.component.html',
  styleUrls: ['./bar-button.component.scss']
})
export class BarButtonComponent {
  @Input() buttonTitle = "";
  @Input() iconName = "";
  @Input() view = Views.Progress;
  @Input() activeView$: Observable<Views> = new Observable();
}
