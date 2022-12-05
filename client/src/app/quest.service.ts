import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Quest } from './quest';
import { IndividualQuest } from './individual-quest';

@Injectable({
  providedIn: 'root'
})

export class QuestService {
  private url = 'http://localhost:5200'; //note: change this when hosting on aws I think
  private quests$: Subject<Quest[]> = new Subject();
  constructor(private httpClient: HttpClient) { }

  private refreshQuests() {
    this.httpClient.get<Quest[]>(`${this.url}/Quest`)
      .subscribe(quests => {
        this.quests$.next(quests);
      });
  }
  
  getQuests(): Subject<Quest[]> {
    this.refreshQuests();
    console.log('This is getQuests, all not individual');
    return this.quests$;
  }
  
  getQuestID(id: string): Observable<Quest> {
    var result = this.httpClient.get<Quest>(`${this.url}/Quest/${id}`);
    return result;
  }

  //question: is this right?
  getQuestUserID(id: string): Observable<Quest> {
    var result = this.httpClient.get<Quest>(`${this.url}/Quest/User/${id}`);
    return result;
  }

  createQuest(quest: Quest): Observable<string> {
    return this.httpClient.post(`${this.url}/Quest/post`, quest, { responseType: 'text' });
  }
  
  updateQuest(id: string, quests: IndividualQuest[]): Observable<string> {
    return this.httpClient.put(`${this.url}/Quest/put/${id}`, quests, { responseType: 'text' });
  }
  
  deleteQuest(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/Quest/delete/${id}`, { responseType: 'text' });
  }
}
