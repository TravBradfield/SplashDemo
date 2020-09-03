import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CharacterService } from '../services/character/character.service';
import { CharResponse } from '../../assets/models/charResponse.interface'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterdetailsComponent } from '../characterdetails/characterdetails.component';
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

  searchQuery: string = '';
  emailFormControl;

  constructor(
    private characterService: CharacterService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharacterData().subscribe(result => {
      console.log('Result: ', result);
      this.populatePage(result);
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
    // modalRef.componentInstance.character = JSON.stringify(character);
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

  updateSearch(ev) {
    console.log('ev: ', ev)
    if (ev.key !== 'Backspace' && ev.key !== 'Enter') {
      this.searchQuery += ev.key;
    } else {
      this.searchQuery = this.searchQuery.substring(0, this.searchQuery.length - 1);
    }
    
    console.log('Search term: ', this.searchQuery);
    let filtered = this.cloneCharacters.filter(char => {
      return char.name.indexOf(this.searchQuery) > -1;
    });
    console.log('filtered: ', filtered);
    this.characters = filtered;
  }

}
