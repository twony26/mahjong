import { b2 } from '@angular/core/src/render3';
import { Card } from './fb.service';
export class Functions {

    constructor() { }

    sortCards(cards: Card[]) {
        let x_all = cards.map(function (d) { return d.x });
        let y_all = cards.map(function (d) { return d.x });

        let max_x = x_all.sort(function (a, b) { return a - b });
        let max_y = y_all.sort(function (a, b) { return a - b });

        let g = cards.sort(function (a, b) {
            var x = a['id']; var y = b['id'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        g.map(function(e, ind, arr){
            e.x = max_x[ind];
            return e;
        })

        return g;
    }
}