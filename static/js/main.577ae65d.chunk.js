(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{18:function(e,t,i){"use strict";i.r(t);var a=i(0),r=i(2),n=i.n(r),s=i(12),c=i.n(s),o=i(1),h=i(3),u=i(4),l=i(7),p=i(10),d=i(8),v="preparing",b="game over",j="ship placement",f="game running",m="one player",O="vertical",k="horizontal",y={Carrier:5,Battleship:4,Destroyer:3,Submarine:3,"Patrol Boat":2},g="ship",S="empty",x="field",B="hit",w="sunk",N="miss",M=10,P=function(){function e(t,i,a){Object(h.a)(this,e),this.length=t,this.sunk=!1,this.hits=this.createListOfHits(),this.position=i,this.coordinates=a}return Object(u.a)(e,[{key:"createListOfHits",value:function(){for(var e=[],t=0;t<this.length;t++)e.push(null);return e}},{key:"hit",value:function(e){"hit"!==this.hits[e]&&(this.hits[e]="hit",this.isSunk())}},{key:"isSunk",value:function(){var e,t=Object(d.a)(this.hits);try{for(t.s();!(e=t.n()).done;){if(null===e.value)return this.sunk=!1}}catch(i){t.e(i)}finally{t.f()}return this.sunk=!0}},{key:"changeLocation",value:function(e,t){if(e!==O||e!==k)throw new Error("Somthing went wrong! Wrong ship position");this.position=e,this.coordinates=t}}]),e}(),C=function(){function e(t){Object(h.a)(this,e),this.board=this.createBoard(t),this.adjacentFields=this.createAdjacentFields(),this.ships={},this.sunkShip=0}return Object(u.a)(e,[{key:"createBoard",value:function(e){for(var t=[],i=0;i<e;i++){for(var a=[],r=0;r<e;r++)a.push(null);t.push(a)}return t}},{key:"createAdjacentFields",value:function(){for(var e=[],t=[-1,0,1],i=0;i<t.length;i++)for(var a=0;a<t.length;a++){var r=[t[i],t[a]];e.push(r)}return e}},{key:"checkFiledExist",value:function(e){var t=Object(o.a)(e,2),i=t[0],a=t[1];return!(i<0||i>=this.board[0].length)&&!(a<0||a>=this.board.length)}},{key:"checkField",value:function(e){var t=Object(o.a)(e,2),i=t[0],a=t[1];return null===this.board[i][a]}},{key:"checkNextCoordinates",value:function(e){var t;if("horizontal"===e)t=[1,0];else{if("vertical"!==e)throw new Error("Wrong position!");t=[0,1]}return t}},{key:"checkShipPlacement",value:function(e,t,i,a){for(var r=Object(o.a)(a,2),n=r[0],s=r[1],c=Object(o.a)(i,2),h=c[0],u=c[1],l=0;l<t;l++){var p,v=Object(d.a)(this.adjacentFields);try{for(v.s();!(p=v.n()).done;){var b=p.value,j=Object(o.a)(b,2),f=j[0],m=j[1],O=h+l*n+f,k=u+l*s+m;if(this.checkFiledExist([O,k],this.board)){if(!this.checkField([O,k],this.board)&&this.board[O][k].name!==e)return!1}else if(0===f&&0===m)return!1}}catch(y){v.e(y)}finally{v.f()}}return!0}},{key:"placeShip",value:function(e,t,i,a){var r=this.checkNextCoordinates(a),n=Object(o.a)(i,2),s=n[0],c=n[1];if(this.checkShipPlacement(e,t,i,r)){for(var h=0;h<t;h++){var u=Object(o.a)(r,2),d=s+h*u[0],v=c+h*u[1];this.board[d][v]={name:e,place:h,hit:!1}}var b=new P(t,a,i);return this.ships=Object(p.a)(Object(p.a)({},this.ships),{},Object(l.a)({},e,b)),!0}return!1}},{key:"removeShip",value:function(e){for(var t=this.ships[e].position,i=Object(o.a)(this.ships[e].coordinates,2),a=i[0],r=i[1],n=this.ships[e].length,s=this.checkNextCoordinates(t),c=0;c<n;c++){var h=Object(o.a)(s,2),u=a+c*h[0],l=r+c*h[1];this.board[u][l]=null,delete this.ships[e]}}},{key:"receiveAttack",value:function(e){var t=!1,i=!1,a=Object(o.a)(e,2),r=a[0],n=a[1];if(null===this.board[r][n])this.board[r][n]="miss";else{var s=this.board[r][n];s.hit=!0;var c=this.ships[s.name];c.hit(s.place),t=!0,c.sunk&&(i=!0,this.sunkShip+=1)}return[t,i]}}]),e}();function F(e){return Math.floor(Math.random()*e)}function R(){return[F(10),F(10)]}var E=function(){function e(t,i,a,r){Object(h.a)(this,e),this.gameBoard=new C(r),this.opponentBoard=this.gameBoard.createBoard(r),this.checkMove=a,this.number=t,this.isComputer=i,this.makeMove=this.makeMove.bind(this),this.placeShipRandom=this.placeShipRandom.bind(this)}return Object(u.a)(e,[{key:"makeShipSunk",value:function(e,t){for(var i=[[0,1],[0,-1],[1,0],[-1,0]],a=0;a<i.length;a++){var r=Object(o.a)(i[a],2),n=r[0],s=r[1],c=e+n,h=t+s,u=this.gameBoard.checkFiledExist([c,h]);if(u)for(;u&&this.opponentBoard[c][h]===B;)this.opponentBoard[c][h]=w,c+=n,h+=s,u=this.gameBoard.checkFiledExist([c,h])}}},{key:"makeMove",value:function(e){var t=Object(o.a)(e,2),i=t[0],a=t[1];if(null===this.opponentBoard[i][a]){var r=this.checkMove(e,this.number),n=Object(o.a)(r,2),s=n[0],c=n[1];return s&&!c?this.opponentBoard[i][a]=B:s&&c?(this.opponentBoard[i][a]=w,this.makeShipSunk(i,a)):this.opponentBoard[i][a]=N,!0}return!1}},{key:"moveShip",value:function(e,t,i){var a=this.gameBoard.ships[e].coordinates,r=this.gameBoard.ships[e].position,n=this.gameBoard.ships[e].length;return this.gameBoard.removeShip(e,a,r),!!this.gameBoard.placeShip(e,n,t,i)||(this.gameBoard.placeShip(e,n,a,r),!1)}},{key:"placeShipRandom",value:function(e,t){var i=new C(e);for(var a in t)for(var r=t[a],n=void 0;!n;){var s=R(),c=[O,k][F(2)];n=i.placeShip(a,r,s,c)}this.gameBoard=i}}]),e}(),G=function(){function e(t,i,a){Object(h.a)(this,e),this.checkMove=this.checkMove.bind(this),this.playRound=this.playRound.bind(this),this.checkForGameOver=this.checkForGameOver.bind(this),this.players=this.setPlayers(t),this.currentPlayer=1,this.gameOver=!1,this.ships=y,this.players[1].placeShipRandom(M,this.ships),this.players[2].placeShipRandom(M,this.ships),this.setMoveMade=i,this.setWinner=a,this.winner=0}return Object(u.a)(e,[{key:"setPlayers",value:function(e){var t={};if("one player"===e)t={1:new E(1,!1,this.checkMove,M),2:new E(2,!0,this.checkMove,M)};else{if("two player"!==e)throw new Error("Wrong number of players!");t={1:new E(1,!1,this.checkMove,M),2:new E(2,!1,this.checkMove,M)}}return t}},{key:"checkMove",value:function(e,t){var i;if(1===t)i=this.players[2];else{if(2!==t)throw new Error("Something is wrong! There should be only two players");i=this.players[1]}var a=i.gameBoard.receiveAttack(e),r=Object(o.a)(a,2);return[r[0],r[1]]}},{key:"checkForGameOver",value:function(){var e=1===this.currentPlayer?2:1,t=this.players[e].gameBoard,i=Object.keys(t.ships).length;t.sunkShip===i&&(this.gameOver=!0,this.setWinner(this.currentPlayer))}},{key:"playRound",value:function(e,t){if(!this.gameOver){var i=this.players[e];if(e!==this.currentPlayer)return;if(i.makeMove(t)&&(this.checkForGameOver(),1===this.currentPlayer?this.currentPlayer=2:this.currentPlayer=1),this.players[this.currentPlayer].isComputer){var a=R();this.playRound(this.currentPlayer,a)}this.setMoveMade(!0)}}}]),e}();var W=function(e){var t;return t=1===e.winner?"You win! Congratulations!":"Computer wins! Try again!",Object(a.jsxs)("div",{className:"o-popup",children:[Object(a.jsx)("div",{className:"o-popup-overlay"}),Object(a.jsxs)("div",{className:"newGame eightbit",children:[Object(a.jsx)("h2",{children:"Game over!"}),Object(a.jsx)("h3",{children:t}),Object(a.jsx)("div",{onClick:e.startNewGame,className:"eightbit eightbit-btn",children:"Play again"})]})]})},A=i(11);var L=function(e){var t,i=Object(r.useState)(""),n=Object(o.a)(i,2),s=n[0],c=n[1],h=Object(r.useState)([]),u=Object(o.a)(h,2),l=u[0],p=u[1],d=e.player.gameBoard.board,v=e.player.gameBoard.ships,b=function(t){c(t),t===s&&function(t){var i,a=v[t].coordinates;i=v[t].position===O?k:O,e.player.moveShip(t,a,i),c(""),p([])}(t)};return t=e.gameStatus===j?d.map((function(t,i){return t.map((function(t,r){var n=x;if(null!==t)return n=g,t.name===s&&(n="selected-ship"),Object(a.jsx)("div",{className:n,onClick:function(){return b(t.name)},children:" "},[i,r]);for(var h=0;h<l.length;h++){var u=Object(o.a)(l[h],2),d=u[0],j=u[1];d===i&&j===r&&(n="correct")}return Object(a.jsx)("div",{className:n,onClick:function(){return function(t){if(""!==s){var i=v[s].position;e.player.moveShip(s,t,i),c(""),p([])}else c("")}([i,r])},onMouseOver:function(){return function(t){if(""!==s){p([]);var i=v[s].length,a=v[s].position,r=e.player.gameBoard.checkNextCoordinates(a);e.player.gameBoard.checkShipPlacement(s,i,t,r)&&function(){p((function(e){return[].concat(Object(A.a)(e),[t])})),l.push(t);for(var e=Object(o.a)(r,2),a=e[0],n=e[1],s=Object(o.a)(t,2),c=s[0],h=s[1],u=function(e){p((function(t){return[].concat(Object(A.a)(t),[[c+a*e,h+n*e]])}))},d=0;d<i;d++)u(d)}()}else c("")}([i,r])}},[i,r])}))})):d.map((function(e,t){return e.map((function(e,i){var r=S;return null!==e?(r=e===N?N:e.hit?v[e.name].sunk?w:B:g,Object(a.jsx)("div",{className:r,children:" "},[t,i])):Object(a.jsx)("div",{className:r,children:" "},[t,i])}))})),Object(a.jsx)("div",{className:"playerBoard",children:t})};var T=function(e){var t=e.player.opponentBoard,i=function(t){var i=t.target.getAttribute("data").split(","),a=Object(o.a)(i,2),r=a[0],n=a[1];r=Number(r),n=Number(n),e.playRound(1,[r,n])},r=t.map((function(e,t){return e.map((function(e,r){var n="field";return null!==e?(n=e,Object(a.jsx)("div",{className:n,children:"  "},[t,r])):Object(a.jsx)("div",{className:"".concat(n," ").concat("enemy"),data:[t,r],onClick:i},[t,r])}))}));return Object(a.jsx)("div",{className:"playerBoard",children:r})};var z=function(e){var t,i,n=Object(r.useState)(!1),s=Object(o.a)(n,2),c=s[0],h=s[1],u=e.game.players[1];return Object(r.useEffect)((function(){c&&h(!1)}),[c]),e.gameStatus===j?(i="Place your ship",t=Object(a.jsxs)("div",{className:"m-gameInfo",children:[Object(a.jsxs)("p",{children:["Click on ship to select it. To rotate click on selected ship to move click on blank filed.",Object(a.jsx)("br",{}),"or click button for new random placement. "]}),Object(a.jsx)("button",{className:"eightbit eightbit-btn",onClick:function(){u.placeShipRandom(M,y),h(!0)},children:"Place random"}),Object(a.jsx)("p",{children:" When you are done click Start Game button to start."}),e.startButton]})):(i="Computer board",t=Object(a.jsx)(T,{player:u,playRound:e.game.playRound})),Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"preparation",children:[Object(a.jsx)("h2",{children:"Your board"}),Object(a.jsx)("h2",{children:i}),Object(a.jsx)(L,{player:u,gameStatus:e.gameStatus,shipsMoved:c}),t]})})},H=void 0;var I=function(){var e=Object(r.useState)(v),t=Object(o.a)(e,2),i=t[0],n=t[1],s=Object(r.useState)(!1),c=Object(o.a)(s,2),h=c[0],u=c[1],l=Object(r.useState)(""),p=Object(o.a)(l,2),d=p[0],O=p[1],k=Object(r.useState)(m),y=Object(o.a)(k,2),g=y[0];y[1],Object(r.useEffect)((function(){!0===h&&u(!1)}),[h]),Object(r.useEffect)((function(){""!==d&&n(b)}),[d]);var S=Object(a.jsx)("button",{className:"eightbit eightbit-btn",onClick:function(){return n(f)},children:"Start game"});return i===v&&(H=new G(g,u,O),n(j)),Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{className:"title",children:"Battleships"}),Object(a.jsx)(z,{game:H,gameStatus:i,startButton:S}),i===b?Object(a.jsx)(W,{startNewGame:function(){n(v)},winner:d}):null]})};c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(I,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.577ae65d.chunk.js.map