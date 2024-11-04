import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from '../../general/tab/tab.component';
import { CardComponent } from '../../general/card/card.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [TabComponent, CardComponent, CommonModule],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  formType: string = "other";

  constructor(private route: ActivatedRoute, private location: Location) {
    this.formType = this.route.snapshot.params['formtype'];
  }

  @ViewChildren(TabComponent) tabs!: QueryList<TabComponent>;

  nextForm(nextIndex: number) {
    // Collapse the current form
    const tabArr = this.tabs.toArray();
    tabArr.forEach((tab, i) => {
      tab.setShown(i === nextIndex);
    });

    if (nextIndex < this.tabs.length)
      document.querySelectorAll('app-tab')[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }

  formTypeSelect(type: string) {
    this.formType = type;
    this.location.replaceState(type);
  }

}
