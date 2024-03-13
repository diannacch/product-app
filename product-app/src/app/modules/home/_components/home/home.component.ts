import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerDialogService } from '../../_services/spinner-dialog.service';
import { FormStateService } from '../../_services/form-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private spinner: SpinnerDialogService,
    private formStateService: FormStateService) { }

  ngOnInit(): void {
    this.spinner.startSpinner();
    this.formStateService.initializeProductForm();
  }
}
