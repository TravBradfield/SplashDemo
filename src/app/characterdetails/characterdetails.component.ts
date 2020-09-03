import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CharResponse } from 'src/assets/models/charResponse.interface';
import { _CoalescedStyleScheduler } from '@angular/cdk/table';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.component.html',
  styleUrls: ['./characterdetails.component.scss']
})
export class CharacterdetailsComponent implements OnInit {

  @Input() character: CharResponse;
  name: string = 'Travis'

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log('Selected Character: ', this.character);
  }

  dismissModal() {
    this.activeModal.close();
  }
}
