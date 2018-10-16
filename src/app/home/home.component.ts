import { deck } from '../core/carddeck';
import { FBService, Card } from '../core/fb.service';
import { Package } from '../packages/shared/package.model';
import { Observable } from 'rxjs/Rx';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { PackageService } from '../packages/shared/package.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import * as d3 from 'd3';
import * as firebase from 'firebase';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    card_deck: Card[];
    _currentPlayer: number;

    packageList: Observable<any>;
    constructor(private svc: FBService, private afs: AngularFirestore) {
        this._currentPlayer = 1;

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    ngOnInit() {
        this.card_deck = deck;
        let ref_card = firebase.database().ref("card");
        let startTime: any;
        let endTime = 0;
        let current_player = this._currentPlayer;

        let jsonRect1: Card[] = [];
        for (let i = 0; i < 16; i++) {
            let n_random = this.getRandomInt(this.card_deck.length);
            let _c = this.card_deck[n_random];
            _c.player = 1;
            this.card_deck.splice(n_random, 1);
            jsonRect1.push(_c);
        }

        let jsonRect2: Card[] = [];
        for (let i = 0; i < 16; i++) {
            let n_random = this.getRandomInt(this.card_deck.length);
            let _c = this.card_deck[n_random];
            _c.player = 2;
            this.card_deck.splice(n_random, 1);
            jsonRect2.push(_c);
        }

        let jsonRect3: Card[] = [];
        for (let i = 0; i < 16; i++) {
            let n_random = this.getRandomInt(this.card_deck.length);
            let _c = this.card_deck[n_random];
            _c.player = 3;
            this.card_deck.splice(n_random, 1);
            jsonRect3.push(_c);
        }

        let jsonRect4: Card[] = [];
        for (let i = 0; i < 16; i++) {
            let n_random = this.getRandomInt(this.card_deck.length);
            let _c = this.card_deck[n_random];
            _c.player = 4;
            this.card_deck.splice(n_random, 1);
            jsonRect4.push(_c);
        }

        let gabot: Card[] = [];
        for (let i = 0; i < 80; i++) {
            let n_random = this.getRandomInt(this.card_deck.length);
            let _c = this.card_deck[n_random];
            _c.player = 4;
            this.card_deck.splice(n_random, 1);
            gabot.push(_c);
        }

        console.log(this.card_deck.length);
        console.log(gabot);


        let w_width = 0;
        let w_height = 0;

        if (window.screen.height > window.screen.width) {
            w_width = window.screen.width;
            w_height = window.screen.width;
        } else {
            w_width = window.screen.height;
            w_height = window.screen.height;
        }


        let w_space = w_width * 0.15;
        let w_card_space = w_width * 0.85;

        // let w_width = 600;
        // let w_height = 600;
        let x_common = w_card_space / 16;
        let _base = w_width * 0.075;
        let num = 0;
        let h_card = w_height / 16;



        firebase.database().ref('user').once('value').then(function (f) {
            let u = Array.from(Object.keys(f.val()), k => f.val()[k]);
            let cntOnline = 0;
            u.forEach(function (e) {
                if (e.status === 'online') {
                    cntOnline++;
                }
            })

            console.log(cntOnline);

            firebase.database().ref('config/game_status').once('value').then(function (s) {
                let game_status = s.val();


                if (game_status === 'ended') {
                    let card_ref = firebase.database().ref('card');
                    card_ref.remove()
                        .then(function () {
                            jsonRect1.map(k => {
                                if (num == 0) {
                                    _base = _base;
                                } else {
                                    _base = _base + x_common;
                                }
                                num++;
                                k.x = _base;
                                k.y = w_height - h_card;

                                ref_card.child(k.id).set({
                                    id: k.id,
                                    x: k.x / w_width,
                                    y: k.y / w_height,
                                    isFront: true,
                                    group: k.group,
                                    player: k.player,
                                    rotation: k.rotation
                                })

                                return k;
                            })

                            _base = w_width * 0.075;
                            num = 0;
                            jsonRect2.map(k => {
                                if (num == 0) {
                                    _base = _base;
                                } else {
                                    _base = _base + x_common;
                                }
                                num++;
                                k.x = (w_width - h_card) + 4;
                                k.y = _base;
                                let x_origin = k.x + (x_common / 2);
                                let y_origin = k.y + (h_card / 2)
                                k.rotation = '90,' + x_origin + ',' + y_origin;

                                ref_card.child(k.id).set({
                                    id: k.id,
                                    x: k.x / w_width,
                                    y: k.y / w_height,
                                    isFront: true,
                                    group: k.group,
                                    player: k.player,
                                    rotation: '90,' + (x_origin / w_width) + ',' + (y_origin / w_height)
                                })

                                return k;
                            })

                            num = 0
                            _base = w_width * 0.075;
                            jsonRect3.map(k => {
                                if (num == 0) {
                                    _base = _base;
                                } else {
                                    _base = _base + x_common;
                                }
                                num++;
                                k.x = _base;
                                k.y = 0;

                                ref_card.child(k.id).set({
                                    id: k.id,
                                    x: k.x / w_width,
                                    y: k.y / w_height,
                                    isFront: true,
                                    group: k.group,
                                    player: k.player,
                                    rotation: k.rotation
                                })

                                return k;
                            })

                            num = 0
                            _base = w_width * 0.075;
                            jsonRect4.map(k => {
                                if (num == 0) {
                                    _base = _base;
                                } else {
                                    _base = _base + x_common;
                                }
                                num++;

                                k.x = 4;
                                k.y = _base - 4;
                                let x_origin = k.x + (x_common / 2);
                                let y_origin = k.y + (h_card / 2);
                                k.rotation = '90,' + x_origin + ',' + y_origin;

                                ref_card.child(k.id).set({
                                    id: k.id,
                                    x: k.x / w_width,
                                    y: k.y / w_height,
                                    isFront: true,
                                    group: k.group,
                                    player: k.player,
                                    rotation: '90,' + (x_origin / w_width) + ',' + (y_origin / w_height)
                                })
                                return k;
                            })

                            let gabot_x = h_card;
                            let gabot_y = h_card;
                            let counter_one = 0;
                            let counter_two = 0;
                            let counter_three = 0;
                            let counterAll = 0;
                            gabot.map(function (k) {
                                let x_origin = 0;
                                let y_origin = 0;
                                let r_deg = '0';

                                if ((counterAll < 13) || (counterAll >= 40 && counterAll < 53)) { //
                                    k.x = (gabot_x * 2) + 10;
                                    k.y = ((gabot_y * 3) + 8 + counter_one);
                                    x_origin = k.x + (x_common / 2);
                                    y_origin = k.y + (h_card / 2);
                                    k.rotation = '90,' + x_origin + ',' + y_origin;
                                    counter_one = counter_one + x_common;
                                    r_deg = '90';
                                }
                                else if ((counterAll >= 13 && counterAll <= 26) || (counterAll >= 53 && counterAll <= 66)) { // 
                                    k.x = ((gabot_y * 2) + counter_two) + 4;
                                    k.y = (gabot_x * 2) + 10;
                                    x_origin = k.x + (h_card / 2);
                                    y_origin = k.y + (x_common / 2);
                                    k.rotation = '0,' + x_origin + ',' + y_origin;
                                    counter_two = counter_two + x_common;
                                }
                                else if ((counterAll >= 27 && counterAll <= 39) || (counterAll >= 67 && counterAll <= 79)) { // 
                                    k.x = (gabot_x * 2) + 595;
                                    k.y = ((gabot_y * 3) + 8 + counter_three);
                                    x_origin = k.x + (x_common / 2);
                                    y_origin = k.y + (h_card / 2);
                                    k.rotation = '90,' + x_origin + ',' + y_origin;
                                    counter_three = counter_three + x_common;
                                    r_deg = '90';
                                }
                                if (counterAll === 39) {
                                    counter_one = 0;
                                    counter_two = 0;
                                    counter_three = 0;
                                }

                                k.player = 1;

                                ref_card.child(k.id).set({
                                    id: k.id,
                                    x: k.x / w_width,
                                    y: k.y / w_height,
                                    isFront: true,
                                    group: k.group,
                                    player: k.player,
                                    rotation: r_deg + ',' + (x_origin / w_width) + ',' + (y_origin / w_height)
                                })
                                counterAll++;
                                return k;
                            })

                            ref_card.on("value", function (snapshot) {
                                let obj = snapshot.val();
                                let jsonRect: Card[] = [];
                                jsonRect1.forEach(e => {
                                    let _h = obj[e.id];
                                    _h.x = _h.x * w_width;
                                    _h.y = _h.y * w_height;
                                    _h.player = e.player;
                                    _h.rotation = e.rotation;
                                    jsonRect.push(_h);
                                });

                                jsonRect2.forEach(e => {
                                    let _h = obj[e.id];
                                    _h.x = _h.x * w_width;
                                    _h.y = _h.y * w_height;
                                    _h.player = e.player;
                                    _h.rotation = e.rotation;
                                    jsonRect.push(_h);
                                });

                                jsonRect3.forEach(e => {
                                    let _h = obj[e.id];
                                    _h.x = _h.x * w_width;
                                    _h.y = _h.y * w_height;
                                    _h.player = e.player;
                                    _h.rotation = e.rotation;
                                    jsonRect.push(_h);
                                });

                                jsonRect4.forEach(e => {
                                    let _h = obj[e.id];
                                    _h.x = _h.x * w_width;
                                    _h.y = _h.y * w_height;
                                    _h.player = e.player;
                                    _h.rotation = e.rotation;
                                    jsonRect.push(_h);
                                });

                                gabot.forEach(function (e) {
                                    let _h = obj[e.id];
                                    _h.x = _h.x * w_width;
                                    _h.y = _h.y * w_height;
                                    _h.player = e.player;
                                    let _r = _h.rotation.split(',');
                                    _h.rotation = _r[0] + ',' + (_r[1] * w_width) + ',' + (_r[2] * w_height);
                                    jsonRect.push(_h);
                                });

                                let _cardGame = new CardGame();
                                _cardGame.loadCard(w_height, w_width, jsonRect, x_common, h_card, startTime, endTime, 1, ref_card);
                                // firebase.database().ref('config').update({
                                //     game_status: 'loaded'
                                // })

                            }, function (errorObject) {
                                console.log("The read failed: " + errorObject.code);
                            });
                        })
                        .catch(function (error) {
                            console.log("Remove failed: " + error.message)
                        });
                } else if (game_status === 'loaded') {
                    ref_card.on("value", function (snapshot) {
                        let obj: Card[] = snapshot.val();
                        let jsonRect = Array.from(Object.keys(obj), k => obj[k]);
                        jsonRect.map(function (r) {
                            r.x = r.x * w_width;
                            r.y = r.y * w_height;
                            let _r = r.rotation.split(',');
                            r.rotation = _r[0] + ',' + (_r[1] * w_width) + ',' + (_r[2] * w_height);
                            return r;
                        });

                        let _cardGame = new CardGame();
                        _cardGame.loadCard(w_height, w_width, jsonRect, x_common, h_card, startTime, endTime, 1, ref_card);


                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });
                }
            });
        });



    }

    getPlayer() {
        this._currentPlayer++;
    }
}

export class CardGame {

    loadCard(w_height: number, w_width: number, jsonRect: Card[], x_common: number, h_card: number, startTime: any, endTime: any,
        current_player: number, ref: firebase.database.Reference) {
        d3.selectAll("g").remove();
        let svgContainer = d3.select("svg#graphID").attr('height', w_height).attr('width', w_width);

        let g_group = svgContainer.selectAll("g")
            .data(jsonRect)
            .enter()
            .append("g")
            .attr('id', function (d) {
                return 'id-' + d.id;
            })
            .on('touchstart', function (d) {

                startTime = new Date();
                if (current_player === d.player) {
                    if ((startTime - endTime) <= 300) {
                        d3.select(this).style("fill", "white");
                        let x_per = d.x / w_width;
                        let y_per = d.y / w_height;
                        let _r = d.rotation.split(',');
                        let x_origin = d.x + (x_common / 2);
                        let y_origin = d.y + (h_card / 2);
                        let new_rotation = _r[0] + ',' + (x_origin / w_width) + ',' + (y_origin / w_height)
                        ref.child(d.id).set({
                            id: d.id,
                            isFront: !d.isFront,
                            x: x_per,
                            y: y_per,
                            group: d.group,
                            player: d.player,
                            rotation: new_rotation
                        })
                    }
                    if (((startTime - endTime) > 300) && ((startTime - endTime) <= 1000)) {
                        d3.select(this).style("fill", "red");
                    }
                }
                endTime = startTime;
            })
            .on('mousedown', function (d) {
                startTime = new Date();
                if (current_player === d.player) {
                    if ((startTime - endTime) <= 300) {
                        d3.select(this).style("fill", "white");
                        let x_per = d.x / w_width;
                        let y_per = d.y / w_height;
                        let _r = d.rotation.split(',');
                        let x_origin = d.x + (x_common / 2);
                        let y_origin = d.y + (h_card / 2);
                        let new_rotation = _r[0] + ',' + (x_origin / w_width) + ',' + (y_origin / w_height)
                        ref.child(d.id).set({
                            id: d.id,
                            isFront: !d.isFront,
                            x: x_per,
                            y: y_per,
                            group: d.group,
                            player: d.player,
                            rotation: new_rotation
                        })
                    }
                    if (((startTime - endTime) > 300) && ((startTime - endTime) <= 1000)) {
                        d3.select(this).style("fill", "red");
                    }
                }
                endTime = startTime;

            })
            .call(d3.drag()
                .on("start", function dragstarted(d) {
                    d3.select(this).raise().classed("active", true);
                    let x_per = d3.event.x / w_width;
                    let y_per = d3.event.y / w_height;
                    let _x = x_per * d3.event.x;
                    let _y = y_per * d3.event.y;

                    // console.log('start' + d3.event.x + '=>' + d3.event.y);
                    // console.log(jsonRect);

                })
                .on("drag", function dragged(d) {
                    let x_per = d3.event.x / w_width;
                    let y_per = d3.event.y / w_height;
                    if (current_player === d.player) {

                        if ((d3.event.x < 0 || d3.event.x > (w_width - h_card)) || (d3.event.y < 0 || d3.event.y > (w_height - h_card))) {
                            return;
                        }

                        d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
                        // update rotation values of x and y
                        let _r = d.rotation.split(',');
                        let x_origin = d3.event.x + (x_common / 2);
                        let y_origin = d3.event.y + (h_card / 2);
                        let new_rotation = _r[0] + ',' + x_origin + ',' + y_origin;

                        let _id = this.id.substring(3)
                        let _id_rect = 'rect#idrect-' + _id;
                        let _id_img = 'image#idImg-' + _id;
                        d3.select(_id_rect).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y).attr('transform', 'rotate(' + new_rotation + ')');
                        d3.select(_id_img).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y).attr('transform', 'rotate(' + new_rotation + ')');



                    }
                    //console.log('dragging' + d3.event.x + '=>' + d3.event.y);
                })
                .on("end", function dragended(d) {
                    d3.select(this).classed("active", false);
                    let x_per = d3.event.x / w_width;
                    let y_per = d3.event.y / w_height;
                    let _r = d.rotation.split(',');
                    let x_origin = d3.event.x + (x_common / 2);
                    let y_origin = d3.event.y + (h_card / 2);
                    let new_rotation = _r[0] + ',' + (x_origin / w_width) + ',' + (y_origin / w_height)
                    if (current_player === d.player) {
                        ref.child(d.id).set({
                            id: d.id,
                            isFront: d.isFront,
                            x: x_per,
                            y: y_per,
                            group: d.group,
                            player: d.player,
                            rotation: new_rotation
                        })
                    }

                }))

        let rects = g_group
            .append("rect");
        let rectAttributes = rects
            .attr('class', 'rect-player')
            .attr('player', function (d) { return d.player; })
            .attr('id', function (d) {
                return 'idrect-' + d.id;
            })
            .attr('transform', function (d) {
                let _r = d.rotation.split(',');
                return 'rotate(' + d.rotation + ')';
            })
            .attr('height', function (d) {
                return h_card;
            })
            .attr('width', function (d) {
                return x_common;
            })
            .attr('rx', x_common * 0.1)
            .attr('ry', h_card * 0.1)
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("stroke", 'black')
            .style("fill", function (d) {
                if (d.isFront) {
                    return 'white';
                }
                return 'rgb(1, 193, 177)';
            });

        let img = g_group.append('image')
            .attr('id', function (d) {
                return 'idImg-' + d.id;
            })
            .attr('xlink:href', function (d) { return 'assets/img/cards/' + d.id + '.png' })
            .attr('transform', function (d) {
                return 'rotate(' + d.rotation + ')';
            })
            .attr('visibility', function (d) {
                if (d.isFront) {
                    return 'visible';
                }
                return 'hidden';
            })
            .attr('height', function (d) {
                return h_card;
            })
            .attr('width', function (d) {
                return x_common;
            })
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
    }
}
