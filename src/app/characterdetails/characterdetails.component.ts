import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharResponse } from 'src/assets/models/charResponse.interface';
import { _CoalescedStyleScheduler } from '@angular/cdk/table';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.component.html',
  styleUrls: ['./characterdetails.component.scss']
})
export class CharacterdetailsComponent implements OnInit {

  @Input() character: CharResponse = {
    id: "",
    name: "",
    species: "",
    status: "",
    image: "",
    type: "",
    gender: "",
    origin: {
        name: "",
        url: "",
    },
    location: {
        name: "",
        url: "",
    },
    episode: [],
    url: "",
    created: new Date()
  }
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
