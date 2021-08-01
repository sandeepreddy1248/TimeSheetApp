import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 't-sheet';
  panelOpenState = false;
  secondPanelState = true

  sectionForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.model();
  }

  model() {
    this.sectionForm = this.fb.group({
      section: this.fb.array([
        this.sectionModel()
      ])
     });
  }


sectionModel() {
  return this.fb.group({
    subSection: this.fb.array([
      this.subSectionModel()
    ]),
    trackingId: this.generateUniqueId()
  });
}


subSectionModel() {
  return this.fb.group({
      subTrackingId: this.generateUniqueId()
  });
}

generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

trackByFn(index: number, item: any) {
  return item.trackingId;
}

addSection() {
  const control = <FormArray>this.sectionForm.controls.section;
  control.push(this.sectionModel());
}

addSubSection(i) {
  const control = <FormArray>this.sectionForm.controls.section;
  const subControl = <FormArray>control.controls[i]['controls'].subSection
  console.log(subControl)
  subControl.push(this.subSectionModel())

}

}
