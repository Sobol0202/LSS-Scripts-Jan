// ==UserScript==
// @name         LSS-Alliance-Distance
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Zeigt die fehlenden verdienten Credits zum nächsten Verband an
// @author       Jan (jxn_30)
// @grant        none
// @include      /^https?:\/\/(?:w{3}\.)?(?:leitstellenspiel\.de|(?:meldkamerspel|missionchief|missionchief-australia|nodsentralspillet|112-merkez|jogo-operador112|operador193|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli|dispecerske-centrum)\.com|missionchief\.co\.uk|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|operacni-stredisko\.cz|centro-de-mando\.mx)\/alliances(\?.*)?$/
// ==/UserScript==

(async function() {
	'use strict';

    if (!window.sessionStorage.hasOwnProperty('api_credits_cache') || JSON.parse(window.sessionStorage.api_credits_cache).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) await fetch('/api/credits').then(res => res.json()).then(data => window.sessionStorage.setItem('api_credits_cache', JSON.stringify({lastUpdate: new Date().getTime(), value: data})));

    let prevValue;

	document.querySelectorAll('tbody tr td:nth-of-type(3)').forEach(cell => {
        const credits = parseInt(cell.textContent.trim().match(/^\d{1,3}(?:[.,]\d{3})*/)[0].replace(/\D/g, ''));
        const distSpan = document.createElement('span');
        distSpan.innerText = (credits - (prevValue || credits)).toLocaleString();
        distSpan.style.color = 'red';
        distSpan.style.marginLeft = '1em';
        distSpan.setAttribute('title', `Zum eigenen Verband: ${(credits - JSON.parse(window.sessionStorage.api_credits_cache).value.credits_alliance_total).toLocaleString()}`);
        cell.appendChild(distSpan);
        prevValue = credits;
    });
})();
