import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  private url = 'http://localhost:5200'; //note: change this when hosting on aws I think
  private characters$: Subject<Character[]> = new Subject();
  constructor(private httpClient: HttpClient) { }

  private refreshCharacters() {
    this.httpClient.get<Character[]>(`${this.url}/Character`)
      .subscribe(characters => {
        this.characters$.next(characters);
      });
  }
  
  getCharacters(): Subject<Character[]> {
    this.refreshCharacters();
    console.log('This is getCharacters, all not individual');
    return this.characters$;
  }
  
  getCharacterID(id: string): Observable<Character> {
    var result = this.httpClient.get<Character>(`${this.url}/Character/${id}`);
    return result;
  }

  getCharacterUserID(id: string): Observable<Character> {
    var result = this.httpClient.get<Character>(`${this.url}/Character/user/${id}`);
    return result;
  }
  
  createCharacter(character: Character): Observable<string> {
    return this.httpClient.post(`${this.url}/Character`, character, { responseType: 'text' });
  }
  
  updateCharacter(id: string, stat: string, new_stat: number): Observable<string> {
    var new_stat_json = {stat_change: new_stat}
    if(stat == 'level'){
      console.log('level');
      return this.httpClient.put(`${this.url}/Character/level/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'experience'){
      console.log('experience');
      return this.httpClient.put(`${this.url}/Character/exp/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'strength'){
      console.log('strength');
      return this.httpClient.put(`${this.url}/Character/strength/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'agility'){
      console.log('agility');
      return this.httpClient.put(`${this.url}/Character/agility/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'intelligence'){
      console.log('intelligence');
      return this.httpClient.put(`${this.url}/Character/intelligence/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'wisdom'){
      console.log('wisdom');
      return this.httpClient.put(`${this.url}/Character/wisdom/${id}`, new_stat_json, { responseType: 'text' });
    }
    else if(stat == 'charisma'){
      console.log('charisma');
      return this.httpClient.put(`${this.url}/Character/charisma/${id}`, new_stat_json, { responseType: 'text' });
    }
    else{
      return this.httpClient.put(`${this.url}/Character/endurance/${id}`, new_stat_json, { responseType: 'text' });
    }
  }
  
  deleteCharacter(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/Character/${id}`, { responseType: 'text' });
  }
}
