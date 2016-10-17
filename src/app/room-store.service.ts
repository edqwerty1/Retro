import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from "rxjs/Rx";
@Injectable()
export class RoomStoreService {
    private _discussModeObserver: Observer<boolean>;
    discussMode$: Observable<boolean>;
    constructor(private af: AngularFire) {
        this.discussMode$ = new Observable<boolean>(observer => this._discussModeObserver = observer)
            .startWith(false)
            .share();
    }



    // columns[]
    getRoom(room) {
        return this.af.database.list('/rooms/' + room);
    }

    // messages[]
    getMessages(room, title) {
        return this.af.database.list(`/${room}'/messages/'${title}`);
    }

    deleteColumn(room, title, key) {
        this.af.database.list('/rooms/' + room).remove(key);;
        this.af.database.list(`/${room}'/messages/'${title}`).remove();
    }

    setDiscussMode() {
        this._discussModeObserver.next(true);
    }

    selectMessage(message: string, votes: number) {
            console.log(message, votes);
    }

}
