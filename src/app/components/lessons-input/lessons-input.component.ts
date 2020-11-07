import { Component } from "@angular/core";

@Component({
  selector: "lessons-input",
  templateUrl: "./lessons-input.component.html",
})
export class LessonsInputComponent {
  constructor() {}

  lessonText: string;
  lessonHelp: string;
  code: string;

  lessonTextPlaceholder: string = `Ovde unosite kod lekcije (običan HTML dokument). Novi red je predstavljen etiketom <br>. Ako želite da odvojite pasuse, onda koristite dva puta <br>. Na platformi postoje ugrađene CSS klase koje određuju izgled nekih delova teksta lekcije. Ne smeju se koristiti sopstvena formatiranja. Klase koje smete da koristite su: .primer_text da bi tekst izgledao kao deo koda, .primer_ta da bi tekst izledao kao da stoji u editoru, .primer_slika za ubacivanje slike i .zadatak za pisanje zadatka. Ove klase možete koristi i kod pisanja pomoći. Možete ubaciti i dugme koje kopira kod u editor sa <button class = "button_copy">Vidi primer</button>.`;

  codePlaceholder: string = `Ovde unosite kod primera.`;

  lessonHelpPlaceholder: string = `Ovde unosite kod pomoći. Dokument koji sadrži pomoć mora u prva dva reda sadrzati naziv sledece i prethodne lekcije. Ako ne znate nazive ovih lekcija, stavite samo #. Dalje kucate tekst pomoći. Ako želite da pređete u novi red možete koristiti ENTER. Ovde ne morate unositi prethodnu i sledeću lekciju.`;
}
