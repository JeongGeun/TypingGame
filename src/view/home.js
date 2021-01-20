export const HomeView = `<div class="game-info">
<div id="time"><b>남은 시간: <span id="second"></span>초</b></div>
<div id="score"><b>점수: <span id="totalScore"></span>점</b></div>
</div>
<div id = "division1">
<p>문제 단어</p>
<input type="text" id="symbolText" value="입력" disabled/>
</div>
<div id = "division2">
<div id="target"></div>
<div id="inputArea">
    <input type="text" id="word"/>
</div>
</div>
<div><button id="startBtn">시작</button></div>`;
