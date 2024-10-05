// Data from Wikidata
let cityData = [
	["Berlin",3755251,52.516666666,13.383333333],
	["Hamburg",1892122,53.55,10.0],
	["Munich",1512491,48.1375,11.575],
	["München",1512491,48.1375,11.575],
	["Cologne",1084831,50.942222222,6.957777777],
	["Frankfurt",773068,50.110555555,8.682222222],
	["Bremen",661000,53.133333333,8.733333333],
	["Stuttgart",632865,48.7775,9.18],
	["Düsseldorf",629047,51.231144444,6.772380555],
	["Leipzig",616093,51.34,12.375],
	["Dortmund",593317,51.513888888,7.465277777],
	["Essen",584580,51.450833333,7.013055555],
	["Bremen",569396,53.075833333,8.807222222],
	["Dresden",563311,51.05,13.74],
	["Hanover",545045,52.374444444,9.738611111],
	["Nuremberg",523026,49.453888888,11.0775],
	["Duisburg",502211,51.432222222,6.761111111],
	["Bochum",365742,51.483333333,7.216666666],
	["Wuppertal",358876,51.266666666,7.183333333],
	["Bielefeld",338332,52.016666666,8.533333333],
	["Bonn",336465,50.733888888,7.099722222],
	["Münster",320946,51.9625,7.625555555],
	["Mannheim",315554,49.487777777,8.466111111],
	["Karlsruhe",308707,49.016666666,8.4],
	["Augsburg",301033,48.368888888,10.897777777],
	["Wiesbaden",283083,50.0825,8.24],
	["Mönchengladbach",268465,51.2,6.433333333],
	["Gelsenkirchen",263000,51.516666666,7.1],
	["Aachen",252136,50.776207,6.083788],
	["Brunswick",251804,52.269166666,10.521111111],
	["Chemnitz",248563,50.833333333,12.916666666],
	["Kiel",247717,54.323333333,10.139444444],
	["Halle",242083,51.482777777,11.969722222],
	["Magdeburg",239364,52.1315889,11.6399609],
	["Freiburg im Breisgau",236140,47.995,7.85],
	["Krefeld",228426,51.333333333,6.566666666],
	["Mainz",220552,49.999444444,8.273611111],
	["Lübeck",218095,53.869722222,10.686388888],
	["Erfurt",214969,50.978055555,11.028888888],
	["Oberhausen",210824,51.4699,6.8514],
	["Rostock",209920,54.083333333,12.133333333],
	["Kassel",204202,51.315777777,9.497916666],
	["Hagen",189783,51.359444444,7.475],
	["Potsdam",185750,52.4,13.066666666],
	["Saarbrücken",181959,49.233333333,7.0],
	["Hamm",180849,51.666666666,7.816666666],
	["Ludwigshafen",174265,49.481111111,8.435277777],
	["Oldenburg",172830,53.143888888,8.213888888],
	["Mülheim an der Ruhr",172404,51.4275,6.8825],
	["Osnabrück",167366,52.278888888,8.043055555],
	["Leverkusen",165748,51.033333333,6.983333333],
	["Heidelberg",162273,49.412222222,8.71],
	["Darmstadt",162243,49.866666666,8.65],
	["Solingen",160643,51.171944444,7.084722222],
	["Regensburg",157443,49.016666666,12.083333333],
	["Herne",157368,51.54258,7.21897],
	["Paderborn",154755,51.716666666,8.766666666],
	["Neuss",154139,51.200277777,6.693888888],
	["Ingolstadt",141029,48.763055555,11.425],
	["Offenbach am Main",134170,50.1,8.766666666],
	["Fürth",131433,49.478333333,10.990277777],
	["Ulm",128928,48.39841,9.99155],
	["Heilbronn",128334,49.140428,9.217953],
	["Pforzheim",127849,48.895,8.705],
	["Pforzheim",127849,48.89,8.71083],
	["Würzburg",127810,49.794444444,9.929444444],
	["Wolfsburg",125961,52.423055555,10.787222222],
	["Göttingen",118946,51.533888888,9.935555555],
	["Bottrop",118113,51.52325,6.925269444],
	["Reutlingen",117547,48.483333333,9.216666666],
	["Erlangen",116562,49.596388888,11.004444444],
	["Bremerhaven",115468,53.55,8.583333333],
	["Koblenz",115268,50.359722222,7.597777777],
	["Bergisch Gladbach",112712,50.991666666,7.136666666],
	["Remscheid",112613,51.1798706,7.1943544],
	["Trier",112195,49.75565,6.63935],
	["Recklinghausen",111734,51.616666666,7.2],
	["Jena",111191,50.927222222,11.586388888],
	["Moers",105287,51.459166666,6.619722222],
	["Salzgitter",104548,52.150277777,10.359305555],
	["Siegen",102560,50.875555555,8.016666666],
	["Gütersloh",102393,51.9,8.383333333],
	["Hildesheim",101858,52.15,9.95],
	["Hanau",101364,50.132777777,8.916944444],
	["Kaiserslautern",101228,49.444722222,7.768888888],
	["Cottbus",99515,51.760805555,14.331861111],
	["Schwerin",98596,53.628888888,11.415],
	["Witten",95897,51.433333333,7.333333333],
	["Esslingen am Neckar",94941,48.740555555,9.310833333],
	["Ludwigsburg",94157,48.8975,9.191944444],
	["Giessen",94146,50.583333333,8.666666666],
	["Gera",93634,50.87818,12.08242],
	["Düren",93207,50.8,6.483333333],
	["Tübingen",92811,48.52,9.055555555],
	["Flensburg",92550,54.781944444,9.436666666],
	["Iserlohn",92540,51.383333333,7.666666666],
	["Villingen-Schwenningen",88213,48.060277777,8.458611111],
	["Ratingen",87388,51.3,6.85],
	["Zwickau",87172,50.718888888,12.496111111],
	["Lünen",86868,51.616666666,7.516666666],
];

let capitalData = [
	["Moscow [Russia]",13010112,55.755833333,37.617777777],
	["London [UK]",8799728,51.507222222,-0.1275],
	["Berlin [Germany]",3755251,52.516666666,13.383333333],
	["Madrid [Spain]",3332035,40.416944444,-3.703333333],
	["Kyiv [Ukraine]",2952301,50.45,30.523611111],
	["Rome [Italy]",2748109,41.893055555,12.482777777],
	["Paris [France]",2145906,48.856666666,2.352222222],
	["Minsk [Belarus]",1992862,53.902246,27.561837],
	["Vienna [Austria]",1973403,48.208333333,16.3725],
	["Warsaw [Poland]",1860281,52.23,21.011111111],
	["Bucharest [Romania]",1716961,44.413361111,26.097777777],
	["Budapest [Hungary]",1686222,47.498333333,19.040833333],
	["Sofia [Bulgaria]",1404116,42.697886,23.321726],
	["Prague [Czech Republic]",1384732,50.0875,14.421388888],
	["Belgrade [Serbia]",1197714,44.817777777,20.456944444],
	["Tbilisi [Georgia]",1118035,41.7225,44.7925],
	["Stockholm [Sweden]",984748,59.329444444,18.068611111],
	["Amsterdam [Netherlands]",921468,52.372777777,4.893611111],
	["Zagreb [Croatia]",767131,45.813055555,15.977222222],
	["Oslo [Norway]",709037,59.913333333,10.738888888],
	["Helsinki [Finland]",675747,60.170833333,24.9375],
	["Copenhagen [Denmark]",644431,55.676111111,12.568888888],
	["Athens [Greece]",643452,37.984166666,23.728055555],
	["Chișinău [Moldova]",639000,47.022777777,28.835277777],
	["Riga [Latvia]",605273,56.9475,24.106944444],
	["Dublin [Ireland]",592713,53.349722222,-6.260277777],
	["Vilnius [Lithuania]",581475,54.687222222,25.28],
	["Lisbon [Portugal]",545923,38.708042,-9.139016],
	["Skopje [North Macedonia]",526502,41.996111111,21.431666666],
	["Bratislava [Slovakia]",475503,48.144722222,17.112777777],
	["Canberra [Australia]",381488,-35.293,149.127],
	["Wellington [New Zealand]",216200,-41.289,174.777]
];