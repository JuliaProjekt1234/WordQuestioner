import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppConstants } from "src/app/constants/app-constants";

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColoPickerComponent {
  @Output() onChangedTagColor = new EventEmitter<string>();

  public readonly colorsToChoose = AppConstants.ColorsToChoose;
  @Input() activeColor = this.colorsToChoose[0];
  @Input() showClearButton = false;

  public changeColor(color: string): void {
    this.activeColor = color;
    this.onChangedTagColor.emit(color);
  }

  clearColorPicker(event: MouseEvent) {
    this.activeColor = "";
    this.onChangedTagColor.emit("");
    event.stopPropagation();
  }
}
