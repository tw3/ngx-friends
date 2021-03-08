import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngf-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoContentComponent {
}
