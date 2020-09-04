import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CharacterService } from '../services/character/character.service';
import { CharResponse } from '../../assets/models/charResponse.interface'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterdetailsComponent } from '../characterdetails/characterdetails.component';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  @ViewChild('search') searchElement: ElementRef;

  currentPage: number = 1;
  pageInformation: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  }
  characters: CharResponse[];
  cloneCharacters: CharResponse[];

  splashApi: string = "https://gbngq2s2e0.execute-api.eu-west-2.amazonaws.com/api/characters";

  searchForm: FormGroup;

  constructor(
    public characterService: CharacterService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      name: '',
    });

    this.onChanges();
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  onChanges() {
    this.searchForm.valueChanges.subscribe(val => {
      let filtered = this.cloneCharacters.filter(char => {
        return char.name.toLowerCase().indexOf(val.name) > -1
      });
      this.characters = filtered;
    })
  }

  getCharacters() {
    this.characterService.getCharacterData(this.splashApi).subscribe(result => {
      this.populatePage(result);
    }, err => {
      console.log('Error: ', err);
    })
  }

  populatePage(res) {
    this.pageInformation = res.info;
    this.characters = res.results;
    this.cloneCharacters = JSON.parse(JSON.stringify(res.results));
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 100);
  }

  openDetails(character) {
    const modalRef = this.modalService.open(CharacterdetailsComponent, { scrollable: true });
    modalRef.componentInstance.character = character;
  }

  nextPage() {
    if (this.pageInformation.next) {
      this.characterService.getPage(this.pageInformation.next).subscribe(res => {
        console.log('Next page: ', res);
        this.currentPage++;
        this.populatePage(res);
      })
    }
  }

  prevPage() {
    if (this.pageInformation.prev) {
      this.characterService.getPage(this.pageInformation.prev).subscribe(res => {
        console.log('Prev page: ', res);
        this.currentPage--;
        this.populatePage(res);
      })
    }
  }
}
