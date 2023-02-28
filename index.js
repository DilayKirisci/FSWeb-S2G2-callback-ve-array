const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const fifa2014 = fifaData.filter((fifa) => fifa["Year"] > 2013);
const fifa2014Finali = fifa2014.filter((fifa) => fifa["Stage"] === "Final");
console.log(fifa2014Finali[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

fifa2014Finali[0]["Away Team Name"];

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(fifa2014Finali[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(fifa2014Finali[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/
console.log(fifa2014Finali[0]["Win conditions"]);
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaDataCs) {
	const fifaFinali = fifaDataCs.filter((fifa) => fifa["Stage"] === "Final");
	return fifaFinali;
}

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaDataCs, FinallerCs) {
	fifaYillar = FinallerCs(fifaDataCs);
	return fifaYillar.map((fifa) => fifa["Year"]);
}

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaDataCs, FinallerCs) {
	let kazananlar = [];
	let result = "";
	let fifaFinaller = FinallerCs(fifaDataCs);
	fifaFinaller.forEach((fifa) => {
		if (fifa["Home Team Goals"] > fifa["Away Team Goals"]) {
			kazananlar.push(fifa["Home Team Name"]);
		} else {
			kazananlar.push(fifa["Away Team Name"]);
		}
	});
	return kazananlar;
}

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaDataCs, FinallerCs, YillarCs, KazananlarCs) {
	const yillaraGore = [];
	const fifaFinaller = FinallerCs(fifaDataCs);
	const fifaYillar = YillarCs(fifaDataCs, FinallerCs);
	const fifaKazananlar = KazananlarCs(fifaDataCs, FinallerCs);

	for (let i = 0; i < fifaYillar.length; i++) {
		result = `${fifaFinaller[i]["Year"]} yilinda ${fifaKazananlar[i]} dünya kupasını kazandı!`;
		yillaraGore.push(result);
	}
	return yillaraGore;
}

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(FinallerCs, fifaDataCs) {
	const homeTeamGoals = FinallerCs.map((final) => final["Home Team Goals"]);
	const awayTeamGoals = FinallerCs.map((final) => final["Away Team Goals"]);
	const homeResult = homeTeamGoals.reduce((total, current) => {
		return total + current;
	}, 0);
	let awayResult = awayTeamGoals.reduce((total, current) => {
		return total + current;
	}, 0);

	const finalResult = (homeResult + awayResult) / FinallerCs.length;

	return finalResult.toFixed(2);
}

Yillar(fifaData, Finaller);
Kazananlar(fifaData, Finaller);
YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar);
OrtalamaGolSayisi(Finaller(fifaData));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, teamInitials) {
	return data.reduce((acc, current) => {
		if (
			current["Home Team Initials"] === teamInitials &&
			current["Home Team Goals"] > current["Away Team Goals"]
		) {
			acc[current["Home Team Name"]] =
				(acc[current["Home Team Name"]] || 0) + 1;
		} else if (
			current["Away Team Initials"] === teamInitials &&
			current["Away Team Goals"] > current["Home Team Goals"]
		) {
			acc[current["Away Team Name"]] =
				(acc[current["Away Team Name"]] || 0) + 1;
		}

		return acc;
	}, {});
}

UlkelerinKazanmaSayilari(fifaData, "NED");

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(fifaDataCs) {
	const golAtanlar = fifaDataCs.reduce((acc, cur) => {
		// Add home team's goals to the accumulator
		acc[cur["Home Team Name"]] =
			(acc[cur["Home Team Name"]] || 0) + cur["Home Team Goals"];
		// Add away team's goals to the accumulator
		acc[cur["Away Team Name"]] =
			(acc[cur["Away Team Name"]] || 0) + cur["Away Team Goals"];
		return acc;
	}, {});

	// Find the team with the most goals
	const [maxTeam, maxGoals] = Object.entries(golAtanlar).reduce(
		([maxTeam, maxGoals], [team, goals]) => {
			return goals > maxGoals ? [team, goals] : [maxTeam, maxGoals];
		},
		["", 0]
	);

	console.log(
		`En çok gol atan takım: ${maxTeam}, toplam gol sayısı: ${maxGoals}`
	);
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	/* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log("Kodlar çalışıyor");
	return "as";
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi,
};
