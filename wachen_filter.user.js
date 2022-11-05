// ==UserScript==
// @name         Gebäude Übersicht
// @namespace    http://tampermonkey.net/
// @version      1.3.3
// @description  Eigene Konfiguration zum ein-/ausblenden von Gebäuden in der Gebäudeübersicht
// @author       Christian (LeitstelleHRO) / Jan (jxn_30)
// @grant        none
// @match        https://www.leitstellenspiel.de/
// ==/UserScript==

(function() {
    'use strict';

    function wachenFilter() {
        if (!$('#customizeBuildingFilter')[0]) {
            $('.building_selection').each(function() {
                $(this).remove()
            });
            var b, a = {
                script: [{
                    ids: [0],
                    name: 'Feuerwehr'
                }, {
                    ids: [2],
                    name: 'Rettung'
                }, {
                    ids: [6],
                    name: 'Polizei'
                }, {
                    ids: [9],
                    name: 'THW'
                }, {
                    ids: [15],
                    name: 'Wasserrettung'
                }, {
                    ids: [1, 3, 8, 10],
                    name: 'Schulen'
                }, {
                    ids: [7],
                    name: 'Leitstelle'
                }, {
                    ids: [5, 12],
                    name: 'SEG/RTH'
                }, {
                    ids: [11],
                    name: 'Bepol'
                }, {
                    ids: [13, 17],
                    name: 'PolHeli/Pol-Sonder'
                }, {
                    ids: [4],
                    name: 'Krankenh\xE4user'
                }],
                game: [{
                    ids: [0],
                    name: 'Feuerwehr'
                }, {
                    ids: [2, 4, 5, 12],
                    name: 'Rettung'
                }, {
                    ids: [6, 11, 13, 17],
                    name: 'Polizei'
                }, {
                    ids: [9],
                    name: 'THW'
                }, {
                    ids: [15],
                    name: 'Wasserrettung'
                }, {
                    ids: [1, 3, 8, 10],
                    name: 'Schulen'
                }, {
                    ids: [7],
                    name: 'Leitstelle'
                }]
            };
            localStorage.buildingListButtons ? b = JSON.parse(localStorage.buildingListButtons) : (b = a.script, localStorage.buildingListButtons = JSON.stringify(b));
            var c = ['Feuerwache', 'Feuerwehrschule', 'Rettungswache', 'Rettungsschule', 'Krankenhaus', 'Rettungshubschrauber-Station', 'Polizeiwache', 'Leitstelle', 'Polizeischule', 'THW', 'THW Bundesschule', 'Bereitschaftspolizei', 'Schnelleinsatzgruppe (SEG)', 'Polizeihubschrauberstation', 'Bereitstellungsraum', 'Wasserrettung', 'Verbandzellen', 'Polizei-Sondereinheiten', 'Feuerwache (Kleinwache) => Geht leider derzeit nicht', 'Polizeiwache (Kleinwache) => Geht leider derzeit nicht', 'Rettungswache (Kleinwache) => Geht leider derzeit nicht', 'Rettungshundestaffel'];
            $('#building_panel_heading > .btn-group').append('<a class="btn btn-xs btn-default" id="customizeBuildingFilter">Geb\xE4ude-Filter anpassen</a>');
            for (var d = 0; d < b.length; d++) $('#btn-group-building-select').append('<a building_type_ids="' + JSON.stringify(b[d].ids) + '" class="btn btn-xs btn-success building_selection" id="building_selection_' + b[d].name.replace(/ /g, '').toLowerCase() + '" title="Gr\xFCn = Die Geb\xE4ude werden in der Leiste angezeigt. Rot = Die Geb\xE4ude werden nicht angezeigt.">' + b[d].name + '</a>');
            $('.building_selection').on('click', function() {
                if ($(this).hasClass('btn-success')) {
                    $(this).removeClass('btn-success'), $(this).addClass('btn-danger');
                    for (var e = 0; e < JSON.parse($(this).attr('building_type_ids')).length; e++)
                        for (var f = 0; f < $('.building_list_li[building_type_id="' + JSON.parse($(this).attr('building_type_ids'))[e] + '"]').length; f++) $($('.building_list_li[building_type_id="' + JSON.parse($(this).attr('building_type_ids'))[e] + '"]')[f]).hide()
                } else {
                    $(this).removeClass('btn-danger'), $(this).addClass('btn-success');
                    for (var g = 0; g < JSON.parse($(this).attr('building_type_ids')).length; g++)
                        for (var h = 0; h < $('.building_list_li[building_type_id="' + JSON.parse($(this).attr('building_type_ids'))[g] + '"]').length; h++) $($('.building_list_li[building_type_id="' + JSON.parse($(this).attr('building_type_ids'))[g] + '"]')[h]).show()
                }
            }), $('.building_selection').on('dblclick', function() {
                $('.building_list_li').each(function() {
                    $(this).show()
                }), $('.building_selection[id!="' + $(this).attr('id') + '"]').each(function() {
                    $(this).removeClass('btn-success'), $(this).addClass('btn-danger')
                }), $(this).removeClass('btn-danger'), $(this).addClass('btn-success');
                for (var f, e = 0; e < $('.building_list_li').length; e++) f = $('.building_list_li')[e], -1 == JSON.parse($(this).attr('building_type_ids')).indexOf(parseInt($(f).attr('building_type_id'))) ? $(f).hide() : $(f).show()
            }), $('#customizeBuildingFilter').on('click', function() {
                var e = '<div id="buildingFilterCustomizer" style="background: #fff; z-index: 10000; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); min-width: 200px; max-width: 600px; max-height: ' + ($(window).height() - 20) + 'px; width: 80%; border: 1px solid rgb(66, 66, 66); color: black; padding: 5px; overflow: auto; margin-top: 10px;"><button type="button" class="close buildingFilterCustomizerClose aria-label="Schliessen" style="margin: 5px;">\xD7</button><div class="container-fluid"><h3>Geb\xE4ude-Filter anpassen</h3><hr><div class="row"><div class="col col-md-3"><button class="btn btn-success" id="newFilter"><i class="glyphicon glyphicon-plus"></i></button><label for="newFilter">&nbsp;Neuen Filter hinzuf\xFCgen</label></div><div class="col col-md-3"><button class="btn btn-success" id="saveFilters"><i class="glyphicon glyphicon-floppy-disk"></i></button><label for="saveFilters">&nbsp;Filter speichern</label></div><div class="col col-md-3"><button class="btn btn-success" id="resetNormal"><i class="glyphicon glyphicon-floppy-remove"></i></button><label for="resetNormal">&nbsp;Auf Spiel-Standard zur\xFCcksetzen</label></div><div class="col col-md-3"><button class="btn btn-success" id="resetScript"><i class="glyphicon glyphicon-floppy-remove"></i></button><label for="resetScript">&nbsp;Auf Script-Standard zur\xFCcksetzen</label></div></div><hr><div id="filterConfigurations"></div></div></div>';
                $('body').append(e), $('.buildingFilterCustomizerClose').click(function() {
                    $('#buildingFilterCustomizer').remove()
                });
                for (var h, f = JSON.parse(localStorage.buildingListButtons), g = 0; g < f.length; g++) {
                    h = '';
                    for (var p = 0; p < f[g].ids.length; p++) 0 != p && (h += ', '), h += c[f[g].ids[p]];
                    for (var q = '<div class="buildingFilter" style="float: left;"><div class="pullFilter"></div><div class="input-group string required"><div class="input-group-addon"><label class="string required " for="filter_name_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Name Filter ' + $('.buildingFilter').length + '</label> <button class="btn btn-danger btn-xs deleteFilter"><i class="glyphicon glyphicon-trash"></i></button></div><input class="string required form-control" id="filter_name_' + $('.buildingFilter').length + '" name="filter_name_' + $('.buildingFilter').length + '" size="50" type="text" value="' + f[g].name + '"></div><div class="input-group string required"><div class="input-group-addon"><label class="string required " for="filter_ids_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Geb\xE4udetypen Ausgew\xE4hlt Filter ' + $('.buildingFilter').length + '</label><input class="input required form-control disabled" id="filter_ids_' + $('.buildingFilter').length + '" name="filter_ids_' + $('.buildingFilter').length + '" disabled value="' + h + '"></input></div></div><div class="input-group select required"><div class="input-group-addon"><label class="select required " for="filter_id_selection_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Geb\xE4udetypen-Auswahl Filter ' + $('.buildingFilter').length + '</label><select multiple class="select required form-control filterIdSelection" id="filter_id_selection_' + $('.buildingFilter').length + '">', r = 0; r < c.length; r++) q += '<option>' + c[r] + '</option>';
                    q += '</select></div></div>', q += '</div>', $('#filterConfigurations').append(q);
                    for (var s = [], u = 0; u < f[g].ids.length; u++) s[u] = [c[f[g].ids[u]]];
                    $('#filter_id_selection_' + ($('.buildingFilter').length - 1)).val(s)
                }
                $('.filterIdSelection').on('change', function() {
                    $($(this).parent().parent().parent().children()[2]).children().children()[1].value = '';
                    for (var v = 0; v < $(this).val().length; v++) 0 != v && ($($(this).parent().parent().parent().children()[2]).children().children()[1].value += ', '), $($(this).parent().parent().parent().children()[2]).children().children()[1].value += $(this).val()[v]
                }), $('#newFilter').click(function() {
                    for (var v = '<div class="buildingFilter" style="float: left;"><div class="pullFilter"></div><div class="input-group string required"><div class="input-group-addon"><label class="string required " for="filter_name_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Name Filter ' + $('.buildingFilter').length + '</label> <button class="btn btn-danger btn-xs deleteFilter"><i class="glyphicon glyphicon-trash"></i></button></div><input class="string required form-control" id="filter_name_' + $('.buildingFilter').length + '" name="filter_name_' + $('.buildingFilter').length + '" size="50" type="text"></div><div class="input-group string required"><div class="input-group-addon"><label class="string required " for="filter_ids_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Geb\xE4udetypen Ausgew\xE4hlt Filter ' + $('.buildingFilter').length + '</label><input class="input required form-control disabled" id="filter_ids_' + $('.buildingFilter').length + '" name="filter_ids_' + $('.buildingFilter').length + '" disabled></input></div></div><div class="input-group select required"><div class="input-group-addon"><label class="select required " for="filter_id_selection_' + $('.buildingFilter').length + '"><abbr title="required">*</abbr> Geb\xE4udetypen-Auswahl Filter ' + $('.buildingFilter').length + '</label><select multiple class="select required form-control filterIdSelection" id="filter_id_selection_' + $('.buildingFilter').length + '">', w = 0; w < c.length; w++) v += '<option>' + c[w] + '</option>';
                    v += '</select></div></div>', v += '</div>', $('#filterConfigurations').append(v);
                    for (var x = [], y = 0; y < f[g].ids.length; y++) x[y] = [c[f[g].ids[y]]];
                    $('#filter_id_selection_' + ($('.buildingFilter').length - 1)).val(x)
                }), $('#saveFilters').click(function() {
                    for (var v = [], w = 0; w < $('.filterIdSelection').length; w++) {
                        for (var x = $($('.filterIdSelection')[w]).val(), y = [], z = 0; z < x.length; z++) y[z] = c.indexOf(x[z]);
                        v[w] = {}, v[w].ids = y, v[w].name = $($($('.filterIdSelection')[w]).parent().parent().parent().children()[1]).children()[1].value
                    }
                    localStorage.buildingListButtons = JSON.stringify(v), alert('Die Filter wurden erfolgreich gespeichert.\nDu musst das Spiel neu laden, um die \xC4nderungen zu \xFCbernehmen!')
                }), $('.deleteFilter').click(function() {
                    1 == $('.buildingFilter').length ? alert('Du kannst den letzten verbleibenden Button nicht l\xF6schen!') : $(this).parent().parent().parent().remove()
                }), $('#resetNormal').click(function() {
                    b = a.game, localStorage.buildingListButtons = JSON.stringify(b), console.log('Reset Normal'), location.reload()
                }), $('#resetScript').click(function() {
                    b = a.script, localStorage.buildingListButtons = JSON.stringify(b), console.log('Reset Script'), location.reload()
                }), $('#filterConfigurations').sortable({
                    placeHolder: 'sort-highlight',
                    handle: '.pullFilter',
                    forcePlaceholderSize: !0,
                    zIndex: 999999
                }), $('.pullFilter').css('cursor', 'move'), $('.pullFilter').css('border', '1px solid rgba(33, 37, 37, 0.1)'), $('.pullFilter').css('background-color', 'rgba(33, 37, 37, 0.1)'), $('.pullFilter').css('height', '10px'), $('.pullFilter').css('border-radius', '8px'), $('.buildingFilter').css('border', '1px solid black'), $('.buildingFilter').css('border-radius', '8px'), $('.buildingFilter').css('margin-bottom', '2px'), $('.buildingFilter').css('padding', '2px')
            }), $('.building_list_li').each(function() {
                $(this).show()
            })
        }
    }
    $('head').append('<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>'), wachenFilter();
    buildingLoadContent;
    buildingLoadContent = function(url) {
        $('#buildings').html(I18n.t('common.loading')), buildingResetContentPossible = !1, building_eval_unload && (eval(building_eval_unload), building_eval_unload = null), $.ajax({
            url: url,
            cache: !1
        }).success(function(a) {
            $('#buildings').html(a), bigMapWindowSizeChanged(), console.log(url), '/buildings' == url && wachenFilter()
        })
    }, $('#buildings_outer').hover(function() {
        wachenFilter()
    })
})();
